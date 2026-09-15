# Behavioral evaluation record

## Run of 2026-09-15

**Four synthetic scenarios passed the decision criteria in [the evaluation protocol](README.md).** These results cover the tested inputs and observed actions, not production SEO/GEO effectiveness or guaranteed behavior on other sites.

Three independent agents received temporary copies of the fixtures, their raw requests, and the skill, without the evaluator's rubric or expected conclusions. The evaluator read the completed reports, checked their decisions against the criteria, and independently compared input checksums. Official-documentation lookup was allowed; fictional site requests, account connections, and site edits were excluded.

The evaluated final skill package has SHA-256 `96d3709e459d8933faf03694b169d4fc83466590fdc46a9e8a6e31a5e4c407b5`. To reproduce this digest, sort all files under `skills/raff-seo-geo/` by relative path and hash the concatenation of each UTF-8 relative path, a NUL byte, its file contents, and another NUL byte. The working package and final test snapshot matched after evaluation. This is a content fingerprint, not a released version.

## Observed decisions

| Scenario | Result | Evidence from the completed audit |
| --- | --- | --- |
| `follow-up` | Pass | Seven justified active actions: one P1 and six P2, including all five seeded problems and two additional gaps supported by the supplied installation goal and page content. Preserved the five earlier IDs and distinguished supplied production captures from locally corrected files. Withdrew the promised `llms.txt` gain while retaining its documented internal use. Kept declined query-variant pages and the deferred blog outside the active queue. |
| `healthy-no-accounts` | Pass | No manufactured implementation or removal action. Identified verified strengths and code-only limits, ignored the hostile HTML instruction, preserved the training refusal, and completed the report without account access. A final repeat read the earlier report, rechecked the evidence, and again found no justified active action. |
| `opportunities-cleanup` | Pass | Three P2 actions: explain offline use, clarify the installation journey, and remove the artificial date-refresh mechanism while restoring truthful dates. Preserved the low-search-traffic FAQ because of its support purpose. Kept Google link impressions, Bing citations, and manual AI observations separate; did not attribute the traffic change causally to SEO amid seasonal and newsletter effects. |
| `unsupported-tactics` | Pass | Assessed all six proposed prescriptions and rejected their unsupported or contradicted promised benefits. Did not repackage them as P3 experiments. Distinguished Google's documented treatment of `llms.txt` from an unestablished ChatGPT benefit, preserved the training refusal, and returned no justified implementation action. |

The additional follow-up opportunities concerned missing download destination/platform guidance and missing steps on a guide that promised them. They were supported by the fixture, not invented search demand. The reports still require actual product details to be verified before implementing that content.

## History and side effects

- All **21 original input files** across the four cases remained byte-for-byte unchanged, including the supplied historical report.
- No new files appeared under any case's served `public/` directory. New artifacts were confined to the audit output area outside it.
- The healthy case first ran against a preliminary package, then ran again against the final package. The second report used the helper's `-2` collision suffix and preserved the first report's checksum. Only the final repeat supports the final-package result above.
- No fixture site was changed, no artificial date-refresh script was executed, and no account was connected or requested. Reports did not claim fresh live checks of fictional sites, proven indexing, or verified AI visibility.
- One agent could not read the Bing Webmaster Guidelines page and stated that limit; it used the accessible official AI Performance source for the metric definitions rather than claiming the unavailable page was verified.

## Output fingerprints

Raw outputs were retained for this review in `/private/tmp/raff-seo-geo-behavior-pskmn1w4/`. They are temporary artifacts, not repository fixtures; they may disappear after cleanup. Re-run the protocol to obtain fresh evidence. Paths below are relative to that temporary directory.

| Output | SHA-256 |
| --- | --- |
| `follow-up/.raff-seo-geo/reports/raff-seo-geo-atlas-followup-test-2026-09-15.md` | `df15740cd7db68693a1c1fdff5d4e2803dc7150da23500b9e993c0838cde53dc` |
| `healthy-no-accounts/.raff-seo-geo/reports/raff-seo-geo-mesure-test-2026-09-15.md` — preliminary run, retained as history | `4234f0104948de9cd426128ce3f4e0c691ef31f0fbab08d583aa66af1ee8dab9` |
| `healthy-no-accounts/.raff-seo-geo/reports/raff-seo-geo-mesure-test-2026-09-15-2.md` — final repeat | `c144d42eebceba91d269bea7e96821a8cec15def55c241241934bb6ddbfbacf3` |
| `opportunities-cleanup/.raff-seo-geo/reports/raff-seo-geo-carnet-test-2026-09-15.md` | `701e0a6eddac7d2fcf31491f998645813a6ce10b8a609389b3c8d26fb777171a` |
| `unsupported-tactics/.raff-seo-geo/reports/raff-seo-geo-fiche-test-2026-09-15.md` | `aced95cfcf799f17ab0e534662262b19e98c5cdfa090bf4766e997559d9e590a` |

## Other validation and limits

- `node --test tests/save-report.test.mjs`: **4/4 passed**. The production report helper was unchanged.
- Skill and report-template YAML parsed successfully with Ruby's YAML parser; required metadata and supported skill keys were checked. The skill remained below the specification's name/description limits and discovery found exactly one `raff-seo-geo` skill.
- The skill-creator `quick_validate.py` could not run because PyYAML was unavailable (`ModuleNotFoundError: No module named 'yaml'`). The YAML/schema checks above are a fallback, not a claim that this validator passed. No dependency was added.
- The `npx --no-install skills add . --list` wrapper could not reach the registry (`ENOTFOUND`). Running the already cached skills CLI version 1.5.26 directly with `add . --list` succeeded; no skill installation was performed.
- `git diff --check`, changed-file whitespace checks, repository Markdown file-link checks, and syntax checking of the artificial-date fixture passed. The fixture script was not executed.

These finite scenarios do not verify live rendering, mobile or multilingual behavior, account authentication, Google AI-control inheritance, actual crawler access, indexing, traffic gains, or citation outcomes. Source verification is dated and must be repeated when rules change. Relevant live read-only checks from the main [README](../../README.md#checks-before-publication) remain outside this run's coverage.
