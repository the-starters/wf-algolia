# wf-algolia 1.0.4 — Reconstructed Module Tree

`src/app.carved.js` (5,861 lines, 273 top-level statements, 343 symbols) has been
physically split into 42 real ES modules per `docs/MODULE-MAP.md`. Pure move-and-wire:
statement text is verbatim from the carved file; only `export` keywords and `import`
declarations were added. Entry: `src/index.js` (side-effect IIFE-style entry — exports
nothing; runs the init sequence inside `window.Webflow.push`).

Verified equivalence: an order-normalized line diff of `dist/index.js` against the
pre-split bundle is **empty** (identical 6,141 code lines, only module emission order
differs), and the `wf-algolia` occurrence count (810) is unchanged in both `dist/index.js`
and `dist/index.min.js`.

## File list (one-line purpose)

| File | Lines | Purpose |
|---|---|---|
| `src/index.js` | 70 | Entry: `handleFormBlocks` + `window.Webflow.push` init sequence (12+ init calls, `__sanitize` escape hatch, `ready` emit) |
| `src/core/events.js` | 18 | Typed event bus: `on`/`off`/`emit` over a `Map<event, Set<handler>>` |
| `src/core/filter-state.js` | 62 | `FILTER_STATE` + `STAGING_STATE` and their primitives; `stateToAlgoliaFilters` translation |
| `src/core/attributes.js` | 70 | `scanAttributes` role map, template detach/anchor registry, `getCascadingAttr`, `cssEscape` |
| `src/core/accessibility.js` | 38 | ARIA roles + keyboard handlers on inputs, listboxes, status regions, div filter-items |
| `src/core/config.js` | 52 | `initClient` (algoliasearch singleton) + `initConfig` (script-tag `data-*` parsing) |
| `src/vendor/finsweet.js` | 58 | Vendored `@finsweet/ts-utils` remnants: `WEBFLOW_CSS`, `getSiteId`, `restartWebflow` |
| `src/utils/dom.js` | 41 | `closeDropdownOnPick`, `showElement`/`hideElement` (`wf-algolia-display` aware) |
| `src/utils/sanitize.js` | 69 | `sanitizeUrl` + `sanitizeHtml` (DOMParser tag/attr allowlist strip) |
| `src/utils/misc.js` | 24 | `escapeFilterValue`, `getPath`, `slugify`, `restartIx2` |
| `src/utils/format.js` | 87 | `{token}` interpolation, text-template caches, `wf-algolia-if` conditions, value formatters |
| `src/utils/debounce.js` | 7 | Trailing debounce |
| `src/utils/snippet.js` | 4 | `buildSnippetParam` (`attributesToSnippet` builder) |
| `src/utils/base-filter.js` | 36 | `wf-algolia-base-filter`/`-filter` attribute parser (`field:value` forms) |
| `src/insights/insights.js` | 174 | search-insights wiring: `initInsights`, delegated click/conversion listeners, `trackView`/`trackClick`/`trackConversion` |
| `src/filters/hierarchy.js` | 171 | `wf-algolia-refines` hierarchy/cascade registry, ancestor/descendant walks, `when-parent-empty` behaviors |
| `src/filters/filter-group.js` | 547 | `initFilterGroups` (checkbox/radio/numeric-min, deferred apply), Webflow input visuals, active-label classes, `syncFacetCounts`, `initSelectFilters` |
| `src/filters/show-more.js` | 37 | `wf-algolia-limit` overflow toggle with text-more/less |
| `src/filters/dynamic-filters.js` | 167 | Facet-value fetch + dynamic `wf-algolia-facet` group population, facet-count sync |
| `src/filters/filter-search.js` | 305 | SFFV typeahead (in-group + overlay) and local substring filter search |
| `src/filters/filter-tags.js` | 143 | Active-filter chips (value + range), `wf-algolia-replace-field` display names |
| `src/filters/range.js` | 81 | Range min/max inputs (Finsweet rangeslider compatible), bounds registry |
| `src/filters/standalone-filter-groups.js` | 371 | Filter-groups outside browse → navigation links, nested child re-scope, parent-change events |
| `src/actions/filter-actions.js` | 344 | `syncFilterDOM`, selected-count/value renderers, `clearAllFilters`/`setFilter`/`setQuery`, staging commit/discard wrappers |
| `src/render/populate.js` | 134 | `populateCard`: text/html/snippet/image/link/if binders (highlight inlined) |
| `src/render/template.js` | 82 | `cloneAndPopulate`, `removeInjected`, template detach, `renderHits` (+IX2 restart, view tracking) |
| `src/render/detail.js` | 95 | Detail-mode rendering (objectID from attr/path/query, slug lookup, array-item expansion) |
| `src/api/public-api.js` | 89 | Middleware pipeline (`searchWithMiddleware`, `multiQueryWithMiddleware`) + `exposePublicAPI` (`window.WfAlgolia`) |
| `src/browse/browse.js` | 469 | Main browse init: mode buttons, URL restore, all filter subsystems, query dispatch (single/federated) |
| `src/browse/sort.js` | 136 | Sort groups/replica indexes, `?sort=` URL param, sort UI sync |
| `src/browse/url-sync.js` | 185 | `?q/mode/page/f_*` state ↔ URL, `#wfa=` hash fallback >2000 chars |
| `src/browse/static-list.js` | 89 | `wf-algolia-disable-filters="true"` one-shot static lists |
| `src/pagination/infinite-scroll.js` | 27 | IntersectionObserver sentinel loader |
| `src/pagination/numbered.js` | 99 | Numbered pagination controls, results-count/page-info templates |
| `src/search/search.js` | 72 | Scoped single-index search-input |
| `src/search/multi-search.js` | 154 | Merged (comma-separated index) and sectioned federated search |
| `src/search/autocomplete.js` | 148 | Sectioned dropdown autocomplete with keyboard nav |
| `src/elements/facet-stat.js` | 98 | `facet-stat` element (`facets_stats` min/max/avg/sum) |
| `src/elements/hit-preview.js` | 411 | Eager batched hit previews (multipleQueries), click trap, re-scope refresh |
| `src/recommend/recommend.js` | 94 | @algolia/recommend: 4 models rendered via `renderHits` |
| `src/debug/rules.js` | 570 | 26 attribute-lint rule factories + `ALL_RULES` (21 rule ids) |
| `src/debug/audit.js` | 120 | `runAudit`, dedupe/log plumbing, MutationObserver re-audit (`data-wf-algolia-debug` opt-in) |

## Import graph (edges = `import ... from`)

Leaf modules (no local imports): `core/events`, `core/attributes`, `core/accessibility`,
`vendor/finsweet`, `utils/dom`, `utils/sanitize`, `utils/debounce`, `utils/snippet`,
`utils/base-filter`, `filters/show-more`, `browse/url-sync`, `pagination/infinite-scroll`,
`debug/rules`.

```txt
index.js → core/{events,accessibility,config,attributes}, utils/sanitize, insights/insights,
           api/public-api, browse/{browse,static-list}, filters/{filter-group,standalone-filter-groups},
           elements/{facet-stat,hit-preview}, recommend/recommend, render/detail,
           search/{search,multi-search,autocomplete}, debug/audit

core/config          → npm:algoliasearch
core/filter-state    → utils/misc
insights/insights    → npm:search-insights
utils/misc           → vendor/finsweet
utils/format         → utils/misc
filters/hierarchy    → core/events
filters/filter-group → core/events, vendor/finsweet, utils/{dom,format}, core/filter-state,
                       filters/hierarchy, actions/filter-actions            ← cycle A
actions/filter-actions → core/events, utils/format, core/filter-state, filters/{hierarchy,
                       filter-group, show-more}                             ← cycle A
render/populate      → utils/{dom,sanitize,misc,format}
render/template      → utils/{sanitize,misc,format}, insights/insights, render/populate
render/detail        → utils/{dom,misc}, render/{populate,template}
api/public-api       → core/{events,filter-state}, insights/insights, actions/filter-actions,
                       render/{populate,template}
filters/dynamic-filters → utils/format, core/filter-state, filters/{hierarchy,show-more},
                       render/template, core/attributes
filters/filter-search → utils/{format,debounce}, core/filter-state, filters/show-more,
                       render/template, core/attributes
filters/filter-tags  → utils/format, core/filter-state, filters/{hierarchy,filter-group},
                       actions/filter-actions, render/template, core/attributes
filters/range        → utils/debounce, core/filter-state
filters/standalone-filter-groups → core/events, utils/misc, filters/{hierarchy,dynamic-filters},
                       render/template, core/attributes, browse/url-sync, elements/hit-preview
browse/sort          → utils/{dom,format}
browse/browse        → core/{events,filter-state,attributes}, utils/{dom,debounce,snippet,base-filter},
                       insights/insights, filters/{hierarchy,filter-group,show-more,dynamic-filters,
                       filter-search,filter-tags,range}, actions/filter-actions, render/template,
                       api/public-api, pagination/{infinite-scroll,numbered}, browse/{sort,url-sync} ← cycle B
pagination/numbered  → utils/format, core/filter-state, browse/{url-sync,browse}   ← cycle B
browse/static-list   → utils/{dom,snippet,base-filter}, render/template, api/public-api,
                       core/attributes, pagination/numbered
search/search        → utils/{dom,format,debounce,snippet}, render/template, api/public-api, core/attributes
search/multi-search  → utils/{dom,format,debounce,snippet}, render/template, api/public-api, core/attributes
search/autocomplete  → utils/{dom,debounce}, render/template, api/public-api, core/attributes
elements/facet-stat  → utils/{format,base-filter}, api/public-api
elements/hit-preview → core/attributes
recommend/recommend  → utils/dom, render/template, core/attributes, npm:@algolia/recommend
debug/audit          → debug/rules
```

## Cycles (static, init-order safe)

Two import cycles exist; both mirror entanglement already noted in MODULE-MAP §4 and are
safe because **every top-level initializer in the codebase is inert** (literals, function
declarations, `new Map/WeakMap/WeakSet`) — no module reads another module's binding during
evaluation, so evaluation order inside the cycles cannot matter:

- **Cycle A:** `filters/filter-group.js` ↔ `actions/filter-actions.js` — group handlers
  call `syncFilterDOM`/`renderSelectedCounts`; `syncFilterDOM` calls back into
  `syncWebflowInputVisual`/`applyActiveLabelClasses`/`getFieldOrFacet`. (Docs place the
  label-ancestor helpers in both files; the bundle had no seam.)
- **Cycle B:** `browse/browse.js` ↔ `pagination/numbered.js` — browse's query runners call
  `renderPaginationControls`/`syncResultsCount`; numbered reads the live bindings
  `browseState`/`urlSyncEnabled`/`paginationMode` and calls `runBrowseQuery`.

No symbols had to be moved into a shared `core/state.js`: the analysis found **zero
cross-module writes** (all mutable module vars are reassigned only in their home module;
foreign modules mutate object contents or read live bindings) and exactly **one**
init-time cross-module read (`WF_INPUT_VISUAL_SELECTOR` in `filters/filter-group.js`
reads `WEBFLOW_CSS` from `vendor/finsweet.js`), which is guaranteed by the direct acyclic
`filter-group → vendor/finsweet` import edge.

## Notes

- `src/vendor/finsweet.js` still vendors the Finsweet ts-utils remnants verbatim — not yet
  swapped for the `@finsweet/ts-utils` npm package.
- Function-local minified params (`e`, `t`, `n`, …) are unchanged (next deobfuscation stage).
- `handleFormBlocks` lives in `src/index.js` (docs place it in `index.ts`).
- ESLint baseline unchanged: exactly 1 error (`'Document' is not defined`, now at
  `src/debug/rules.js:381` inside `ruleDataAlgoliaOnCanvas`).
