# Contributing to Raff-SEO-GEO

This repository contains a skill for SEO/GEO audits and improvements based on verifiable guidance. A contribution should help an agent make a better decision without promising rankings, traffic, or AI citations.

## Proposing a rule or correction

- Identify the search engine or service, the site or page types where the rule applies, and cases where it does not.
- Provide a current primary source, ideally a direct link to the relevant rule. Distinguish documented requirements, good practices, context-dependent options, and hypotheses that need measurement.
- Explain the concrete problem the change solves. Do not add a universal threshold or numeric gain without observed data and a measurement method.
- Respect the owner's choices about indexing, crawler access, and training use. Contributing to the skill does not authorize changes to any external website or account.

A popular tactic or third-party tool can suggest a hypothesis, but it is not enough to establish an SEO/GEO benefit. In particular, do not present `llms.txt`, `FAQPage`, or “AI-specific” markup as automatic levers. A genuine visible FAQ or structured data for a currently documented use can still be appropriate for a particular page.

## Where to make changes

- [SKILL.md](skills/raff-seo-geo/SKILL.md): activation, shared method, and essential limits. Keep it concise and in English.
- [Audit checklist](skills/raff-seo-geo/references/audit.md): detailed checks, sources, and options specific to an engine or site type.
- [Reporting guide](skills/raff-seo-geo/references/reporting.md): prior-audit reconciliation, finding IDs, and verification states.
- [Report helper](skills/raff-seo-geo/scripts/save-report.mjs): exclusive Markdown file creation; keep it dependency-free and test collision behavior.
- [README.md](README.md): overview, installation through the existing `npx skills` CLI, and review scenarios. Do not create a custom installer without a demonstrated need.

Add a script or dependency only if repeated behavior calls for deterministic execution; a new audit rule normally does not. If you change the license, keep [LICENSE](LICENSE) consistent with the [copy installed with the skill](skills/raff-seo-geo/LICENSE).

## Checking a contribution

From the repository root, verify that the CLI still discovers exactly one skill named `raff-seo-geo`:

```sh
npx skills add . --list
```

Also check `SKILL.md` against the [Agent Skills specification](https://agentskills.io/specification), check links and the freshness of affected sources, and try a relevant scenario from the [README's “Checks before publication” section](README.md#checks-before-publication) in a safe test project. If you test installation, use Project scope in a temporary directory, not your global installations.

If you change the report helper, run `node --test tests/save-report.test.mjs` and verify that repeat runs do not alter an earlier report.

In your proposal, state which checks you actually ran, their results, and their limits. A local installation does not prove agent behavior on every site, deployment, indexing, or an AI citation. Never include secrets or private data in examples or reports.

The repository is distributed under the [MIT license](LICENSE). Submit only content you have the right to share, and identify material taken from third-party sources.
