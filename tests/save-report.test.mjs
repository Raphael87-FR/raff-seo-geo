import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const helper = fileURLToPath(new URL('../skills/raff-seo-geo/scripts/save-report.mjs', import.meta.url));

function save(args, report) {
  return spawnSync(process.execPath, [helper, ...args], {
    input: report,
    encoding: 'utf8',
  });
}

function saveAsync(args, report) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [helper, ...args]);
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => { stdout += chunk; });
    child.stderr.on('data', (chunk) => { stderr += chunk; });
    child.on('error', reject);
    child.on('close', (status) => resolve({ status, stdout, stderr }));
    child.stdin.end(report);
  });
}

test('a repeat audit gets a new file and leaves the earlier report unchanged', async () => {
  const project = await mkdtemp(join(tmpdir(), 'raff-seo-geo-test-'));
  try {
    const directory = join(project, '.raff-seo-geo', 'reports');
    const args = ['--directory', directory, '--site', 'example-com', '--date', '2026-09-15'];
    const first = save(args, '# First audit\n');
    assert.equal(first.status, 0, first.stderr);
    assert.equal(first.stdout.trim(), join(directory, 'raff-seo-geo-example-com-2026-09-15.md'));

    const second = save(args, '# Follow-up audit\n');
    assert.equal(second.status, 0, second.stderr);
    assert.equal(second.stdout.trim(), join(directory, 'raff-seo-geo-example-com-2026-09-15-2.md'));
    assert.equal(await readFile(first.stdout.trim(), 'utf8'), '# First audit\n');
    assert.equal(await readFile(second.stdout.trim(), 'utf8'), '# Follow-up audit\n');
  } finally {
    await rm(project, { recursive: true, force: true });
  }
});

test('an exact output collision fails without altering the existing file', async () => {
  const project = await mkdtemp(join(tmpdir(), 'raff-seo-geo-test-'));
  try {
    const output = join(project, 'requested-report.md');
    await writeFile(output, '# Existing audit\n');
    const result = save(['--output', output], '# Replacement audit\n');
    assert.equal(result.status, 1);
    assert.match(result.stderr, /already exists/);
    assert.equal(await readFile(output, 'utf8'), '# Existing audit\n');
  } finally {
    await rm(project, { recursive: true, force: true });
  }
});

test('concurrent audits create distinct files', async () => {
  const project = await mkdtemp(join(tmpdir(), 'raff-seo-geo-test-'));
  try {
    const directory = join(project, 'reports');
    const args = ['--directory', directory, '--site', 'example-com', '--date', '2026-09-15'];
    const results = await Promise.all([
      saveAsync(args, '# Audit A\n'),
      saveAsync(args, '# Audit B\n'),
    ]);
    for (const result of results) assert.equal(result.status, 0, result.stderr);
    const paths = results.map((result) => result.stdout.trim()).sort();
    assert.deepEqual(paths, [
      join(directory, 'raff-seo-geo-example-com-2026-09-15-2.md'),
      join(directory, 'raff-seo-geo-example-com-2026-09-15.md'),
    ].sort());
    const reports = await Promise.all(paths.map((path) => readFile(path, 'utf8')));
    assert.deepEqual(reports.sort(), ['# Audit A\n', '# Audit B\n']);
  } finally {
    await rm(project, { recursive: true, force: true });
  }
});

test('invalid site names and empty reports cannot create output', async () => {
  const project = await mkdtemp(join(tmpdir(), 'raff-seo-geo-test-'));
  try {
    const directory = join(project, 'reports');
    const badSite = save(['--directory', directory, '--site', '../other', '--date', '2026-09-15'], '# Audit\n');
    assert.equal(badSite.status, 1);
    const empty = save(['--directory', directory, '--site', 'example-com', '--date', '2026-09-15'], ' \n');
    assert.equal(empty.status, 1);
    await assert.rejects(readFile(join(directory, 'raff-seo-geo-example-com-2026-09-15.md')));
  } finally {
    await rm(project, { recursive: true, force: true });
  }
});
