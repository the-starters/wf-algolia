// api/public-api — split from app.carved.js (see docs/MODULE-MAP.md)
import { emit, off, on } from "../core/events.js";
import { FILTER_STATE } from "../core/filter-state.js";
import { insights, trackClick, trackConversion } from "../insights/insights.js";
import { clearAllFilters, clearFilter, commitStagingAndSync, discardStagingAndSync, setFilter, setQuery } from "../actions/filter-actions.js";
import { populateCard } from "../render/populate.js";
import { cloneAndPopulate } from "../render/template.js";
var middlewares = [];
function registerMiddleware(e) {
  middlewares.push(e);
}
function applyBeforeSearch(e) {
  let t = e;
  for (let n of middlewares) n.beforeSearch && (t = n.beforeSearch(t) ?? t);
  return t;
}
function applyAfterSearch(e) {
  let t = e;
  for (let n of middlewares) n.afterSearch && (t = n.afterSearch(t) ?? t);
  return t;
}
export async function searchWithMiddleware(e, t) {
  let n = applyBeforeSearch(e),
    r = await t(n);
  return applyAfterSearch(r);
}
export async function multiQueryWithMiddleware(e, t) {
  let n = t.map((i) => ({
      ...i,
      params: applyBeforeSearch(i.params),
    })),
    r = await e.multipleQueries(n);
  return {
    ...r,
    results: r.results.map((i) => applyAfterSearch(i)),
  };
}
export function exposePublicAPI(e, t) {
  let n = () => emit("refresh");
  window.WfAlgolia = {
    version: "1.0.0",
    getClient: () => e,
    search: (r, i, o) =>
      e.initIndex(r).search(i, {
        clickAnalytics: !0,
        ...o,
      }),
    multiSearch: (r) => e.multipleQueries(r),
    getObject: (r, i) => e.initIndex(r).getObject(i),
    cloneAndPopulate: (r, i) => cloneAndPopulate(r, i, t),
    populateCard: (r, i) => populateCard(r, i, t),
    trackClick: trackClick,
    trackConversion: trackConversion,
    getInsights: () => insights,
    on: on,
    off: off,
    setFilter: (r, i) => setFilter(r, i, n),
    clearFilter: (r) => clearFilter(r, n),
    clearAllFilters: () => clearAllFilters(n),
    commitStaging: commitStagingAndSync,
    discardStaging: discardStagingAndSync,
    getFilterState: () => {
      let r = {};
      return (
        Object.entries(FILTER_STATE).forEach(([i, o]) => {
          r[i] = {
            ...o,
            values: o.values ? [...o.values] : void 0,
          };
        }),
        r
      );
    },
    setQuery: (r) => setQuery(r, n),
    getQuery: () =>
      (
        document.querySelector('[wf-algolia-element="browse-search"]') ||
        document.querySelector('[wf-algolia-element="search-input"]')
      )?.value || "",
    refresh: n,
    use: (r) => registerMiddleware(r),
    destroy: () => {
      (document
        .querySelectorAll(".wf-algolia-injected")
        .forEach((r) => r.remove()),
        delete window.WfAlgolia);
    },
  };
}
