// wf-algolia 1.0.4 — carved app code (vendors replaced with npm imports).
// Source of truth for behavior: build/index.1.0.4.min.js (ISC, © Candidleap).
import { emit } from "./core/events.js";
import { sanitizeHtml } from "./utils/sanitize.js";
import { initInsights } from "./insights/insights.js";
import { initSelectFilters } from "./filters/filter-group.js";
import { exposePublicAPI } from "./api/public-api.js";
import { scanAttributes } from "./core/attributes.js";
import { initBrowsePage } from "./browse/browse.js";
import { initAccessibility } from "./core/accessibility.js";
import { initClient, initConfig } from "./core/config.js";
import { initDebugAudit } from "./debug/audit.js";
import { initFacetStats } from "./elements/facet-stat.js";
import { initHitPreviews } from "./elements/hit-preview.js";
import { initStandaloneFilterGroups } from "./filters/standalone-filter-groups.js";
import { initRecommendations } from "./recommend/recommend.js";
import { initDetailPage } from "./render/detail.js";
import { initAutocomplete } from "./search/autocomplete.js";
import { initMergedSearch, initSectionSearch } from "./search/multi-search.js";
import { initScopedSearch } from "./search/search.js";
import { initStaticLists } from "./browse/static-list.js";
// Which wf-algolia element types are allowed to claim their host <form>.
//
// Principle: an element claims a form only if it CARRIES A NATIVE INPUT CONTROL
// — a text box, a number/range box, a <select>, or a checkbox/radio group. Those
// are exactly the controls that fire implicit form submission when the user
// presses Enter, so the host form has to be neutralised for the search UI to
// work at all.
//
// Render-only markup NEVER claims a form: `browse`, `results`, `hit-preview`,
// `no-results`, `loader`, `results-count`, `filter-count`, `section`,
// `search-wrapper`, `scope-facet`, `detail`, `recommend-grid`, `pagination`,
// the `filter-tag-*` chips, `sort-group`/`sort-item` and every other output or
// click-only container. That markup is legitimately embedded inside real forms
// that the site still needs to submit, and claiming it would silently kill
// those submissions.
var FORM_CLAIMING_ELEMENTS = new Set([
    "search-input", // text input — Enter submits the host form
    "browse-search", // text input on a browse block — same
    "filter-search", // text input for facet-value search (SFFV) — same
    "filter-group", // wraps checkbox/radio inputs, or a native <select>
    "filter-item", // the individual checkbox/radio wrapper
    "range-min", // numeric/range input
    "range-max", // numeric/range input
    "sort", // native <select> bound by initSortSelect()
  ]),
  // Escape hatch: put wf-algolia-allow-submit="true" on the <form> (or any
  // ancestor, e.g. the Webflow .w-form block) to keep native/Webflow submission
  // even when the form does contain claiming elements.
  FORM_ALLOW_SUBMIT_SELECTOR = '[wf-algolia-allow-submit="true"]';
function handleFormBlocks() {
  let e = new Set();
  (document.querySelectorAll("[wf-algolia-element]").forEach((t) => {
    if (!FORM_CLAIMING_ELEMENTS.has(t.getAttribute("wf-algolia-element")))
      return;
    let n = t.closest("form");
    n && !n.closest(FORM_ALLOW_SUBMIT_SELECTOR) && e.add(n);
  }),
    e.forEach((t) => {
      t.addEventListener("submit", (i) => {
        (i.preventDefault(), i.stopPropagation());
      });
      let n = t.closest(".w-form") || t.parentElement;
      if (n) {
        let i = n.querySelector(".w-form-done"),
          o = n.querySelector(".w-form-fail");
        (i && (i.style.display = "none"), o && (o.style.display = "none"));
      }
      let r = t.querySelector('input[type="submit"], button[type="submit"]');
      r && (r.style.display = "none");
    }));
}
window.Webflow || (window.Webflow = []);
window.Webflow.push(async () => {
  try {
    initDebugAudit();
    let e = initConfig(),
      t = initClient(e),
      n = scanAttributes();
    (handleFormBlocks(),
      initAccessibility(n),
      n.has("browse") && initBrowsePage(t, e, n),
      n.has("browse") && initStaticLists(t, e, n),
      initStandaloneFilterGroups(t, n, document),
      n.has("hit-preview") && initHitPreviews(t, n),
      n.has("facet-stat") && initFacetStats(t, n),
      initSelectFilters(() => emit("refresh")),
      n.has("detail") && initDetailPage(t, e, n),
      n.has("recommend") && initRecommendations(t, e, n),
      initScopedSearch(t, e, n),
      initSectionSearch(t, e, n),
      initMergedSearch(t, e, n),
      n.has("autocomplete") && initAutocomplete(t, e, n),
      e.insights && initInsights(e),
      exposePublicAPI(t, e),
      (window.WfAlgolia.__sanitize = sanitizeHtml),
      emit("ready"));
  } catch (e) {
    console.error("[wf-algolia] Initialization failed:", e);
  }
});
