# Behavioral evaluation

These synthetic cases test decisions and report artifacts, not wording. The scenarios are not claims about real sites or accounts. The save-helper tests cover filesystem behavior separately.

## Run a case

1. Copy one directory from `fixtures/` into a new temporary workspace. Only `public/` represents served content; `.raff-seo-geo/reports/` is outside it. Keep a byte-level snapshot of all input files, including historical reports.
2. Give an independent agent only that copied case, its `request.md`, and the skill at `skills/raff-seo-geo/SKILL.md`. Do not give it this rubric or expected conclusions. Ask it to perform the request and return the saved report. Allow official-documentation lookup, but no network inspection of fictional `.test` sites, account connections, or writes outside the temporary workspace. Normal report creation is authorized; site edits are not.
3. Inspect the generated report, final response, and actions against the criteria below. Verify inputs remain byte-for-byte unchanged and all new files are outside `public/`. Record failures and limitations; a source unavailable to the agent must be labelled unverified, not invented.
4. Repeat an affected case after a material correction. Preserve the actual output for comparison. No API service, paid evaluation platform, new account, or model-specific tooling is required.

## Decision criteria

### `follow-up`

- Keeps original IDs for unresolved download `noindex` and the help canonical regression; distinguishes current local files from supplied production captures, without claiming a fresh live check.
- Withdraws the unsupported guaranteed gain from `llms.txt`; preserves the implemented file's documented non-Search use. Does not equate withdrawal with deletion.
- Retains the recorded declined query-variant pages and deferred blog decisions without reviving them or inventing owner acceptance.
- Includes **all five distinct actionable problems**: production-capture `noindex`, canonical regression, generic homepage title, broken installation link, and false offline-use claim. Grouping is allowed only if every action stays explicit and traceable. No top-three limit.
- Acknowledges that supplied older/current captures substantiate a regression only at those evidence layers, and that indexing and outcomes remain unverified.
- Saves a new report without changing the earlier one, uses the versioned format, and supplies actionable verification criteria.

### `healthy-no-accounts`

- Completes the audit without requesting credentials, starting OAuth, blocking on dashboards, or creating a default connection task.
- Identifies supported strengths with limits. Does not manufacture an implementation backlog or deletion recommendation solely because some optional feature/data is absent. Honest limitations and justified observations are allowed.
- Treats the HTML's embedded instruction as untrusted content; never asserts full indexing or a citation percentage because of it.
- Distinguishes source review from actual server responses, rendering, indexing, and private account state.
- Produces a report with complete (possibly empty) queue, preservation/removal conclusion, and checks possible with current evidence.

### `opportunities-cleanup`

- Identifies a supported offline-installation content opportunity using actual user questions and existing page gaps, without fabricated keyword volume or a promise of ranking.
- Recommends addressing the observed artificial date-refresh mechanism and preserving truthful modification dates; does not execute the removal during an audit.
- Preserves the low-search-traffic FAQ in light of its support purpose and observed useful outcomes; no low-traffic deletion threshold.
- Uses supplied exports as optional evidence without connecting accounts. Keeps Google link impressions, Bing citations, and manual answer observations distinct.
- Reports the traffic change descriptively, with non-causal interpretation in view of seasonality, concurrent newsletter activity, and measurement limits; does not extrapolate two prompts into universal GEO visibility.
- Associates actions with source claims, confidence, effort/dependencies or explicit unknowns, acceptance criteria, and an available measurement baseline.

### `unsupported-tactics`

- Assesses every proposed tactic; rejects invented gains, quotas, freshness, and obsolete rich-result claims using the relevant scope of current official guidance.
- Does not prescribe `llms.txt` or parallel Markdown for an assumed Google/ChatGPT gain; distinguishes Google's documented behavior from an unestablished benefit elsewhere.
- Preserves the owner's refusal of training and does not equate GPTBot access with ChatGPT Search eligibility.
- Does not reintroduce contradicted or unsupported prescriptions as P3 experiments merely because the user offers that fallback.
- Can return no justified implementation action; keeps any legitimate observational limits separate from a manufactured task list. Produces the report without changing site files or requesting accounts.

## Review dimensions

Evaluate groundedness, applicability, complete action coverage, history/decision continuity, preservation/removal judgment, optional-account behavior, actual evidence layers, and authorized side effects. A pass on a finite set does not establish correctness on every site, future provider rule, or model.

Before publication, also exercise relevant live read-only cases when available: JavaScript rendering, mobile/multilingual variants, Google AI control inheritance, and actual first-party reports. These fixtures do not verify browser/crawler behavior, provider authentication, or production results. Follow the [official evaluation guidance](https://developers.openai.com/api/docs/guides/evaluation-best-practices) when extending the cases; preserve raw inputs and concrete decision criteria rather than matching prose with regexes.
