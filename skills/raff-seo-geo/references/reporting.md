# Raff-SEO-GEO report and follow-up guide

Use this guide and the [report template](../assets/report-template.md) for any Markdown audit report. A prior recommendation is neither a new finding nor evidence that a fix was implemented. The report is a decision history, not just a list of defects.

## Locate relevant history

Identify the same site by its actual URL and scope, not just a similar filename. Inspect only the selected report folder, any previously used safe `reports/` folder in the audited project, and paths the user supplied. Read relevant reports in date order. If reports may be elsewhere, ask for their location when useful and state exactly which locations were checked; do not claim that no earlier audit exists merely because none was found there. Do not read or include unrelated private project material.

For long histories, a recent complete finding/decision ledger and its linked evidence may avoid rereading every narrative. Verify that it retains earlier open, deferred, declined, and resolved IDs before relying on it; consult older reports where the ledger is incomplete or a decision is unclear. Name the reports actually consulted. Keep historical reports immutable; record corrections and new decisions in the new report.

## Reconcile findings

Assign an ID unique within that site's report history to each new finding (for example, `RSG-001`), never renumber it, and reuse it across later reports for the same affected page and problem. When an older report has no IDs, match by page and specific problem, assign an ID for future tracking, and link the original report; do not assert a match when it is uncertain.

For each earlier finding, check the present state with the strongest evidence available. Record two separate dimensions:

- **Implementation by layer:** observed, not observed, or unknown for each checked layer, with evidence and date. Record local and production states separately when they differ. Identify supplied captures as supplied captures, not your own current live inspection.
- **Problem by layer:** persists, absent, unknown, or no longer applicable. A problem absent locally but present in a supplied production capture is not globally resolved. If current official guidance no longer supports the recommendation, mark it withdrawn or superseded instead of repeating it.

State the checked layer and date. A repository change does not prove deployment; a deployed technical correction does not prove indexing, rankings, AI inclusion, or a causal traffic gain. A claimed correction without observable evidence remains unverified. When a problem persists, carry its original recommendation forward as an open follow-up, not a new recommendation. When the problem is absent, retain the finding in the history with its verification limit and no repeat action. When verification is unavailable, identify the missing access or data and retain the follow-up without claiming success or failure.

Record the **recommendation state** (open, resolved at a stated layer, withdrawn, superseded, or no longer applicable) separately from the **owner's decision** (unrecorded, accepted, deferred, or declined). Preserve the recorded decision, date, reason, and any revisit condition; do not invent approval or interpret silence as acceptance. Deferred and declined items stay visible in the decision history, outside the active queue. Revisit them only when the user asks, a recorded condition is met, or material new evidence changes the tradeoff; explain that evidence without treating it as authorization to implement.

If a previously verified correction has regressed, reopen the original ID and identify the earlier and current evidence. If the earlier report was wrong or unsupported, explicitly correct it under that ID, explaining the bad inference and the replacement conclusion. Do not call an unverified earlier correction a regression. Withdrawing advice does not imply deleting its implementation; apply the separate utility/risk assessment in the [decisions guide](decisions.md).

## Action priorities

Use three levels for the *current work queue*, not as a search-engine score or a prediction of traffic, ranking, or AI citations. Consider the owner's choices, contribution to the stated goal, affected scope, evidence confidence and layer, and cost/risk of acting. Explain the reason in one sentence. Include effort and dependencies when known, or label them unknown; they can order items within a level but do not turn an unverified benefit into P1. No artificial numeric scoring formula is needed.

- **P1 — blocking:** A verified issue at the stated evidence layer prevents an owner-intended important page from working, being accessible to the relevant crawler, or meeting a relevant search eligibility requirement. Examples include an unintended `noindex`, a persistent error response, or a crawler block on an important public page. These are eligibility obstacles, not guarantees of indexing or AI inclusion ([Google technical requirements](https://developers.google.com/search/docs/essentials/technical), [Google AI features](https://developers.google.com/search/docs/appearance/ai-features)). If only code was checked, label the production impact unverified.
- **P2 — important:** A verified or evidence-backed, non-blocking issue materially weakens discovery, useful content, or reader experience on important pages for the stated goal; or a supported opportunity addresses a material unmet need. Explain the affected scope and goal contribution rather than assuming a gain.
- **P3 — conditional:** A lower-scope improvement or a documented option that depends on the site's context. A plausible but unverified hypothesis belongs here as a *measurement step*, not an implementation promise. Omit tactics with no credible benefit rather than assigning them P3.

Keep finding classification (verified error, evidence-backed improvement, context-dependent option, or hypothesis) separate from P-level. Priorities may change on a later audit as scope or evidence changes; preserve the finding ID and record why. Resolved, withdrawn, or no-longer-applicable findings remain in history without an active priority. Missing private dashboard access is a limitation, not automatically a P3 action to connect an account.

List **all detected, justified active actions**, sorted P1, P2, P3, combining open follow-ups, reopened findings, genuinely new findings, opportunities, and justified simplifications. Do not impose a top-three, top-ten, or other numerical cap. A summary may be short; the queue must remain complete for the audited scope. Group repeated manifestations of one cause only if every affected page and distinct corrective action remains traceable. Do not invent actions to fill categories; if the queue is empty, say so.

## Verified strengths

Record a few relevant checks that passed in the *current* audit, not an exhaustive checklist or praise inferred from the absence of a finding. For each strength, identify the page or scope, what was actually observed, the evidence layer (code, live response/rendering, or first-party tool), and the limit. For example, a live page returning HTTP `200` with no `noindex` observed is a technical check passed, not proof of indexing or crawler access. Do not call a page indexed, included in an AI answer, or compliant with every best practice without direct evidence for that exact claim.

Keep this section separate from resolved follow-ups: the latter explain whether an earlier recommendation was implemented and verified. A resolved item may also be a current strength only if it was rechecked in this audit; cross-reference its stable ID rather than presenting it as unrelated praise. If no positive check could be verified, state that and the evidence limit, without implying that the site has no strengths.

## Report shape

Use format version **1** in the template. Keep its stable metadata keys and section purposes; translate the prose/headings to the user's language and adapt detail to scope. Record the installed skill's version or source revision when known; otherwise use `unknown`. Do not mistake the audited site's Git revision for the installed skill's revision. Record the audited revision separately, and note local changes if relevant. Do not invent provenance.

Include:

- **Scope and summary:** goal, audience, engines, date, actual pages/templates and evidence layers, unexamined scope, earlier reports consulted or exact locations checked, and unavailable data. No private dashboard is required for a complete report at the stated scope.
- **Complete action queue:** priority, stable ID, origin, affected scope, short evidence, reason, and next action. Include every justified active action, with no numerical cap.
- **Verified strengths:** positive observations and what to preserve, with evidence and limits. Keep resolved history distinct unless rechecked.
- **Changes and decisions:** previous report link, per-layer implementation/problem state, recommendation state, owner decision and reason, regression/correction information, and any justified revisit condition. Account for prior IDs even when they have no active priority.
- **Finding details:** for each actionable ID, supply the evidence chain from the decisions guide, goal contribution, classification, confidence and limits, effort/dependencies, proposed action, and implementation verification criterion. Distinguish follow-ups from genuinely new findings; link shared source records instead of duplicating them.
- **Keep, simplify, or remove:** assess candidates, other uses, cost, loss risk, disposition, and prerequisites. Link active changes to their queue IDs; state when no removal is justified. A preservation decision need not become a task.
- **Measurement and verification:** use available baselines, sources, periods, deployment dates, comparable follow-ups, confounders, and useful outcomes. Separate implementation success from outcome evidence. Keep engine-specific metrics distinct. Without private data, state which outcomes are unmeasured and use observable code/public-site criteria; do not block the audit or prescribe account connections by default.
- **Checks and sources:** what actually ran, results and failures, data provenance/dates, primary-source URLs and precise supported claims with consultation dates, and remaining limits. If no finding was verified, state it explicitly.

Before saving, reconcile all actionable details with the queue so no justified action is omitted. Ensure prior decisions and IDs are retained, template placeholders are replaced or marked unknown/not applicable, and every claimed verification corresponds to evidence actually inspected. The save helper validates none of these semantics.

## Save without replacing history

The agent decides whether the requested directory is writable and outside publicly served content; the helper only writes. Keep the same site slug on repeat audits. Pass the complete Markdown to the helper on standard input, with the audited project's safe absolute directory and the audit date. For example, if a finished draft already exists at a safe path:

```sh
node "/path/to/installed/raff-seo-geo/scripts/save-report.mjs" \
  --directory "/path/to/audited-project/.raff-seo-geo/reports" \
  --site example-com --date 2026-09-15 \
  < "/path/to/finished-draft.md"
```

The helper prints the absolute path it actually created. Its default filename is `raff-seo-geo-<site>-YYYY-MM-DD.md`; repeat runs on that date use `-2`, `-3`, and so on. For a user-specified exact Markdown filename, use `--output <absolute-report-path>` instead of `--directory`, `--site`, and `--date`. If that exact path already exists, the helper refuses to replace it; ask the user for a different path or provide the report in the response. Do not commit or publish the report unless explicitly requested.
