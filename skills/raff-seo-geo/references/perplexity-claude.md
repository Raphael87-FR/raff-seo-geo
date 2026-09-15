# Perplexity and Claude

Read only when these providers are in scope. Recheck the official sources below before a consequential recommendation; the notes were verified on **2026-09-15**. They document access mechanisms, not ranking weights or guaranteed citations. Apply the shared evidence, owner-choice, and optional-account rules.

## Perplexity

| Agent | Documented purpose | Audit consequence |
| --- | --- | --- |
| `PerplexityBot` | Search discovery and links; not foundation-model training | Inspect its applicable robots rules independently of training choices. |
| `Perplexity-User` | Retrieval initiated by a user | Keep this separate from automatic search crawling; see the documentation conflict below. |

[Crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers) publishes separate IP lists and recommends checking both IP and user agent when configuring network access. Use current provider verification information for supplied logs; a matching name alone proves nothing.

[Perplexity's robots help page](https://www.perplexity.ai/help-center/en/articles/10354969-how-does-perplexity-follow-robots-txt) says disallowing PerplexityBot prevents indexing the full/partial text, but a domain, headline, and brief factual summary may remain. Do not equate blocking that bot with total disappearance.

**Unresolved source discrepancy on 2026-09-15:** the crawler documentation says user-requested fetching generally ignores robots.txt; the help page, updated September 14, says the previous ability to summarize blocked URLs was disabled. Report the conflicting claims with their dates if material. Do not declare that `Perplexity-User` always bypasses or always obeys robots.txt, infer a private setting, or recommend opening access on that assumption. Continue the independently supported PerplexityBot checks.

## Claude

[Anthropic's crawler documentation](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler) distinguishes:

| Agent | Documented purpose | Audit consequence |
| --- | --- | --- |
| `ClaudeBot` | Content potentially used for model training | Preserve the owner's training preference; do not require this for search. |
| `Claude-SearchBot` | Indexing and relevance of search results | Assess applicable rules when Claude search visibility is an owner goal. |
| `Claude-User` | Fetching requested by Claude users | Assess separately when user-directed access matters. |

Anthropic documents robots.txt controls for these agents, including per-subdomain configuration, and links its current IP information for identity checks. A training opt-out does not itself establish a search opt-out. Do not replace these documented distinctions with an unsupported claim that registering in a particular third-party search index is mandatory.

## Review and reporting

- Compare the owner's intention with **effective applicable rules**, including generic/specific groups and relevant paths. Record unknowns if no reliable parser or exact interpretation is available. Mentioned agent names alone do not show allowed/blocked status.
- Inspect accessible HTTP responses and supplied CDN/log evidence. A fetch by the auditor, even with a copied user agent, is not a verified visit by either provider. Never weaken WAF rules or alter training choices during an audit.
- If the user supplies actual answers or an already available service can be used within scope, record product, query, date, locale, session context, source URL, and whether it is a mention or linked citation. Otherwise leave actual visibility unknown and finish the audit. No sign-in, subscription, API purchase, or fabricated provider dashboard is required.
- No provider-specific recipe for FAQ schema, PDF publication, word quotas, regular date changes, or citation percentages follows from these access documents. Recommend content for demonstrated user needs; do not invent algorithm weights.
