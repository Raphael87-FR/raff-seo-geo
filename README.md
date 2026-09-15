# Raff-SEO-GEO

An agent skill for auditing and improving website visibility in traditional search and AI-assisted search experiences. It favors official, verifiable guidance and makes no promises about rankings, citations, or numeric gains. The skill instructions are in [skills/raff-seo-geo/SKILL.md](skills/raff-seo-geo/SKILL.md).

It does not add `llms.txt`, `FAQPage`, or “AI-specific” markup by default: [Google does not use `llms.txt` for Search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), and [Google retired the FAQ rich result in May 2026](https://developers.google.com/search/updates#faq-deprecation). Structured data remains an option for a currently documented use and accurate page information; it does not promise a ranking or citation.

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

On a repeat audit, the skill must consult relevant earlier reports for the same site, compare their findings with current evidence, and separate open follow-ups from genuinely new recommendations. Each finding keeps a stable ID. The report records both the observed implementation layer (local, live, or unknown) and whether the original problem persists; a local fix is not proof of deployment, indexing, or AI visibility. A single action queue sorts all open follow-ups and new findings by **P1 (blocking), P2 (important), P3 (conditional)**, with a reason for each priority. These are site-specific work priorities, not a GEO score or promised gain; resolved and unsupported tactics do not enter the queue. A separate **Verified strengths** section lists relevant good practices observed in the current audit, with page, evidence layer, and limits; it does not turn a technical pass into an indexing or AI-visibility claim. The [reporting guide](skills/raff-seo-geo/references/reporting.md) defines this follow-up and prioritization. An audit-only request may create a report but does not authorize changes to site code, content, or external settings. If no safe, writable location or exclusive-create mechanism is available, the agent should provide the complete Markdown in its response and say that no file was saved.

## Keeping guidance reliable

SEO rules and AI features change. Before applying a recommendation, the skill calls for checking current provider documentation and separating verified findings, hypotheses, and observed outcomes. The [audit checklist](skills/raff-seo-geo/references/audit.md) links to relevant official sources.

The [MIT license](LICENSE) covers the repository; a copy is also included in the skill folder so installations retain the license notice.

To suggest an improvement or correct a rule, see [CONTRIBUTING.md](CONTRIBUTING.md).
To report a vulnerability, see [SECURITY.md](SECURITY.md).

## Checks before publication

Check the format against the [Agent Skills specification](https://agentskills.io/specification), then verify local discovery with `npx skills add . --list`. To review the skill's decisions, try at least these requests on a safe test site and inspect the answers and any changes:

- A page is indexed, but Google's **Search generative AI** control is set to “Exclude”: the skill should identify the exclusion without changing it or promising AI visibility.
- A GEO audit with access to Google and Bing reports: it should distinguish Google link impressions, Bing citations, missing data, and lack of causal evidence.
- A request to add `llms.txt`, `FAQPage`, and “AI” schemas everywhere: it should reject unsupported tactics while allowing a useful visible FAQ or relevant, documented structured data.
- A public URL with mobile and multilingual versions: it should inspect the live site read-only, check useful parity, and review `hreflang` only when variants exist.
- An audit in a writable test project: it should save a Markdown report outside public assets, link to it in the response, leave site files unchanged, and avoid overwriting an existing report on a repeat run.
- A repeat audit after a recommendation was implemented locally but not deployed: it should reuse the original finding ID, show the local and live states separately, and avoid presenting the follow-up as a new recommendation.
- A repeat audit with an unintended `noindex` on a key public page, a documented content improvement, and an optional enhancement: the action queue should distinguish P1, P2, and P3, combine old and new items, and leave resolved history out of the active queue.
- An audit with a correctly served important page and one previously resolved finding: it should list current positive checks under Verified strengths with their evidence limits, and keep the earlier correction in follow-up history rather than treating it as a new issue.

The report helper has dependency-free tests. Run `node --test tests/save-report.test.mjs` from the repository root to check repeat-run naming and refusal to replace an exact output path.

These scenarios are review criteria, not a guarantee of agent behavior without actual testing. A local installation can verify the package; a GitHub installation requires the repository to be accessible.
