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
| `wf-algolia-base-filter-resolve="leaf"` | **`facet-stat` only** (1.0.11): the base-filter value is a bare leaf name — resolve it to the full hierarchical facet value before querying (`Growth Marketing` → `Paid Media > Growth Marketing`). Skipped when the value already contains `" > "`. Vocabulary is fetched once per index+field and cached for the page. 0 matches warns / 2+ matches errors, and the authored text is left untouched. Ignored (with a warning) for any other value; `browse` / static lists are unaffected. |

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

### Zero-count filter items (`wf-algolia-zeroclass`, 1.0.12)

After every browse query each filter-item's count is refreshed. An item whose count
is 0 gets the group's `wf-algolia-zeroclass` (default `is-disabled`) **and** is made
genuinely inert, because a class alone only restyles it: `data-wf-algolia-disabled` +
`aria-disabled="true"` + inline `pointer-events:none`, native `input`/`select`/
`button`/`textarea` inside it disabled, and the group's own click/keydown handlers
early-return on it so Enter and programmatic `.click()` are blocked too. Only controls
the script disabled itself are marked (`data-wf-algolia-disabled-control`) and later
re-enabled, so an author-disabled control stays disabled. Applies to browse-scoped
groups only — standalone (navigation) filter groups are never count-disabled.

- **A ticked item stays clickable at count 0** (applied *or* staged), so a selection
  can always be undone.
- Counts come from browse queries that ask for `maxValuesPerFacet=1000` (Algolia's
  max; without it Algolia returns only the top 100 values per facet). A value absent
  from a facet map that is *at* that ceiling means "unknown", not 0: the item keeps
  its last known count and stays clickable. A facet with more than 1000 distinct
  values (e.g. `work-history.company`) can therefore hold a stale count — a
  deliberate trade against displaying a wrong `0`.

`wf-algolia-when-parent-empty="disable"` puts the same DOM state on the whole *group*
element instead. The handler guards test the filter-item itself and do not walk
ancestors, so inside a group-level disabled group the native inputs are still
disabled but an input-less div/button item stays keyboard-activatable (known gap).

## Form Blocks (`<form>` claiming)

Webflow wraps search boxes in a Form Block, and pressing Enter in one would submit
(and navigate) the page. So wf-algolia "claims" such a form at init: it blocks
`submit`, hides the sibling `.w-form-done` / `.w-form-fail` messages, and hides the
form's first submit control.

**Claiming is by element type, not blanket.** A form is claimed only if it contains
at least one element that carries a native input control — the ones that trigger
implicit submission on Enter:

| Claims the host `<form>` | Why |
| --- | --- |
| `search-input` | text input |
| `browse-search` | text input on a browse block |
| `filter-search` | text input for facet-value search (SFFV) |
| `filter-group` | wraps checkbox/radio inputs, or a native `<select>` |
| `filter-item` | the individual checkbox/radio wrapper |
| `range-min` / `range-max` | numeric/range inputs |
| `sort` | native `<select>` |

Everything else is render-only and **never** claims a form: `browse`, `results`,
`hit-preview`, `no-results`, `loader`, `results-count`, `filter-count`, `section`,
`search-wrapper`, `scope-facet`, `detail`, `recommend-grid`, `pagination`, the
`filter-tag-*` chips, `sort-group` / `sort-item`, `mode-btn`, `page-next` /
`page-prev`. That means you can drop a render-only browse block inside a real
Webflow form (a cancel/contact/checkout form) and the form still submits normally.

### `wf-algolia-allow-submit="true"` (1.0.10) — escape hatch

Put it on the `<form>`, or on any ancestor (e.g. the `.w-form` Form Block), to force
native/Webflow submission even when the form *does* contain claiming elements —
e.g. a filter group legitimately nested inside a larger real form.

```html
<form wf-algolia-allow-submit="true">
  <div wf-algolia-element="filter-group" wf-algolia-field="role">…</div>
  <button type="submit">Send</button>
</form>
```

When a form is not claimed, **none** of the side effects run for it: no submit
prevention, no `.w-form-done` / `.w-form-fail` hiding, no submit-button hiding. You
are then responsible for stopping Enter-to-submit yourself if the form has a search
box in it.

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
