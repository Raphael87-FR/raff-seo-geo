import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import test from 'node:test';

const script = fileURLToPath(new URL('../skills/raff-seo-geo/scripts/collect-evidence.mjs', import.meta.url));
const sha = (data) => createHash('sha256').update(data).digest('hex');

async function workspace(t) {
  const dir = await mkdtemp(join(tmpdir(), 'raff-http-test-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  return dir;
}

async function serve(t, handler) {
  const server = createServer(handler);
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  t.after(() => new Promise((resolve) => {
    server.close(resolve);
    server.closeAllConnections();
  }));
  return 'http://127.0.0.1:' + server.address().port;
}

async function run(directory, urls, extra = []) {
  const args = [script, '--directory', directory, '--site', 'fixture',
    ...urls.flatMap((url) => ['--url', url]), ...extra];
  const result = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => { stdout += chunk; });
    child.stderr.on('data', (chunk) => { stderr += chunk; });
    child.on('error', reject);
    child.on('close', (code) => resolve({ code, stdout, stderr }));
  });
  if (result.code === 1) return result;
  const path = result.stdout.trim();
  return { ...result, path, manifest: JSON.parse(await readFile(path, 'utf8')) };
}

test('captures actual redirects, directives, error responses, bytes and request context', async (t) => {
  const dir = await workspace(t);
  const requests = [];
  const html = Buffer.from('<html lang="fr"><meta name="robots" content="noindex"><h1>Été</h1></html>');
  const robots = 'User-agent: ClaudeBot\nDisallow: /\nUser-agent: Claude-SearchBot\nAllow: /\n';
  const origin = await serve(t, (req, res) => {
    requests.push({ url: req.url, headers: req.headers });
    if (req.url === '/start') {
      res.writeHead(302, { location: '/page', 'set-cookie': 'secret=value' });
      res.end('redirect');
    } else if (req.url === '/page') {
      res.writeHead(200, {
        'content-type': 'text/html; charset=utf-8', 'content-encoding': 'gzip',
        'x-robots-tag': 'noindex, nosnippet', link: '</page>; rel="canonical"',
        'set-cookie': 'another=secret',
      });
      res.end(gzipSync(html));
    } else if (req.url === '/robots.txt') {
      res.writeHead(200, { 'content-type': 'text/plain' });
      res.end(robots);
    } else {
      res.writeHead(404, { 'content-type': 'text/plain' });
      res.end('Not found');
    }
  });
  const result = await run(dir, [origin + '/start', origin + '/robots.txt', origin + '/missing'],
    ['--language', 'fr-FR,fr;q=0.9']);
  assert.equal(result.code, 0, result.stderr);
  const [page, robotResource, missing] = result.manifest.resources;
  assert.deepEqual(page.hops.map((hop) => hop.status), [302, 200]);
  assert.equal(missing.hops[0].status, 404);
  assert.equal(result.manifest.complete_capture, true);
  const final = page.hops[1];
  assert.equal(final.headers['x-robots-tag'], 'noindex, nosnippet');
  assert.equal(final.headers.link, '</page>; rel="canonical"');
  assert.deepEqual(await readFile(join(dirname(result.path), final.body.path)), html);
  assert.equal(final.body.sha256, sha(html));
  assert.equal(final.body.bytes, html.length);
  assert.equal(await readFile(join(dirname(result.path), robotResource.hops[0].body.path), 'utf8'), robots);
  assert.ok(Date.parse(final.started_at) <= Date.parse(final.finished_at));
  for (const request of requests) {
    assert.equal(request.headers['accept-language'], 'fr-FR,fr;q=0.9');
    assert.equal(request.headers['user-agent'], 'Raff-SEO-GEO-Evidence/1.0');
    assert.equal(request.headers.cookie, undefined);
    assert.equal(request.headers.authorization, undefined);
  }
  assert.ok(!JSON.stringify(result.manifest).includes('set-cookie'));
  assert.ok(!JSON.stringify(result.manifest).includes('secret=value'));
});

test('repeat and concurrent runs preserve earlier evidence and expose changed observations', async (t) => {
  const dir = await workspace(t);
  let blocked = true;
  const origin = await serve(t, (_req, res) => {
    if (blocked) res.setHeader('X-Robots-Tag', 'noindex');
    res.end(blocked ? 'old' : 'new');
  });
  const first = await run(dir, [origin]);
  const originalManifest = await readFile(first.path);
  const originalBodyPath = join(dirname(first.path), first.manifest.resources[0].hops[0].body.path);
  const originalBody = await readFile(originalBodyPath);
  blocked = false;
  const later = await Promise.all([run(dir, [origin]), run(dir, [origin])]);
  assert.equal(new Set([first.path, ...later.map((item) => item.path)]).size, 3);
  assert.deepEqual(await readFile(first.path), originalManifest);
  assert.deepEqual(await readFile(originalBodyPath), originalBody);
  for (const item of later) {
    assert.equal(item.code, 0);
    const hop = item.manifest.resources[0].hops[0];
    assert.equal(hop.headers['x-robots-tag'], undefined);
    assert.notEqual(hop.body.sha256, first.manifest.resources[0].hops[0].body.sha256);
  }
});

test('distinguishes a complete body at the byte limit from a retained prefix', async (t) => {
  const dir = await workspace(t);
  const origin = await serve(t, (req, res) => res.end(req.url === '/exact' ? '1234' : '12345'));
  const result = await run(dir, [origin + '/exact', origin + '/long'], ['--max-bytes', '4']);
  assert.equal(result.code, 2);
  const [exact, long] = result.manifest.resources;
  assert.equal(exact.complete_capture, true);
  assert.equal(long.complete_capture, false);
  assert.equal(long.hops[0].body.complete, false);
  assert.equal(long.hops[0].body.bytes, 4);
  assert.equal(await readFile(join(dirname(result.path), long.hops[0].body.path), 'utf8'), '1234');
});

test('stops cross-origin redirects, loops and unsupported redirect schemes without following them', async (t) => {
  const dir = await workspace(t);
  let outsideRequests = 0;
  const outside = await serve(t, (_req, res) => { outsideRequests += 1; res.end('outside'); });
  const visits = [];
  const origin = await serve(t, (req, res) => {
    visits.push(req.url);
    const location = req.url === '/outside' ? outside :
      req.url === '/invalid' ? 'file:///private/unrelated' : '/loop';
    res.writeHead(302, { location });
    res.end();
  });
  const result = await run(dir, [origin + '/outside', origin + '/loop', origin + '/invalid']);
  assert.equal(result.code, 2);
  assert.equal(outsideRequests, 0);
  assert.deepEqual(visits, ['/outside', '/loop', '/invalid']);
  assert.deepEqual(result.manifest.resources.map((item) => item.stop_reason),
    ['cross_origin_redirect', 'redirect_loop', 'invalid_redirect']);
});

test('honors the redirect bound and captures HTTP 429 once without retrying', async (t) => {
  const dir = await workspace(t);
  const visits = [];
  const origin = await serve(t, (req, res) => {
    visits.push(req.url);
    if (req.url === '/limited') {
      res.writeHead(429, { 'retry-after': '60' });
      res.end('limited');
    } else {
      res.writeHead(302, { location: '/next' });
      res.end();
    }
  });
  const result = await run(dir, [origin + '/redirect', origin + '/limited'], ['--max-redirects', '0']);
  assert.equal(result.code, 2);
  assert.deepEqual(visits, ['/redirect', '/limited']);
  assert.equal(result.manifest.resources[0].stop_reason, 'redirect_limit');
  assert.equal(result.manifest.resources[1].hops[0].status, 429);
  assert.equal(result.manifest.resources[1].hops[0].headers['retry-after'], '60');
});

test('retains transport and body failures distinctly and continues other selected resources', async (t) => {
  const dir = await workspace(t);
  const origin = await serve(t, (req, res) => {
    if (req.url === '/closed') res.destroy();
    else if (req.url === '/slow') {
      res.writeHead(200, { 'content-type': 'text/plain' });
      res.write('partial');
      setTimeout(() => res.end('late'), 2000).unref();
    } else res.end('ok');
  });
  const result = await run(dir, [origin + '/closed', origin + '/slow', origin + '/ok'],
    ['--timeout-ms', '300']);
  assert.equal(result.code, 2);
  const [closed, slow, ok] = result.manifest.resources;
  assert.equal(closed.stop_reason, 'request_error');
  assert.ok(closed.hops[0].error);
  assert.equal(closed.hops[0].status, undefined);
  assert.equal(slow.hops[0].status, 200);
  assert.equal(slow.hops[0].body.complete, false);
  assert.ok(slow.hops[0].body.error);
  assert.equal(await readFile(join(dirname(result.path), slow.hops[0].body.path), 'utf8'), 'partial');
  assert.equal(ok.complete_capture, true);
});

test('rejects credential-bearing URLs and invalid bounds before creating artifacts', async (t) => {
  const dir = await workspace(t);
  const credentials = await run(dir, ['https://user:password@example.test/']);
  assert.equal(credentials.code, 1);
  assert.ok(!credentials.stderr.includes('password'));
  const invalidLimit = await run(dir, ['https://example.test/'], ['--max-bytes', '0']);
  assert.equal(invalidLimit.code, 1);
  assert.deepEqual(await readdir(dir), []);
});
