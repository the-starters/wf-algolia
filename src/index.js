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
function handleFormBlocks() {
  let e = new Set();
  (document.querySelectorAll("[wf-algolia-element]").forEach((t) => {
    let n = t.closest("form");
    n && e.add(n);
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
