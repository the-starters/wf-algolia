// elements/facet-stat — split from app.carved.js (see docs/MODULE-MAP.md)
import { formatValue, getTextTemplate, interpolate } from "../utils/format.js";
import { readBaseFilter, splitFacetFilter } from "../utils/base-filter.js";
import { HIERARCHY_SEPARATOR, matchLeafInVocabulary } from "../filters/hierarchy.js";
import { searchWithMiddleware } from "../api/public-api.js";
var STAT_KEYS = ["min", "max", "avg", "sum"],
  warnedStatNoField = new WeakSet(),
  warnedStatBadStat = new WeakSet(),
  warnedStatNoIndex = new WeakSet(),
  warnedStatNoStats = new WeakSet(),
  warnedStatBadResolve = new WeakSet(),
  warnedStatLeafMissing = new WeakSet(),
  warnedStatLeafAmbiguous = new WeakSet();
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
function readResolveMode(e, t) {
  let n = e.getAttribute("wf-algolia-base-filter-resolve");
  if (n === null) return null;
  let r = n.trim();
  return r === "leaf"
    ? "leaf"
    : (warnedStatBadResolve.has(t) ||
        (warnedStatBadResolve.add(t),
        console.warn(
          `[wf-algolia] Unknown wf-algolia-base-filter-resolve='${n}'; valid value: 'leaf'. Treating as absent.`,
          t,
        )),
      null);
}
async function resolveLeafBaseFilter(e, t, n, r) {
  let i = splitFacetFilter(n);
  if (i === null || i.value.includes(HIERARCHY_SEPARATOR)) return n;
  let o = await matchLeafInVocabulary(e, t, i.field, i.value);
  return o.length === 1
    ? [[`${i.field}:${o[0]}`]]
    : o.length === 0
      ? (warnedStatLeafMissing.has(r) ||
          (warnedStatLeafMissing.add(r),
          console.warn(
            `[wf-algolia] facet-stat: leaf "${i.value}" not found in "${i.field}" vocabulary on "${t}". Leaving the authored text.`,
            r,
          )),
        !1)
      : (warnedStatLeafAmbiguous.has(r) ||
          (warnedStatLeafAmbiguous.add(r),
          console.error(
            `[wf-algolia] facet-stat: leaf "${i.value}" is ambiguous in "${i.field}" on "${t}" — matches ${o.join(" | ")}. Leaving the authored text.`,
            r,
          )),
        !1);
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
    s = readResolveMode(o, t);
  return (
    s === "leaf" && l !== null
      ? resolveLeafBaseFilter(e, i, l, t)
      : Promise.resolve(l)
  )
    .then((c) => {
      if (c === !1) return null;
      let m = {
        facets: [n],
        hitsPerPage: 0,
        ...(c
          ? {
              facetFilters: c,
            }
          : {}),
      };
      return searchWithMiddleware(m, (g) => e.initIndex(i).search("", g));
    })
    .then((c) => {
      if (c === null) return;
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
