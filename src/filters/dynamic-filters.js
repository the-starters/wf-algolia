// filters/dynamic-filters — split from app.carved.js (see docs/MODULE-MAP.md)
import { getTextTemplate, interpolate } from "../utils/format.js";
import { FILTER_STATE } from "../core/filter-state.js";
import { formatFacetLabel, getLabelMode } from "./hierarchy.js";
import { reapplyShowMore } from "./show-more.js";
import { removeInjected } from "../render/template.js";
import { cssEscape, findTemplateFor, getTemplateParent } from "../core/attributes.js";
export async function fetchFacetValues(e, t, n, r) {
  let o = (
    await e.initIndex(t).search("", {
      facets: [n],
      hitsPerPage: 0,
      ...(r && r.length > 0
        ? {
            facetFilters: r,
          }
        : {}),
    })
  ).facets?.[n];
  return !o || Object.keys(o).length === 0
    ? []
    : Object.entries(o).sort((l, s) => s[1] - l[1]);
}
export async function fetchFacetsBatch(e, t, n, r) {
  let i = await e.initIndex(t).search("", {
      facets: n,
      hitsPerPage: 0,
      maxValuesPerFacet: 50,
      ...(r && r.length > 0
        ? {
            facetFilters: r,
          }
        : {}),
    }),
    o = new Map();
  for (let l of n) {
    let s = i.facets?.[l];
    s &&
      Object.keys(s).length > 0 &&
      o.set(
        l,
        Object.entries(s).sort((c, m) => m[1] - c[1]),
      );
  }
  return o;
}
export function initDynamicFilters(e, t, n) {
  let r = [
    ...document.querySelectorAll(
      '[wf-algolia-element="filter-group"][wf-algolia-facet]',
    ),
  ].filter((i) => i.closest('[wf-algolia-element="browse"]'));
  r.length !== 0 &&
    Promise.all(r.map((i) => populateDynamicGroup(e, t, i)))
      .then(() => n())
      .catch((i) => console.error("[wf-algolia] Dynamic filters failed:", i));
}
async function populateDynamicGroup(e, t, n, r) {
  let i = n.getAttribute("wf-algolia-facet"),
    o = n.querySelector(
      `[wf-algolia-element="filter-group"][wf-algolia-field="${cssEscape(i)}"], [wf-algolia-element="filter-group"][wf-algolia-facet="${cssEscape(i)}"]`,
    );
  if (o && o !== n) return;
  let l = n.querySelector('[wf-algolia-element="filter-field-text"]');
  if (l) {
    let m = n.getAttribute("wf-algolia-field-label") ?? i,
      g = getTextTemplate(l, "{field}");
    l.textContent = interpolate(g, {
      field: m,
    });
  }
  let s =
      n.getAttribute("wf-algolia-index") ||
      n
        .closest('[wf-algolia-element="browse"]')
        ?.getAttribute("wf-algolia-index") ||
      null,
    c = findTemplateFor(n, t, "filter-template");
  if (!s || !c) {
    console.error(
      `[wf-algolia] Dynamic filter "${i}" missing index=${!!s} template=${!!c}. Elements map has filter-template: ${t.has("filter-template")} (${(t.get("filter-template") || []).length} items)`,
    );
    return;
  }
  try {
    let m = await fetchFacetValues(e, s, i, r?.facetFilters);
    if (m.length === 0) {
      console.error(`[wf-algolia] No facet values for "${i}" on "${s}"`);
      return;
    }
    let g = getTemplateParent(c) ?? n,
      u = getLabelMode(n);
    (removeInjected(n),
      m.forEach(([y, b]) => {
        let w = c.cloneNode(!0);
        (w.removeAttribute("wf-algolia-element"),
          w.classList.add("wf-algolia-injected"),
          w.setAttribute("wf-algolia-element", "filter-item"),
          w.setAttribute("wf-algolia-value", y),
          w.querySelectorAll("*").forEach((k) => {
            k.style.display === "none" && (k.style.display = "");
          }));
        let E =
          w.querySelector('[wf-algolia-element="filter-value-text"]') ||
          w.querySelector(".wf-fi-name") ||
          Array.from(w.children).find(
            (k) => !k.getAttribute?.("wf-algolia-element"),
          );
        E && (E.textContent = formatFacetLabel(y, u));
        let T = w.querySelector('[wf-algolia-element="filter-count"]');
        (T && (T.textContent = String(b)),
          w.querySelector("input") ||
            (w.setAttribute("role", "button"), w.setAttribute("tabindex", "0")),
          g.appendChild(w));
      }),
      reapplyShowMore(n));
    let h = n.querySelector('[wf-algolia-element="filter-group-count"]');
    if (h) {
      let y = m.length,
        b = getTextTemplate(h, "{count}");
      h.textContent = interpolate(b, {
        distinct: y,
        count: y,
      });
    }
  } catch (m) {
    console.error(`[wf-algolia] Dynamic filter "${i}" failed:`, m);
  }
}
export async function refreshChildGroup(e, t, n, r) {
  if (r.length === 0) return;
  let i = r.map(({ field: o, value: l }) => [`${o}:${l}`]);
  await populateDynamicGroup(e, t, n, {
    facetFilters: i,
  });
}
export function syncDynamicFacetCounts(e) {
  document
    .querySelectorAll('[wf-algolia-element="filter-group"][wf-algolia-facet]')
    .forEach((t) => {
      if (!t.closest('[wf-algolia-element="browse"]')) return;
      let n = t.getAttribute("wf-algolia-facet"),
        r = e[n] || {};
      t.querySelectorAll('[wf-algolia-element="filter-item"]').forEach((i) => {
        let o = i.getAttribute("wf-algolia-value");
        if (!o) return;
        let l = r[o] ?? 0,
          s = i.querySelector('[wf-algolia-element="filter-count"]');
        s && (s.textContent = String(l));
        let c = t.getAttribute("wf-algolia-zeroclass") || "is-disabled",
          m = i.hasAttribute("data-wf-algolia-active");
        l === 0 && !m ? i.classList.add(c) : i.classList.remove(c);
      });
    });
}
export function toggleGroupsByFacetPresence(e) {
  document
    .querySelectorAll('[wf-algolia-element="filter-group"][wf-algolia-field]')
    .forEach((t) => {
      if (t.hasAttribute("wf-algolia-refines")) return;
      let n = t.getAttribute("wf-algolia-field"),
        r = e[n],
        i = r && Object.keys(r).length > 0,
        o = !!FILTER_STATE[n];
      i || o ? (t.style.display = "") : (t.style.display = "none");
    });
}
