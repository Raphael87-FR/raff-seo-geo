#!/usr/bin/env node

import { mkdir, open, unlink } from 'node:fs/promises';
import { dirname, extname, join, resolve } from 'node:path';

const usage = `Usage:
  node save-report.mjs --directory <safe-dir> --site <site-slug> --date YYYY-MM-DD < report.md
  node save-report.mjs --output <exact-report.md> < report.md`;

function parseArguments(args) {
  const options = {};
  const allowed = new Set(['--directory', '--site', '--date', '--output']);

  for (let index = 0; index < args.length; index += 2) {
    const key = args[index];
    const value = args[index + 1];
    if (!allowed.has(key) || !value || value.startsWith('--') || options[key]) {
      throw new Error(usage);
    }
    options[key] = value;
  }

  if (options['--output']) {
    if (options['--directory'] || options['--site'] || options['--date']) {
      throw new Error(`Use --output alone for an exact filename.\n${usage}`);
    }
    if (extname(options['--output']).toLowerCase() !== '.md') {
      throw new Error('The exact output filename must end in .md.');
    }
    return { output: resolve(options['--output']) };
  }

  const directory = options['--directory'];
  const site = options['--site'];
  const date = options['--date'];
  if (!directory || !site || !date || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(site)) {
    throw new Error(`Directory, date, and a lowercase site slug are required.\n${usage}`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      Number.isNaN(Date.parse(`${date}T00:00:00Z`)) ||
      new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) !== date) {
    throw new Error('The date must be a valid YYYY-MM-DD calendar date.');
  }

  return { directory: resolve(directory), site, date };
}

async function readReport() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(Buffer.from(chunk));
  }
  const report = Buffer.concat(chunks);
  if (!report.toString('utf8').trim()) {
    throw new Error('No Markdown report was provided on standard input.');
  }
  return report;
}

async function writeExclusive(path, report) {
  const handle = await open(path, 'wx', 0o600);
  try {
    await handle.writeFile(report);
    await handle.close();
  } catch (error) {
    await handle.close().catch(() => {});
    await unlink(path).catch(() => {});
    throw error;
  }
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  const report = await readReport();

  if (options.output) {
    await mkdir(dirname(options.output), { recursive: true });
    try {
      await writeExclusive(options.output, report);
    } catch (error) {
      if (error.code === 'EEXIST') {
        throw new Error(`Report already exists; choose another exact path: ${options.output}`);
      }
      throw error;
    }
    process.stdout.write(`${options.output}\n`);
    return;
  }

  await mkdir(options.directory, { recursive: true });
  const stem = `raff-seo-geo-${options.site}-${options.date}`;
  for (let number = 1; ; number += 1) {
    const suffix = number === 1 ? '' : `-${number}`;
    const path = join(options.directory, `${stem}${suffix}.md`);
    try {
      await writeExclusive(path, report);
      process.stdout.write(`${path}\n`);
      return;
    } catch (error) {
      if (error.code !== 'EEXIST') throw error;
    }
  }
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
