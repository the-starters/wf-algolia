// browse/browse — split from app.carved.js (see docs/MODULE-MAP.md)
import { emit, on } from "../core/events.js";
import { hideElement, showElement } from "../utils/dom.js";
import { debounce } from "../utils/debounce.js";
import { buildSnippetParam } from "../utils/snippet.js";
import { readBaseFilter } from "../utils/base-filter.js";
import { FILTER_STATE, STAGING_STATE, commitStaging, discardStaging, stateToAlgoliaFilters, stateToAlgoliaFiltersExcluding } from "../core/filter-state.js";
import { setIndexNameResolver } from "../insights/insights.js";
import { MAX_FACET_VALUES, applyParentEmptyBehavior, clearParentEmptyBehavior, collectDescendants, getAllChildLinks, getAncestorSelections, syncHierarchyVisibility } from "../filters/hierarchy.js";
import { initFilterGroups, syncFacetCounts } from "../filters/filter-group.js";
import { initShowMore } from "../filters/show-more.js";
import { clearAllFilters, renderSelectedCounts, renderSelectedValues, syncFilterDOM } from "../actions/filter-actions.js";
import { removeInjected, renderHits } from "../render/template.js";
import { multiQueryWithMiddleware, searchWithMiddleware } from "../api/public-api.js";
import { findTemplateFor } from "../core/attributes.js";
import { initDynamicFilters, refreshChildGroup, syncDynamicFacetCounts, toggleGroupsByFacetPresence } from "../filters/dynamic-filters.js";
import { initFilterSearch } from "../filters/filter-search.js";
import { renderFilterTags } from "../filters/filter-tags.js";
import { initRangeFilters } from "../filters/range.js";
import { initInfiniteScroll } from "../pagination/infinite-scroll.js";
import { getCurrentSort, initSortGroups, resetSortOnPopState } from "./sort.js";
import { readStateFromURL } from "./url-sync.js";
import { renderPaginationControls, syncResultsCount } from "../pagination/numbered.js";
function initModeButtons(e, t, n, r, i) {
  let o = document.querySelectorAll('[wf-algolia-element="mode-btn"]');
  function l() {
    document
      .querySelectorAll('[wf-algolia-element="filter-group"][wf-algolia-index]')
      .forEach((s) => {
        if (s.hasAttribute("wf-algolia-refines")) return;
        let c = s.getAttribute("wf-algolia-index"),
          m = e.mode === "all" || e.mode === c;
        if (((s.style.display = m ? "" : "none"), !m)) {
          let g = s.getAttribute("wf-algolia-field");
          g && t[g] && delete t[g];
        }
      });
  }
  (o.forEach((s) => {
    s.getAttribute("wf-algolia-mode") === e.mode && s.classList.add(r);
  }),
    l(),
    o.forEach((s) => {
      s.addEventListener("click", () => {
        ((e.mode = s.getAttribute("wf-algolia-mode") || "all"),
          (e.page = 0),
          o.forEach((c) => c.classList.remove(r)),
          s.classList.add(r),
          l(),
          n());
      });
    }));
}
function initSortSelect(e, t) {
  let n = document.querySelector('[wf-algolia-element="sort"]');
  n &&
    n.addEventListener("change", () => {
      ((e.sort = n.value), (e.page = 0), t());
    });
}
export var urlSyncEnabled = !1,
  paginationMode = "load-more",
  baseFilters = [];
function withBaseFilters(e) {
  return baseFilters.length ? [...e, ...baseFilters] : e;
}
export var browseState,
  browseClient,
  browseIndex,
  modeIndexes = [],
  browseElements,
  browseConfig;
export async function initBrowsePage(e, t, n) {
  let r = (n.get("browse") || []).filter(
    (m) => m.getAttribute("wf-algolia-disable-filters") !== "true",
  );
  r.length > 1 &&
    console.warn(
      '[wf-algolia] multiple interactive browse wrappers found; only the first is initialized. Mark the others wf-algolia-disable-filters="true" to render them as static lists.',
      r.slice(1),
    );
  let i = r[0];
  if (!i) return;
  if (
    ((browseClient = e),
    (browseConfig = t),
    (browseElements = n),
    (browseConfig = t),
    (browseIndex = i.getAttribute("wf-algolia-index") || ""),
    !browseIndex)
  ) {
    console.error(
      "[wf-algolia] Browse page missing wf-algolia-index attribute",
    );
    return;
  }
  if (
    (document
      .querySelectorAll('[wf-algolia-element="mode-btn"]')
      .forEach((m) => {
        let g = m.getAttribute("wf-algolia-mode");
        g && g !== "all" && !modeIndexes.includes(g) && modeIndexes.push(g);
      }),
    modeIndexes.length === 0 && (modeIndexes = [browseIndex]),
    (browseState = {
      mode: "all",
      sort: "",
      query: "",
      page: 0,
      hitsPerPage: parseInt(i.getAttribute("wf-algolia-per-page") || "12"),
      topOffset: parseInt(i.getAttribute("wf-algolia-top-offset") || "0"),
    }),
    (urlSyncEnabled = i.getAttribute("wf-algolia-url-sync") === "true"),
    (baseFilters =
      readBaseFilter(i, "wf-algolia-base-filter", (m) =>
        console.warn(`[wf-algolia] ${m}`, i),
      ) ?? []),
    urlSyncEnabled)
  ) {
    let m = readStateFromURL();
    if (
      m.query ||
      m.mode !== "all" ||
      m.page > 0 ||
      Object.keys(m.filters).length > 0
    ) {
      ((browseState.query = m.query),
        (browseState.mode = m.mode),
        (browseState.page = m.page),
        Object.assign(FILTER_STATE, m.filters));
      let g = i.querySelector('[wf-algolia-element="browse-search"]');
      g && m.query && (g.value = m.query);
    }
  }
  let o = () => {
    ((browseState.page = 0), runBrowseQuery());
  };
  (initFilterGroups(o),
    syncHierarchyVisibility(FILTER_STATE),
    initDynamicFilters(e, n, runBrowseQuery),
    initFilterSearch(e, n, runBrowseQuery),
    initRangeFilters(o),
    initShowMore(),
    initModeButtons(
      browseState,
      FILTER_STATE,
      runBrowseQuery,
      t.activeClass,
      browseIndex,
    ),
    initSortSelect(browseState, runBrowseQuery),
    initSortGroups(browseState, runBrowseQuery, browseIndex));
  let l = i.querySelector('[wf-algolia-element="browse-search"]');
  l &&
    l.addEventListener(
      "input",
      debounce((m) => {
        ((browseState.query = m.target.value.trim()),
          (browseState.page = 0),
          runBrowseQuery());
      }, t.debounce),
    );
  let s = i.getAttribute("wf-algolia-pagination") || "load-more";
  paginationMode =
    s === "infinite-scroll" || s === "numbered" ? s : "load-more";
  let c = paginationMode === "load-more";
  if (
    (document
      .querySelector('[wf-algolia-element="page-next"]')
      ?.addEventListener("click", () => {
        (browseState.page++, runBrowseQuery(c));
      }),
    document
      .querySelector('[wf-algolia-element="page-prev"]')
      ?.addEventListener("click", () => {
        browseState.page > 0 && (browseState.page--, runBrowseQuery());
      }),
    document
      .querySelector('[wf-algolia-button="reset"]')
      ?.addEventListener("click", () => {
        ((browseState.page = 0), (browseState.query = ""));
        let m = i.querySelector('[wf-algolia-element="browse-search"]');
        (m && (m.value = ""), clearAllFilters(() => runBrowseQuery()));
      }),
    document.querySelectorAll('[wf-algolia-button="apply"]').forEach((m) => {
      m.addEventListener("click", () => {
        let g = resolveApplyTargetFields(m);
        g.length !== 0 &&
          (commitStaging(g), (browseState.page = 0), runBrowseQuery());
      });
    }),
    document
      .querySelectorAll('[wf-algolia-button="apply-cancel"]')
      .forEach((m) => {
        m.addEventListener("click", () => {
          let g = resolveApplyTargetFields(m);
          (discardStaging(g.length > 0 ? g : void 0), syncFilterDOM());
        });
      }),
    window.addEventListener("popstate", () => {
      if ((discardStaging(), resetSortOnPopState(browseIndex), !urlSyncEnabled))
        return;
      let m = readStateFromURL();
      ((browseState.query = m.query),
        (browseState.mode = m.mode),
        (browseState.page = m.page),
        Object.keys(FILTER_STATE).forEach((u) => delete FILTER_STATE[u]),
        Object.assign(FILTER_STATE, m.filters),
        syncHierarchyVisibility(FILTER_STATE));
      let g = document.querySelector('[wf-algolia-element="browse-search"]');
      (g && (g.value = m.query), runBrowseQuery());
    }),
    on("refresh", () => runBrowseQuery()),
    on("filter:parent-change", (m) => {
      let g = collectDescendants(m.parentGroupId);
      g.length !== 0 &&
        g.forEach((u) => {
          delete FILTER_STATE[u.childField];
          let h = getAncestorSelections(u, FILTER_STATE);
          h.length === u.depth
            ? (clearParentEmptyBehavior(u.childEl, u.whenParentEmpty),
              refreshChildGroup(
                browseClient,
                browseElements,
                u.childEl,
                h,
              ).catch((y) => {
                (console.warn("[wf-algolia] refreshChildGroup failed:", y),
                  emit("error", y));
              }))
            : (applyParentEmptyBehavior(u.childEl, u.whenParentEmpty),
              u.childEl
                .querySelectorAll(".wf-algolia-injected")
                .forEach((y) => y.remove()));
        });
    }),
    on("filter:parent-stage-change", (m) => {
      let g = getAllChildLinks().filter((h) => h.parentField === m.field);
      if (g.length === 0) return;
      let u = {
        ...FILTER_STATE,
        ...STAGING_STATE,
      };
      g.forEach((h) => {
        let y = getAncestorSelections(h, u);
        y.length === h.depth
          ? (clearParentEmptyBehavior(h.childEl, h.whenParentEmpty),
            refreshChildGroup(browseClient, browseElements, h.childEl, y).catch(
              (b) => {
                (console.warn(
                  "[wf-algolia] refreshChildGroup (staged) failed:",
                  b,
                ),
                  emit("error", b));
              },
            ))
          : (applyParentEmptyBehavior(h.childEl, h.whenParentEmpty),
            h.childEl
              .querySelectorAll(".wf-algolia-injected")
              .forEach((b) => b.remove()));
      });
    }),
    setIndexNameResolver(
      () =>
        getCurrentSort() ||
        browseState.sort ||
        (browseState.mode !== "all" ? browseState.mode : browseIndex),
    ),
    await runBrowseQuery(),
    paginationMode === "infinite-scroll")
  ) {
    let m = i.querySelector('[wf-algolia-element="results"]');
    m &&
      initInfiniteScroll(m, async () => {
        (browseState.page++, await runBrowseQuery(!0));
      });
  }
}
function resolveApplyTargetFields(e) {
  let t = e.getAttribute("wf-algolia-fields");
  if (t !== null)
    return t
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);
  let n = e.closest('[wf-algolia-element="filter-group"]');
  if (n) {
    let i = n.getAttribute("wf-algolia-field");
    return i ? [i] : [];
  }
  let r = e.closest('[wf-algolia-element="browse"]');
  return r
    ? Array.from(
        r.querySelectorAll(
          '[wf-algolia-element="filter-group"][wf-algolia-apply-mode="deferred"]',
        ),
      )
        .map((i) => i.getAttribute("wf-algolia-field"))
        .filter((i) => !!i)
    : [];
}
function buildPerIndexStates() {
  let e = {},
    t = new Map();
  document
    .querySelectorAll('[wf-algolia-element="filter-group"][wf-algolia-index]')
    .forEach((n) => {
      let r = n.getAttribute("wf-algolia-field"),
        i = n.getAttribute("wf-algolia-index");
      r && i && t.set(r, i);
    });
  for (let n of modeIndexes) {
    let r = {};
    (Object.entries(FILTER_STATE).forEach(([i, o]) => {
      let l = t.get(i);
      (!l || l === n) && (r[i] = o);
    }),
      (e[n] = r));
  }
  return e;
}
function disjunctiveAttrs(e) {
  return Object.keys(e).filter((t) => {
    let n = e[t];
    return (
      (n.type === "checkbox" || n.type === "boolean") &&
      n.values &&
      n.values.size > 0 &&
      n.match !== "and"
    );
  });
}
function disjunctiveParams(e, t, n) {
  return {
    hitsPerPage: 0,
    page: 0,
    facets: [e],
    maxValuesPerFacet: MAX_FACET_VALUES,
    facetFilters: t,
    numericFilters: n,
    analytics: !1,
    clickAnalytics: !1,
    attributesToRetrieve: [],
    attributesToHighlight: [],
  };
}
function refreshFromPageZero() {
  ((browseState.page = 0), runBrowseQuery());
}
export function ownedByStaticList(e) {
  let t = e?.closest('[wf-algolia-element="browse"]');
  return !!t && t.getAttribute("wf-algolia-disable-filters") === "true";
}
export function queryBrowseElement(e) {
  for (let t of document.querySelectorAll(e)) if (!ownedByStaticList(t)) return t;
  return null;
}
export function runBrowseQuery(e = !1) {
  (renderSelectedCounts(FILTER_STATE), renderSelectedValues(FILTER_STATE));
  let t = queryBrowseElement(
      '[wf-algolia-element="browse"] [wf-algolia-element="results"]',
    ),
    n = t ? findTemplateFor(t, browseElements) : null,
    r = queryBrowseElement(
      '[wf-algolia-element="browse"] [wf-algolia-element="loader"]',
    ),
    i = queryBrowseElement(
      '[wf-algolia-element="browse"] [wf-algolia-element="no-results"]',
    );
  return !t || !n
    ? Promise.resolve()
    : (showElement(r),
      browseState.mode === "all" && !browseState.sort && !getCurrentSort()
        ? runFederatedQuery(t, n, r, i, e)
        : runSingleIndexQuery(t, n, r, i, e));
}
function runSingleIndexQuery(e, t, n, r, i) {
  let { facetFilters: o, numericFilters: l } =
      stateToAlgoliaFilters(FILTER_STATE),
    s =
      getCurrentSort() ||
      browseState.sort ||
      (browseState.mode !== "all" ? browseState.mode : browseIndex),
    c = withBaseFilters(o),
    m = {
      hitsPerPage: browseState.hitsPerPage,
      page: browseState.page,
      facets: ["*"],
      maxValuesPerFacet: MAX_FACET_VALUES,
      facetFilters: c,
      numericFilters: l,
      clickAnalytics: !0,
      attributesToSnippet: snippetParam(
        browseConfig.snippetWords,
        browseConfig.snippetAttrs,
      ),
    },
    d = disjunctiveAttrs(FILTER_STATE);
  return (
    d.length === 0
      ? searchWithMiddleware(m, (g) =>
          browseClient.initIndex(s).search(browseState.query || "", g),
        ).then((g) => [g])
      : multiQueryWithMiddleware(browseClient, [
          {
            indexName: s,
            query: browseState.query || "",
            params: m,
          },
          ...d.map((p) => ({
            indexName: s,
            query: browseState.query || "",
            params: disjunctiveParams(
              p,
              withBaseFilters(
                stateToAlgoliaFiltersExcluding(FILTER_STATE, p).facetFilters,
              ),
              l,
            ),
          })),
        ]).then(({ results: p }) => p)
  )
    .then((p) => {
      let g = p[0];
      hideElement(n);
      let u = g.hits.map((h) => ({
          ...h,
          __queryID: g.queryID,
          __indexName: s,
        })),
        f = {
          ...(g.facets || {}),
        };
      (d.forEach((h, y) => {
        f[h] = p[y + 1]?.facets?.[h] ?? {};
      }),
        i || removeInjected(e),
        u.length === 0 && !i
          ? showElement(r)
          : (hideElement(r), renderHits(e, t, u, i, browseConfig)),
        syncFacetCounts(f),
        syncDynamicFacetCounts(f),
        toggleGroupsByFacetPresence(f),
        syncFilterDOM(),
        renderFilterTags(FILTER_STATE, browseElements, refreshFromPageZero),
        syncResultsCount(g.nbHits, g.nbPages),
        renderPaginationControls(g.nbPages),
        emit("results", g));
    })
    .catch((g) => {
      (hideElement(n),
        console.error("[wf-algolia] Browse query failed:", g),
        emit("error", g));
    });
}
function runFederatedQuery(e, t, n, r, i) {
  let o = buildPerIndexStates(),
    l = Math.ceil(browseState.hitsPerPage / modeIndexes.length),
    d = disjunctiveAttrs(FILTER_STATE),
    p = [],
    s = [];
  modeIndexes.forEach((c) => {
    let m = o[c] || {},
      { facetFilters: g, numericFilters: u } = stateToAlgoliaFilters(m);
    (s.push({
      indexName: c,
      query: browseState.query || "",
      params: {
        hitsPerPage: l,
        page: browseState.page,
        facets: ["*"],
        maxValuesPerFacet: MAX_FACET_VALUES,
        facetFilters: withBaseFilters(g),
        numericFilters: u,
        clickAnalytics: !0,
        attributesToSnippet: snippetParam(
          browseConfig.snippetWords,
          browseConfig.snippetAttrs,
        ),
      },
    }),
      p.push({
        index: c,
        attr: null,
      }),
      d.forEach((h) => {
        h in m &&
          (s.push({
            indexName: c,
            query: browseState.query || "",
            params: disjunctiveParams(
              h,
              withBaseFilters(
                stateToAlgoliaFiltersExcluding(m, h).facetFilters,
              ),
              u,
            ),
          }),
          p.push({
            index: c,
            attr: h,
          }));
      }));
  });
  return multiQueryWithMiddleware(browseClient, s)
    .then(({ results: c }) => {
      hideElement(n);
      let m = [],
        g = {},
        u = 0,
        h = 0,
        f = [],
        v = {};
      (c.forEach((y, b) => {
        let w = p[b];
        if (w.attr) return;
        let E = y.hits.map((T) => ({
          ...T,
          __queryID: y.queryID,
          __indexName: w.index,
        }));
        (f.push(y),
          m.push(...E),
          (u += y.nbHits),
          (h = Math.max(h, y.nbPages)),
          (v[w.index] = {
            ...(y.facets || {}),
          }));
      }),
        c.forEach((y, b) => {
          let w = p[b];
          w.attr && v[w.index] && (v[w.index][w.attr] = y.facets?.[w.attr] ?? {});
        }),
        Object.values(v).forEach((y) => {
          Object.entries(y).forEach(([b, w]) => {
            let E = g[b] ?? (g[b] = {});
            Object.entries(w).forEach(([T, k]) => {
              E[T] = (E[T] ?? 0) + k;
            });
          });
        }),
        i || removeInjected(e),
        m.length === 0 && !i
          ? showElement(r)
          : (hideElement(r), renderHits(e, t, m, i, browseConfig)),
        syncFacetCounts(g),
        syncDynamicFacetCounts(g),
        toggleGroupsByFacetPresence(g),
        syncFilterDOM(),
        renderFilterTags(FILTER_STATE, browseElements, refreshFromPageZero),
        syncResultsCount(u, h),
        renderPaginationControls(h),
        emit("results", {
          results: f,
          nbHits: u,
          nbPages: h,
        }));
    })
    .catch((c) => {
      (hideElement(n),
        console.error("[wf-algolia] Browse multi-query failed:", c),
        emit("error", c));
    });
}
function snippetParam(e, t) {
  return buildSnippetParam(e, t);
}
