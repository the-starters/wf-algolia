// filters/range — split from app.carved.js (see docs/MODULE-MAP.md)
import { debounce } from "../utils/debounce.js";
import { FILTER_STATE, stageFilter } from "../core/filter-state.js";
var rangeDefaults = {};
function readRangeBounds(e, t, n) {
  let r = e.getAttribute("fs-rangeslider-min"),
    i = e.getAttribute("fs-rangeslider-max"),
    o = r ?? t.getAttribute("min"),
    l = i ?? n.getAttribute("max");
  if (o === null || l === null) return null;
  let s = parseFloat(o),
    c = parseFloat(l);
  return !Number.isFinite(s) || !Number.isFinite(c)
    ? null
    : {
        min: s,
        max: c,
      };
}
export function initRangeFilters(e, t = 250) {
  for (let n of Object.keys(rangeDefaults)) delete rangeDefaults[n];
  document
    .querySelectorAll('[wf-algolia-element="filter-group"]')
    .forEach((n) => {
      let r = n.getAttribute("wf-algolia-field");
      if (!r) return;
      let i = n.querySelector('[wf-algolia-element="range-min"]'),
        o = n.querySelector('[wf-algolia-element="range-max"]'),
        l = n.querySelector('[wf-algolia-element="range-display"]');
      if (!i || !o) return;
      let s = n.getAttribute("wf-algolia-debounce"),
        c = s === null ? NaN : parseInt(s, 10),
        m = Number.isFinite(c) && c >= 0 ? c : t,
        g = n.getAttribute("wf-algolia-apply-mode"),
        u = g === "deferred";
      g !== null &&
        g !== "deferred" &&
        g !== "immediate" &&
        console.warn(
          `[wf-algolia] Unknown wf-algolia-apply-mode='${g}' on filter-group; falling back to immediate. Valid values: 'immediate' (default) | 'deferred'.`,
        );
      let h = readRangeBounds(n, i, o);
      h && (rangeDefaults[r] = h);
      let y = () => {
          let w = parseFloat(i.value),
            E = parseFloat(o.value);
          if (!Number.isFinite(w) || !Number.isFinite(E)) return;
          if (w > E) {
            i.value = o.value;
            return;
          }
          if (
            (l && (l.textContent = `${w} \u2013 ${E}`),
            h && w === h.min && E === h.max)
          ) {
            if (u) {
              FILTER_STATE[r] && (delete FILTER_STATE[r], e());
              return;
            }
            FILTER_STATE[r] && (delete FILTER_STATE[r], e());
            return;
          }
          let T = {
            type: "number",
            match: "or",
            min: w,
            max: E,
          };
          if (u) {
            (stageFilter(r, T),
              n.setAttribute("data-wf-algolia-staged", "true"));
            return;
          }
          ((FILTER_STATE[r] = T), e());
        },
        b = m > 0 ? debounce(y, m) : y;
      (i.addEventListener("input", b),
        o.addEventListener("input", b),
        l && (l.textContent = `${i.value} \u2013 ${o.value}`));
    });
}
