# Reproducible evidence collection

Preserve enough evidence to recheck a finding and compare later audits. Collection records observations, not scores, crawler permissions, indexing, or recommendations. Keep raw evidence immutable; interpret it separately in the report.

## Choose the evidence layer

- **Local source:** identify relative file paths, exact relevant lines/excerpts and project revision plus local changes. Preserve an excerpt or checksum where later edits would make a finding hard to reproduce.
- **HTTP capture:** retain requested URL, request context, timestamps, status, redirect steps, relevant headers, and body with completeness and checksum. Use the helper below when available.
- **Rendered page:** record browser/device/viewport, URL and date; link a relevant screenshot or DOM/text capture. A raw HTTP response does not execute JavaScript or verify browser behavior.
- **Supplied capture/export:** identify its supplied origin and collection date (or unknown), not merely today's reading date. Do not relabel it as a live observation.

Use evidence IDs such as E1 in the report, with a path/URL and precise locator. An HTTP locator combines the snapshot's manifest path and hop ID; hop IDs alone repeat between runs. One evidence item may support several findings. Keep source documentation records separate from observations about the audited site.

## Optional HTTP helper

Requires Node.js 22+ with built-in fetch and no third-party packages. Select explicit public HTTP(S) resources relevant to the audit: important pages, robots.txt, and actual sitemap URLs when useful. It follows same-origin redirects but never crawls links, sitemap entries, or other origins automatically.

Before collecting, confirm the destination is outside served/published content. Prefer `.raff-seo-geo/evidence/` next to the report directory only when that is safe. Use ordinary public read-only URLs, never account pages, signed/private URLs, credentials, or action endpoints. The helper sends no login/cookies; its response-header allowlist omits Set-Cookie and other unnecessary headers. URLs, selected headers and bodies can still contain sensitive data: inspect scope before collecting and review artifacts before sharing. A hidden folder is not access control.

Example, after selecting the actual resources and safe directory:

```sh
node "/path/to/installed/raff-seo-geo/scripts/collect-evidence.mjs" \
  --directory "/path/to/audited-project/.raff-seo-geo/evidence" \
  --site example-com \
  --url "https://example.com/" \
  --url "https://example.com/robots.txt" \
  --language "fr-FR,fr;q=0.9"
```

- Each run creates a distinct directory and writes `manifest.json` plus numbered `.body` files exclusively. The manifest records schema version 1, request headers, UTC dates, limits, per-hop status/headers, body SHA-256, errors and completeness. Bodies preserve fetch's decompressed bytes, not raw compressed network bytes; decode text according to its actual charset.
- Defaults: 10 seconds per hop, 2 MiB per body, 5 same-origin redirects; `--timeout-ms`, `--max-bytes`, and `--max-redirects` can adjust these bounded collection limits. These are resource limits, not SEO thresholds. The neutral user agent is recorded; it does not impersonate a search crawler.
- Exit **0** means all selected responses were fully captured, even if an HTTP status is 404 or 500; inspect statuses. Exit **2** preserves available evidence but marks transport failures, truncated bodies, or uncompleted redirect chains. Exit **1** means invalid arguments or a local write/runtime failure; an interrupted run without a finished manifest is incomplete evidence.
- A cross-origin redirect is recorded and left unfollowed. Inspect its destination before explicitly adding a relevant public URL to a later collection. Do not blindly retry access failures, 429s, or interrupted captures.
- `elapsed_ms` is one auditor request/body-read duration, not page rendering time, Core Web Vitals, or an SEO grade. The helper retains HTML and X-Robots-Tag values but does not parse HTML, validate schemas, interpret robots rules, or prove real crawler access.

When Node/network access is unavailable or the audit is code-only, retain equivalent available evidence with its provenance and complete the report. Do not install dependencies, connect accounts, or pretend missing response bodies were inspected.

## Compare repeat audits

1. Match the same URL and evidence layer, accounting for canonical/redirect changes, request language, capture completeness, and sampling differences. Note when two snapshots cannot support a like-for-like conclusion.
2. Compare status/redirect chains, relevant directives and the actual changed content. A changed checksum only flags different bytes: timestamps, dynamic content, or compression-independent variations can be harmless. Equal hashes only establish identical captured bytes, not unchanged indexing or ranking.
3. Link the previous and current evidence to the original finding ID. A newly introduced blocking directive can establish a regression at the captured layer; a missing/partial capture establishes uncertainty, not a fix or disappearance.
4. Preserve old snapshots and reports. Reuse evidence links instead of pasting complete responses into every finding. Maintain necessary current observations in the new report so it remains understandable.
