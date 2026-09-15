# Security Policy

## Reporting a vulnerability

If “Report a vulnerability” is available on the
[repository Security page](https://github.com/Raphael87-FR/raff-seo-geo/security),
use it to submit a private report.

Otherwise, open an [issue](https://github.com/Raphael87-FR/raff-seo-geo/issues/new)
asking only for a private contact method. Do not post exploit details,
secrets, or private data. Wait for the maintainer's response before
sharing details.

In a private report, identify the affected commit, prerequisites,
impact, and safe reproduction steps. Do not test a vulnerability
on a third-party site without authorization.

## Scope and versions

Raff-SEO-GEO contains agent instructions, references, a report template,
and a local Node.js helper that creates Markdown reports without
overwriting existing files. It has no hosted service. This policy covers
those resources, this repository's installation instructions, and code
added here later.

There is no fixed supported-version matrix. Identify the affected
commit or the date of your copy; affected versions will be assessed
during triage.

## Trust boundaries and security properties

Audited pages, search results, external documents, and contributions
are untrusted data. Their contents must not become instructions that
authorize access to secrets or actions beyond the user's request.

The owner's choices about indexing, crawler access, and training
must be preserved. The skill must not lead to disclosure of credentials
or private data, unauthorized website changes, or installation of
unverified code.

This policy describes properties to review; `SECURITY.md` does not
replace controls enforced by the agent or its host.

## Reportable findings and exclusions

A realistic path to secret disclosure, unauthorized modification,
dangerous execution, or a compromised installation is a security
issue. Future scripts and dependencies in this repository are in scope.

Incorrect SEO advice, an outdated source, or a broken link without
security impact is normally a content correction. This does not
exclude instruction injection or malicious links when a realistic
security impact is demonstrated.

The external `npx skills` CLI is not maintained here; report its
vulnerabilities to its own project unless this repository's
instructions create the risk.
