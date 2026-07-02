// filters/filter-search — split from app.carved.js (see docs/MODULE-MAP.md)
import { getTextTemplate, interpolate } from "../utils/format.js";
import { debounce } from "../utils/debounce.js";
import { FILTER_STATE } from "../core/filter-state.js";
import { reapplyShowMore } from "./show-more.js";
import { removeInjected } from "../render/template.js";
import { findTemplateFor, getTemplateParent } from "../core/attributes.js";
var SFFV_DEFAULT_DEBOUNCE = 200,
  warnedNotSearchable = new WeakSet(),
  LOCAL_HIDDEN_ATTR = "data-wf-algolia-local-hidden";
function localFilterSearch(e, t, n) {
  let r = n.trim().toLowerCase(),
    i = [...e.querySelectorAll('[wf-algolia-element="filter-search-results"]')],
    o = (m) => i.some((g) => g.contains(m)),
    l = [...e.querySelectorAll('[wf-algolia-element="filter-item"]')].filter(
      (m) => !o(m),
    ),
    s = 0;
  for (let m of l) {
    if (r === "") {
      (m.hasAttribute(LOCAL_HIDDEN_ATTR) &&
        (m.removeAttribute(LOCAL_HIDDEN_ATTR),
        m.style.removeProperty("display")),
        s++);
      continue;
    }
    (
      m.querySelector('[wf-algolia-element="filter-value-text"]')
        ?.textContent ??
      m.textContent ??
      ""
    )
      .trim()
      .toLowerCase()
      .includes(r)
      ? (m.hasAttribute(LOCAL_HIDDEN_ATTR) &&
          (m.removeAttribute(LOCAL_HIDDEN_ATTR),
          m.style.removeProperty("display")),
        s++)
      : (m.setAttribute(LOCAL_HIDDEN_ATTR, "true"), (m.style.display = "none"));
  }
  let c = r === "" ? !0 : s > 0;
  renderSffvEmpty(t, n.trim(), c);
}
function resolveGroupIndex(e) {
  let t = e.getAttribute("wf-algolia-index");
  if (t) return t;
  let n = e.closest("[wf-algolia-index]");
  if (n && n !== e) {
    let o = n.getAttribute("wf-algolia-index");
    if (o) return o;
  }
  return (
    document.querySelector("script[data-app-id]")?.getAttribute("data-index") ??
    null
  );
}
function resolveSffvDebounce(e, t) {
  let n =
    e.getAttribute("wf-algolia-debounce") ??
    t.getAttribute("wf-algolia-debounce");
  if (n === null || n === "") return SFFV_DEFAULT_DEBOUNCE;
  let r = parseInt(n, 10);
  return Number.isNaN(r) ? SFFV_DEFAULT_DEBOUNCE : Math.max(0, r);
}
function parentScopeFacetFilters(e) {
  let t = e.getAttribute("wf-algolia-refines");
  if (!t) return;
  let n = document.querySelector(
    `[wf-algolia-element="filter-group"][wf-algolia-group-id="${t}"]`,
  );
  if (!n) return;
  let r = n.getAttribute("wf-algolia-field");
  if (!r) return;
  let i = FILTER_STATE[r];
  return !i?.values || i.values.size === 0
    ? void 0
    : [[...i.values].map((l) => `${r}:${l}`)];
}
function renderSffvInline(e, t, n, r) {
  let i = getTemplateParent(r) ?? e;
  removeInjected(e);
  let o = e.getAttribute("wf-algolia-activeclass") || "is-active",
    s = FILTER_STATE[t]?.values ?? new Set();
  n.forEach(({ value: c, count: m }) => {
    let g = r.cloneNode(!0);
    (g.removeAttribute("wf-algolia-element"),
      g.classList.add("wf-algolia-injected"),
      g.setAttribute("wf-algolia-element", "filter-item"),
      g.setAttribute("wf-algolia-value", c),
      g.querySelectorAll("*").forEach((y) => {
        y.style.display === "none" && (y.style.display = "");
      }));
    let u =
      g.querySelector('[wf-algolia-element="filter-value-text"]') ||
      g.querySelector(".wf-fi-name") ||
      Array.from(g.children).find(
        (y) => !y.getAttribute?.("wf-algolia-element"),
      );
    u && (u.textContent = c);
    let h = g.querySelector('[wf-algolia-element="filter-count"]');
    (h && (h.textContent = String(m)),
      g.querySelector("input") ||
        (g.setAttribute("role", "button"), g.setAttribute("tabindex", "0")),
      s.has(c) &&
        (g.setAttribute("data-wf-algolia-active", "true"), g.classList.add(o)),
      i.appendChild(g));
  });
}
function renderSffvEmpty(e, t, n) {
  if (!e) return;
  if (n) {
    e.style.display = "none";
    return;
  }
  let r = getTextTemplate(e, "");
  (r &&
    (e.textContent = interpolate(r, {
      query: t,
    })),
    (e.style.display = ""));
}
function findScopedRole(e, t, n) {
  let r = e.querySelector(`[wf-algolia-element="${n}"]`);
  if (r) return r;
  let i = typeof CSS < "u" && CSS.escape ? CSS.escape(t) : t,
    o = document.querySelectorAll(
      `[wf-algolia-element="${n}"][wf-algolia-field="${i}"]`,
    );
  for (let l of o) {
    let s = l.closest('[wf-algolia-element="filter-group"]');
    if (s === null || s === e) return l;
  }
  return null;
}
export function initFilterSearch(e, t, n) {
  document
    .querySelectorAll('[wf-algolia-element="filter-group"]')
    .forEach((r) => {
      let i = r.getAttribute("wf-algolia-field");
      if (!i) return;
      let o = findScopedRole(r, i, "filter-search");
      if (!o) return;
      if (o.getAttribute("wf-algolia-search-mode") === "local") {
        let b = findScopedRole(r, i, "filter-search-empty");
        o.addEventListener("input", () => {
          localFilterSearch(r, b, o.value);
        });
        return;
      }
      let s = r.getAttribute("wf-algolia-facet") ?? i,
        c = resolveGroupIndex(r);
      if (!s || !c) return;
      let m = findScopedRole(r, i, "filter-search-empty"),
        g = findScopedRole(r, i, "filter-search-results"),
        u = g
          ? g.querySelector(
              '[wf-algolia-element="filter-search-result-template"]',
            )
          : null;
      u && u.parentElement && u.parentElement.removeChild(u);
      let h = () => {
          if (g)
            for (g.style.display = "none"; g.firstChild;)
              g.removeChild(g.firstChild);
        },
        y = debounce(
          async (b) => {
            if (b.length === 0) {
              (m && (m.style.display = "none"), g ? h() : n());
              return;
            }
            try {
              let w = parentScopeFacetFilters(r),
                E = await e.initIndex(c).searchForFacetValues(s, b, {
                  ...(w
                    ? {
                        facetFilters: w,
                      }
                    : {}),
                });
              renderSffvEmpty(m, b, E.facetHits.length > 0);
              let T = findTemplateFor(r, t, "filter-template");
              if (g) {
                let k = u ?? T;
                k &&
                  (renderSffvOverlay(g, r, i, E.facetHits, k, u !== null),
                  (g.style.display = ""));
              } else
                T &&
                  (renderSffvInline(r, i, E.facetHits, T), reapplyShowMore(r));
            } catch (w) {
              let E = w;
              if (E.status === 400 && /searchable/i.test(E.message ?? "")) {
                warnedNotSearchable.has(r) ||
                  (warnedNotSearchable.add(r),
                  console.error(`[wf-algolia] filter-search on field "${i}" requires the attribute to be marked \`searchable(${s})\` in your Algolia index's attributesForFaceting setting. SFFV disabled for this group until the index config is updated.

Fix in the Algolia dashboard:
  Configuration \u2192 Filtering and Faceting \u2192 Facets \u2192
  find "${s}" \u2192 change to "Searchable (will return facets list)" \u2192
  Review and Save Settings.

Or via the API:
  index.setSettings({ attributesForFaceting: [ "searchable(${s})", ... ] });

Verbatim Algolia error: ${E.message ?? "(no message)"}`));
                return;
              }
              throw w;
            }
          },
          resolveSffvDebounce(o, r),
        );
      (o.addEventListener("input", () => y(o.value.trim())),
        g &&
          (g.addEventListener("click", (b) => {
            let w = b.target;
            if (!w) return;
            let E = w.closest('[wf-algolia-element="filter-item"]');
            if (!E || !g.contains(E)) return;
            let T = E.getAttribute("wf-algolia-value");
            if (!T) return;
            (b.preventDefault(),
              b.stopPropagation(),
              ensureFilterItem(r, T, E).click(),
              h(),
              (o.value = ""));
          }),
          document.addEventListener("click", (b) => {
            let w = b.target;
            w && (r.contains(w) || g.contains(w) || h());
          })));
    });
}
function renderSffvOverlay(e, t, n, r, i, o = !1) {
  for (; e.firstChild;) e.removeChild(e.firstChild);
  let l = t.getAttribute("wf-algolia-activeclass") || "is-active",
    c = FILTER_STATE[n]?.values ?? new Set();
  r.forEach(({ value: m, count: g }) => {
    let u = i.cloneNode(!0);
    (u.removeAttribute("wf-algolia-element"),
      u.classList.add("wf-algolia-injected"),
      u.setAttribute("wf-algolia-element", "filter-item"),
      u.setAttribute("wf-algolia-value", m),
      o && u.setAttribute("data-wf-algolia-overlay-result", "true"),
      u.querySelectorAll("*").forEach((b) => {
        b.style.display === "none" && (b.style.display = "");
      }));
    let h =
      u.querySelector('[wf-algolia-element="filter-value-text"]') ||
      u.querySelector(".wf-fi-name") ||
      Array.from(u.children).find(
        (b) => !b.getAttribute?.("wf-algolia-element"),
      );
    h && (h.textContent = m);
    let y = u.querySelector('[wf-algolia-element="filter-count"]');
    (y && (y.textContent = String(g)),
      u.querySelector("input") ||
        (u.setAttribute("role", "button"), u.setAttribute("tabindex", "0")),
      c.has(m) &&
        (u.setAttribute("data-wf-algolia-active", "true"), u.classList.add(l)),
      e.appendChild(u));
  });
}
function ensureFilterItem(e, t, n) {
  let r = e.querySelector('[wf-algolia-element="filter-search-results"]'),
    i = typeof CSS < "u" && CSS.escape ? CSS.escape(t) : t,
    o = Array.from(
      e.querySelectorAll('[wf-algolia-element="filter-item"]'),
    ).filter((b) => !r || !r.contains(b)),
    l = o.find((b) => b.getAttribute("wf-algolia-value") === t);
  if (l) return l;
  let m = (
    e.querySelector('[wf-algolia-element="filter-template"]') ??
    o[0] ??
    n
  ).cloneNode(!0);
  (m.removeAttribute("wf-algolia-element"),
    m.setAttribute("wf-algolia-element", "filter-item"),
    m.setAttribute("wf-algolia-value", t),
    m.setAttribute("data-wf-algolia-synthesized", "true"),
    m.removeAttribute("data-wf-algolia-active"),
    m.removeAttribute("data-wf-algolia-overlay-result"));
  let g = e.getAttribute("wf-algolia-activeclass") || "is-active";
  (m.classList.remove(g),
    m.classList.add("wf-algolia-injected"),
    m.style.display === "none" && (m.style.display = ""),
    m.querySelectorAll("*").forEach((b) => {
      b.style.display === "none" && (b.style.display = "");
    }),
    m
      .querySelectorAll('input[type="checkbox"], input[type="radio"]')
      .forEach((b) => {
        b.checked = !1;
      }));
  let u =
    m.querySelector('[wf-algolia-element="filter-value-text"]') ||
    m.querySelector(".wf-fi-name");
  u && (u.textContent = t);
  let h = m.querySelector('[wf-algolia-element="filter-count"]');
  h && (h.textContent = "");
  let y = o[0]?.parentElement ?? e;
  return (y.insertBefore(m, y.firstChild), reapplyShowMore(e), m);
}
