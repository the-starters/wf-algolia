// filters/standalone-filter-groups — split from app.carved.js (see docs/MODULE-MAP.md)
import { emit, on } from "../core/events.js";
import { slugify } from "../utils/misc.js";
import { HIERARCHY_SEPARATOR, applyParentEmptyBehavior, clearParentEmptyBehavior, collectDescendants, formatFacetLabel, getAncestorSelections, getChildLink, getGroupField, getLabelMode, isParentGroup, leafValue, parseWhenParentEmpty, registerChildLink, registerGroup } from "./hierarchy.js";
import { removeInjected } from "../render/template.js";
import { findTemplateFor, getCascadingAttr, getTemplateParent } from "../core/attributes.js";
import { fetchFacetValues, fetchFacetsBatch } from "./dynamic-filters.js";
import { enc } from "../browse/url-sync.js";
import { refreshHitPreviews } from "../elements/hit-preview.js";
var standaloneParentSelection = new Map(),
  linkTemplateByGroup = new Map(),
  slugifyByGroup = new Map(),
  standaloneParentChangeHandler = null,
  standaloneConfigByEl = new Map();
function getGroupTemplate(e, t) {
  return findTemplateFor(e, t, "filter-template");
}
function resolveLinkTemplate(e, t) {
  let n = e.getAttribute("wf-algolia-link-template");
  if (n) return n;
  let r = e.closest("[wf-algolia-link-template]");
  if (r) return r.getAttribute("wf-algolia-link-template");
  if (t) {
    let i = linkTemplateByGroup.get(t);
    if (i) return i;
  }
  return null;
}
function resolveSlugify(e, t) {
  let n = e.getAttribute("wf-algolia-slugify");
  if (n !== null) return n === "true";
  let r = e.closest("[wf-algolia-slugify]");
  if (r) return r.getAttribute("wf-algolia-slugify") === "true";
  if (t) {
    let i = slugifyByGroup.get(t);
    if (i !== void 0) return i;
  }
  return !1;
}
function stampScopeFacetValue(e, t) {
  e.querySelectorAll('[wf-algolia-element="scope-facet"]').forEach((n) =>
    n.setAttribute("wf-algolia-value", t),
  );
}
function renderStandaloneItems(e, t, n) {
  removeInjected(e);
  let r = getTemplateParent(t) ?? e,
    i = [],
    o = getCascadingAttr(e, "activeclass", "is-active"),
    l = getCascadingAttr(e, "hideclass", "is-hidden"),
    s = getCascadingAttr(e, "zeroclass", "is-disabled"),
    c = getLabelMode(e);
  return (
    n.forEach(([m, g]) => {
      let u = t.cloneNode(!0);
      (u.removeAttribute("wf-algolia-element"),
        u.classList.add("wf-algolia-injected"),
        u.setAttribute("wf-algolia-element", "filter-item"),
        u.setAttribute("wf-algolia-value", m),
        u.classList.remove(o, l, s),
        u.removeAttribute("data-wf-algolia-active"),
        u.querySelectorAll("*").forEach((b) => {
          b.style.display === "none" && (b.style.display = "");
        }));
      let h =
        u.querySelector('[wf-algolia-element="filter-value-text"]') ||
        u.querySelector(".wf-fi-name") ||
        Array.from(u.children).find(
          (b) => !b.getAttribute?.("wf-algolia-element"),
        );
      h && (h.textContent = formatFacetLabel(m, c));
      let y = u.querySelector('[wf-algolia-element="filter-count"]');
      (y && (y.textContent = String(g)),
        u.querySelector("input") ||
          (u.setAttribute("role", "button"), u.setAttribute("tabindex", "0")),
        stampScopeFacetValue(u, m),
        r.appendChild(u),
        i.push(u));
    }),
    i
  );
}
function populateNestedChildGroups(e, t, n, r, i) {
  let o = Array.from(n.querySelectorAll('[wf-algolia-element="filter-group"]'));
  o.length !== 0 &&
    o.forEach((l) => {
      let s =
        l.getAttribute("wf-algolia-facet") ||
        l.getAttribute("wf-algolia-field");
      if (!s) return;
      let c = getGroupTemplate(l, i);
      if (!c) return;
      let m = l.getAttribute("wf-algolia-group-id"),
        g = null;
      if (
        (m &&
          (g = e.querySelector(
            `[wf-algolia-element="filter-group"][wf-algolia-group-id="${m}"]`,
          )),
        g ||
          (g = e.querySelector(
            `[wf-algolia-element="filter-group"][wf-algolia-facet="${s}"]`,
          )),
        !g)
      )
        return;
      let u = t + HIERARCHY_SEPARATOR,
        y = (r.get(s) ?? [])
          .filter(([D]) => D.startsWith(u))
          .map(([D, K]) => [D, K]);
      if (y.length === 0) return;
      let b = getCascadingAttr(l, "activeclass", "is-active"),
        w = getCascadingAttr(l, "hideclass", "is-hidden"),
        E = getCascadingAttr(l, "zeroclass", "is-disabled"),
        T = getTemplateParent(c) ?? g,
        k = g.contains(T) ? T : g;
      y.forEach(([D, K]) => {
        let C = c.cloneNode(!0);
        (C.removeAttribute("wf-algolia-element"),
          C.classList.add("wf-algolia-injected"),
          C.setAttribute("wf-algolia-element", "filter-item"),
          C.setAttribute("wf-algolia-value", D),
          C.classList.remove(b, w, E),
          C.removeAttribute("data-wf-algolia-active"),
          C.querySelectorAll("*").forEach((X) => {
            X.style.display === "none" && (X.style.display = "");
          }));
        let ee = D.startsWith(u) ? D.slice(u.length) : D,
          ye =
            C.querySelector('[wf-algolia-element="filter-value-text"]') ||
            C.querySelector(".wf-fi-name") ||
            Array.from(C.children).find(
              (X) => !X.getAttribute?.("wf-algolia-element"),
            );
        ye && (ye.textContent = ee);
        let he = C.querySelector('[wf-algolia-element="filter-count"]');
        (he && (he.textContent = String(K)),
          C.querySelector("input") ||
            (C.setAttribute("role", "button"), C.setAttribute("tabindex", "0")),
          stampScopeFacetValue(C, D),
          k.appendChild(C));
      });
    });
}
function buildNavUrl(e, t, n, r = !1) {
  let i = r ? slugify(leafValue(n)) : enc(n);
  return e.replace("{field}", enc(t)).replace("{value}", i);
}
function snapshotParentSelections() {
  let e = {};
  return (
    standaloneParentSelection.forEach((t, n) => {
      let r = getGroupField(n);
      r &&
        (e[r] = {
          type: "checkbox",
          match: "or",
          values: new Set([t]),
        });
    }),
    e
  );
}
export async function initStandaloneFilterGroups(e, t, n) {
  let r = Array.from(n.querySelectorAll('[wf-algolia-element="filter-group"]')),
    i = t.get("filter-group") ?? [],
    l = Array.from(new Set([...r, ...i])).filter(
      (u) =>
        !(
          u.closest('[wf-algolia-element="browse"]') ||
          !u.getAttribute("wf-algolia-index")
        ),
    );
  if (l.length === 0) return;
  (l.forEach((u) => {
    let h =
        u.getAttribute("wf-algolia-field") ||
        u.getAttribute("wf-algolia-facet") ||
        null,
      y = u.getAttribute("wf-algolia-group-id");
    if ((h && y && registerGroup(y, h, u), y)) {
      let b = u.getAttribute("wf-algolia-link-template");
      b && linkTemplateByGroup.set(y, b);
      let w = u.getAttribute("wf-algolia-slugify");
      w !== null && slugifyByGroup.set(y, w === "true");
    }
  }),
    l.forEach((u) => {
      let h = u.getAttribute("wf-algolia-refines");
      if (!h) return;
      let y =
        u.getAttribute("wf-algolia-field") ||
        u.getAttribute("wf-algolia-facet") ||
        null;
      if (!y) return;
      let b = getGroupField(h);
      if (!b) {
        console.warn(
          `[wf-algolia] standalone filter-group refines '${h}' but no parent with that id was found; skipping hierarchy.`,
        );
        return;
      }
      let w = parseWhenParentEmpty(u);
      applyParentEmptyBehavior(u, w);
      let E = getChildLink(h),
        T = E ? E.depth + 1 : 1;
      registerChildLink({
        groupId: u.getAttribute("wf-algolia-group-id") || `__standalone:${y}`,
        parentGroupId: h,
        childEl: u,
        childField: y,
        parentField: b,
        whenParentEmpty: w,
        depth: T,
      });
    }));
  let s = l
    .map((u) => {
      let h =
          u.getAttribute("wf-algolia-facet") ||
          u.getAttribute("wf-algolia-field") ||
          null,
        y = u.getAttribute("wf-algolia-index"),
        b = u.getAttribute("wf-algolia-refines");
      if (!h || !y) return null;
      let w = resolveLinkTemplate(u, b),
        E = resolveSlugify(u, b),
        T = u.getAttribute("wf-algolia-group-id") || `__standalone:${h}`,
        k = getGroupTemplate(u, t);
      return {
        el: u,
        facetField: h,
        indexName: y,
        linkTemplate: w,
        slugify: E,
        groupId: T,
        template: k,
      };
    })
    .filter((u) => u !== null);
  if (s.length === 0) return;
  (s.forEach((u) => standaloneConfigByEl.set(u.el, u)),
    s.forEach((u) => {
      (u.el.addEventListener("click", (h) => {
        let y = h.target;
        if (!y) return;
        let b = y.closest('[wf-algolia-element="filter-item"]');
        if (!b || !u.el.contains(b)) return;
        let w =
          b.getAttribute("wf-algolia-value") ??
          (b instanceof HTMLInputElement ? b.value : null);
        w == null ||
          w === "" ||
          (h.preventDefault(),
          isParentGroup(u.groupId)
            ? (standaloneParentSelection.set(u.groupId, w),
              emit("filter:parent-change", {
                parentGroupId: u.groupId,
                parentField: u.facetField,
                newValue: w,
                selectedValues: [w],
              }))
            : u.linkTemplate &&
              window.location.assign(
                buildNavUrl(u.linkTemplate, u.facetField, w, u.slugify),
              ));
      }),
        u.el.addEventListener("keydown", (h) => {
          if (h.key !== "Enter" && h.key !== " ") return;
          let y = h.target;
          if (!y) return;
          let b = y.closest('[wf-algolia-element="filter-item"]');
          !b ||
            !u.el.contains(b) ||
            b.querySelector("input") ||
            (h.preventDefault(), b.click());
        }));
    }),
    standaloneParentChangeHandler === null &&
      ((standaloneParentChangeHandler = (u) => {
        let h = collectDescendants(u.parentGroupId);
        h.length !== 0 &&
          h.forEach((y) => {
            if (y.childEl.closest('[wf-algolia-element="browse"]')) return;
            let b = standaloneConfigByEl.get(y.childEl);
            if (!b || !b.template) return;
            let w = snapshotParentSelections(),
              E = getAncestorSelections(y, w);
            if (E.length === y.depth) {
              clearParentEmptyBehavior(y.childEl, y.whenParentEmpty);
              let T = E.map(({ field: k, value: D }) => [`${k}:${D}`]);
              fetchFacetValues(e, b.indexName, b.facetField, T)
                .then((k) => {
                  k.length > 0 &&
                    b.template &&
                    (renderStandaloneItems(y.childEl, b.template, k),
                    refreshHitPreviews(e));
                })
                .catch((k) => {
                  (console.warn(
                    "[wf-algolia] standalone child re-scope failed:",
                    k,
                  ),
                    emit("error", k));
                });
            } else
              (applyParentEmptyBehavior(y.childEl, y.whenParentEmpty),
                y.childEl
                  .querySelectorAll(".wf-algolia-injected")
                  .forEach((T) => T.remove()));
          });
      }),
      on("filter:parent-change", standaloneParentChangeHandler)));
  let c = new Set();
  s.forEach((u) => {
    u.template &&
      u.template
        .querySelectorAll('[wf-algolia-element="filter-group"]')
        .forEach((h) => c.add(h));
  });
  let m = s.filter((u) =>
    c.has(u.el)
      ? !1
      : u.el.getAttribute("wf-algolia-refines")
        ? parseWhenParentEmpty(u.el) !== "hide"
        : !0,
  );
  async function g(u) {
    if (u.template && !u.el.querySelector(".wf-algolia-injected"))
      try {
        let h = Array.from(
          u.template.querySelectorAll('[wf-algolia-element="filter-group"]'),
        );
        if (h.length > 0) {
          let y = h
              .map(
                (T) =>
                  T.getAttribute("wf-algolia-facet") ||
                  T.getAttribute("wf-algolia-field") ||
                  "",
              )
              .filter((T) => T !== ""),
            b = [u.facetField, ...y],
            w = await fetchFacetsBatch(e, u.indexName, b),
            E = w.get(u.facetField) ?? [];
          E.length > 0 &&
            renderStandaloneItems(u.el, u.template, E).forEach((k) => {
              let D = k.getAttribute("wf-algolia-value");
              D != null && populateNestedChildGroups(k, D, u.template, w, t);
            });
        } else {
          let y = await fetchFacetValues(e, u.indexName, u.facetField);
          y.length > 0 && renderStandaloneItems(u.el, u.template, y);
        }
      } catch (h) {
        console.error(
          `[wf-algolia] standalone filter-group "${u.facetField}" failed:`,
          h,
        );
      }
  }
  await Promise.all(m.map(g));
  try {
    await refreshHitPreviews(e);
  } catch (u) {
    console.error(
      "[wf-algolia] standalone post-population hit-preview refresh failed:",
      u,
    );
  }
}
