# Raff-SEO-GEO report and follow-up guide

Use this guide for any Markdown audit report, especially a repeat audit. A prior recommendation is neither a new finding nor evidence that a fix was implemented.

## Locate relevant history

Identify the same site by its actual URL and scope, not just a similar filename. Inspect only the selected report folder, any previously used safe `reports/` folder in the audited project, and paths the user supplied. Read relevant reports in date order. If reports may be elsewhere, ask for their location when useful and state exactly which locations were checked; do not claim that no earlier audit exists merely because none was found there. Do not read or include unrelated private project material.

## Reconcile findings

Assign an ID unique within that site's report history to each new finding (for example, `RSG-001`), never renumber it, and reuse it across later reports for the same affected page and problem. When an older report has no IDs, match by page and specific problem, assign an ID for future tracking, and link the original report; do not assert a match when it is uncertain.

For each earlier finding, check the present state with the strongest evidence available. Record two separate dimensions:

- **Implementation:** not found, observed in the local workspace, observed on the live site, or unknown.
- **Problem:** persists, absent at the stated verification layer, unknown, or no longer applicable. If current official guidance no longer supports the recommendation, mark it withdrawn or superseded instead of repeating it.

State the checked layer and date. A repository change does not prove deployment; a deployed technical correction does not prove indexing, rankings, AI inclusion, or a causal traffic gain. A claimed correction without observable evidence remains unverified. When a problem persists, carry its original recommendation forward as an open follow-up, not a new recommendation. When the problem is absent, retain the finding in the history with its verification limit and no repeat action. When verification is unavailable, identify the missing access or data and retain the follow-up without claiming success or failure.

## Action priorities

Use three levels for the *current work queue*, not as a search-engine score or a prediction of traffic, ranking, or AI citations. First consider the owner's indexing and content-use choices, the importance of affected pages to the stated goal, the observed obstacle, its scope, and the strength and layer of the evidence. Explain the reason in one sentence. Implementation effort and dependencies can order items within a level, but do not turn an unverified benefit into P1.

- **P1 — blocking:** A verified issue at the stated evidence layer prevents an owner-intended important page from working, being accessible to the relevant crawler, or meeting a relevant search eligibility requirement. Examples include an unintended `noindex`, a persistent error response, or a crawler block on an important public page. These are eligibility obstacles, not guarantees of indexing or AI inclusion ([Google technical requirements](https://developers.google.com/search/docs/essentials/technical), [Google AI features](https://developers.google.com/search/docs/appearance/ai-features)). If only code was checked, label the production impact unverified.
- **P2 — important:** A verified or evidence-backed, non-blocking issue materially weakens discovery, useful content, or reader experience on important pages for the stated goal. Address it after blockers; explain the affected scope rather than assuming a gain.
- **P3 — conditional:** A lower-scope improvement or a documented option that depends on the site's context. A plausible but unverified hypothesis belongs here as a *measurement step*, not an implementation promise. Omit tactics with no credible benefit rather than assigning them P3.

Keep finding classification (verified error, evidence-backed improvement, context-dependent option, or hypothesis) separate from P-level. Priorities may change on a later audit as scope or evidence changes; preserve the finding ID and record why. Resolved, withdrawn, or no-longer-applicable findings remain in history without an active priority. If there is no actionable finding, say so instead of filling the queue.

## Verified strengths

Record a few relevant checks that passed in the *current* audit, not an exhaustive checklist or praise inferred from the absence of a finding. For each strength, identify the page or scope, what was actually observed, the evidence layer (code, live response/rendering, or first-party tool), and the limit. For example, a live page returning HTTP `200` with no `noindex` observed is a technical check passed, not proof of indexing or crawler access. Do not call a page indexed, included in an AI answer, or compliant with every best practice without direct evidence for that exact claim.

Keep this section separate from resolved follow-ups: the latter explain whether an earlier recommendation was implemented and verified. A resolved item may also be a current strength only if it was rechecked in this audit; cross-reference its stable ID rather than presenting it as unrelated praise. If no positive check could be verified, state that and the evidence limit, without implying that the site has no strengths.

## Report shape

Include scope, audit date, audited pages and engines, evidence layers, earlier reports consulted (or exact locations checked), and unavailable access. Put a single actionable queue near the start, sorted P1, P2, P3 across open follow-ups and new findings: priority, finding ID, origin, affected page, short current evidence, reason for priority, and next action. Follow it with **Verified strengths**: page or scope, positive observation, evidence layer, and limit. Then keep a concise follow-up table or equivalent for prior findings: ID, prior recommendation and report link, current evidence and layer, implementation state, problem state, current priority if still actionable, and next action. Put genuinely new findings in a separate detail section with priority, evidence, affected page, classification, primary source, correction, and limits required by `SKILL.md`. End with checks performed, measurement options, and what must still be verified after deployment. If no finding was verified, say so explicitly.

## Save without replacing history

The agent decides whether the requested directory is writable and outside publicly served content; the helper only writes. Keep the same site slug on repeat audits. Pass the complete Markdown to the helper on standard input, with the audited project's safe absolute directory and the audit date. For example, if a finished draft already exists at a safe path:

```sh
node "/path/to/installed/raff-seo-geo/scripts/save-report.mjs" \
  --directory "/path/to/audited-project/.raff-seo-geo/reports" \
  --site example-com --date 2026-09-15 \
  < "/path/to/finished-draft.md"
```

The helper prints the absolute path it actually created. Its default filename is `raff-seo-geo-<site>-YYYY-MM-DD.md`; repeat runs on that date use `-2`, `-3`, and so on. For a user-specified exact Markdown filename, use `--output <absolute-report-path>` instead of `--directory`, `--site`, and `--date`. If that exact path already exists, the helper refuses to replace it; ask the user for a different path or provide the report in the response. Do not commit or publish the report unless explicitly requested.
