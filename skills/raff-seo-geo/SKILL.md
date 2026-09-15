---
name: raff-seo-geo
description: Audit, diagnose, or improve a website's SEO and visibility in AI-assisted search (GEO). Use for indexing, content, technical signals, and measurement; not to promise rankings or citations or apply unsupported GEO tactics.
license: MIT
---

# Raff-SEO-GEO

Here, GEO means potential visibility in AI-assisted search experiences, not a guaranteed citation. Start with SEO fundamentals and the relevant search engine's official guidance. Google's AI features require no special file or markup ([Google guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)). For Bing/Copilot, discovery, indexing, and content quality remain foundational ([Bing guidelines](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a)).

## Before making recommendations

- Identify the site, important pages, language, audience, target search engine, and measurable goal. Inspect the code and, when a public URL is provided and accessible, inspect HTTP responses and the live rendered page read-only. Otherwise, explicitly label the review “code-only”; distinguish these states in the report.
- For guidance that may have changed (rich-result features, crawler rules, AI measurement, APIs), check current official documentation before acting. A study or third-party tool may inspire a hypothesis, but does not establish a guaranteed benefit for this site.
- Classify each observation as a verified error, evidence-backed improvement, context-dependent option, or hypothesis to measure. Give the evidence, affected URL/page, and verification limit. Do not invent search volume, rank, traffic, citation rate, or performance.
- Preserve the owner's intent about indexing, crawler access, and use of their content. Do not automatically open access to search or training crawlers, or alter a third-party site.

## Audit and changes

Read the [audit checklist](references/audit.md) when auditing, planning, or modifying a site. Prioritize obstacles to accessing important pages, then content quality and clarity, then enhancements that genuinely apply. Adapt checks to the site's scale and technology; the checklist is not a mandate to add every feature.

If the user asks only for an audit or diagnosis, create the Markdown report described below without changing the site's code, content, or external settings. If they request site changes, preserve existing work, explain important product choices, and run relevant project checks. Do not equate local validation with deployment, indexing, or appearance in an AI answer.

## Important limits

- Do not recommend `llms.txt`, parallel Markdown, artificial “chunking,” or content rewritten for AI as default SEO/GEO tactics: [Google says it does not use `llms.txt` and these tactics for Search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide). A file requested for another documented purpose is a separate matter.
- Do not add `FAQPage` in pursuit of a Google rich result: [Google retired the feature in May 2026](https://developers.google.com/search/updates#faq-deprecation). A real, visible FAQ can still help readers; it does not demonstrate an AI citation bonus.
- Do not add structured data reflexively. Consider only a currently documented use by the relevant engine, consistent with accurate on-page information. Distinguish [supported rich-result types](https://developers.google.com/search/docs/appearance/structured-data/search-gallery) from other documented uses, such as [`Organization`](https://developers.google.com/search/docs/appearance/structured-data/organization); neither valid markup nor a documented use guarantees display or ranking.
- Do not confuse OpenAI crawlers: `OAI-SearchBot` is for ChatGPT Search, `GPTBot` is for training, and `ChatGPT-User` supports some user-requested actions. Access to each is a distinct choice; none guarantees a citation ([OpenAI documentation](https://developers.openai.com/api/docs/bots)). Do not assume equivalent rules for another provider without its current documentation.
- Reject unfounded universal thresholds (word counts, fixed title or description lengths, update frequency, “GEO score,” backlink counts, magic load times) and unverified gain percentages. Google does not use `meta keywords` ([Google SEO guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)).

## Reporting

For every audit or diagnosis, save a Markdown report in the audited project's writable workspace unless the user requests a different format or no file. Use the user's output path when provided; otherwise, choose a folder outside publicly served content (use `reports/` at the project root only if it is not published) and a safe, dated, site-specific filename. Never overwrite an existing report; choose a distinct filename instead. Do not include credentials or unrelated private data, and do not commit or publish the report without an explicit request. If there is no writable workspace or safe location, ask for a destination when useful, then provide the complete Markdown in the response and clearly state whether a file was saved.

The report must identify scope, audit date, important pages and engines, and whether evidence came from code, a live URL, or first-party tools. Present findings in order of likely impact, with classification, affected page, evidence, primary source, recommended or applied correction, and verification limits. Include checks performed, unavailable data, measurement options, and what remains to verify on the deployed site; say explicitly when no finding was verified. For measurement, favor first-party Search Console and Bing Webmaster Tools data when the user has access; name the metric and limits of each AI report. Do not treat a `site:` query as exhaustive proof of indexing. Link to the saved report in the response and summarize the most important findings.
