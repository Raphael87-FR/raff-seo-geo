# Raff-SEO-GEO

An agent skill for auditing and improving website visibility in traditional search and AI-assisted search experiences (SEO + GEO, not paid search/SEA). It favors official, verifiable guidance and makes no promises about rankings, citations, or numeric gains. The skill instructions are in [skills/raff-seo-geo/SKILL.md](skills/raff-seo-geo/SKILL.md).

It helps decide what to preserve, improve, measure, simplify, or remove. The [evidence and decisions guide](skills/raff-seo-geo/references/decisions.md) distinguishes unsupported tactics from context-dependent uses: for example, lack of a Google Search benefit does not make a useful FAQ or another service's documentation index disposable.

The audit works with the repository, accessible public pages, and previous reports. Search Console, Bing Webmaster Tools, analytics, and supplied exports are optional enrichment. Missing accounts do not block the report or trigger login/OAuth requests; conclusions that require unavailable data remain unverified.

## Installation

From the target project, use the [existing `skills` CLI](https://github.com/vercel-labs/skills/blob/main/README.md), just as you would for other skills:

```sh
npx skills add https://github.com/Raphael87-FR/raff-seo-geo --skill raff-seo-geo
```

In an interactive terminal, without `-y`, the CLI may prompt you to choose an agent; if it detects only one, it may select that agent automatically. It may then ask you to choose **Project** (the current directory) or **Global** (all your projects), if the selected agent supports that scope. Project is the initial selection. If the CLI detects an agent and runs non-interactively, check its summary before assuming which scope was selected. This repository has no custom installer. To select an agent or scope explicitly:

```sh
npx skills add https://github.com/Raphael87-FR/raff-seo-geo --skill raff-seo-geo --agent codex
npx skills add https://github.com/Raphael87-FR/raff-seo-geo --skill raff-seo-geo --agent codex --global
```

Replace `codex` with another [supported agent ID](https://github.com/vercel-labs/skills/blob/main/README.md#supported-agents), such as `claude-code` or `cursor`. You can run the global command from any directory; for Project, make sure you are in the intended project. Do not use `-y` if you want to keep interactive choices and confirmations. The CLI requires Node.js and `npx`; on first use, it may download its package and the skill. Check the CLI summary for the agent and scope actually selected.

To inspect this local repository without installing the skill, run from its root:

```sh
npx skills add . --list
```

## Markdown audit reports

For each audit or diagnosis, the skill asks the agent to save a Markdown report in the audited project's workspace. Its preferred location is `.raff-seo-geo/reports/` at the project root, but only after confirming that the folder is outside published content; you can request another path or no file. The [no-overwrite helper](skills/raff-seo-geo/scripts/save-report.mjs) uses Node.js without third-party dependencies to create `raff-seo-geo-<site>-YYYY-MM-DD.md`, adding `-2`, `-3`, and so on for same-day repeats. It refuses to replace a user-specified exact filename that already exists. The helper does not decide whether a path is private or whether a recommendation was implemented. Existing reports must not be committed or published automatically.

Reports use a [compact](skills/raff-seo-geo/assets/compact-report-template.md) or [detailed](skills/raff-seo-geo/assets/report-template.md) versioned Markdown template and the [reporting guide](skills/raff-seo-geo/references/reporting.md). Both retain the same metadata, complete action coverage, evidence and history; choose presentation depth according to complexity. A healthy small site should not produce pages of repeated caveats.

- **Complete action queue:** every detected, justified active action, sorted **P1 (blocking), P2 (important), P3 (conditional)**, with evidence and reasons. There is no top-three or other numerical cap. These are work priorities, not a GEO score or promised gain.
- **Verified strengths:** practices positively observed in the current audit and worth preserving, with evidence layers and limits.
- **Decision history:** stable finding IDs, local/production distinctions, regressions, corrections of earlier advice, and the owner's accepted, deferred, or declined decisions. Inactive decisions remain visible outside the active queue.
- **Finding details and opportunities:** the observation, applicable source claim, reasoning, goal contribution, confidence, effort/dependencies, and a verification criterion.
- **Keep, simplify, or remove:** assess actual uses, costs, and loss risks; withdrawing an old recommendation does not automatically justify deleting its implementation. Low traffic or missing statistics alone do not justify deleting a page.
- **Measurement:** available baselines, comparable periods, implementation checks, and outcome limits. Missing private data does not prevent a complete audit at the stated scope.

A local fix is not proof of deployment, indexing, or AI visibility; supplied captures are not fresh live inspections. A healthy site may need no changes. An audit-only request may create a report but does not authorize changes to site code, content, or external settings. If no safe, writable location or exclusive-create mechanism is available, the agent provides the complete Markdown in its response and says that no file was saved.

## Evidence, visitor needs, and provider coverage

- **Reproducible observations:** the [collection guide](skills/raff-seo-geo/references/collection.md) covers local code, HTTP responses, rendered pages and supplied captures. The optional [HTTP collector](skills/raff-seo-geo/scripts/collect-evidence.mjs) uses Node.js 22+ without dependencies to save dated manifests, selected headers, response bodies and checksums outside served content. It records errors and partial captures, preserves old snapshots, and follows only bounded same-origin redirects. It does not render pages or score performance/indexing.
- **Intent research:** the [need-to-page method](skills/raff-seo-geo/references/intent-research.md) connects actual or explicitly inferred visitor needs to existing coverage, gaps and justified actions. It works without keyword accounts, checks language/market, and avoids duplicate pages for phrasing variants.
- **Perplexity and Claude:** a [conditional provider guide](skills/raff-seo-geo/references/perplexity-claude.md) complements Google, Bing and ChatGPT coverage. It distinguishes documented search, user-retrieval and training roles and exposes source discrepancies rather than inventing a rule or benefit.

## Keeping guidance reliable

SEO rules and AI features change. Before applying a recommendation, the skill calls for checking current provider documentation and recording the precise supported claim, applicability, and consultation date. It distinguishes contradicted claims, unestablished benefits, and inapplicable tactics, and permits bounded, measurable hypotheses with a credible rationale. The [audit checklist](skills/raff-seo-geo/references/audit.md) covers access, content, credibility, opportunities, conditional investigations, and measurement with relevant primary sources.

The [MIT license](LICENSE) covers the repository; a copy is also included in the skill folder so installations retain the license notice.

To suggest an improvement or correct a rule, see [CONTRIBUTING.md](CONTRIBUTING.md).
To report a vulnerability, see [SECURITY.md](SECURITY.md).

## Checks before publication

Check the format against the [Agent Skills specification](https://agentskills.io/specification), then verify local discovery with `npx skills add . --list`. Use the [behavioral evaluation fixtures and rubric](tests/behavior/README.md) to test report history, completeness beyond three actions, unsupported advice, removal judgment, opportunities, and audits without private accounts. These tests inspect decisions and actual artifacts, not exact generated wording.

Also try applicable integration scenarios on a safe test site:

- A page is indexed, but Google's **Search generative AI** control is set to “Exclude”: the skill should identify the exclusion without changing it or promising AI visibility.
- A GEO audit with access to Google and Bing reports: it should distinguish Google link impressions, Bing citations, missing data, and lack of causal evidence.
- A request to add `llms.txt`, `FAQPage`, and “AI” schemas everywhere: it should reject unsupported tactics while allowing a useful visible FAQ or relevant, documented structured data.
- A public URL with mobile and multilingual versions: it should inspect the live site read-only, check useful parity, and review `hreflang` only when variants exist.
- An audit in a writable test project: it should save a Markdown report outside public assets, link to it in the response, leave site files unchanged, and avoid overwriting an existing report on a repeat run.
- A repeat audit after a recommendation was implemented locally but not deployed: it should reuse the original finding ID, show the local and live states separately, and avoid presenting the follow-up as a new recommendation.
- A repeat audit with an unintended `noindex` on a key public page, a documented content improvement, and an optional enhancement: the action queue should distinguish P1, P2, and P3, combine old and new items, and leave resolved history out of the active queue.
- An audit with a correctly served important page and one previously resolved finding: it should list current positive checks under Verified strengths with their evidence limits, and keep the earlier correction in follow-up history rather than treating it as a new issue.

Both helpers have dependency-free tests. Run `node --test tests/*.test.mjs` with Node.js 22+ from the repository root. Report tests check exclusive saving; collection tests use ephemeral loopback HTTP servers to verify real responses, redirects, partial captures, failures and preservation, without external accounts or production requests.

The [behavioral evaluation record](tests/behavior/RESULTS.md) states what has actually been exercised and its limits. Finite fixtures and review criteria do not guarantee agent behavior on every site. A local installation can verify the package; a GitHub installation requires the repository to be accessible.
