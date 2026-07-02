// elements/facet-stat — split from app.carved.js (see docs/MODULE-MAP.md)
import { formatValue, getTextTemplate, interpolate } from "../utils/format.js";
import { readBaseFilter } from "../utils/base-filter.js";
import { searchWithMiddleware } from "../api/public-api.js";
var STAT_KEYS = ["min", "max", "avg", "sum"],
  warnedStatNoField = new WeakSet(),
  warnedStatBadStat = new WeakSet(),
  warnedStatNoIndex = new WeakSet(),
  warnedStatNoStats = new WeakSet();
function resolveStatIndex(e) {
  let t = e.getAttribute("wf-algolia-index");
  if (t) return t;
  let n = e.closest("[wf-algolia-index]");
  if (n && n !== e) {
    let i = n.getAttribute("wf-algolia-index");
    if (i) return i;
  }
  return (
    document.querySelector("script[data-app-id]")?.getAttribute("data-index") ||
    ""
  );
}
export function initFacetStats(e, t) {
  (t.get("facet-stat") ?? []).forEach((r) => void renderFacetStat(e, r));
}
function renderFacetStat(e, t) {
  let n = t.getAttribute("wf-algolia-field");
  if (!n)
    return (
      warnedStatNoField.has(t) ||
        (warnedStatNoField.add(t),
        console.error(
          "[wf-algolia] facet-stat missing required wf-algolia-field.",
          t,
        )),
      Promise.resolve()
    );
  let r = t.getAttribute("wf-algolia-stat");
  if (!r || !STAT_KEYS.includes(r))
    return (
      warnedStatBadStat.has(t) ||
        (warnedStatBadStat.add(t),
        console.error(
          `[wf-algolia] facet-stat wf-algolia-stat must be one of ${STAT_KEYS.join("|")} (got "${r ?? ""}").`,
          t,
        )),
      Promise.resolve()
    );
  let i = resolveStatIndex(t);
  if (!i)
    return (
      warnedStatNoIndex.has(t) ||
        (warnedStatNoIndex.add(t),
        console.error(
          "[wf-algolia] facet-stat missing required wf-algolia-index.",
          t,
        )),
      Promise.resolve()
    );
  let o =
      t.closest(
        "[wf-algolia-base-filter-value], [wf-algolia-base-filter-field], [wf-algolia-base-filter]",
      ) ?? t,
    l = readBaseFilter(o, "wf-algolia-base-filter", (c) =>
      console.warn(`[wf-algolia] facet-stat ${c}`, t),
    ),
    s = {
      facets: [n],
      hitsPerPage: 0,
      ...(l
        ? {
            facetFilters: l,
          }
        : {}),
    };
  return searchWithMiddleware(s, (c) => e.initIndex(i).search("", c))
    .then((c) => {
      let g = c.facets_stats?.[n]?.[r];
      if (g == null) {
        warnedStatNoStats.has(t) ||
          (warnedStatNoStats.add(t),
          console.warn(
            `[wf-algolia] facet-stat: no numeric stats for "${n}" on "${i}". Ensure "${n}" is numeric and listed in attributesForFaceting. Leaving the authored text.`,
            t,
          ));
        return;
      }
      let u = t.getAttribute("wf-algolia-format"),
        h = u ? formatValue(g, u) : String(g),
        y = getTextTemplate(t, "{value}");
      t.textContent = interpolate(y, {
        value: h,
      });
    })
    .catch((c) => {
      console.error("[wf-algolia] facet-stat query failed:", c);
    });
}
