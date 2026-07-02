// pagination/numbered — split from app.carved.js (see docs/MODULE-MAP.md)
import { getTextTemplate, interpolate } from "../utils/format.js";
import { FILTER_STATE } from "../core/filter-state.js";
import { writeStateToURL } from "../browse/url-sync.js";
import { browseState, paginationMode, runBrowseQuery, urlSyncEnabled } from "../browse/browse.js";
var DEFAULT_PAGE_WINDOW = 5;
function getPageWindow(e) {
  if (!e) return DEFAULT_PAGE_WINDOW;
  let t = e.getAttribute("wf-algolia-page-window");
  if (t === null || t === "") return DEFAULT_PAGE_WINDOW;
  let n = parseInt(t, 10);
  return Number.isNaN(n) ? DEFAULT_PAGE_WINDOW : Math.max(1, n);
}
export function renderResultsCount(e, t) {
  let n = getTextTemplate(e, "Showing {shown} of {total}");
  e.textContent = interpolate(n, {
    shown: t.shown,
    total: t.total,
    count: t.total,
    page: t.page,
    pages: t.pages,
  });
}
function renderPageInfo(e, t) {
  let n = getTextTemplate(e, "Page {page} of {pages}");
  e.textContent = interpolate(n, t);
}
function clonePageNumber(e, t, n) {
  let r = e.cloneNode(!0);
  return (
    (r.style.display = ""),
    r.classList.add("wf-algolia-page-num"),
    r.removeAttribute("wf-algolia-element"),
    (r.textContent = String(t + 1)),
    n && r.setAttribute("data-wf-algolia-active", "true"),
    r
  );
}
export function syncResultsCount(e, t) {
  document
    .querySelectorAll('[wf-algolia-element="results-count"]')
    .forEach((n) => {
      let r = Math.min(e, (browseState.page + 1) * browseState.hitsPerPage);
      renderResultsCount(n, {
        shown: r,
        total: e,
        page: browseState.page + 1,
        pages: t,
      });
    });
}
export function renderPaginationControls(e) {
  let t = document.querySelector('[wf-algolia-element="page-prev"]'),
    n = document.querySelector('[wf-algolia-element="page-next"]');
  (t && (t.style.display = browseState.page > 0 ? "" : "none"),
    n && (n.style.display = browseState.page < e - 1 ? "" : "none"),
    document
      .querySelectorAll('[wf-algolia-element="page-info"]')
      .forEach((i) => {
        renderPageInfo(i, {
          page: browseState.page + 1,
          pages: e,
        });
      }));
  let r = document.querySelector('[wf-algolia-element="page-number"]');
  if (r) {
    let i = r.parentElement;
    if (i) {
      (i.querySelectorAll(".wf-algolia-page-num").forEach((m) => m.remove()),
        (r.style.display = "none"));
      let o = document.querySelector('[wf-algolia-element="browse"]'),
        l = getPageWindow(o),
        s = Math.max(0, browseState.page - Math.floor(l / 2)),
        c = Math.min(e, s + l);
      s = Math.max(0, c - l);
      for (let m = s; m < c; m++) {
        let g = clonePageNumber(r, m, m === browseState.page);
        (g.addEventListener("click", () => {
          ((browseState.page = m), runBrowseQuery());
        }),
          n ? i.insertBefore(g, n) : i.appendChild(g));
      }
    }
  }
  (urlSyncEnabled &&
    writeStateToURL({
      query: browseState.query,
      mode: browseState.mode,
      page: browseState.page,
      filters: FILTER_STATE,
      pagination: paginationMode,
    }),
    browseState.topOffset &&
      browseState.page > 0 &&
      window.scrollTo({
        top: browseState.topOffset,
        behavior: "smooth",
      }));
}
