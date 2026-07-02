# wf-algolia 1.0.4 — Module Map for `src/app.carved.js`

Reverse-engineered mapping of the carved app bundle (5,524 lines) back to the original
`packages/script/src/` module tree. Evidence sources:

- `docs/public-api.d.ts` (published typings, JSDoc references to source files)
- `wf-algolia/llms-full.txt` (full docs; §"Source code" lines ~8600–8712 contain the
  authoritative module tour and init order)
- attribute literals (`wf-algolia-*`), console strings (`[wf-algolia] …`), and the
  init call order in the entry block (lines 5496–5524)

Line numbers refer to `src/app.carved.js` exactly as carved (do not reformat before
mechanical extraction). Ranges are inclusive and were verified against a full
top-level-declaration index (`grep -nE '^  (var|function|async function|window)'`).

**Bundle order note:** esbuild emitted modules in roughly dependency order (leaf utils
first, entry last), but it merged everything into one scope and *interleaved* a few
util clusters (dom/sanitize/format sit between insights and render). Some original
files are split across two ranges; both are listed.

---

## 1. Range → module table

| # | Lines | Inferred module | Conf. | Key evidence |
|---|-------|-----------------|-------|--------------|
| 1 | 1–6 | (carve header) imports + insights alias `Ce` | high | Carve comment; `search-insights` import |
| 2 | 7–22 | `core/events.ts` | high | Event bus Map + `[wf-algolia] Event handler error (${e})`; matches docs "typed event bus" |
| 3 | 23–75 | vendored `@finsweet/ts-utils` Webflow helpers (inlined, likely `utils/webflow.ts`) | med | `Ne` = Finsweet `FORM_CSS_CLASSES`; `Gn` is verbatim Finsweet `restartWebflow` (ix2/commerce/lightbox/slider/tabs) |
| 4 | 76–94 | `utils/dom.ts` (close-on-pick dropdown helper) | med | `wf-algolia-close-on-pick`, `.w-dropdown` close logic |
| 5 | 95–125 | `core/filter-state.ts` | high | `N`/`pe` = FILTER_STATE + STAGING_STATE per docs; commit/discard staging primitives (spec §9 Q5 in d.ts) |
| 6 | 126–276 | `filters/` hierarchy/cascade registry (inferred file, e.g. `filters/hierarchy.ts` — docs say "cascade helpers" live in `core/attributes.ts`) | med | `wf-algolia-refines`, `wf-algolia-when-parent-empty`, `collectAncestors exceeded MAX_DEPTH`, `hierarchy cycle at` |
| 7 | 277–411 | `filters/filter-group.ts` + `actions/filter-actions.ts` helpers (Webflow input visuals, active-label classes) | med | Docs: "filter-group.ts, actions/filter-actions.ts (label-ancestor active-class)"; `w--redirected-checked` handling |
| 8 | 412–689 | `filters/filter-group.ts` (init: checkbox/radio/numeric-min, deferred apply) | high | `wf-algolia-apply-mode`, cascade E2 warning citing `docs/specs/active/2026-05-20-deferred-apply-filter-design.md §11 (E2)` |
| 9 | 690–727 | `filters/show-more.ts` | high | `wf-algolia-limit`, `filter-show-more`, `wf-algolia-text-more/less`; docs name the module |
| 10 | 728–755 | `utils/format.ts` (text-template interpolation) | med | `{token}` interpolation + `wf-algolia-text-template` caching; used by counts/tags/pagination |
| 11 | 756–1073 | `actions/filter-actions.ts` | high | Docs: "clearAll, commitStaging, discardStaging, syncDOM"; `filter-selected-count`/`filter-selected-value` Model A/B warnings |
| 12 | 1074–1235 | insights wiring (extra module, e.g. `insights/insights.ts`) | high (module boundary) / med (path) | `window.aa = insights`, `clickedObjectIDsAfterSearch`, `viewedObjectIDs`, `clickedFilters`; not in the docs tree |
| 13 | 1236–1258 | `utils/dom.ts` (show/hide) | high | `wf-algolia-display` warning with docs URL `attribute-reference#wf-algolia-display` |
| 14 | 1259–1322 | `utils/sanitize.ts` | high | `Blocked unsafe URL`, tag allowlist, DOMParser strip — matches d.ts/docs `sanitizeHtml`/`sanitizeUrl` |
| 15 | 1323–1344 | `utils/` misc (escapeFilterValue, getPath, slugify, restartIx2) | high | Docs: "utils — sanitizeHtml/sanitizeUrl, escapeFilterValue, format, dom, snippet" |
| 16 | 1345–1399 | `utils/format.ts` (conditions + value formatters) | med | `wf-algolia-if` comparators; `rating/year/currency/number` formats |
| 17 | 1401–1529 | `render/populate.ts` (+ `render/highlight.ts` logic inlined) | high | `populateCard text/html/snippet/image/link error:` strings; `wf-algolia-text/image/link/html/snippet/if/alt` binders |
| 18 | 1530–1602 | `render/template.ts` | high | `cloneAndPopulate` per d.ts; `.wf-algolia-injected`, `Failed to clone hit:`; `renderHits` triggers IX2 restart + view tracking |
| 19 | 1603–1626 | `api/public-api.ts` middleware half (beforeSearch/afterSearch pipeline) | med | Exact shape of `WfAlgoliaMiddleware` in d.ts; consumed by every search path |
| 20 | 1627–1672 | `api/public-api.ts` (`exposePublicAPI`) | high | Method-for-method match with `WfAlgoliaPublicAPI` in d.ts |
| 21 | 1673–1741 | `core/attributes.ts` (`scanAttributes`, template detach/anchor registry, cascading attr getter) | high | Docs init order #3; template roles list; `has no ancestor matching` warning |
| 22 | 1742–1893 | `filters/dynamic-filters.ts` | high | `Dynamic filters failed:`, `Dynamic filter "${facet}" missing index/template`, `wf-algolia-facet` populate |
| 23 | 1894–1928 | `utils/` base-filter attribute parser (inferred; shared by browse/facet-stat/static lists) | med | `${attr}-value is set but ${attr}-field is missing`; parses `wf-algolia-base-filter` / `wf-algolia-filter` |
| 24 | 1929–1956 | `filters/filter-group.ts` (facet-count sync for static groups) | med | Same count/zeroclass logic as dynamic version but keyed on `wf-algolia-field` |
| 25 | 1957–1974 | `core/filter-state.ts` (state → `facetFilters`/`numericFilters`) | high | The single translation of FilterState to Algolia params; uses `escapeFilterValue` |
| 26 | 1975–1980 | `utils/` debounce | high | Classic debounce; used by every input path |
| 27 | 1981–2273 | `filters/filter-search.ts` | high | SFFV via `searchForFacetValues`, 200 ms default debounce (docs: "SFFV typeahead (Item 25)"), `searchable(...)` attributesForFaceting error text |
| 28 | 2274–2408 | `filters/filter-tags.ts` | high | `filter-tag-wrapper/template/text/remove`, `wf-algolia-replace-field` JSON |
| 29 | 2409–2477 | `filters/range.ts` | high | `range-min`/`range-max`/`range-display`, Finsweet `fs-rangeslider-min/max` (docs mention Finsweet compat) |
| 30 | 2478–2501 | `pagination/infinite-scroll.ts` | high | IntersectionObserver sentinel, `infinite-scroll loader rejected:` |
| 31 | 2502–2626 | `browse/browse.ts` sort handler (possibly split file, e.g. `browse/sort.ts`) | med | `sort-group`/`sort-item`/`sort-selected-label`, `?sort=` URL param, replica warning; docs attribute sort to browse.ts |
| 32 | 2627–2629 | `utils/snippet.ts` (`attributesToSnippet` builder) | med | Docs list "snippet" util; used by search + browse |
| 33 | 2630–2780 | `browse/url-sync.ts` | high | `?q=&mode=&page=&f_*` params + `#wfa=` hash fallback at >2000 chars; docs "wf-algolia-url-sync state ↔ URL" |
| 34 | 2781–3179 | `browse/browse.ts` (main) | high | Docs init order #6; mode-btn, browse-search, pagination dispatch, `Browse query failed:`, `Browse multi-query failed:` |
| 35 | 3180–3262 | `pagination/numbered.ts` + `browse.ts` `syncResultsCount` (entangled) | med | `wf-algolia-page-window`, `.wf-algolia-page-num` cloning, `Showing {shown} of {total}`, `Page {page} of {pages}`; reads browse state `$` directly |
| 36 | 3263–3302 | `core/accessibility.ts` | high | Docs init order #5: "ARIA roles + keyboard handlers on inputs, listboxes, status regions, div-based filter items" |
| 37 | 3303–3306 | `src/index.ts` or `core/config.ts` (`initClient` singleton) | med | Docs init order #2 `initClient` |
| 38 | 3307–3348 | `core/config.ts` (`initConfig`) | high | Reads every `data-*` off the script tag incl. `data-highlight-tag` (audit #14 per d.ts) |
| 39 | 3349–4028 | debug attribute-lint/audit module (extra, e.g. `debug/audit.ts` + `debug/rules.ts`) | high (boundary) / med (path) | 21 rule factories with ruleIds (`filter-item-orphan` … `duplicate-field-pointer-same-role`), `data-wf-algolia-debug` opt-in, `[wf-algolia debug]` prefix, MutationObserver re-audit; absent from docs tree |
| 40 | 4029–4113 | facet-stat element (extra, e.g. `elements/facet-stat.ts`) | high (boundary) / med (path) | `wf-algolia-element="facet-stat"`, `wf-algolia-stat` min\|max\|avg\|sum, `facets_stats` |
| 41 | 4114–4512 | `elements/hit-preview.ts` | high | Docs: "Eager-only for v1 — one batched multipleQueries call"; `hits-per-preview`, `scope-facet`, click trap |
| 42 | 4513–4560 | `filters/filter-group.ts` select branch (`initSelectFilters`) | med | Docs init order #8 `initSelectFilters`; `wf-algolia-type="select"`/`select-multiple` |
| 43 | 4561–4921 | `filters/standalone-filter-groups.ts` | high | Docs: "filter-groups outside browse → navigation"; `wf-algolia-link-template`, `standalone child re-scope failed:` |
| 44 | 4922–4994 | `recommend/recommend.ts` | high | `@algolia/recommend` factory; related-products / looking-similar / trending-items / frequently-bought-together |
| 45 | 4995–5073 | `render/detail.ts` | high | Docs: "detail mode rendering (no template)"; `wf-algolia-objectid-from="path"`, slug lookup, `array-item`/`array-wrapper` |
| 46 | 5074–5209 | `search/autocomplete.ts` | high | Docs: "dropdown panel, sections, keyboard nav, show-on-focus"; `autocomplete-section`, ArrowUp/Down/Enter/Escape |
| 47 | 5210–5346 | `search/multi-search.ts` | high | Docs: "federated (multipleQueries) + merged (comma-sep index)"; `Merged search failed:`, `Multi-section search failed:` |
| 48 | 5347–5402 | `search/search.ts` | high | `Scoped search failed for "${index}":`; single-index scoped search-input |
| 49 | 5403–5475 | static-list rendering (extra; likely part of `browse/browse.ts` or `browse/static-list.ts`) | med | `wf-algolia-disable-filters="true"` static lists; warning text names the feature |
| 50 | 5476–5495 | `src/index.ts` / `core/` `handleFormBlocks` (form-ancestor takeover) | med | Docs init order #4 "take over the submit handler"; hides `.w-form-done/.w-form-fail` + submit buttons |
| 51 | 5496–5524 | `src/index.ts` (entry) | high | `window.Webflow.push` wrapper; call order matches the documented 12-step init order |

---

## 2. Per-module symbol tables

Every top-level minified identifier is listed exactly once, under its home range.
Format: `minified` → `proposedName` — purpose.

### 2.1 Carve header (1–6)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `Ce` | `insights` | Alias of the `search-insights` module function (`aa`-style queue caller) |

(`algoliasearchFactory`, `recommendFactory` are carve-added import names, not original symbols.)

### 2.2 core/events.ts (7–22)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `Ft` | `eventHandlers` | `Map<eventName, Set<handler>>` — the global event bus store |
| `Je` | `on` | Subscribe handler to event |
| `Un` | `off` | Unsubscribe handler |
| `Y` | `emit` | Fire event; each handler wrapped in try/catch with console warn |

### 2.3 Vendored Webflow helpers (23–75)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `Ne` | `WEBFLOW_CSS` | Finsweet `FORM_CSS_CLASSES` map (`w-form`, `w-checkbox-input`, `w--redirected-checked`, …) |
| `Bn` | `getSiteId` | Read `data-wf-site` off `<html>` |
| `Gn` | `restartWebflow` | Finsweet `restartWebflow(modules?)` — re-inits ix2/commerce/lightbox/slider/tabs |

### 2.4 utils/dom — close-on-pick (76–94)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `Xe` | `closeDropdownOnPick` | If inside `[wf-algolia-close-on-pick]`, close the enclosing `.w-dropdown` (jQuery `w-close` + class/aria cleanup) |

### 2.5 core/filter-state.ts (95–125, plus 1957–1974)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `N` | `FILTER_STATE` | Active filter state: `{ [field]: { type, match, values:Set, min?, max? } }` |
| `pe` | `STAGING_STATE` | Staged (deferred-apply) filter state, same shape |
| `Vn` | `toggleStateValue` | Add/remove one value on a state object; deletes field entry when empty |
| `Jr` | `clearState` | Delete every key from a state object |
| `yt` | `stageFilter` | Write a whole field entry into `STAGING_STATE` |
| `nn` | `commitStaging` | Move staged fields (or all) into `FILTER_STATE` |
| `bt` | `discardStaging` | Drop staged fields (or all) |
| `zn` | `getEffectiveState` | `{...FILTER_STATE, ...STAGING_STATE}` merged snapshot |
| `or` (1957) | `stateToAlgoliaFilters` | FilterState → `{ facetFilters, numericFilters }` (AND/OR nesting, escaping) |

### 2.6 filters hierarchy/cascade registry (126–276)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `st` | `MAX_DEPTH` | Hierarchy depth cap (5) |
| `rn` | `HIERARCHY_SEPARATOR` | `" > "` — hierarchical facet path separator |
| `Kn` | `leafValue` | Last segment of a `" > "` path |
| `vt` | `getLabelMode` | `wf-algolia-label="leaf"` → `'leaf'` else `'full'` |
| `Et` | `formatFacetLabel` | Apply leaf/full label mode to a value |
| `Zr` | `groupFieldById` | `Map<groupId, field>` |
| `gs` | `groupElById` | `Map<groupId, element>` |
| `on` | `childLinksByParentId` | `Map<parentGroupId, ChildLink[]>` |
| `ps` | `linkByChildEl` | `WeakMap<childEl, ChildLink>` |
| `Qn` | `allChildLinks` | Flat array of every registered child link |
| `an` | `linkByGroupId` | `Map<groupId, ChildLink>` |
| `Xr` | `warnedWhenParentEmpty` | WeakSet — warn-once for bad `wf-algolia-when-parent-empty` |
| `Ot` | `parseWhenParentEmpty` | Read/validate `hide`\|`disable`\|null |
| `ln` | `registerGroup` | Record groupId → field + element |
| `Dt` | `getGroupField` | Look up parent group's field by id |
| `sn` | `registerChildLink` | Register a refines child link in all registries |
| `cn` | `getChildLink` | Link by groupId |
| `Ye` | `isParentGroup` | Does any child refine this groupId? |
| `un` | `getAllChildLinks` | Copy of `allChildLinks` |
| `hs` | `hideEl` | Add hide class + `display:none !important` |
| `ws` | `unhideEl` | Reverse of `hideEl` |
| `ys` | `disableEl` | Add disabled class + aria-disabled + pointer-events:none |
| `bs` | `enableEl` | Reverse of `disableEl` |
| `Fe` | `applyParentEmptyBehavior` | Dispatch hide/disable per mode |
| `Tt` | `clearParentEmptyBehavior` | Dispatch unhide/enable per mode |
| `vs` | `collectAncestors` | Walk parent chain (cycle + MAX_DEPTH guards, emits `error`) |
| `fn` | `collectDescendants` | BFS over child links from a groupId |
| `St` | `getAncestorSelections` | Required `{field,value}` scope chain for a child link |
| `Yr` | `firstValueOf` | First selected value for a field from a state object |
| `Jn` | `syncHierarchyVisibility` | Show/hide every child group based on parent selections |

### 2.7 filter-group / filter-actions visual helpers (277–411)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `ti` | `activeLabelClassCache` | WeakMap<groupEl, {labelClasses, innerDivClasses}> |
| `jt` | `WF_INPUT_VISUAL_SELECTOR` | `.w-radio-input, .w-checkbox-input` |
| `We` | `syncWebflowInputVisual` | Toggle `w--redirected-checked/focus` on the Webflow fake input |
| `Es` | `detectActiveLabelClasses` | Heuristic diff of label classes to find the "active label" style (uses `wf-algolia-reset`, `checked`, unique-class scoring) |
| `Rt` | `applyActiveLabelClasses` | Move detected active classes to the currently active label |
| `ct` | `getFieldOrFacet` | `wf-algolia-field` \|\| `wf-algolia-facet` |
| `Ts` | `setActiveDataAttr` | Set/remove `data-wf-algolia-active` |
| `dn` | `syncGroupActiveClasses` | Re-apply activeclass to all filter-items in a group |
| `mn` | `isItemChecked` | Radio/checkbox checked, else `data-wf-algolia-active` |
| `Ss` | `toggleDivItemActive` | Active-state toggling for input-less (div) filter items incl. radio + numeric-min semantics |

### 2.8 filters/filter-group.ts init (412–689)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `ei` | `warnedCascadeApplyMode` | WeakSet — warn-once for E2 deferred-parent/immediate-child |
| `As` | `enforceDeferredCascade` | Force child groups to `deferred` when parent is deferred (spec §11 E2) |
| `ni` | `initFilterGroups` | Main filter-group wiring: registry, refines validation, radio coercion for non-leaf, click/keydown handlers, deferred staging, reset buttons, initial state restore |

### 2.9 filters/show-more.ts (690–727)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `ri` | `showMoreReapplyFns` | WeakMap<groupEl, reapplyFn> |
| `ii` | `initShowMore` | `wf-algolia-limit` overflow toggle w/ text-more/text-less |
| `ut` | `reapplyShowMore` | Re-run show-more clamp after dynamic injection |

### 2.10 utils/format — text templates (728–755)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `oe` | `interpolate` | Replace `{word}` tokens from a data object |
| `oi` | `textTemplateCache` | WeakMap<el, template string> |
| `ae` | `getTextTemplate` | Resolve template: `wf-algolia-text-template` attr → authored `{…}` text → fallback |
| `ai` | `originalTextCache` | WeakMap<el, original text> |
| `li` | `getOriginalText` | Cache + return the authored textContent |

### 2.11 actions/filter-actions.ts (756–1073)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `Be` | `syncFilterDOM` | Master DOM sync: staged attr cleanup, checkbox/radio checked state, active classes, range reset, aria, then selected-count/value re-render |
| `Ls` | `synthesizeMissingSelected` | `wf-algolia-show-selected-missing` — inject synthetic filter-items for selected values missing from DOM |
| `xs` | `sortFilterItems` | `wf-algolia-sort` = selected-first \| alpha \| count |
| `si` | `warnedCountNoField` | Warn-once set (selected-count field resolution, Model A/B message) |
| `Ms` | `resolveCountField` | Field for a `filter-selected-count` badge (own attr or enclosing group) |
| `ci` | `warnedCountNoSlot` | Warn-once set (missing `filter-count-text` inner slot) |
| `$e` | `renderSelectedCounts` | Render `filter-selected-count` badges (+hide-empty, zeroclass) |
| `ui` | `warnedValueNoField` | Warn-once set (selected-value field resolution) |
| `fi` | `warnedValueNoSlot` | Warn-once set (missing `filter-value-text-target`) |
| `Hs` | `resolveValueField` | Field for a `filter-selected-value` slot |
| `di` | `renderValueSlot` | Write one selected-value text slot (restores original text at count 0) |
| `Ue` | `renderSelectedValues` | Render all `filter-selected-value` elements |
| `gn` | `clearAllFilters` | Clear state + staging, reset ranges, re-hide hierarchy children, emit `filter`, refresh |
| `mi` | `clearFilter` | Clear one field, sync DOM, emit, refresh |
| `gi` | `setFilter` | Set one field's values, sync DOM, emit, refresh |
| `pi` | `commitStagingAndSync` | Public commitStaging: state commit + selected-count/value re-render |
| `hi` | `discardStagingAndSync` | Public discardStaging + re-render |
| `wi` | `setQuery` | Write query into browse-search/search-input, emit `search`, refresh |

### 2.12 Insights wiring (1074–1235) — extra module

| Symbol | Proposed name | Purpose |
|---|---|---|
| `Nt` | `insightsReady` | Flag — insights initialized |
| `bi` | `indexNameResolver` | Callback returning current index for filter-click events |
| `vi` | `setIndexNameResolver` | Setter (called from browse init) |
| `Is` | `hasEventAttrAncestor` | Is target inside `[wf-algolia-event]`/`[wf-algolia-conversion]`? |
| `Ei` | `initInsights` | `aa('init')`, `window.aa`, four delegated click listeners (injected-card click, clickedFilters, wf-algolia-event, wf-algolia-conversion) |
| `ks` | `VIEW_CHUNK_SIZE` | 20 — objectIDs per viewedObjectIDs call |
| `yi` | `MAX_EVENT_NAME_LEN` | 64 |
| `qs` | `chunkArray` | Generic chunker (insights copy) |
| `Xn` | `validObjectIDs` | Filter to non-empty strings |
| `Ti` | `truncateEventName` | Cap event name at 64 chars |
| `Yn` | `trackView` | `viewedObjectIDs` in chunks |
| `pn` | `trackClick` | `clickedObjectIDs(AfterSearch)` |
| `hn` | `trackConversion` | `convertedObjectIDs(AfterSearch)` |
| `Si` | `isInsightsReady` | Getter for `insightsReady` |

### 2.13 utils/dom — show/hide (1236–1258)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `Ai` | `warnedDisplayBlock` | Warn-once set for missing `wf-algolia-display` |
| `J` | `showElement` | Show w/ `wf-algolia-display` attr, explicit display arg, or `block` + warn |
| `B` | `hideElement` | `display:none` |

### 2.14 utils/sanitize.ts (1259–1322)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `ft` | `sanitizeUrl` | Block `javascript:`/`data:`/`vbscript:` → `#` |
| `Li` | `ALLOWED_TAGS` | Tag → allowed-attribute allowlist (em, mark, a[href…], img[src…], …) |
| `Ps` | `ELEMENT_NODE` | 1 |
| `Cs` | `TEXT_NODE` | 3 |
| `At` | `sanitizeHtml` | DOMParser round-trip + recursive strip (exposed as `WfAlgolia.__sanitize`) |
| `wn` | `sanitizeNode` | Recursive worker: unwrap disallowed tags, strip attrs, sanitize href/src |

### 2.15 utils misc (1323–1344)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `_t` | `escapeFilterValue` | Escape `\` and `"` for Algolia filter strings |
| `xe` | `getPath` | Dot-path getter (`a.b.c`) on hit objects |
| `yn` | `slugify` | NFKD, strip accents, non-alnum → separator |
| `bn` | `restartIx2` | `restartWebflow(["ix2"])` with catch + warn |

### 2.16 utils/format — conditions + value formats (1345–1399)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `Fs` | `COMPARATORS` | `["!==","===",">=","<=",">","<"]` (order matters) |
| `xi` | `evalCondition` | Evaluate `wf-algolia-if` expressions against a hit |
| `vn` | `formatValue` | `wf-algolia-format`: rating (★ n.n), year, currency ($n.nn), number (locale) |
| `Ii` | `applySlugifyAttr` | Slugify a link value when `wf-algolia-slugify="true"` |

### 2.17 render/populate.ts (1401–1529)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `Mi` | `warnedEmptyAlt` | Warn-once set for images without `wf-algolia-alt` |
| `Wt` | `populateCard` | Bind hit → card: text (fallback chains `a\|b`, highlight via `_highlightResult`), html (sanitized), snippet (`_snippetResult`), image (+alt/lazy), link (prefix/suffix/slugify/link-url), `wf-algolia-if` |

### 2.18 render/template.ts (1530–1602)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `Zn` | `cloneAndPopulate` | Clone template, per-index link-prefix map (`prefix\|index:prefix`), populateCard, stamp `data-wf-algolia-hit-*` dataset |
| `re` | `removeInjected` | Remove all `.wf-algolia-injected` children |
| `Hi` | `detachedTemplates` | WeakSet of templates already detached from DOM |
| `Os` | `detachTemplateOnce` | Remove template element from DOM on first render |
| `Se` | `renderHits` | Fragment-render hit list (append or replace), position dataset, IX2 restart, insights view event |

### 2.19 api/public-api.ts — middleware (1603–1626)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `er` | `middlewares` | Registered `WfAlgoliaMiddleware[]` |
| `ki` | `registerMiddleware` | `use()` implementation |
| `qi` | `applyBeforeSearch` | Fold params through `beforeSearch` hooks |
| `Pi` | `applyAfterSearch` | Fold response through `afterSearch` hooks |
| `Ze` | `searchWithMiddleware` | Wrap a single search executor with before/after |
| `et` | `multiQueryWithMiddleware` | Wrap `client.multipleQueries` with before/after per query/result |

### 2.20 api/public-api.ts — exposePublicAPI (1627–1672)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `Ci` | `exposePublicAPI` | Build `window.WfAlgolia` (all d.ts methods; ⚠️ `version: "1.0.0"` hardcoded — stale vs package 1.0.4) |

### 2.21 core/attributes.ts (1673–1741)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `Oi` | `scanAttributes` | Build role → element[] Map; detach the four template roles and record their homes |
| `Ds` | `TEMPLATE_ANCHOR_SELECTORS` | Expected wrapper per template role (filter-template → filter-group, …) |
| `Fi` | `warnedTemplateAnchor` | Warn-once set for template outside expected wrapper |
| `dt` | `getCascadingAttr` | Attr on el → closest ancestor → script-tag `data-*` → default |
| `Di` | `templateAnchorByEl` | WeakMap<template, matching wrapper> |
| `Ri` | `templateParentByEl` | WeakMap<template, original parentElement> |
| `Rs` | `registerTemplateHome` | Record parent + anchor for a detached template |
| `de` | `findTemplateFor` | Find the template whose anchor is a given container |
| `Oe` | `getTemplateParent` | Original parent of a detached template |
| `ji` | `cssEscape` | `CSS.escape` w/ fallback |

### 2.22 filters/dynamic-filters.ts (1742–1893, 1929–1956)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `En` | `fetchFacetValues` | Empty-query search for one facet's value/count pairs (sorted by count) |
| `Ni` | `fetchFacetsBatch` | Same for multiple facets in one query (maxValuesPerFacet 50) |
| `_i` | `initDynamicFilters` | Populate every browse-scoped `[wf-algolia-facet]` group, then refresh |
| `Wi` | `populateDynamicGroup` | Render facet values into one group from its filter-template (+field-label, group-count) |
| `tr` | `refreshChildGroup` | Re-populate a hierarchy child scoped by ancestor `{field:value}` facetFilters |
| `nr` | `syncDynamicFacetCounts` | Update counts + zeroclass on `wf-algolia-facet` groups after a query |
| `rr` | `toggleGroupsByFacetPresence` | Hide field-groups whose facet has no values and no active selection |
| `ir` (1929) | `syncFacetCounts` | Update counts + zeroclass + group-count on field/facet groups (static variant) |

### 2.23 utils — base-filter parser (1894–1928)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `js` | `parseFieldColonValue` | `"field:value"` → `[["field:value"]]` or null |
| `Ns` | `pairToFacetFilter` | (field, value) → `[["field:value"]]` |
| `Lt` | `readBaseFilter` | Read `{attr}-field`+`{attr}-value` or `{attr}="field:value"` with malformed-warning callback |

### 2.24 utils — debounce (1975–1980)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `Le` | `debounce` | Standard trailing debounce |

### 2.25 filters/filter-search.ts (1981–2273)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `$i` | `SFFV_DEFAULT_DEBOUNCE` | 200 ms (matches docs) |
| `Ui` | `warnedNotSearchable` | Warn-once set for `searchable()` index-config error |
| `$t` | `LOCAL_HIDDEN_ATTR` | `data-wf-algolia-local-hidden` |
| `_s` | `localFilterSearch` | `wf-algolia-search-mode="local"` — substring show/hide of existing items |
| `Ws` | `resolveGroupIndex` | Group's index: own attr → ancestor → script `data-index` |
| `$s` | `resolveSffvDebounce` | `wf-algolia-debounce` on input or group, default 200 |
| `Us` | `parentScopeFacetFilters` | facetFilters from the refines-parent's current selection |
| `Bs` | `renderSffvInline` | Replace group items with SFFV facetHits (in-group mode) |
| `Bi` | `renderSffvEmpty` | Show/hide + template the `filter-search-empty` element |
| `Tn` | `findScopedRole` | Find role element inside group or cross-scope via `wf-algolia-field` |
| `Gi` | `initFilterSearch` | Wire SFFV/local search per group; overlay results panel; `searchable()` error coaching |
| `Gs` | `renderSffvOverlay` | Render facetHits into the `filter-search-results` overlay |
| `Vs` | `ensureFilterItem` | Find or synthesize the real filter-item matching a picked overlay value |

### 2.26 filters/filter-tags.ts (2274–2408)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `Vi` | `warnedNoChipTemplate` | Warn-once set |
| `ar` | `renderFilterTags` | Render active-filter chips into `filter-tag-wrapper` |
| `zs` | `buildValueChip` | Chip for one checkbox value (+remove handler) |
| `zi` | `fieldDisplayName` | Field label via `wf-algolia-replace-field` map |
| `Ks` | `parseReplaceFieldMap` | Parse the replace-field JSON (single-quote tolerant) |
| `Ki` | `getFieldPrefixSuffix` | `wf-algolia-prefix/suffix` from the owning filter-group |
| `Qs` | `buildRangeChip` | Chip for a min–max range (+remove resets range inputs) |
| `Qi` | `cloneChip` | Clone chip template, mark injected |

### 2.27 filters/range.ts (2409–2477)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `lr` | `rangeDefaults` | `{ [field]: {min,max} }` authored bounds |
| `Js` | `readRangeBounds` | Bounds from `fs-rangeslider-min/max` or input min/max |
| `Ji` | `initRangeFilters` | Wire range-min/max inputs (debounced, deferred-apply aware, range-display text) |

### 2.28 pagination/infinite-scroll.ts (2478–2501)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `Xi` | `initInfiniteScroll` | Append 1px sentinel + IntersectionObserver (200px rootMargin), re-entrancy guard |

### 2.29 browse sort (2502–2626)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `Ge` | `currentSortIndex` | Active replica index ("" = primary) |
| `eo` | `sortInitialized` | Sort groups found on page |
| `tt` | `primarySortIndex` | The browse primary index name |
| `Yi` | `warnedUnknownReplica` | Warn-once set (string keys) |
| `Zi` | `warnedEmptySortGroup` | Warn-once set |
| `sr` | `SORT_URL_PARAM` | `"sort"` |
| `Sn` | `getCurrentSort` | Getter for `currentSortIndex` |
| `cr` | `sortIndexOf` | `wf-algolia-sort-index` of a sort-item (empty → primary) |
| `Xs` | `knownReplicaIndexes` | Set of replicas registered by sort-items + mode-btns |
| `ur` | `syncSortUI` | Active attr on sort-items + `sort-selected-label` text |
| `Ys` | `writeSortToURL` | Push `?sort=` (removed when primary) |
| `to` | `readSortFromURL` | Read `?sort=` |
| `Zs` | `pickInitialSortItem` | URL match → default (no sort-index) → first |
| `ec` | `onSortItemClick` | Set sort, URL, UI, page=0, close dropdown, refresh |
| `no` | `initSortGroups` | Wire all sort-groups |
| `ro` | `resetSortOnPopState` | Re-read sort from URL on history nav |

### 2.30 utils/snippet.ts (2627–2629)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `nt` | `buildSnippetParam` | `attributesToSnippet` list from words + attr csv (`*` or per-attr) |

### 2.31 browse/url-sync.ts (2630–2780)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `fr` | `HASH_PREFIX` | `"#wfa="` long-state fallback |
| `Ln` | `enc` | encodeURIComponent |
| `An` | `dec` | decodeURIComponent w/ catch |
| `tc` | `stateToQueryString` | Build `q/mode/page/f_*` search params (preserves foreign params) |
| `nc` | `stateToHashPayload` | JSON-encode full state for the hash fallback |
| `io` | `writeStateToURL` | pushState; hash fallback when URL > 2000 chars |
| `dr` | `readStateFromURL` | Dispatch hash vs query parsing |
| `rc` | `parseHashState` | Parse `#wfa=` JSON payload |
| `ic` | `parseQueryState` | Parse `q/mode/page/f_*` (`_min`/`_max` numeric) params |

### 2.32 browse/browse.ts (2781–3179)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `oo` | `initModeButtons` | mode-btn tabs; hides per-index filter-groups + drops their state |
| `ao` | `initSortSelect` | Legacy `<select>` `[wf-algolia-element="sort"]` handler |
| `xn` | `urlSyncEnabled` | `wf-algolia-url-sync="true"` flag |
| `Mn` | `paginationMode` | `"load-more"` \| `"numbered"` \| `"infinite-scroll"` |
| `gr` | `baseFilters` | Parsed `wf-algolia-base-filter` facetFilters |
| `so` | `withBaseFilters` | Append baseFilters to a facetFilters array |
| `$` | `browseState` | `{ mode, sort, query, page, hitsPerPage, topOffset }` |
| `Ut` | `browseClient` | Algolia client captured at browse init |
| `rt` | `browseIndex` | Primary browse index |
| `it` | `modeIndexes` | Index list from mode-btns (falls back to `[browseIndex]`) |
| `xt` | `browseElements` | The scanned role map captured for browse |
| `ot` | `browseConfig` | Script config captured for browse |
| `co` | `initBrowsePage` | The big init: URL restore, all filter subsystems, search box, pagination, apply/apply-cancel buttons, popstate, hierarchy events, insights index resolver |
| `lo` | `resolveApplyTargetFields` | Fields an apply/apply-cancel button commits (attr → group → all deferred groups) |
| `oc` | `buildPerIndexFilters` | Per-mode-index filter split (`wf-algolia-index` on groups) |
| `uo` | `refreshFromPageZero` | page=0 + rerun (passed to filter-tags) |
| `Ee` | `runBrowseQuery` | Query dispatcher (single vs federated) + loader/no-results |
| `ac` | `runSingleIndexQuery` | Sorted/moded single-index search + all post-render sync |
| `lc` | `runFederatedQuery` | multipleQueries across modeIndexes, merge hits/facets/counts |
| `fo` | `snippetParam` | Thin wrapper over `buildSnippetParam` |

### 2.33 pagination/numbered.ts + results-count (3180–3262)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `mr` | `DEFAULT_PAGE_WINDOW` | 5 |
| `sc` | `getPageWindow` | `wf-algolia-page-window` on browse |
| `pr` | `renderResultsCount` | `"Showing {shown} of {total}"` template |
| `cc` | `renderPageInfo` | `"Page {page} of {pages}"` template |
| `uc` | `clonePageNumber` | Clone `page-number` prototype (`.wf-algolia-page-num`) |
| `mo` | `syncResultsCount` | Update all `results-count` elements (docs: browse.ts `syncResultsCount`) |
| `go` | `renderPaginationControls` | prev/next visibility, page-info, windowed page numbers, URL-sync write, top-offset scroll |

### 2.34 core/accessibility.ts (3263–3302)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `po` | `initAccessibility` | ARIA roles: searchbox, listbox, status/aria-live, tab + keyboard for mode-btn, button/tabindex for div filter-items |

### 2.35 initClient (3303–3306)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `yr` | `clientSingleton` | Cached algoliasearch client |
| `yo` | `initClient` | Lazily create `algoliasearch(appId, searchKey)` |

### 2.36 core/config.ts (3307–3348)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `fc` | `TAG_NAME_RE` | `/^[a-z][a-z0-9-]*$/` — validate `data-highlight-tag` |
| `bo` | `initConfig` | Read all script-tag `data-*`: app-id, search-key, insights(+cookie), debounce(s), highlight-tag, snippet-words/attrs, activeclass, hideclass; big green init console.log |

### 2.37 Debug attribute audit (3349–4028) — extra module

| Symbol | Proposed name | Purpose |
|---|---|---|
| `vo` | `TEMPLATE_ROLES` | The 4 template role names |
| `dc` | `SLOT_ROLES` | `["filter-value-text","filter-count"]` |
| `Bt` | `resolveFieldScope` | Field via own attr or closest field/facet ancestor |
| `Eo` | `collectFilterGroups` | All groups with their declared field |
| `ue` | `makeIssue` | Issue record factory `{ruleId, severity, element, message, fix}` |
| `mc` | `ruleFilterItemOrphan` | filter-item with no resolvable scope |
| `gc` | `ruleFilterGroupMissingField` | group without field/facet |
| `pc` | `ruleFilterSearchOrphan` | filter-search without scope |
| `hc` | `ruleFilterSearchResultsOrphan` | results panel without scope / without matching input |
| `wc` | `ruleDuplicateFieldWrapper` | two groups declare same field |
| `yc` | `ruleTemplateNotDirectChild` | filter-template not direct child of its group |
| `bc` | `ruleFieldButNoRole` | `wf-algolia-field` but no role anywhere under it |
| `vc` | `ruleRoleButNoField` | filter-ish role resolves to no field |
| `Ec` | `ruleConflictingType` | type="checkbox" w/ all-radio inputs (and inverse) |
| `Tc` | `ruleHitPreviewNestedInBrowse` | hit-preview inside browse |
| `Sc` | `ruleHitPreviewNoTemplate` | hit-preview without bind-attr descendant |
| `Ac` | `ruleHitPreviewMissingFieldValue` | no (field,value) pair and no scope-facet/filter-item ancestor |
| `Lc` | `ruleRefinesTargetMissing` | refines → nonexistent group-id |
| `xc` | `ruleDuplicateGroupId` | duplicate `wf-algolia-group-id` |
| `Mc` | `ruleCascadeCollision` | `wf-algolia-index` on `<body>`/`<html>` |
| `Hc` | `ruleDataAlgoliaOnCanvas` | `data-algolia-*` used on canvas elements |
| `Ic` | `ruleWfAlgoliaOnScriptTag` | `wf-algolia-*` on `<script>` (should be `data-*`) |
| `kc` | `ruleTemplateNotHidden` | visible template prototypes |
| `qc` | `ruleSlotWithoutTemplateParent` | value-text/count slot outside any template |
| `Pc` | `ruleFieldPointerUndefined` | cross-scope field pointer to undeclared filter-group |
| `Cc` | `ruleDuplicateFieldPointer` | duplicate role+field cross-scope pointer |
| `br` | `ALL_RULES` | The 21-rule array |
| `To` | `runAudit` | Run all rules, collect issues |
| `So` | `DEBUG_ATTR` | `data-wf-algolia-debug` (script-tag opt-in) |
| `vr` | `ISSUE_ATTR` | `data-wf-algolia-issue` (stamped on offending elements) |
| `Fc` | `DEBUG_LOG_PREFIX` | `"[wf-algolia debug]"` |
| `Oc` | `isDebugEnabled` | Script tag has `data-wf-algolia-debug="true"` |
| `Dc` | `OBSERVED_ATTRS` | attributeFilter list for the MutationObserver |
| `xo` | `newSeenMap` | ruleId → WeakSet dedupe store factory |
| `Rc` | `alreadyReported` | Dedupe check/mark |
| `jc` | `tagIssue` | Append ruleId to the element's issue attr |
| `Nc` | `logIssue` | console.error/warn with fix text |
| `Ao` | `auditAndLog` | Run + dedupe + log; returns `{issues, newlyLogged}` |
| `Lo` | `debugStarted` | Idempotence flag |
| `_c` | `debugObserver` | Stored MutationObserver |
| `Mo` | `initDebugAudit` | Initial audit + rAF-throttled re-audit on relevant mutations |

### 2.38 facet-stat (4029–4113) — extra module

| Symbol | Proposed name | Purpose |
|---|---|---|
| `Ho` | `STAT_KEYS` | `["min","max","avg","sum"]` |
| `Io` | `warnedStatNoField` | Warn-once set |
| `ko` | `warnedStatBadStat` | Warn-once set |
| `qo` | `warnedStatNoIndex` | Warn-once set |
| `Po` | `warnedStatNoStats` | Warn-once set (non-numeric facet) |
| `Wc` | `resolveStatIndex` | Index: own → ancestor → script `data-index` |
| `Co` | `initFacetStats` | Render every `facet-stat` element |
| `$c` | `renderFacetStat` | Query `facets_stats` (base-filter aware, middleware-wrapped) and template `{value}` |

### 2.39 elements/hit-preview.ts (4114–4512)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `Fo` | `warnedPreviewNoField` | Warn-once set |
| `Oo` | `warnedPreviewNoValue` | Warn-once set |
| `Do` | `warnedPreviewNoTemplate` | Warn-once set |
| `Ro` | `warnedPreviewInBrowse` | Warn-once set |
| `jo` | `warnedPreviewHasFilterTemplate` | Warn-once set |
| `No` | `warnedDuplicatePair` | Warn-once set |
| `Hn` | `warnedZeroHits` | Warn-once set |
| `In` | `warnedScopeFacetNoField` | Warn-once set |
| `kn` | `warnedUnresolvedScopeValue` | Warn-once set |
| `Gt` | `renderedPairKeys` | Map<previewEl, pairKey> — skip unchanged previews on refresh |
| `Wo` | `resolvePreviewFieldValue` | (field,value) from own attrs → scope-facet ancestor → filter-item/group ancestors |
| `$o` | `resolvePreviewIndex` | Index: own → ancestor → script `data-index` |
| `Uo` | `findPreviewTemplate` | First child carrying/containing a bind attribute |
| `Uc` | `fillLinkTemplate` | `{field.path}` interpolation for `wf-algolia-hit-link-template` |
| `Bo` | `populatePreviewCard` | Flat (non-nested) text/image/link-template binder for preview cards |
| `Bc` | `isInsideHitPreview` | closest hit-preview check |
| `_o` | `clickTrapInstalled` | Idempotence flag |
| `Gc` | `installClickTrap` | Capture-phase stopPropagation inside previews (keeps filter-group handlers out) |
| `Vc` | `PREVIEW_BATCH_SIZE` | 50 queries per multipleQueries call |
| `zc` | `chunkQueries` | Chunker (hit-preview copy) |
| `Go` | `batchedPreviewFetch` | Batched multipleQueries; null result per failed batch |
| `Vo` | `initHitPreviews` | Eager init: validate, dedupe (field,value), one batched fetch, render |
| `Er` | `previewKey` | `index::field::value::hitsPerPreview` identity |
| `Kc` | `clearPreviewCards` | Remove `data-wf-algolia-hit-preview` clones |
| `Tr` | `refreshHitPreviews` | Re-render previews whose resolved key changed (standalone re-scope path) |

### 2.40 initSelectFilters (4513–4560)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `zo` | `initSelectFilters` | `wf-algolia-type="select"/"select-multiple"` native `<select>` change → state (deferred-apply + hierarchy stage events supported) |

### 2.41 filters/standalone-filter-groups.ts (4561–4921)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `Qo` | `standaloneParentSelection` | Map<groupId, selected value> |
| `Jo` | `linkTemplateByGroup` | Map<groupId, link template> |
| `Xo` | `slugifyByGroup` | Map<groupId, boolean> |
| `Sr` | `standaloneParentChangeHandler` | Singleton `filter:parent-change` handler (child re-scope + re-populate) |
| `Ko` | `standaloneConfigByEl` | Map<groupEl, standalone config> |
| `Yo` | `getGroupTemplate` | filter-template lookup for a group |
| `Qc` | `resolveLinkTemplate` | `wf-algolia-link-template` own → ancestor → refines-parent registry |
| `Jc` | `resolveSlugify` | Same cascade for `wf-algolia-slugify` |
| `Zo` | `stampScopeFacetValue` | Write `wf-algolia-value` onto nested scope-facet elements |
| `Ar` | `renderStandaloneItems` | Render facet values into a standalone group (returns injected items) |
| `Xc` | `populateNestedChildGroups` | Populate nested child groups per parent value using `" > "`-prefixed facet paths |
| `Yc` | `buildNavUrl` | Fill `{field}`/`{value}` in the link template (optionally slugified leaf) |
| `Zc` | `snapshotParentSelections` | Standalone selections → pseudo FilterState |
| `ea` | `initStandaloneFilterGroups` | Init: registry, refines links, click→navigate or parent-change, initial population (+nested batch), hit-preview refresh |

### 2.42 recommend/recommend.ts (4922–4994)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `eu` | `getMaxRecommendations` | `wf-algolia-max-results` (default 8) |
| `ra` | `initRecommendations` | Recommend client; 4 models (related-products, looking-similar, trending-items, frequently-bought-together); objectID from detail param; renders via renderHits |

### 2.43 render/detail.ts (4995–5073)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `tu` | `findArrayWrapper` | `array-wrapper` ancestor or parentElement |
| `nu` | `resolveDetailObjectID` | `wf-algolia-objectid-value` → path segment (`objectid-from="path"`) → `?id=` query param |
| `ia` | `initDetailPage` | getObject or slug-filter search (fallback `objectid` field), populateCard in place, `array-item` expansion, IX2 restart |

### 2.44 search/autocomplete.ts (5074–5209)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `oa` | `warnedMultiAnchorCard` | Warn-once set (multiple `<a>` per card) |
| `aa` | `initAutocomplete` | Sectioned dropdown: per-section index/hits, federated query, section labels, ArrowUp/Down/Enter/Escape keyboard nav, show-on-focus sections, outside-click close |

### 2.45 search/multi-search.ts (5210–5346)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `la` | `initMergedSearch` | Comma-separated `wf-algolia-index` — federated query, round-robin interleave into one results list |
| `sa` | `initSectionSearch` | Global search-input + `[wf-algolia-element="section"]` panels — per-section render, divider, combined count |

### 2.46 search/search.ts (5347–5402)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `ca` | `initScopedSearch` | search-input inside a single `[wf-algolia-index]` scope — debounced single-index search + results-count |

### 2.47 Static lists (5403–5475)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `ru` | `STATIC_DEFAULT_PER_PAGE` | 12 |
| `ua` | `warnedStaticNoIndex` | Warn-once set |
| `fa` | `warnedStaticBadFilter` | Warn-once set |
| `da` | `warnedStaticNoTemplate` | Warn-once set |
| `ma` | `initStaticLists` | All `browse` wrappers with `wf-algolia-disable-filters="true"` |
| `iu` | `renderStaticList` | One-shot query (`wf-algolia-filter` base filter) + render + results-count |

### 2.48 Form takeover (5476–5495)

| Symbol | Proposed name | Purpose |
|---|---|---|
| `ga` | `handleFormBlocks` | preventDefault submit on any form wrapping a wf-algolia element; hide `.w-form-done/.w-form-fail` and submit buttons |

### 2.49 src/index.ts entry (5496–5524)

No named symbols — `window.Webflow.push(async () => { … })` calling, in order:
`initDebugAudit` (Mo) → `initConfig` (bo) → `initClient` (yo) → `scanAttributes` (Oi) →
`handleFormBlocks` (ga) → `initAccessibility` (po) → `initBrowsePage` (co) →
`initStaticLists` (ma) → `initStandaloneFilterGroups` (ea) → `initHitPreviews` (Vo) →
`initFacetStats` (Co) → `initSelectFilters` (zo) → `initDetailPage` (ia) →
`initRecommendations` (ra) → `initScopedSearch` (ca) → `initSectionSearch` (sa) →
`initMergedSearch` (la) → `initAutocomplete` (aa) → `initInsights` (Ei) →
`exposePublicAPI` (Ci) → expose `__sanitize` → `emit("ready")`.

(Close to but not identical to the documented 12-step order — static lists, facet-stat,
hit-preview and the debug audit are extra steps not in the docs' list.)

---

## 3. Cross-module shared symbols (rename these first)

These are referenced from many modules; renaming them consistently unblocks everything else.

| Symbol | Proposed name | Defined at | Used by |
|---|---|---|---|
| `Y` / `Je` / `Un` | `emit` / `on` / `off` | 7–22 | everywhere (refresh/filter/search/results/error/ready + internal `filter:parent-change`, `filter:parent-stage-change`) |
| `N` | `FILTER_STATE` | 95 | filter-group, actions, tags, range, browse, url-sync, public API |
| `pe` | `STAGING_STATE` | 96 | filter-group, select, range, tags, actions, browse |
| `zn` | `getEffectiveState` | 123 | selected-count/value renderers |
| `$` | `browseState` | 2826 | browse, numbered pagination |
| `Ce` | `insights` | 6 | insights module, public API `getInsights` |
| `xe` | `getPath` | 1326 | populate, template, preview |
| `oe` / `ae` / `li` | `interpolate` / `getTextTemplate` / `getOriginalText` | 728–755 | counts, values, tags, dynamic filters, pagination, facet-stat, search counts |
| `J` / `B` | `showElement` / `hideElement` | 1237/1256 | every render/search module |
| `Le` | `debounce` | 1975 | search, browse, range, filter-search, autocomplete |
| `dt` | `getCascadingAttr` | 1716 | standalone groups (activeclass/hideclass/zeroclass cascade) |
| `de` / `Oe` | `findTemplateFor` / `getTemplateParent` | 1731/1734 | browse, search(×3), autocomplete, dynamic filters, tags, recommend, standalone, static lists |
| `re` | `removeInjected` | 1573 | all renderers |
| `Se` | `renderHits` | 1580 | browse, search(×3), autocomplete, recommend, static lists |
| `Zn` / `Wt` | `cloneAndPopulate` / `populateCard` | 1530/1402 | template render, detail, public API |
| `ft` / `At` / `_t` | `sanitizeUrl` / `sanitizeHtml` / `escapeFilterValue` | 1259/1292/1323 | populate, detail, `__sanitize` |
| `ct` | `getFieldOrFacet` | 362 | filter-group, tags, counts |
| `Ze` / `et` | `searchWithMiddleware` / `multiQueryWithMiddleware` | 1617/1622 | browse, search(×3), autocomplete, facet-stat, static lists |
| `nt` | `buildSnippetParam` | 2627 | search, browse, static lists |
| `Lt` | `readBaseFilter` | 1908 | browse (base-filter), facet-stat, static lists (filter) |
| `Xe` | `closeDropdownOnPick` | 76 | filter-group, select, sort |
| `We` / `Rt` | `syncWebflowInputVisual` / `applyActiveLabelClasses` | 279/343 | filter-group, filter-actions syncDOM |
| `Be` / `$e` / `Ue` | `syncFilterDOM` / `renderSelectedCounts` / `renderSelectedValues` | 756/920/989 | browse, tags, public API paths |
| `ut` | `reapplyShowMore` | 724 | dynamic filters, filter-search, syncDOM |
| `pn` / `hn` / `Yn` / `Si` | `trackClick` / `trackConversion` / `trackView` / `isInsightsReady` | 1200/1215/1189/1233 | insights listeners, renderHits, public API |
| `bn` | `restartIx2` | 1338 | renderHits, detail |
| `En` / `Ni` | `fetchFacetValues` / `fetchFacetsBatch` | 1742/1756 | dynamic filters, standalone groups |
| `vt` / `Et` / `Kn` / `rn` / `st` | label-mode + hierarchy path helpers | 126–137 | dynamic filters, tags, standalone |
| `Fe` / `Tt` / `St` / `fn` / `un` / `Ye` / `cn` / `Dt` / `sn` / `ln` / `Ot` | hierarchy registry API | 145–276 | filter-group, browse, standalone |
| `Tr` | `refreshHitPreviews` | 4430 | standalone groups (post-population + re-scope) |

---

## 4. Unmapped / uncertain

- **Lines 126–276 (hierarchy registry):** clearly one cohesive unit, but the docs never
  name a file for the `wf-algolia-refines` hierarchy machinery. Docs say "cascade helpers"
  live in `core/attributes.ts`, yet this cluster is state-heavy and imported by
  filter-group, browse, and standalone-filter-groups equally. Could be
  `core/attributes.ts`, `filters/hierarchy.ts`, or part of `filter-group.ts`. Medium.
- **Lines 277–411:** the docs place "label-ancestor active-class" in *both*
  `filter-group.ts` and `actions/filter-actions.ts`. The bundle gives no seam; treat as
  shared helpers hoisted by esbuild. Medium.
- **Lines 1894–1980 (base-filter parser, `ir`, `or`, `debounce`):** a grab-bag between
  dynamic-filters and filter-search in emit order. `or` (state→Algolia filters) most
  plausibly lives in `core/filter-state.ts`; `Lt` may be `utils/` or `browse.ts`-local.
  Assignments in §1 rows 23–26 are best-effort. Medium/low.
- **Lines 2502–2626 (sort):** docs attribute the sort handler to `browse.ts`, but this
  cluster has its own module-level state and URL param handling — it may be a separate
  `browse/sort.ts` that postdates the docs page. Medium.
- **Lines 3180–3262:** `syncResultsCount` is documented as `browse.ts` while page-number
  cloning is `pagination/numbered.ts`; the emitted code interleaves them and both close
  over `browseState`. Split point inside this range is uncertain. Medium.
- **`pagination/load-more.ts`:** documented as its own file, but no distinct code cluster
  exists — load-more is just `page++` + `runBrowseQuery(append=true)` inlined in
  `initBrowsePage` (2917–2922). Either the file was ~empty or fully inlined by the bundler.
- **Extra modules not in the known tree** (inferred paths are guesses):
  insights wiring (1074–1235), debug attribute audit + 21 lint rules (3349–4028),
  facet-stat (4029–4113), static lists (5403–5475), form takeover (5476–5495, docs call
  it `handleFormBlocks` in `index.ts`).
- **`render/highlight.ts`:** documented as a separate file, but highlight/snippet
  rendering is inlined inside `populateCard` (1402–1529). No separate cluster.
- **Vendored Finsweet helpers (23–75):** almost certainly `@finsweet/ts-utils`
  (`FORM_CSS_CLASSES`, `getSiteId`, `restartWebflow`) compiled into the app chunk rather
  than the vendor section — i.e., third-party code, not original wf-algolia source.

---

## 5. Notable findings

- `window.WfAlgolia.version` is hardcoded `"1.0.0"` (line 1630) while the package is
  1.0.4 — the published d.ts claims it "matches the npm package version"; it doesn't.
- The deferred-apply spec is directly referenced in shipped code:
  `docs/specs/active/2026-05-20-deferred-apply-filter-design.md §11 (E2)` (line 433).
- The debug audit module (~680 lines, 21 rules, MutationObserver re-audit, opt-in via
  `data-wf-algolia-debug="true"`) ships in the production bundle.
- Two internal (non-public) events exist beyond the d.ts surface:
  `filter:parent-change` and `filter:parent-stage-change`.
- `window.WfAlgolia.__sanitize` (line 5519) is an undocumented escape hatch onto
  `sanitizeHtml`.
