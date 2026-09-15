# Evidence and decisions

Use this guide when recommending a change, experiment, preservation, or removal. A relevant link alone does not establish that the proposed action benefits this site.

## Evidence for a recommendation

For each material finding, connect:

1. **Observation:** affected URL or component, concrete evidence, collection date, and layer (code, live response/rendering, first-party tool, or supplied capture). Separate observed facts from interpretation; record conflicting layers instead of choosing the convenient one.
2. **Applicable guidance:** provider and feature, the precise claim supported by a primary source, its URL and consultation date, and relevant conditions. Recheck rules that can change. Do not say a source was checked if only a search snippet or an old report was available.
3. **Reasoning:** why that guidance or observed user need applies to this page and stated goal. Provider documentation establishes requirements and supported behavior; it does not demonstrate this site's future traffic gain. An editorial opportunity may be grounded in first-party questions or observations without a provider promising a ranking benefit.
4. **Decision:** preserve, correct, improve, measure, simplify, merge, or remove; evidence confidence and limits; dependencies, effort when estimable, and an observable verification criterion. Mark unknown effort rather than inventing precision.

Classify actionable findings as a verified error, evidence-backed improvement, context-dependent option, or hypothesis to measure. Keep classification distinct from work priority. If a tactic is disputed, distinguish **contradicted for the named use**, **benefit not established**, and **not applicable here**. Do not call all three a myth. If current primary documentation cannot be checked, label the rule unverified and avoid definitive recommendations that depend on it; continue independent checks.

Third-party studies and tools can suggest hypotheses. Check their methodology and applicability before proposing a bounded experiment: identify the question, baseline, change, metric, comparison conditions, observation period appropriate to data volume, confounders, and stop/revert criterion. Do not introduce an implementation task for a claim with no credible rationale, or repackage a tactic contradicted for the intended use as a P3 experiment. An inconclusive result remains inconclusive, not proof of effectiveness or ineffectiveness.

## Common claims: keep the scope of the evidence

These are source pointers, not permanently fresh conclusions. Consult the relevant source when the claim affects a decision; record that consultation in the report.

- **Special AI files and writing formats:** do not default to `llms.txt`, parallel Markdown, artificial chunking, or rewrites just for AI. [Google's AI guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) says Google Search ignores `llms.txt` and does not require those tactics. This is not a rule about every service. A documented non-Search consumer can justify retaining such a file.
- **FAQ and other structured data:** [Google retired the FAQ rich result in May 2026](https://developers.google.com/search/updates#faq-deprecation). That does not make a useful visible FAQ disposable. Add structured data only for an applicable, documented use with accurate page information: [rich-result gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery), [policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), and [Organization](https://developers.google.com/search/docs/appearance/structured-data/organization). Valid markup or eligibility does not guarantee display or ranking.
- **Search versus training:** [OpenAI's crawler documentation](https://developers.openai.com/api/docs/bots) distinguishes `OAI-SearchBot` (Search), `GPTBot` (training), and `ChatGPT-User` (some user-initiated actions, to which robots.txt rules may not apply). Do not require training access for Search. Check other providers independently and preserve owner choices.
- **Universal scores and quotas:** reject invented word counts, fixed title/description lengths, update frequency, backlink quotas, “GEO scores”, magic load times, and gain percentages. Google's [SEO guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) states it does not use `meta keywords`; its [helpful-content guide](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) rejects preferred word counts and artificial freshness. Documented diagnostic thresholds, such as [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals), can be useful in their stated context; they are not promises of traffic or citations.

## Keep, simplify, or remove

Assess existing tactics and maintenance burdens as well as missing features. Include this decision section in every audit; “no justified removal found” is valid. Do not generate a removal quota.

For each candidate, record:

- current user, product, search-engine, or other documented consumer need;
- observed benefit, or precisely what evidence is missing;
- maintenance, duplication, performance, or complexity cost actually observed;
- dependencies and loss risk (useful information, integrations, traffic, conversions, inbound/internal links, accessibility, or obligations where known);
- recommended disposition, reason, confidence, prerequisites, and how to verify or reverse it when feasible.

Investigate artificial freshness mechanisms, redundant content pipelines, near-duplicate pages, and obsolete markup when observed. Do not infer they exist. Lack of a ranking benefit alone is insufficient to remove something useful to visitors or another service.

Before recommending deletion or consolidation of a page, examine its purpose, accuracy, unique information, available impressions/visits/conversions over a representative period, seasonality, and known links or dependencies. Missing analytics, zero clicks, age, short length, or overlapping keywords alone do not establish that a page is useless. Consider preservation or a targeted update first; propose a merge only when the combined destination still serves the relevant needs. Explain the URL handling and link updates needed if a removal or merge is justified, using [Google's redirect guidance](https://developers.google.com/search/docs/crawling-indexing/301-redirects) for relevant replacements; do not redirect unrelated removed pages to the homepage by default.

Keep **withdrawal of an old recommendation** separate from **removal of its implementation**. First acknowledge and correct the unsupported advice; then independently assess whether the implemented element has another use and whether removal is worth its cost and risk. An audit recommendation does not authorize deletion.
