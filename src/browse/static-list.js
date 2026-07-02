// browse/static-list — split from app.carved.js (see docs/MODULE-MAP.md)
import { hideElement, showElement } from "../utils/dom.js";
import { buildSnippetParam } from "../utils/snippet.js";
import { readBaseFilter } from "../utils/base-filter.js";
import { removeInjected, renderHits } from "../render/template.js";
import { searchWithMiddleware } from "../api/public-api.js";
import { findTemplateFor } from "../core/attributes.js";
import { renderResultsCount } from "../pagination/numbered.js";
var STATIC_DEFAULT_PER_PAGE = 12,
  warnedStaticNoIndex = new WeakSet(),
  warnedStaticBadFilter = new WeakSet(),
  warnedStaticNoTemplate = new WeakSet();
export function initStaticLists(e, t, n) {
  (n.get("browse") || [])
    .filter((i) => i.getAttribute("wf-algolia-disable-filters") === "true")
    .forEach((i) => void renderStaticList(e, t, n, i));
}
function renderStaticList(e, t, n, r) {
  let i = r.getAttribute("wf-algolia-index");
  if (!i)
    return (
      warnedStaticNoIndex.has(r) ||
        (warnedStaticNoIndex.add(r),
        console.error(
          "[wf-algolia] static list (wf-algolia-disable-filters) missing required wf-algolia-index.",
          r,
        )),
      Promise.resolve()
    );
  let o = r.querySelector('[wf-algolia-element="results"]'),
    l = o ? findTemplateFor(o, n) : null;
  if (!o || !l)
    return (
      warnedStaticNoTemplate.has(r) ||
        (warnedStaticNoTemplate.add(r),
        console.warn(
          "[wf-algolia] static list has no results container/template; skipping.",
          r,
        )),
      Promise.resolve()
    );
  let s = readBaseFilter(r, "wf-algolia-filter", (y) => {
      warnedStaticBadFilter.has(r) ||
        (warnedStaticBadFilter.add(r),
        console.warn(`[wf-algolia] static list ${y}`, r));
    }),
    c = parseInt(r.getAttribute("wf-algolia-per-page") || "", 10),
    m = Number.isNaN(c) || c <= 0 ? STATIC_DEFAULT_PER_PAGE : c,
    g = r.querySelector('[wf-algolia-element="loader"]'),
    u = r.querySelector('[wf-algolia-element="no-results"]');
  showElement(g);
  let h = {
    hitsPerPage: m,
    clickAnalytics: !0,
    attributesToSnippet: buildSnippetParam(t.snippetWords, t.snippetAttrs),
    ...(s
      ? {
          facetFilters: s,
        }
      : {}),
  };
  return searchWithMiddleware(h, (y) => e.initIndex(i).search("", y))
    .then((y) => {
      hideElement(g);
      let b = y.hits.map((w) => ({
        ...w,
        __queryID: y.queryID,
        __indexName: i,
      }));
      (removeInjected(o),
        b.length === 0
          ? showElement(u)
          : (hideElement(u), renderHits(o, l, b, !1, t)),
        r
          .querySelectorAll('[wf-algolia-element="results-count"]')
          .forEach((w) => {
            renderResultsCount(w, {
              shown: b.length,
              total: y.nbHits,
              page: 1,
              pages: y.nbPages,
            });
          }));
    })
    .catch((y) => {
      (hideElement(g),
        console.error("[wf-algolia] static list query failed:", y));
    });
}
