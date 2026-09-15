#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const usage = 'Usage: node collect-evidence.mjs --directory <safe-dir> --site <slug> ' +
  '--url <http-url> [--url <http-url> ...] [--language <accept-language>] ' +
  '[--timeout-ms 10000] [--max-bytes 2097152] [--max-redirects 5]';
const retainedHeaders = [
  'content-type', 'content-language', 'content-encoding', 'content-length',
  'location', 'link', 'x-robots-tag', 'date', 'last-modified', 'etag',
  'cache-control', 'vary', 'retry-after',
];
const redirectStatuses = new Set([301, 302, 303, 307, 308]);

function httpURL(value, base) {
  const url = new URL(value, base);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new Error('Only HTTP(S) URLs without embedded credentials are accepted.');
  }
  url.hash = '';
  return url;
}

function argumentsFor(args) {
  const options = { urls: [] };
  const allowed = new Set([
    '--directory', '--site', '--url', '--language', '--timeout-ms', '--max-bytes', '--max-redirects',
  ]);
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i];
    const value = args[i + 1];
    if (!allowed.has(key) || !value || value.startsWith('--')) throw new Error(usage);
    if (key === '--url') options.urls.push(httpURL(value).href);
    else {
      if (options[key] !== undefined) throw new Error(usage);
      options[key] = value;
    }
  }
  if (!options['--directory'] || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(options['--site'] || '') ||
      !options.urls.length) throw new Error(usage);
  const number = (key, fallback, min, max) => {
    const value = options[key] === undefined ? fallback : Number(options[key]);
    if (!Number.isInteger(value) || value < min || value > max) {
      throw new Error(key + ' must be an integer between ' + min + ' and ' + max + '.');
    }
    return value;
  };
  return {
    directory: resolve(options['--directory']),
    site: options['--site'],
    urls: [...new Set(options.urls)],
    language: options['--language'] || '*',
    timeout_ms: number('--timeout-ms', 10000, 1, 120000),
    max_bytes: number('--max-bytes', 2097152, 1, 10485760),
    max_redirects: number('--max-redirects', 5, 0, 20),
  };
}

function errorRecord(error) {
  return { name: error.name, code: error.cause?.code || error.code || null };
}

async function readBody(response, limit) {
  const chunks = [];
  let bytes = 0;
  let complete = false;
  let error = null;
  if (!response.body) return { content: Buffer.alloc(0), complete: true, error };
  const reader = response.body.getReader();
  try {
    for (;;) {
      const next = await reader.read();
      if (next.done) {
        complete = true;
        break;
      }
      const retained = next.value.subarray(0, Math.max(0, limit - bytes));
      chunks.push(Buffer.from(retained));
      bytes += retained.length;
      if (retained.length < next.value.length) break;
    }
  } catch (failure) {
    error = errorRecord(failure);
  } finally {
    await reader.cancel().catch(() => {});
  }
  return { content: Buffer.concat(chunks), complete, error };
}

async function collectResource(url, index, directory, options, requestHeaders) {
  const resource = { requested_url: url, hops: [], stop_reason: null };
  const origin = new URL(url).origin;
  const visited = new Set();
  for (let hopIndex = 0; ; hopIndex += 1) {
    visited.add(url);
    const hop = {
      id: 'http-' + (index + 1) + '-' + (hopIndex + 1),
      url, started_at: new Date().toISOString(),
    };
    resource.hops.push(hop);
    const start = performance.now();
    let response;
    try {
      response = await fetch(url, {
        method: 'GET', redirect: 'manual', credentials: 'omit',
        headers: requestHeaders, signal: AbortSignal.timeout(options.timeout_ms),
      });
    } catch (error) {
      hop.error = errorRecord(error);
      hop.finished_at = new Date().toISOString();
      hop.elapsed_ms = Math.round(performance.now() - start);
      resource.stop_reason = 'request_error';
      break;
    }
    hop.status = response.status;
    hop.headers = Object.fromEntries(retainedHeaders
      .filter((name) => response.headers.has(name))
      .map((name) => [name, response.headers.get(name)]));
    const body = await readBody(response, options.max_bytes);
    hop.finished_at = new Date().toISOString();
    hop.elapsed_ms = Math.round(performance.now() - start);
    hop.body = {
      path: hop.id + '.body',
      bytes: body.content.length,
      sha256: createHash('sha256').update(body.content).digest('hex'),
      complete: body.complete,
      error: body.error,
    };
    await writeFile(join(directory, hop.body.path), body.content, { flag: 'wx', mode: 0o600 });
    if (!redirectStatuses.has(response.status) || !response.headers.has('location')) {
      resource.stop_reason = 'response';
      break;
    }
    let target;
    try {
      target = httpURL(response.headers.get('location'), url);
    } catch {
      resource.stop_reason = 'invalid_redirect';
      break;
    }
    if (target.origin !== origin) {
      resource.stop_reason = 'cross_origin_redirect';
      break;
    }
    if (visited.has(target.href)) {
      resource.stop_reason = 'redirect_loop';
      break;
    }
    if (hopIndex >= options.max_redirects) {
      resource.stop_reason = 'redirect_limit';
      break;
    }
    url = target.href;
  }
  resource.complete_capture = resource.stop_reason === 'response' &&
    resource.hops.every((hop) => hop.body?.complete);
  return resource;
}

async function main() {
  if (process.argv.length === 3 && process.argv[2] === '--help') {
    process.stdout.write(usage + '\n');
    return;
  }
  const options = argumentsFor(process.argv.slice(2));
  const startedAt = new Date().toISOString();
  await mkdir(options.directory, { recursive: true });
  const directory = await mkdtemp(join(options.directory, options.site + '-' +
    startedAt.replaceAll(':', '-') + '-'));
  const requestHeaders = {
    'user-agent': 'Raff-SEO-GEO-Evidence/1.0',
    accept: '*/*',
    'accept-language': options.language,
  };
  const manifest = {
    evidence_format_version: 1,
    collector: 'raff-seo-geo-http/1',
    node_version: process.version,
    evidence_layer: 'http_capture',
    started_at: startedAt,
    request: { method: 'GET', headers: requestHeaders, credentials: 'omit' },
    limits: {
      timeout_ms_per_hop: options.timeout_ms,
      max_body_bytes_per_hop: options.max_bytes,
      max_redirects: options.max_redirects,
      redirects: 'same-origin only',
    },
    body_representation: 'fetch bytes after content-encoding decompression; no charset conversion',
    retained_response_headers: retainedHeaders,
    resources: [],
  };
  for (const [index, url] of options.urls.entries()) {
    manifest.resources.push(await collectResource(url, index, directory, options, requestHeaders));
  }
  manifest.finished_at = new Date().toISOString();
  manifest.complete_capture = manifest.resources.every((resource) => resource.complete_capture);
  const path = join(directory, 'manifest.json');
  await writeFile(path, JSON.stringify(manifest, null, 2) + '\n', { flag: 'wx', mode: 0o600 });
  process.stdout.write(path + '\n');
  // A captured HTTP error is still evidence; incomplete transport/body/redirect capture is distinct.
  if (!manifest.complete_capture) process.exitCode = 2;
}

main().catch((error) => {
  process.stderr.write(error.message + '\n');
  process.exitCode = 1;
});
