# wf-algolia attribute quick reference

Our own condensed reference for the attribute grammar this fork preserves. The
upstream docs at https://wf-algolia-docs.candidleap.com/ remain valid for this
fork as long as we keep the grammar intact — this file covers the surface The
Starters actually uses, plus fork-specific notes.

## Script tag

```html
<script>
  // Webflow shim — only needed OUTSIDE Webflow (tests, demos)
  window.Webflow = window.Webflow || [];
  window.Webflow.push = (fn) =>
    document.readyState === 'loading' ? addEventListener('DOMContentLoaded', fn) : fn();
</script>
<script
  src="<bundle url>"
  data-app-id="ALGOLIA_APP_ID"
  data-search-key="SEARCH_ONLY_KEY"
  data-debounce="250"
></script>
```

Other script options: `data-insights`, `data-insights-cookie`, `data-autocomplete-debounce`,
`data-highlight-tag`, `data-snippet-words`, `data-snippet-attrs`, `data-activeclass`, `data-hideclass`.

## Structure

| Attribute | Role |
| --- | --- |
| `wf-algolia-element="browse"` | Browse section wrapper (full-page collection) |
| `wf-algolia-element="search-wrapper"` / `"section"` | Federated search: wrapper > direct-child sections (templates MUST be direct children of the section) |
| `wf-algolia-element="results"` | Results container; template card inside |
| `wf-algolia-element="no-results"` | Shown when 0 hits |
| `wf-algolia-index="idx"` / `"a,b"` | Index (or merged list) for the section |
| `wf-algolia-per-page` / `wf-algolia-hits-per-page` | Page size |
| `wf-algolia-base-filter` | Always-on Algolia filter string for the section |

## Card binding (inside templates)

| Attribute | Purpose |
| --- | --- |
| `wf-algolia-text="field"` (or `"a\|b"` fallback) | textContent from hit field, dot paths ok |
| `wf-algolia-html="field"` | Sanitized HTML |
| `wf-algolia-snippet` / `wf-algolia-highlight="true"` | Algolia snippet/highlight variants |
| `wf-algolia-image` / `wf-algolia-alt` | Image src / alt |
| `wf-algolia-link="slug"` + `-prefix` / `-suffix` / `-folder` / `-slugify` / `-url` | Anchor href assembly |
| `wf-algolia-format` | `rating` / `year` / `currency` / `number` / `short-name` (v1.0.5+: `John Paul Dionisio` → `John P. D.`; shared vocabulary with wf-xano + quiz-results.js) |
| `wf-algolia-if="expr"` | Conditional show: truthy field or `===`/`!==`/`>`/`>=`/`<`/`<=` comparison |
| `wf-algolia-display="flex"` | display value used when showing (default `block`) |

Injected clones get class `wf-algolia-injected` and `data-wf-algolia-hit-objectid`.

## Filters

| Attribute | Purpose |
| --- | --- |
| `wf-algolia-element="filter-group"` + `wf-algolia-facet` | Facet group (checkbox/radio/select/range per child markup) |
| `wf-algolia-field` / `wf-algolia-value` / `wf-algolia-operator` | Filter item wiring |
| `wf-algolia-element="filter-tag-wrapper/-template/-text/-remove"` | Active-filter chips |
| `wf-algolia-text-template="{field}: {value}"` | Chip/count label template (`{value}`, `{field}`, `{min}`, `{max}`, `{count}`) |
| `wf-algolia-label="leaf"` | Hierarchical values: render only deepest segment (facet lists AND chips — 1.0.4) |
| `wf-algolia-sort` | On `filter-group`: item order — `natural` (default, DOM order) / `selected-first` / `alpha` / `count` |
| `wf-algolia-limit="N"` + `wf-algolia-element="filter-show-more"` | Collapse the list to N items behind a Show more toggle |
| `wf-algolia-replace-field='{"categories.lvl0":"Categories"}'` | On `filter-tag-wrapper`: relabel `{field}` token (1.0.4) |

### `wf-algolia-sort="selected-first"` (1.0.8)

Ticked items pin to the top of their group; everything else keeps its load-time
order. Applies to checkbox, radio and div/button item markup — not to native
`<select>` groups (`wf-algolia-type="select"` / `select-multiple`).

- **Pins on click**, not when the query returns — including staged clicks in
  `wf-algolia-apply-mode="deferred"` groups (Cancel drops them back).
- **Ticked-first, stable**: the pinned block keeps the list's own relative order,
  never click order; the unticked remainder never re-sorts (no live-count churn).
  Unticking drops an item straight back into its original slot.
- **Re-applied after every list change**: init/URL restore, dynamic facet
  injection, filter-search (SFFV) re-injection, hierarchy child refresh,
  reset/clear-all, staging cancel, filter-tag removal.
- **Show more**: with `wf-algolia-limit="N"`, selected items never fold away and
  count toward N (visible = all selected + unselected up to N total). Groups
  without `selected-first` keep the plain first-N-in-DOM-order behavior.
- **Animated** (~200ms FLIP) when the reorder comes from a click in that group;
  instant everywhere else. Skipped under `prefers-reduced-motion` or in a
  background tab.

## Pagination & sort

`wf-algolia-element="pagination"` (numbered / load-more / infinite-scroll variants),
`wf-algolia-page-num`, `sort-item` + `wf-algolia-sort-index` for replica switching.

## Public API (`window.WfAlgolia`)

Full typed surface: [`public-api.d.ts`](./public-api.d.ts). Highlights:

- `setFilter(field, value)` / `clearFilter` / `clearAllFilters` / `getFilterState()`
- `setQuery` / `getQuery` / `search` / `multiSearch` / `refresh()`
- `on(event, fn)` / `off` — events include `ready`, `refresh`, render lifecycle
- `use({beforeSearch, afterSearch})` — middleware interceptors on every query.
  **Check this before patching the fork for a feature.**
- `getClient()` (raw algoliasearch client), `getInsights()`, `trackClick`, `trackConversion`
- `cloneAndPopulate` / `populateCard` / `getObject` / `destroy`

## Known gotchas (verified in harness)

- Init defers to `window.Webflow.push` — needs the shim outside Webflow.
- Federated `section` templates must be **direct children**; wrapping in a grid div
  silently yields 0 results.
- `mode-btn` toggles the active class only — it does not re-query a single-template browse.
- Comma-merged `wf-algolia-index="a,b"` also fires a spurious (harmless) 400 single-index query.
