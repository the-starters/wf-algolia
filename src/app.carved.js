// wf-algolia 1.0.4 — carved app code (vendors replaced with npm imports).
// Source of truth for behavior: build/index.1.0.4.min.js (ISC, © Candidleap).
import wfAlgoliaInsights from "search-insights";
import algoliasearchFactory from "algoliasearch";
import recommendFactory from "@algolia/recommend";
var insights = wfAlgoliaInsights;
var eventHandlers = new Map();
function on(e, t) {
  (eventHandlers.has(e) || eventHandlers.set(e, new Set()),
    eventHandlers.get(e).add(t));
}
function off(e, t) {
  eventHandlers.get(e)?.delete(t);
}
function emit(e, ...t) {
  eventHandlers.get(e)?.forEach((n) => {
    try {
      n(...t);
    } catch (r) {
      console.warn(`[wf-algolia] Event handler error (${e}):`, r);
    }
  });
}
var WEBFLOW_CSS = {
  formBlock: "w-form",
  checkboxField: "w-checkbox",
  checkboxInput: "w-checkbox-input",
  radioField: "w-radio",
  radioInput: "w-radio-input",
  checkboxOrRadioLabel: "w-form-label",
  checkboxOrRadioFocus: "w--redirected-focus",
  checkboxOrRadioChecked: "w--redirected-checked",
  successMessage: "w-form-done",
  errorMessage: "w-form-fail",
};
var getSiteId = (e = document) =>
  e.documentElement.getAttribute("data-wf-site");
var restartWebflow = async (e) => {
  let { Webflow: t } = window;
  if (
    !(!t || !("destroy" in t) || !("ready" in t) || !("require" in t)) &&
    !(e && !e.length)
  ) {
    if ((e || (t.destroy(), t.ready()), !e || e.includes("ix2"))) {
      let n = t.require("ix2");
      if (n) {
        let { store: r, actions: i } = n,
          { eventState: o } = r.getState().ixSession,
          l = Object.entries(o);
        (e || n.destroy(),
          n.init(),
          await Promise.all(
            l.map((s) => r.dispatch(i.eventStateChanged(...s))),
          ));
      }
    }
    if (!e || e.includes("commerce")) {
      let n = t.require("commerce"),
        r = getSiteId();
      n &&
        r &&
        (n.destroy(),
        n.init({
          siteId: r,
          apiUrl: "https://render.webflow.com",
        }));
    }
    if (
      (e?.includes("lightbox") && t.require("lightbox")?.ready(),
      e?.includes("slider"))
    ) {
      let n = t.require("slider");
      n && (n.redraw(), n.ready());
    }
    return (
      e?.includes("tabs") && t.require("tabs")?.redraw(),
      new Promise((n) => t.push(() => n(void 0)))
    );
  }
};
function closeDropdownOnPick(e) {
  if (!e.closest("[wf-algolia-close-on-pick]")) return;
  let t = e.closest(".w-dropdown");
  if (!t) return;
  let n = window.$ ?? window.jQuery;
  if (typeof n == "function")
    try {
      n(t).trigger("w-close");
    } catch {}
  let r = t.querySelector(".w-dropdown-toggle"),
    i = t.querySelector(".w-dropdown-list");
  (t.classList.remove("w--open"),
    r &&
      (r.classList.remove("w--open"), r.setAttribute("aria-expanded", "false")),
    i && (i.classList.remove("w--open"), i.setAttribute("aria-hidden", "true")),
    r && r.click());
}
var FILTER_STATE = {},
  STAGING_STATE = {};
function toggleStateValue(e, t, n, r, i, o) {
  (e[t] ||
    (e[t] = {
      type: o,
      match: i,
      values: new Set(),
    }),
    r
      ? e[t].values.add(n)
      : (e[t].values.delete(n), e[t].values.size === 0 && delete e[t]));
}
function clearState(e) {
  Object.keys(e).forEach((t) => delete e[t]);
}
function stageFilter(e, t) {
  STAGING_STATE[e] = t;
}
function commitStaging(e) {
  let t = e && e.length > 0 ? e : Object.keys(STAGING_STATE);
  for (let n of t) {
    let r = STAGING_STATE[n];
    r !== void 0 && ((FILTER_STATE[n] = r), delete STAGING_STATE[n]);
  }
}
function discardStaging(e) {
  if (!e || e.length === 0) {
    for (let t of Object.keys(STAGING_STATE)) delete STAGING_STATE[t];
    return;
  }
  for (let t of e) delete STAGING_STATE[t];
}
function getEffectiveState() {
  return {
    ...FILTER_STATE,
    ...STAGING_STATE,
  };
}
var MAX_DEPTH = 5,
  HIERARCHY_SEPARATOR = " > ";
function leafValue(e) {
  let t = e.lastIndexOf(HIERARCHY_SEPARATOR);
  return t === -1 ? e : e.slice(t + HIERARCHY_SEPARATOR.length);
}
function getLabelMode(e) {
  return e.getAttribute("wf-algolia-label") === "leaf" ? "leaf" : "full";
}
function formatFacetLabel(e, t) {
  return t === "leaf" ? leafValue(e) : e;
}
var groupFieldById = new Map(),
  groupElById = new Map(),
  childLinksByParentId = new Map(),
  linkByChildEl = new WeakMap(),
  allChildLinks = [],
  linkByGroupId = new Map(),
  warnedWhenParentEmpty = new WeakSet();
function parseWhenParentEmpty(e) {
  let t = e.getAttribute("wf-algolia-when-parent-empty");
  return t === null
    ? null
    : t === "hide"
      ? "hide"
      : t === "disable"
        ? "disable"
        : (warnedWhenParentEmpty.has(e) ||
            (warnedWhenParentEmpty.add(e),
            console.warn(
              `[wf-algolia] Unknown wf-algolia-when-parent-empty='${t}'; valid values: 'hide' | 'disable'. Treating as absent.`,
              e,
            )),
          null);
}
function registerGroup(e, t, n) {
  (groupFieldById.set(e, t), groupElById.set(e, n));
}
function getGroupField(e) {
  return groupFieldById.get(e) ?? null;
}
function registerChildLink(e) {
  let t = childLinksByParentId.get(e.parentGroupId) ?? [];
  (t.push(e),
    childLinksByParentId.set(e.parentGroupId, t),
    linkByChildEl.set(e.childEl, e),
    linkByGroupId.set(e.groupId, e),
    allChildLinks.push(e));
}
function getChildLink(e) {
  return linkByGroupId.get(e) ?? null;
}
function isParentGroup(e) {
  return childLinksByParentId.has(e);
}
function getAllChildLinks() {
  return allChildLinks.slice();
}
function hideEl(e, t = "is-hidden") {
  (e.classList.add(t), e.style.setProperty("display", "none", "important"));
}
function unhideEl(e, t = "is-hidden") {
  (e.classList.remove(t), e.style.removeProperty("display"));
}
function disableEl(e, t = "is-disabled") {
  (e.classList.add(t),
    e.setAttribute("data-wf-algolia-disabled", "true"),
    e.setAttribute("aria-disabled", "true"),
    (e.style.pointerEvents = "none"));
}
function enableEl(e, t = "is-disabled") {
  (e.classList.remove(t),
    e.removeAttribute("data-wf-algolia-disabled"),
    e.removeAttribute("aria-disabled"),
    e.style.removeProperty("pointer-events"));
}
function applyParentEmptyBehavior(e, t) {
  t === "hide" ? hideEl(e) : t === "disable" && disableEl(e);
}
function clearParentEmptyBehavior(e, t) {
  t === "hide" ? unhideEl(e) : t === "disable" && enableEl(e);
}
function collectAncestors(e) {
  let t = [],
    n = new Set(),
    r = linkByGroupId.get(e);
  for (; r;) {
    if (n.has(r.groupId)) {
      (console.warn(
        `[wf-algolia] Cycle detected in hierarchy at '${r.groupId}'`,
      ),
        emit(
          "error",
          new Error(`wf-algolia: hierarchy cycle at '${r.groupId}'`),
        ));
      break;
    }
    if ((n.add(r.groupId), t.length >= MAX_DEPTH)) {
      console.warn(
        `[wf-algolia] collectAncestors exceeded MAX_DEPTH=${MAX_DEPTH} at '${r.groupId}'`,
      );
      break;
    }
    let i = linkByGroupId.get(r.parentGroupId);
    if (!i) break;
    (t.unshift(i), (r = i));
  }
  return t;
}
function collectDescendants(e) {
  let t = [],
    n = [
      {
        id: e,
        depthFromRoot: 0,
      },
    ],
    r = new WeakSet(),
    i = new Set([e]);
  for (; n.length > 0;) {
    let { id: o, depthFromRoot: l } = n.shift();
    if (l >= MAX_DEPTH) continue;
    let s = childLinksByParentId.get(o) ?? [];
    for (let c of s)
      r.has(c.childEl) ||
        (r.add(c.childEl),
        t.push(c),
        i.has(c.groupId) ||
          (i.add(c.groupId),
          n.push({
            id: c.groupId,
            depthFromRoot: l + 1,
          })));
  }
  return t;
}
function getAncestorSelections(e, t) {
  let n = collectAncestors(e.groupId),
    r = [];
  for (let o of n) {
    let l = firstValueOf(t, o.childField);
    if (l === null) return r;
    r.push({
      field: o.childField,
      value: l,
    });
  }
  let i = firstValueOf(t, e.parentField);
  return (
    i === null ||
      r.push({
        field: e.parentField,
        value: i,
      }),
    r
  );
}
function firstValueOf(e, t) {
  let n = e[t];
  return !n || !n.values || n.values.size === 0
    ? null
    : (Array.from(n.values)[0] ?? null);
}
function syncHierarchyVisibility(e) {
  for (let t of allChildLinks)
    getAncestorSelections(t, e).length === t.depth
      ? clearParentEmptyBehavior(t.childEl, t.whenParentEmpty)
      : applyParentEmptyBehavior(t.childEl, t.whenParentEmpty);
}
var activeLabelClassCache = new WeakMap(),
  WF_INPUT_VISUAL_SELECTOR = `.${WEBFLOW_CSS.radioInput}, .${WEBFLOW_CSS.checkboxInput}`;
function syncWebflowInputVisual(e, t) {
  let n = e.closest("label");
  if (
    !n ||
    !(
      n.classList.contains(WEBFLOW_CSS.radioField) ||
      n.classList.contains(WEBFLOW_CSS.checkboxField)
    )
  )
    return;
  let i = n.querySelector(WF_INPUT_VISUAL_SELECTOR);
  i &&
    (t
      ? i.classList.add(WEBFLOW_CSS.checkboxOrRadioChecked)
      : (i.classList.remove(WEBFLOW_CSS.checkboxOrRadioChecked),
        i.classList.remove(WEBFLOW_CSS.checkboxOrRadioFocus)));
}
function detectActiveLabelClasses(e, t) {
  let n = [...e.querySelectorAll("label")];
  if (n.length < 2) return null;
  let r = null;
  for (let h of n)
    if (h.querySelector("input")?.getAttribute("wf-algolia-reset") === t) {
      r = h;
      break;
    }
  if (!r) {
    for (let h of n)
      if (h.querySelector("input")?.hasAttribute("checked")) {
        r = h;
        break;
      }
  }
  if (!r) {
    let h = n.map((b) => {
        let w = [...b.classList].filter(Boolean),
          E = 0;
        for (let T of w)
          n.some((D) => D !== b && D.classList.contains(T)) || E++;
        return E;
      }),
      y = Math.max(...h);
    if (y > 0) {
      let b = n.filter((w, E) => h[E] === y);
      b.length === 1 && (r = b[0] ?? null);
    }
  }
  if (!r) return null;
  let i = n.find((h) => h !== r);
  if (!i) return null;
  let o = new Set([
      WEBFLOW_CSS.checkboxOrRadioChecked,
      WEBFLOW_CSS.checkboxOrRadioFocus,
    ]),
    l = new Set([...r.classList].filter(Boolean)),
    s = new Set([...i.classList].filter(Boolean)),
    c = [...l].filter((h) => !s.has(h) && !o.has(h)),
    m = r.querySelector(WF_INPUT_VISUAL_SELECTOR),
    g = i.querySelector(WF_INPUT_VISUAL_SELECTOR),
    u = [];
  if (m && g) {
    let h = new Set([...m.classList].filter(Boolean)),
      y = new Set([...g.classList].filter(Boolean));
    u = [...h].filter((b) => !y.has(b) && !o.has(b));
  }
  return {
    labelClasses: c,
    innerDivClasses: u,
    activeLabel: r,
  };
}
function applyActiveLabelClasses(e, t) {
  let n = activeLabelClassCache.get(e);
  if (!n) return;
  let { labelClasses: r, innerDivClasses: i } = n;
  if (
    !(r.length === 0 && i.length === 0) &&
    (e.querySelectorAll("label").forEach((o) => {
      if (o === t) return;
      r.forEach((s) => o.classList.remove(s));
      let l = o.querySelector(WF_INPUT_VISUAL_SELECTOR);
      l && i.forEach((s) => l.classList.remove(s));
    }),
    t)
  ) {
    r.forEach((l) => t.classList.add(l));
    let o = t.querySelector(WF_INPUT_VISUAL_SELECTOR);
    o && i.forEach((l) => o.classList.add(l));
  }
}
function getFieldOrFacet(e) {
  return (
    e.getAttribute("wf-algolia-field") ||
    e.getAttribute("wf-algolia-facet") ||
    null
  );
}
function setActiveDataAttr(e, t) {
  t
    ? e.setAttribute("data-wf-algolia-active", "true")
    : e.removeAttribute("data-wf-algolia-active");
}
function syncGroupActiveClasses(e) {
  let t = e.getAttribute("wf-algolia-activeclass") || "is-active";
  e.querySelectorAll('[wf-algolia-element="filter-item"]').forEach((n) => {
    let r = isItemChecked(n);
    setActiveDataAttr(n, r);
    let i = n instanceof HTMLInputElement ? n.closest("label") : null;
    r
      ? (n.classList.add(t), i && i.classList.add(t))
      : (n.classList.remove(t), i && i.classList.remove(t));
  });
}
function isItemChecked(e) {
  let t = e.querySelector('input[type="radio"]');
  if (t) return t.checked;
  let n = e.querySelector('input[type="checkbox"]');
  return n ? n.checked : e.getAttribute("data-wf-algolia-active") === "true";
}
function toggleDivItemActive(e, t, n, r) {
  if (!!t.querySelector("input")) return;
  if (r) {
    let l = t.getAttribute("data-wf-algolia-active") === "true";
    (e
      .querySelectorAll('[wf-algolia-element="filter-item"]')
      .forEach((s) => s.removeAttribute("data-wf-algolia-active")),
      l || t.setAttribute("data-wf-algolia-active", "true"));
    return;
  }
  if (n === "radio") {
    (e
      .querySelectorAll('[wf-algolia-element="filter-item"]')
      .forEach((l) => l.removeAttribute("data-wf-algolia-active")),
      t.setAttribute("data-wf-algolia-active", "true"));
    return;
  }
  t.getAttribute("data-wf-algolia-active") === "true"
    ? t.removeAttribute("data-wf-algolia-active")
    : t.setAttribute("data-wf-algolia-active", "true");
}
var warnedCascadeApplyMode = new WeakSet();
function enforceDeferredCascade() {
  document
    .querySelectorAll('[wf-algolia-element="filter-group"][wf-algolia-refines]')
    .forEach((e) => {
      let t = e.getAttribute("wf-algolia-refines");
      if (!t) return;
      let n = document.querySelector(
        `[wf-algolia-element="filter-group"][wf-algolia-group-id="${t}"]`,
      );
      if (!n) return;
      let r = n.getAttribute("wf-algolia-apply-mode") ?? "immediate",
        i = e.getAttribute("wf-algolia-apply-mode") ?? "immediate";
      if (r === "deferred" && i === "immediate") {
        if (!warnedCascadeApplyMode.has(e)) {
          warnedCascadeApplyMode.add(e);
          let o = n.getAttribute("wf-algolia-field") ?? "<unknown>",
            l = e.getAttribute("wf-algolia-field") ?? "<unknown>";
          console.warn(
            `[wf-algolia] Cascade "${o}" \u2192 "${l}" has deferred parent + immediate child. Forcing child to deferred to avoid querying against an uncommitted parent. See spec docs/specs/active/2026-05-20-deferred-apply-filter-design.md \xA711 (E2).`,
          );
        }
        e.setAttribute("wf-algolia-apply-mode", "deferred");
      }
    });
}
function initFilterGroups(e) {
  enforceDeferredCascade();
  let t = [...document.querySelectorAll('[wf-algolia-element="filter-group"]')];
  (t.forEach((n) => {
    let r = getFieldOrFacet(n),
      i = n.getAttribute("wf-algolia-group-id");
    r && i && registerGroup(i, r, n);
  }),
    t.forEach((n) => {
      let r = n.getAttribute("wf-algolia-refines");
      if (!r) return;
      let i = getFieldOrFacet(n);
      if (!i) return;
      let o = getGroupField(r),
        l = parseWhenParentEmpty(n);
      if (!o) {
        (console.warn(
          `[wf-algolia] filter-group refines '${r}' but no parent group with that id was found; falling back to independent facet.`,
        ),
          emit(
            "error",
            new Error(`wf-algolia: unknown refines target '${r}'`),
          ));
        return;
      }
      let s = getChildLink(r),
        c = s ? s.depth + 1 : 1;
      if (c > MAX_DEPTH) {
        (console.warn(
          `[wf-algolia] Hierarchy chain depth exceeds MAX_DEPTH=${MAX_DEPTH}; skipping group '${n.getAttribute("wf-algolia-group-id") || i}' (falls back to independent facet).`,
        ),
          emit("error", new Error(`wf-algolia: chain depth > ${MAX_DEPTH}`)));
        return;
      }
      (applyParentEmptyBehavior(n, l),
        registerChildLink({
          groupId: n.getAttribute("wf-algolia-group-id") || `__child:${i}`,
          parentGroupId: r,
          childEl: n,
          childField: i,
          parentField: o,
          whenParentEmpty: l,
          depth: c,
        }));
    }),
    t.forEach((n) => {
      let r = n.getAttribute("wf-algolia-group-id");
      if (!r || !isParentGroup(r)) return;
      let i = n.getAttribute("wf-algolia-type") || "checkbox";
      i !== "radio" &&
        (console.warn(
          `[wf-algolia] Non-leaf filter-group '${r}' has type='${i}'; hierarchical scoping requires radio. Coercing.`,
        ),
        emit(
          "error",
          new Error(`wf-algolia: non-leaf '${r}' coerced to radio`),
        ),
        n.setAttribute("wf-algolia-type", "radio"));
    }),
    t.forEach((n) => {
      let r = getFieldOrFacet(n);
      if (
        !r ||
        n.getAttribute("wf-algolia-type") === "select" ||
        n.querySelector('[wf-algolia-element="range-min"]') ||
        n.querySelector('[wf-algolia-element="range-max"]')
      )
        return;
      let i =
          n.getAttribute("wf-algolia-type") ||
          (n.getAttribute("wf-algolia-match") === "numeric-min"
            ? "radio"
            : "checkbox"),
        o = n.getAttribute("wf-algolia-match") || "or",
        l = i === "radio" && o === "numeric-min",
        s = n.getAttribute("wf-algolia-apply-mode"),
        c = s === "deferred";
      s !== null &&
        s !== "deferred" &&
        s !== "immediate" &&
        console.warn(
          `[wf-algolia] Unknown wf-algolia-apply-mode='${s}' on filter-group; falling back to immediate. Valid values: 'immediate' (default) | 'deferred'.`,
        );
      let m = (w) => {
        let E = w.target;
        if (!E) return;
        let T = n.getAttribute("wf-algolia-click");
        if (
          T === "noop" ||
          T === "navigate" ||
          E.closest('[wf-algolia-element="hit-preview"]')
        )
          return;
        let k = E.closest('[wf-algolia-element="filter-item"]');
        if (!k || !n.contains(k)) return;
        let D =
          k.getAttribute("wf-algolia-value") ??
          (k instanceof HTMLInputElement ? k.value : null);
        D == null ||
          D === "" ||
          (toggleDivItemActive(n, k, i, l),
          window.setTimeout(() => {
            if (c) {
              let C = isItemChecked(k);
              if (l) {
                if (C) {
                  let ye = {
                    type: "number",
                    match: "or",
                    min: parseFloat(D),
                  };
                  stageFilter(r, ye);
                } else delete STAGING_STATE[r];
              } else
                (i === "radio" && C && delete STAGING_STATE[r],
                  toggleStateValue(STAGING_STATE, r, D, C, o, "checkbox"));
              (k.setAttribute("data-wf-algolia-staged", "true"),
                renderSelectedValues(),
                renderSelectedCounts());
              let ee = n.getAttribute("wf-algolia-group-id");
              (ee &&
                isParentGroup(ee) &&
                emit("filter:parent-stage-change", {
                  field: r,
                }),
                closeDropdownOnPick(k));
              return;
            }
            if (l)
              isItemChecked(k)
                ? (FILTER_STATE[r] = {
                    type: "number",
                    match: "or",
                    min: parseFloat(D),
                  })
                : delete FILTER_STATE[r];
            else {
              let C = isItemChecked(k);
              (i === "radio" && C && delete FILTER_STATE[r],
                toggleStateValue(FILTER_STATE, r, D, C, o, "checkbox"));
            }
            syncGroupActiveClasses(n);
            let K = n.getAttribute("wf-algolia-group-id");
            if (K && isParentGroup(K)) {
              let C = FILTER_STATE[r]?.values ?? new Set();
              emit("filter:parent-change", {
                parentGroupId: K,
                parentField: r,
                newValue: C.size > 0 ? (Array.from(C)[0] ?? "") : "",
                selectedValues: Array.from(C),
              });
            }
            (closeDropdownOnPick(k), e());
          }, 0));
      };
      (n.addEventListener("click", m),
        n.addEventListener("keydown", (w) => {
          if (w.key !== "Enter" && w.key !== " ") return;
          let E = w.target;
          if (!E) return;
          let T = E.closest('[wf-algolia-element="filter-item"]');
          !T ||
            !n.contains(T) ||
            T.querySelector("input") ||
            (w.preventDefault(), T.click());
        }));
      let g = n.querySelector("form");
      g && g.addEventListener("submit", (w) => w.preventDefault());
      let u = n
        .closest('[wf-algolia-element="browse"]')
        ?.querySelector(`[wf-algolia-reset="${r}"]`);
      u &&
        u.addEventListener("click", () => {
          (delete FILTER_STATE[r],
            n
              .querySelectorAll('input[type="checkbox"], input[type="radio"]')
              .forEach((E) => {
                E !== u &&
                  ((E.checked = !1),
                  syncWebflowInputVisual(E, !1),
                  E.dispatchEvent(
                    new Event("change", {
                      bubbles: !0,
                    }),
                  ));
              }),
            u instanceof HTMLInputElement &&
              u.type === "radio" &&
              ((u.checked = !0),
              syncWebflowInputVisual(u, !0),
              u.dispatchEvent(
                new Event("change", {
                  bubbles: !0,
                }),
              )),
            n
              .querySelectorAll('[wf-algolia-element="filter-item"]')
              .forEach((E) => {
                E.removeAttribute("data-wf-algolia-active");
              }));
          let w = u instanceof HTMLInputElement ? u.closest("label") : null;
          (applyActiveLabelClasses(n, w), syncGroupActiveClasses(n), e());
        });
      let h = detectActiveLabelClasses(n, r);
      h &&
        activeLabelClassCache.set(n, {
          labelClasses: h.labelClasses,
          innerDivClasses: h.innerDivClasses,
        });
      let b = FILTER_STATE[r]?.values;
      if (b && b.size > 0) {
        let w = null;
        (n
          .querySelectorAll('[wf-algolia-element="filter-item"]')
          .forEach((E) => {
            let T =
              E.getAttribute("wf-algolia-value") ??
              (E instanceof HTMLInputElement ? E.value : null);
            if (T == null || T === "") return;
            let k = b.has(T),
              D =
                E instanceof HTMLInputElement
                  ? E
                  : E.querySelector(
                      'input[type="radio"], input[type="checkbox"]',
                    );
            (D &&
              ((D.checked = k),
              syncWebflowInputVisual(D, k),
              D.dispatchEvent(
                new Event("change", {
                  bubbles: !0,
                }),
              ),
              k && (w = D.closest("label"))),
              k && E.setAttribute("data-wf-algolia-active", "true"));
          }),
          i === "radio" &&
            u instanceof HTMLInputElement &&
            u.type === "radio" &&
            ((u.checked = !1),
            syncWebflowInputVisual(u, !1),
            u.dispatchEvent(
              new Event("change", {
                bubbles: !0,
              }),
            )),
          applyActiveLabelClasses(n, w),
          syncGroupActiveClasses(n),
          window.setTimeout(() => {
            let E = FILTER_STATE[r]?.values;
            if (!E || E.size === 0) return;
            let T = null;
            (n
              .querySelectorAll('[wf-algolia-element="filter-item"]')
              .forEach((k) => {
                let D =
                  k.getAttribute("wf-algolia-value") ??
                  (k instanceof HTMLInputElement ? k.value : null);
                if (D == null || D === "") return;
                let K = E.has(D),
                  C =
                    k instanceof HTMLInputElement
                      ? k
                      : k.querySelector(
                          'input[type="radio"], input[type="checkbox"]',
                        );
                C &&
                  ((C.checked = K),
                  syncWebflowInputVisual(C, K),
                  K && (T = C.closest("label")));
              }),
              i === "radio" &&
                u instanceof HTMLInputElement &&
                u.type === "radio" &&
                ((u.checked = !1), syncWebflowInputVisual(u, !1)),
              applyActiveLabelClasses(n, T),
              syncGroupActiveClasses(n));
          }, 0));
      }
    }));
}
var showMoreReapplyFns = new WeakMap();
function initShowMore() {
  document
    .querySelectorAll('[wf-algolia-element="filter-group"]')
    .forEach((e) => {
      let t = parseInt(e.getAttribute("wf-algolia-limit") || "0");
      if (t <= 0) return;
      let n = e.getAttribute("wf-algolia-hideclass") || "is-hidden",
        r = e.querySelector('[wf-algolia-element="filter-show-more"]'),
        i = e.getAttribute("wf-algolia-text-more"),
        o = e.getAttribute("wf-algolia-text-less"),
        l = r?.textContent ?? "",
        s = i ?? l,
        c = o ?? "Show less",
        m = !1,
        g = () => {
          let u = e.querySelectorAll('[wf-algolia-element="filter-item"]'),
            h = 0;
          (u.forEach((y) => {
            let b = y.closest('[role="listitem"]') || y;
            m || h < t ? (b.classList.remove(n), (h += 1)) : b.classList.add(n);
          }),
            r && (r.textContent = m ? c : s));
        };
      (r &&
        r.addEventListener("click", () => {
          ((m = !m), g());
        }),
        showMoreReapplyFns.set(e, g),
        g());
    });
}
function reapplyShowMore(e) {
  let t = showMoreReapplyFns.get(e);
  t && t();
}
function interpolate(e, t) {
  return e.replace(/\{(\w+)\}/g, (n, r) => {
    let i = t[r];
    return i == null ? "" : String(i);
  });
}
var textTemplateCache = new WeakMap();
function getTextTemplate(e, t) {
  let n = textTemplateCache.get(e);
  if (n === void 0) {
    let r = e.getAttribute("wf-algolia-text-template");
    if (r !== null) n = r;
    else {
      let i = (e.textContent ?? "").trim();
      n = i.includes("{") && i.includes("}") ? i : t;
    }
    textTemplateCache.set(e, n);
  }
  return n;
}
var originalTextCache = new WeakMap();
function getOriginalText(e) {
  let t = originalTextCache.get(e);
  return (
    t === void 0 &&
      ((t = (e.textContent ?? "").trim()), originalTextCache.set(e, t)),
    t
  );
}
function syncFilterDOM(e = FILTER_STATE) {
  (document.querySelectorAll("[data-wf-algolia-staged]").forEach((t) => {
    t.removeAttribute("data-wf-algolia-staged");
  }),
    document
      .querySelectorAll('[wf-algolia-element="filter-group"]')
      .forEach((t) => {
        let n =
            t.getAttribute("wf-algolia-field") ||
            t.getAttribute("wf-algolia-facet") ||
            "",
          r = t.getAttribute("wf-algolia-activeclass") || "is-active";
        if (
          (synthesizeMissingSelected(t, n, e),
          t
            .querySelectorAll('[wf-algolia-element="filter-item"]')
            .forEach((l) => {
              let s = l.getAttribute("wf-algolia-value") || "",
                m = e[n]?.values?.has(s) ?? !1;
              ((l instanceof HTMLInputElement
                ? [l]
                : [
                    ...l.querySelectorAll(
                      'input[type="checkbox"], input[type="radio"]',
                    ),
                  ]
              ).forEach((y) => {
                y.checked = m;
              }),
                m
                  ? l.setAttribute("data-wf-algolia-active", "true")
                  : l.removeAttribute("data-wf-algolia-active"));
              let u = l instanceof HTMLInputElement ? l.closest("label") : null;
              (m
                ? (l.classList.add(r), u && u.classList.add(r))
                : (l.classList.remove(r), u && u.classList.remove(r)),
                t.getAttribute("wf-algolia-type") === "radio"
                  ? l.setAttribute("aria-selected", String(m))
                  : l.setAttribute("aria-pressed", String(m)));
            }),
          !e[n])
        ) {
          let l = t.querySelector('[wf-algolia-element="range-min"]'),
            s = t.querySelector('[wf-algolia-element="range-max"]');
          (l && (l.value = l.min), s && (s.value = s.max));
          let c = t.querySelector('[wf-algolia-element="range-display"]');
          c && l && s && (c.textContent = `${l.min} \u2013 ${s.max}`);
        }
        t.querySelectorAll(
          'input[type="checkbox"], input[type="radio"]',
        ).forEach((l) => {
          syncWebflowInputVisual(l, l.checked);
        });
        let i = null,
          o = t.querySelector(
            '[wf-algolia-element="filter-item"] input:checked, input[wf-algolia-element="filter-item"]:checked',
          );
        if (o) i = o.closest("label");
        else {
          let s = t
            .closest('[wf-algolia-element="browse"]')
            ?.querySelector(`[wf-algolia-reset="${n}"]`);
          s instanceof HTMLInputElement &&
            s.type === "radio" &&
            ((s.checked = !0),
            syncWebflowInputVisual(s, !0),
            (i = s.closest("label")));
        }
        (applyActiveLabelClasses(t, i),
          sortFilterItems(t, n, e),
          reapplyShowMore(t));
      }),
    renderSelectedCounts(e),
    renderSelectedValues(e));
}
function synthesizeMissingSelected(e, t, n) {
  if (e.getAttribute("wf-algolia-show-selected-missing") !== "true" || !t)
    return;
  let r = n[t]?.values;
  if (
    (e.querySelectorAll('[data-wf-algolia-synthesized="true"]').forEach((g) => {
      let u = g.getAttribute("wf-algolia-value") || "";
      (!r || !r.has(u)) && g.remove();
    }),
    !r || r.size === 0)
  )
    return;
  let i = [...e.querySelectorAll('[wf-algolia-element="filter-item"]')],
    o = new Set(i.map((g) => g.getAttribute("wf-algolia-value") || "")),
    l = [...r].filter((g) => !o.has(g));
  if (l.length === 0) return;
  let s =
    e.querySelector('[wf-algolia-element="filter-template"]') || i[0] || null;
  if (!s) return;
  let c = i[0]?.parentElement ?? s.parentElement ?? e,
    m = c.firstChild;
  for (let g of l) {
    let u = s.cloneNode(!0);
    (u.removeAttribute("wf-algolia-element"),
      u.setAttribute("wf-algolia-element", "filter-item"),
      u.setAttribute("wf-algolia-value", g),
      u.setAttribute("data-wf-algolia-synthesized", "true"),
      u.style.display === "none" && (u.style.display = ""),
      u.querySelectorAll("*").forEach((b) => {
        b.style.display === "none" && (b.style.display = "");
      }));
    let h =
      u.querySelector('[wf-algolia-element="filter-value-text"]') ||
      u.querySelector(".wf-fi-name");
    h && (h.textContent = g);
    let y = u.querySelector('[wf-algolia-element="filter-count"]');
    (y && (y.textContent = ""),
      u.querySelector("input") ||
        (u.setAttribute("role", "button"), u.setAttribute("tabindex", "0")),
      c.insertBefore(u, m));
  }
}
function sortFilterItems(e, t, n) {
  let r = e.getAttribute("wf-algolia-sort");
  if (
    !r ||
    r === "natural" ||
    (r !== "selected-first" && r !== "alpha" && r !== "count")
  )
    return;
  let i = [...e.querySelectorAll('[wf-algolia-element="filter-item"]')];
  if (i.length < 2) return;
  let o = i[0].parentElement;
  if (!o) return;
  for (let g of i) if (g.parentElement !== o) return;
  let l = (g) => g.getAttribute("wf-algolia-value") || "",
    s = (g) => n[t]?.values?.has(l(g)) ?? !1,
    c = (g) => {
      let u = g.querySelector('[wf-algolia-element="filter-count"]'),
        h = parseInt((u?.textContent ?? "0").trim(), 10);
      return Number.isFinite(h) ? h : 0;
    },
    m;
  if (r === "selected-first") {
    let g = [],
      u = [];
    for (let h of i) (s(h) ? g : u).push(h);
    m = [...g, ...u];
  } else
    r === "alpha"
      ? (m = [...i].sort((g, u) =>
          l(g).localeCompare(l(u), void 0, {
            sensitivity: "base",
          }),
        ))
      : (m = [...i].sort((g, u) => c(u) - c(g)));
  for (let g of m) o.appendChild(g);
}
var warnedCountNoField = new WeakSet();
function resolveCountField(e) {
  let t = e.getAttribute("wf-algolia-field");
  if (t) return t;
  let n = e.closest('[wf-algolia-element="filter-group"]');
  if (n) {
    let r =
      n.getAttribute("wf-algolia-field") || n.getAttribute("wf-algolia-facet");
    if (r) return r;
  }
  return null;
}
var warnedCountNoSlot = new WeakSet();
function renderSelectedCounts(e = getEffectiveState()) {
  document
    .querySelectorAll('[wf-algolia-element="filter-selected-count"]')
    .forEach((t) => {
      let n = resolveCountField(t);
      if (!n) {
        warnedCountNoField.has(t) ||
          (warnedCountNoField.add(t),
          console.warn(
            '[wf-algolia] filter-selected-count cannot resolve its field. Place the badge inside a `wf-algolia-element="filter-group"` wrapper (Model A \u2014 inherits its `wf-algolia-field`), or set `wf-algolia-field="<facet>"` on the badge itself (Model B \u2014 explicit cross-scope pointer).',
            t,
          ));
        return;
      }
      let r = e[n]?.values,
        i = r?.size ?? 0,
        o = i > 0 ? [...r].join(", ") : "",
        l = {
          count: i,
          value: o,
        },
        s = t.querySelectorAll('[wf-algolia-element="filter-count-text"]');
      if (s.length > 0)
        s.forEach((g) => {
          let u = getTextTemplate(g, "{count}");
          g.textContent = interpolate(u, l);
        });
      else if (t.children.length === 0) {
        let g = getTextTemplate(t, "{count}");
        t.textContent = interpolate(g, l);
      } else
        warnedCountNoSlot.has(t) ||
          (warnedCountNoSlot.add(t),
          console.warn(
            '[wf-algolia] filter-selected-count outer has inner elements but no `wf-algolia-element="filter-count-text"` descendant. Add the role to the inner text element so the count can be rendered without overwriting your Pill DOM.',
            t,
          ));
      let c = t.getAttribute("wf-algolia-hide-empty") === "true";
      c && i === 0
        ? (t.style.display = "none")
        : c && t.style.removeProperty("display");
      let m = t.getAttribute("wf-algolia-zeroclass");
      if (m) {
        let g = m.split(/\s+/).filter(Boolean);
        g.length > 0 &&
          (i === 0 ? t.classList.add(...g) : t.classList.remove(...g));
      }
    });
}
var warnedValueNoField = new WeakSet(),
  warnedValueNoSlot = new WeakSet();
function resolveValueField(e) {
  let t = e.getAttribute("wf-algolia-field");
  if (t) return t;
  let n = e.closest('[wf-algolia-element="filter-group"]');
  if (n) {
    let r =
      n.getAttribute("wf-algolia-field") || n.getAttribute("wf-algolia-facet");
    if (r) return r;
  }
  return null;
}
function renderValueSlot(e, t) {
  let n = getOriginalText(e);
  if (t.count === 0) {
    e.textContent = n;
    return;
  }
  let r = getTextTemplate(e, "{value}");
  e.textContent = interpolate(r, t);
}
function renderSelectedValues(e = getEffectiveState()) {
  document
    .querySelectorAll('[wf-algolia-element="filter-selected-value"]')
    .forEach((t) => {
      let n = resolveValueField(t);
      if (!n) {
        warnedValueNoField.has(t) ||
          (warnedValueNoField.add(t),
          console.warn(
            '[wf-algolia] filter-selected-value cannot resolve its field. Place the slot inside a `wf-algolia-element="filter-group"` wrapper (Model A \u2014 inherits its `wf-algolia-field`), or set `wf-algolia-field="<facet>"` on the slot itself (Model B \u2014 explicit cross-scope pointer).',
            t,
          ));
        return;
      }
      let r = e[n]?.values,
        i = r?.size ?? 0,
        l = {
          value: i > 0 ? [...r].join(", ") : "",
          count: i,
        },
        s = t.querySelectorAll(
          '[wf-algolia-element="filter-value-text-target"]',
        );
      s.length > 0
        ? s.forEach((m) => renderValueSlot(m, l))
        : t.children.length === 0
          ? renderValueSlot(t, l)
          : warnedValueNoSlot.has(t) ||
            (warnedValueNoSlot.add(t),
            console.warn(
              '[wf-algolia] filter-selected-value outer has inner elements but no `wf-algolia-element="filter-value-text-target"` descendant. Add the role to the inner text element so the selected value can be rendered without overwriting your toggle DOM.',
              t,
            ));
      let c = t.getAttribute("wf-algolia-hide-empty") === "true";
      c && i === 0
        ? (t.style.display = "none")
        : c && t.style.removeProperty("display");
    });
}
function clearAllFilters(e) {
  (clearState(FILTER_STATE),
    discardStaging(),
    document
      .querySelectorAll('[wf-algolia-element="filter-group"]')
      .forEach((t) => {
        let n = t.querySelector('[wf-algolia-element="range-min"]'),
          r = t.querySelector('[wf-algolia-element="range-max"]');
        if (!n || !r) return;
        let i = n.getAttribute("min") ?? n.min ?? "0",
          o = r.getAttribute("max") ?? r.max ?? "100";
        (n.value !== i &&
          ((n.value = i),
          n.dispatchEvent(
            new Event("input", {
              bubbles: !0,
            }),
          )),
          r.value !== o &&
            ((r.value = o),
            r.dispatchEvent(
              new Event("input", {
                bubbles: !0,
              }),
            )));
      }),
    syncFilterDOM(),
    getAllChildLinks().forEach((t) => {
      (applyParentEmptyBehavior(t.childEl, t.whenParentEmpty),
        t.childEl
          .querySelectorAll(".wf-algolia-injected")
          .forEach((n) => n.remove()));
    }),
    emit("filter", FILTER_STATE),
    e());
}
function clearFilter(e, t) {
  (delete FILTER_STATE[e], syncFilterDOM(), emit("filter", FILTER_STATE), t());
}
function setFilter(e, t, n) {
  ((FILTER_STATE[e] = {
    type: "checkbox",
    match: "or",
    values: new Set(t),
  }),
    syncFilterDOM(),
    emit("filter", FILTER_STATE),
    n());
}
function commitStagingAndSync(e) {
  (commitStaging(e), renderSelectedValues(), renderSelectedCounts());
}
function discardStagingAndSync(e) {
  (discardStaging(e), renderSelectedValues(), renderSelectedCounts());
}
function setQuery(e, t) {
  let n =
    document.querySelector('[wf-algolia-element="browse-search"]') ||
    document.querySelector('[wf-algolia-element="search-input"]');
  (n && (n.value = e), emit("search", e), t());
}
var insightsReady = !1,
  indexNameResolver = null;
function setIndexNameResolver(e) {
  indexNameResolver = e;
}
function hasEventAttrAncestor(e) {
  let t = e instanceof Element ? e : e?.parentElement;
  return t ? !!t.closest("[wf-algolia-event], [wf-algolia-conversion]") : !1;
}
function initInsights(e) {
  (insights("init", {
    appId: e.appId,
    apiKey: e.searchKey,
    useCookie: e.insightsCookie,
  }),
    (insightsReady = !0),
    (window.aa = insights),
    document.addEventListener("click", (t) => {
      let n = t.target.closest(".wf-algolia-injected");
      if (!n || hasEventAttrAncestor(t.target)) return;
      let r = n.dataset.wfAlgoliaHitObjectid,
        i = n.dataset.wfAlgoliaHitIndex,
        o = n.dataset.wfAlgoliaHitQueryid,
        l = parseInt(n.dataset.wfAlgoliaHitPosition || "0");
      !r ||
        !i ||
        trackClick({
          index: i,
          objectIDs: [r],
          queryID: o || void 0,
          positions: l > 0 ? [l] : void 0,
        });
    }),
    document.addEventListener("click", (t) => {
      let n = t.target;
      if (n.closest('[wf-algolia-element="hit-preview"]')) return;
      let r = n.closest('[wf-algolia-element="filter-item"]');
      if (!r) return;
      let i = r.closest('[wf-algolia-element="filter-group"]');
      if (!i) return;
      let o =
          i.getAttribute("wf-algolia-field") ||
          i.getAttribute("wf-algolia-facet"),
        l = r.getAttribute("wf-algolia-value"),
        s =
          i.closest("[wf-algolia-index]")?.getAttribute("wf-algolia-index") ||
          indexNameResolver?.() ||
          "";
      o &&
        l &&
        s &&
        insights("clickedFilters", {
          index: s,
          filters: [`${o}:${l}`],
          eventName: "Filter Clicked",
        });
    }),
    document.addEventListener("click", (t) => {
      let n = t.target.closest("[wf-algolia-event]");
      if (!n) return;
      let r = n.getAttribute("wf-algolia-event"),
        i = n.getAttribute("wf-algolia-event-name"),
        o = n.closest(".wf-algolia-injected") || n,
        l = o.dataset?.wfAlgoliaHitObjectid,
        s = o.dataset?.wfAlgoliaHitIndex,
        c = o.dataset?.wfAlgoliaHitQueryid;
      if (!(!l || !s))
        switch (r) {
          case "click":
            trackClick({
              index: s,
              objectIDs: [l],
              queryID: c || void 0,
              eventName: i || void 0,
            });
            break;
          case "conversion":
            trackConversion({
              index: s,
              objectIDs: [l],
              queryID: c || void 0,
              eventName: i || "Converted",
            });
            break;
          case "view":
            trackView(s, [l]);
            break;
        }
    }),
    document.addEventListener("click", (t) => {
      let n = t.target.closest("[wf-algolia-conversion]");
      if (!n) return;
      let r = n.getAttribute("wf-algolia-conversion"),
        i = n.closest(".wf-algolia-injected") || n,
        o = i.dataset?.wfAlgoliaHitObjectid,
        l = i.dataset?.wfAlgoliaHitIndex,
        s = i.dataset?.wfAlgoliaHitQueryid;
      o &&
        l &&
        trackConversion({
          index: l,
          objectIDs: [o],
          eventName: r,
          queryID: s || void 0,
        });
    }));
}
var VIEW_CHUNK_SIZE = 20,
  MAX_EVENT_NAME_LEN = 64;
function chunkArray(e, t) {
  let n = [];
  for (let r = 0; r < e.length; r += t) n.push(e.slice(r, r + t));
  return n;
}
function validObjectIDs(e) {
  return e.filter((t) => typeof t == "string" && t.length > 0);
}
function truncateEventName(e) {
  return e.length > MAX_EVENT_NAME_LEN ? e.slice(0, MAX_EVENT_NAME_LEN) : e;
}
function trackView(e, t) {
  if (!insightsReady) return;
  let n = validObjectIDs(t);
  if (n.length !== 0)
    for (let r of chunkArray(n, VIEW_CHUNK_SIZE))
      insights("viewedObjectIDs", {
        index: e,
        objectIDs: r,
        eventName: "Hits Viewed",
      });
}
function trackClick(e) {
  if (!insightsReady) return;
  let t = validObjectIDs(e.objectIDs);
  if (t.length === 0) return;
  let n = truncateEventName(e.eventName || "Hit Clicked");
  e.queryID
    ? insights("clickedObjectIDsAfterSearch", {
        index: e.index,
        objectIDs: t,
        queryID: e.queryID,
        positions: e.positions || [1],
        eventName: n,
      })
    : insights("clickedObjectIDs", {
        index: e.index,
        objectIDs: t,
        eventName: n,
      });
}
function trackConversion(e) {
  if (!insightsReady) return;
  let t = validObjectIDs(e.objectIDs);
  if (t.length === 0) return;
  let n = truncateEventName(e.eventName || "Hit Converted");
  e.queryID
    ? insights("convertedObjectIDsAfterSearch", {
        index: e.index,
        objectIDs: t,
        queryID: e.queryID,
        eventName: n,
      })
    : insights("convertedObjectIDs", {
        index: e.index,
        objectIDs: t,
        eventName: n,
      });
}
function isInsightsReady() {
  return insightsReady;
}
var warnedDisplayBlock = new WeakSet();
function showElement(e, t) {
  if (!e) return;
  let n = e.getAttribute("wf-algolia-display");
  if (n) {
    e.style.display = n;
    return;
  }
  if (t !== void 0) {
    e.style.display = t;
    return;
  }
  (warnedDisplayBlock.has(e) ||
    (warnedDisplayBlock.add(e),
    console.warn(
      '[wf-algolia] showing element with display:block. If your Webflow layout uses flex/grid, add wf-algolia-display="flex" (or grid/inline-flex/etc.). See https://wf-algolia-docs.candidleap.com/attribute-reference#wf-algolia-display',
      e,
    )),
    (e.style.display = "block"));
}
function hideElement(e) {
  e && (e.style.display = "none");
}
function sanitizeUrl(e) {
  let t = e.trim(),
    n = t.toLowerCase();
  return n.startsWith("javascript:") ||
    n.startsWith("data:") ||
    n.startsWith("vbscript:")
    ? (console.warn("[wf-algolia] Blocked unsafe URL:", t), "#")
    : t;
}
var ALLOWED_TAGS = {
    em: new Set(),
    mark: new Set(),
    strong: new Set(),
    b: new Set(),
    i: new Set(),
    u: new Set(),
    p: new Set(),
    br: new Set(),
    ul: new Set(),
    ol: new Set(),
    li: new Set(),
    h1: new Set(),
    h2: new Set(),
    h3: new Set(),
    h4: new Set(),
    blockquote: new Set(),
    code: new Set(),
    pre: new Set(),
    a: new Set(["href", "title", "target", "rel"]),
    img: new Set(["src", "alt", "title", "width", "height"]),
  },
  ELEMENT_NODE = 1,
  TEXT_NODE = 3;
function sanitizeHtml(e) {
  let t = new DOMParser().parseFromString(e, "text/html");
  return (
    sanitizeNode(t.head),
    sanitizeNode(t.body),
    t.head.innerHTML + t.body.innerHTML
  );
}
function sanitizeNode(e) {
  let t = Array.from(e.childNodes);
  for (let n of t)
    if (n.nodeType === ELEMENT_NODE) {
      let r = n,
        i = r.tagName.toLowerCase();
      if (!(i in ALLOWED_TAGS)) {
        sanitizeNode(r);
        let l = r.parentNode;
        if (l) {
          for (; r.firstChild;) l.insertBefore(r.firstChild, r);
          l.removeChild(r);
        }
        continue;
      }
      let o = ALLOWED_TAGS[i] ?? new Set();
      for (let l of Array.from(r.attributes))
        o.has(l.name.toLowerCase()) || r.removeAttribute(l.name);
      (i === "a" &&
        r.hasAttribute("href") &&
        r.setAttribute("href", sanitizeUrl(r.getAttribute("href") ?? "")),
        i === "img" &&
          r.hasAttribute("src") &&
          r.setAttribute("src", sanitizeUrl(r.getAttribute("src") ?? "")),
        sanitizeNode(r));
    } else n.nodeType !== TEXT_NODE && n.parentNode?.removeChild(n);
}
function escapeFilterValue(e) {
  return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}
function getPath(e, t) {
  return t.split(".").reduce((n, r) => n?.[r], e);
}
function slugify(e, t = "-") {
  return e
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/ /g, t);
}
function restartIx2() {
  try {
    restartWebflow(["ix2"]);
  } catch (e) {
    console.warn("[wf-algolia] Could not restart Webflow interactions:", e);
  }
}
var COMPARATORS = ["!==", "===", ">=", "<=", ">", "<"];
function evalCondition(e, t) {
  let n = COMPARATORS.find((g) => e.includes(g));
  if (!n) return !!getPath(t, e.trim());
  let [r, i] = e.split(n).map((g) => g.trim());
  if (r === void 0 || i === void 0) return !1;
  let o = getPath(t, r),
    l = i.replace(/^["']|["']$/g, ""),
    s = parseFloat(o),
    c = parseFloat(l),
    m = !isNaN(s) && !isNaN(c);
  switch (n) {
    case "===":
      return String(o) === l;
    case "!==":
      return String(o) !== l;
    case ">":
      return m && s > c;
    case ">=":
      return m && s >= c;
    case "<":
      return m && s < c;
    case "<=":
      return m && s <= c;
    default:
      return !1;
  }
}
function formatValue(e, t) {
  if (e == null || e === "") return "";
  switch (t) {
    case "rating": {
      let n = parseFloat(e);
      return isNaN(n) ? "" : `\u2605 ${n.toFixed(1)}`;
    }
    case "year": {
      let n = String(e);
      if (/^\d{4}$/.test(n)) return n;
      let r = new Date(n);
      return isNaN(r.getTime()) ? "" : String(r.getFullYear());
    }
    case "currency": {
      let n = parseFloat(e);
      return isNaN(n) ? "" : `$${n.toFixed(2)}`;
    }
    case "number": {
      let n = parseFloat(e);
      return isNaN(n) ? "" : n.toLocaleString();
    }
    default:
      return String(e);
  }
}
function applySlugifyAttr(e, t) {
  return e.getAttribute("wf-algolia-slugify") === "true" ? slugify(t) : t;
}
var warnedEmptyAlt = new WeakSet();
function populateCard(e, t, n) {
  let r = n?.highlightTag || "mark",
    i = `<${r}>`,
    o = `</${r}>`;
  (e.querySelectorAll("[wf-algolia-text]").forEach((l) => {
    try {
      let s = l.getAttribute("wf-algolia-text"),
        c = l.getAttribute("wf-algolia-format"),
        m = l.getAttribute("wf-algolia-highlight") === "true",
        g = s.split("|").map((y) => y.trim()),
        u,
        h = g[0];
      for (let y of g) {
        let b = getPath(t, y);
        if (b != null && b !== "") {
          ((u = b), (h = y));
          break;
        }
      }
      if (c) {
        let y = formatValue(u, c);
        ((l.textContent = y), (l.style.display = y ? "" : "none"));
      } else if (m && h !== void 0 && t._highlightResult?.[h]?.value) {
        let y = sanitizeHtml(t._highlightResult[h].value)
          .replace(/<em>/g, i)
          .replace(/<\/em>/g, o);
        l.innerHTML = y;
      } else l.textContent = u ?? "";
    } catch (s) {
      console.warn("[wf-algolia] populateCard text error:", s);
    }
  }),
    e.querySelectorAll("[wf-algolia-html]").forEach((l) => {
      try {
        let s = l.getAttribute("wf-algolia-html"),
          c = getPath(t, s);
        l.innerHTML = c ? sanitizeHtml(c) : "";
      } catch (s) {
        console.warn("[wf-algolia] populateCard html error:", s);
      }
    }),
    e.querySelectorAll("[wf-algolia-snippet]").forEach((l) => {
      try {
        let s = l.getAttribute("wf-algolia-snippet"),
          c = t._snippetResult?.[s]?.value;
        if (c) {
          let m = sanitizeHtml(c)
            .replace(/<em>/g, i)
            .replace(/<\/em>/g, o);
          l.innerHTML = m;
        } else {
          let m = getPath(t, s);
          l.textContent = m ?? "";
        }
      } catch (s) {
        console.warn("[wf-algolia] populateCard snippet error:", s);
      }
    }),
    e.querySelectorAll("[wf-algolia-image]").forEach((l) => {
      try {
        let s = l.getAttribute("wf-algolia-image").split("|"),
          c = "";
        for (let u of s) {
          let h = getPath(t, u.trim());
          if (h) {
            c = h;
            break;
          }
        }
        (l.removeAttribute("data-src"),
          l.removeAttribute("data-srcset"),
          l.removeAttribute("srcset"),
          (l.src = c || ""));
        let m = l.getAttribute("wf-algolia-alt"),
          g = "";
        if (m !== null) {
          if (m === "") g = "";
          else {
            let u = m.split("|").map((h) => h.trim());
            for (let h of u) {
              let y = getPath(t, h);
              if (y) {
                g = String(y);
                break;
              }
            }
          }
        } else
          ((g = t.name || t.title || ""),
            !g &&
              !warnedEmptyAlt.has(l) &&
              (warnedEmptyAlt.add(l),
              console.warn(
                '[wf-algolia] image has empty alt and no wf-algolia-alt attribute. Add wf-algolia-alt="fieldName" (e.g. imageAlt|name|title), or wf-algolia-alt="" to mark as decorative. See https://wf-algolia-docs.candidleap.com/attribute-reference#wf-algolia-alt',
                l,
              )));
        ((l.alt = g), (l.loading = "lazy"));
      } catch (s) {
        console.warn("[wf-algolia] populateCard image error:", s);
      }
    }),
    e
      .querySelectorAll("[wf-algolia-link], [wf-algolia-link-url]")
      .forEach((l) => {
        try {
          let s = l.getAttribute("wf-algolia-link-url");
          if (s) {
            let h = getPath(t, s);
            l.href = sanitizeUrl(h || "#");
            return;
          }
          let c = l.getAttribute("wf-algolia-link"),
            m =
              l.getAttribute("wf-algolia-link-prefix") ||
              l.getAttribute("wf-algolia-link-folder") ||
              "",
            g = l.getAttribute("wf-algolia-link-suffix") || "",
            u = getPath(t, c);
          l.href = sanitizeUrl(m + applySlugifyAttr(l, u || "") + g);
        } catch (s) {
          console.warn("[wf-algolia] populateCard link error:", s);
        }
      }),
    e.querySelectorAll("[wf-algolia-if]").forEach((l) => {
      let s = l.getAttribute("wf-algolia-if");
      evalCondition(s, t) ? showElement(l) : hideElement(l);
    }));
}
function cloneAndPopulate(e, t, n) {
  let r = e.cloneNode(!0);
  ((r.style.display = ""),
    r.removeAttribute("wf-algolia-element"),
    r.classList.add("wf-algolia-injected"));
  let i = r.getAttribute("wf-algolia-link-url"),
    o = r.getAttribute("wf-algolia-link");
  if (i) {
    let l = getPath(t, i);
    r.href = sanitizeUrl(l || "#");
  } else if (o) {
    let l =
        r.getAttribute("wf-algolia-link-prefix") ||
        r.getAttribute("wf-algolia-link-folder") ||
        "",
      s = r.getAttribute("wf-algolia-link-suffix") || "";
    if (l.includes("|") && t.__indexName) {
      let m = l.split("|"),
        g = m[0] ?? "";
      for (let u of m.slice(1)) {
        let h = u.indexOf(":");
        if (h > 0) {
          let y = u.substring(0, h),
            b = u.substring(h + 1);
          if (t.__indexName === y) {
            g = b;
            break;
          }
        }
      }
      l = g;
    }
    let c = getPath(t, o) || "";
    r.href = sanitizeUrl(l + applySlugifyAttr(r, c) + s);
  }
  return (
    populateCard(r, t, n),
    (r.dataset.wfAlgoliaHitObjectid = t.objectID),
    (r.dataset.wfAlgoliaHitIndex = t.__indexName || ""),
    t.__queryID && (r.dataset.wfAlgoliaHitQueryid = t.__queryID),
    r
  );
}
function removeInjected(e) {
  e.querySelectorAll(".wf-algolia-injected").forEach((t) => t.remove());
}
var detachedTemplates = new WeakSet();
function detachTemplateOnce(e) {
  return (
    detachedTemplates.has(e) || (detachedTemplates.add(e), e.remove()),
    e
  );
}
function renderHits(e, t, n, r = !1, i) {
  (r || removeInjected(e), detachTemplateOnce(t));
  let o = document.createDocumentFragment(),
    l = r ? e.querySelectorAll(".wf-algolia-injected").length : 0;
  if (
    (n.forEach((s, c) => {
      try {
        let m = cloneAndPopulate(t, s, i);
        ((m.dataset.wfAlgoliaHitPosition = String(l + c + 1)),
          o.appendChild(m));
      } catch (m) {
        console.warn("[wf-algolia] Failed to clone hit:", s.objectID, m);
      }
    }),
    e.appendChild(o),
    restartIx2(),
    isInsightsReady())
  ) {
    let s = n[0]?.__indexName || "",
      c = n.map((m) => m.objectID).filter(Boolean);
    s && c.length && trackView(s, c);
  }
}
var middlewares = [];
function registerMiddleware(e) {
  middlewares.push(e);
}
function applyBeforeSearch(e) {
  let t = e;
  for (let n of middlewares) n.beforeSearch && (t = n.beforeSearch(t) ?? t);
  return t;
}
function applyAfterSearch(e) {
  let t = e;
  for (let n of middlewares) n.afterSearch && (t = n.afterSearch(t) ?? t);
  return t;
}
async function searchWithMiddleware(e, t) {
  let n = applyBeforeSearch(e),
    r = await t(n);
  return applyAfterSearch(r);
}
async function multiQueryWithMiddleware(e, t) {
  let n = t.map((i) => ({
      ...i,
      params: applyBeforeSearch(i.params),
    })),
    r = await e.multipleQueries(n);
  return {
    ...r,
    results: r.results.map((i) => applyAfterSearch(i)),
  };
}
function exposePublicAPI(e, t) {
  let n = () => emit("refresh");
  window.WfAlgolia = {
    version: "1.0.0",
    getClient: () => e,
    search: (r, i, o) =>
      e.initIndex(r).search(i, {
        clickAnalytics: !0,
        ...o,
      }),
    multiSearch: (r) => e.multipleQueries(r),
    getObject: (r, i) => e.initIndex(r).getObject(i),
    cloneAndPopulate: (r, i) => cloneAndPopulate(r, i, t),
    populateCard: (r, i) => populateCard(r, i, t),
    trackClick: trackClick,
    trackConversion: trackConversion,
    getInsights: () => insights,
    on: on,
    off: off,
    setFilter: (r, i) => setFilter(r, i, n),
    clearFilter: (r) => clearFilter(r, n),
    clearAllFilters: () => clearAllFilters(n),
    commitStaging: commitStagingAndSync,
    discardStaging: discardStagingAndSync,
    getFilterState: () => {
      let r = {};
      return (
        Object.entries(FILTER_STATE).forEach(([i, o]) => {
          r[i] = {
            ...o,
            values: o.values ? [...o.values] : void 0,
          };
        }),
        r
      );
    },
    setQuery: (r) => setQuery(r, n),
    getQuery: () =>
      (
        document.querySelector('[wf-algolia-element="browse-search"]') ||
        document.querySelector('[wf-algolia-element="search-input"]')
      )?.value || "",
    refresh: n,
    use: (r) => registerMiddleware(r),
    destroy: () => {
      (document
        .querySelectorAll(".wf-algolia-injected")
        .forEach((r) => r.remove()),
        delete window.WfAlgolia);
    },
  };
}
function scanAttributes() {
  let e = new Map();
  return (
    document.querySelectorAll("[wf-algolia-element]").forEach((n) => {
      let r = n.getAttribute("wf-algolia-element");
      (e.has(r) || e.set(r, []), e.get(r).push(n));
    }),
    [
      "template",
      "autocomplete-template",
      "filter-template",
      "filter-tag-template",
    ].forEach((n) => {
      (e.get(n) || []).forEach((r) => {
        let i = r.parentElement;
        if (!i) {
          r.remove();
          return;
        }
        let o = TEMPLATE_ANCHOR_SELECTORS[n],
          l = o ? (r.closest(o) ?? null) : null;
        (o &&
          !l &&
          !warnedTemplateAnchor.has(r) &&
          (warnedTemplateAnchor.add(r),
          console.warn(
            `[wf-algolia] "${n}" has no ancestor matching "${o}". Falling back to immediate parent for matching \u2014 confirm the template lives inside the right wrapper.`,
            r,
          )),
          registerTemplateHome(r, i, l ?? i),
          r.remove());
      });
    }),
    e
  );
}
var TEMPLATE_ANCHOR_SELECTORS = {
    template: null,
    "autocomplete-template": null,
    "filter-template": '[wf-algolia-element="filter-group"]',
    "filter-tag-template": '[wf-algolia-element="filter-tag-wrapper"]',
  },
  warnedTemplateAnchor = new WeakSet();
function getCascadingAttr(e, t, n = "") {
  let r = e.getAttribute(`wf-algolia-${t}`);
  if (r !== null) return r;
  let i = e.closest(`[wf-algolia-${t}]`);
  if (i) return i.getAttribute(`wf-algolia-${t}`);
  let l = document
    .querySelector("script[data-app-id]")
    ?.getAttribute(`data-${t}`);
  return l ?? n;
}
var templateAnchorByEl = new WeakMap(),
  templateParentByEl = new WeakMap();
function registerTemplateHome(e, t, n) {
  (templateParentByEl.set(e, t), templateAnchorByEl.set(e, n));
}
function findTemplateFor(e, t, n = "template") {
  return (t.get(n) || []).find((i) => templateAnchorByEl.get(i) === e) || null;
}
function getTemplateParent(e) {
  return templateParentByEl.get(e) ?? null;
}
function cssEscape(e) {
  return typeof CSS < "u" && typeof CSS.escape == "function"
    ? CSS.escape(e)
    : e.replace(/[^a-zA-Z0-9_-]/g, "\\$&");
}
async function fetchFacetValues(e, t, n, r) {
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
async function fetchFacetsBatch(e, t, n, r) {
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
function initDynamicFilters(e, t, n) {
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
async function refreshChildGroup(e, t, n, r) {
  if (r.length === 0) return;
  let i = r.map(({ field: o, value: l }) => [`${o}:${l}`]);
  await populateDynamicGroup(e, t, n, {
    facetFilters: i,
  });
}
function syncDynamicFacetCounts(e) {
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
function toggleGroupsByFacetPresence(e) {
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
function parseFieldColonValue(e) {
  if (e === null) return null;
  let t = e.trim(),
    n = t.indexOf(":");
  if (n <= 0 || n >= t.length - 1) return null;
  let r = t.slice(0, n).trim(),
    i = t.slice(n + 1).trim();
  return !r || !i ? null : [[`${r}:${i}`]];
}
function pairToFacetFilter(e, t) {
  let n = e?.trim() ?? "",
    r = t?.trim() ?? "";
  return !n || !r ? null : [[`${n}:${r}`]];
}
function readBaseFilter(e, t, n) {
  let r = e.getAttribute(`${t}-value`);
  if (r !== null && r.trim() !== "") {
    let o = pairToFacetFilter(e.getAttribute(`${t}-field`), r);
    return (
      o === null &&
        n?.(`${t}-value is set but ${t}-field is missing/empty; ignoring.`),
      o
    );
  }
  let i = e.getAttribute(t);
  if (i !== null) {
    let o = parseFieldColonValue(i);
    return (
      o === null &&
        n?.(`${t}="${i}" is malformed (expected "field:value"); ignoring.`),
      o
    );
  }
  return null;
}
function syncFacetCounts(e) {
  document
    .querySelectorAll('[wf-algolia-element="filter-group"]')
    .forEach((t) => {
      if (!t.closest('[wf-algolia-element="browse"]')) return;
      let n = getFieldOrFacet(t);
      if (!n) return;
      let r = e[n] || {},
        i = t.getAttribute("wf-algolia-zeroclass") || "is-disabled";
      t.querySelectorAll('[wf-algolia-element="filter-item"]').forEach((l) => {
        let s = l.getAttribute("wf-algolia-value");
        if (!s) return;
        let c = l.querySelector('[wf-algolia-element="filter-count"]'),
          m = r[s] ?? 0;
        c && (c.textContent = String(m));
        let g = l.hasAttribute("data-wf-algolia-active");
        m === 0 && !g ? l.classList.add(i) : l.classList.remove(i);
      });
      let o = t.querySelector('[wf-algolia-element="filter-group-count"]');
      if (o) {
        let l = Object.keys(r).length,
          s = getTextTemplate(o, "{count}");
        o.textContent = interpolate(s, {
          distinct: l,
          count: l,
        });
      }
    });
}
function stateToAlgoliaFilters(e) {
  let t = [],
    n = [];
  return (
    Object.entries(e).forEach(([r, i]) => {
      if (i.type === "checkbox" || i.type === "boolean") {
        if (!i.values || i.values.size === 0) return;
        i.match === "and"
          ? i.values.forEach((o) => t.push([`${r}:${escapeFilterValue(o)}`]))
          : t.push([...i.values].map((o) => `${r}:${escapeFilterValue(o)}`));
      }
      (i.type === "number" || i.type === "date") &&
        (i.min !== void 0 && n.push(`${r}>=${i.min}`),
        i.max !== void 0 && n.push(`${r}<=${i.max}`));
    }),
    {
      facetFilters: t,
      numericFilters: n,
    }
  );
}
function debounce(e, t) {
  let n;
  return (...r) => {
    (clearTimeout(n), (n = setTimeout(() => e(...r), t)));
  };
}
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
function initFilterSearch(e, t, n) {
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
var warnedNoChipTemplate = new WeakSet();
function renderFilterTags(e, t, n) {
  let r = document.querySelector('[wf-algolia-element="filter-tag-wrapper"]');
  if (!r) return;
  let i = findTemplateFor(r, t, "filter-tag-template");
  if (!i) {
    Object.keys(e).length > 0 &&
      !warnedNoChipTemplate.has(r) &&
      (warnedNoChipTemplate.add(r),
      console.warn(
        '[wf-algolia] active filter detected but no [wf-algolia-element="filter-tag-template"] in DOM. Chips will not render. See https://wf-algolia-docs.candidleap.com/filters/dynamic-filters',
        r,
      ));
    return;
  }
  removeInjected(r);
  let o = getTemplateParent(i) ?? r,
    l = parseReplaceFieldMap(r);
  Object.entries(e).forEach(([s, c]) => {
    if (c.values && c.values.size > 0)
      c.values.forEach((m) => {
        let g = buildValueChip(i, s, m, c, e, n, l);
        o.appendChild(g);
      });
    else if (c.min !== void 0 && c.max !== void 0) {
      let m = buildRangeChip(i, s, c, e, n, l);
      o.appendChild(m);
    }
  });
}
function buildValueChip(e, t, n, r, i, o, l) {
  let s = cloneChip(e),
    c = getFieldPrefixSuffix(t),
    m = s.querySelector('[wf-algolia-element="filter-tag-text"]');
  if (m) {
    let u = formatFacetLabel(n, getLabelMode(m)),
      h = getTextTemplate(m, "{value}");
    m.textContent = interpolate(h, {
      field: fieldDisplayName(l, t),
      value: `${c.prefix}${u}${c.suffix}`,
    });
  }
  let g = s.querySelector('[wf-algolia-element="filter-tag-remove"]');
  return (
    g &&
      g.addEventListener("click", (u) => {
        (u.stopPropagation(),
          r.values.delete(n),
          r.values.size === 0 && delete i[t],
          delete STAGING_STATE[t],
          syncFilterDOM(i),
          o());
      }),
    s
  );
}
function fieldDisplayName(e, t) {
  let n = e?.[t];
  return typeof n == "string" ? n : t;
}
function parseReplaceFieldMap(e) {
  let t = e.getAttribute("wf-algolia-replace-field");
  if (!t) return null;
  try {
    return JSON.parse(t);
  } catch {}
  try {
    return JSON.parse(t.replace(/'/g, '"'));
  } catch {
    return (
      console.error(
        "[wf-algolia] invalid wf-algolia-replace-field JSON on filter-tag-wrapper; rendering raw field names",
        e,
      ),
      null
    );
  }
}
function getFieldPrefixSuffix(e) {
  let t = typeof CSS < "u" && CSS.escape ? CSS.escape(e) : e,
    n = document.querySelector(
      `[wf-algolia-element="filter-group"][wf-algolia-field="${t}"]`,
    );
  return {
    prefix: n?.getAttribute("wf-algolia-prefix") ?? "",
    suffix: n?.getAttribute("wf-algolia-suffix") ?? "",
  };
}
function buildRangeChip(e, t, n, r, i, o) {
  let l = cloneChip(e),
    s = n.min,
    c = n.max,
    m = getFieldPrefixSuffix(t),
    g = `${m.prefix}${s}${m.suffix}`,
    u = `${m.prefix}${c}${m.suffix}`,
    h = l.querySelector('[wf-algolia-element="filter-tag-text"]');
  if (h) {
    let b = getTextTemplate(h, "{min} \u2013 {max}");
    h.textContent = interpolate(b, {
      field: fieldDisplayName(o, t),
      min: g,
      max: u,
      value: `${g} \u2013 ${u}`,
    });
  }
  let y = l.querySelector('[wf-algolia-element="filter-tag-remove"]');
  return (
    y &&
      y.addEventListener("click", (b) => {
        (b.stopPropagation(),
          delete r[t],
          delete STAGING_STATE[t],
          document
            .querySelectorAll('[wf-algolia-element="filter-group"]')
            .forEach((w) => {
              if (getFieldOrFacet(w) !== t) return;
              let E = w.querySelector('[wf-algolia-element="range-min"]'),
                T = w.querySelector('[wf-algolia-element="range-max"]');
              (E && (E.value = E.defaultValue),
                T && (T.value = T.defaultValue));
            }),
          i());
      }),
    l
  );
}
function cloneChip(e) {
  let t = e.cloneNode(!0);
  return (
    (t.style.display = ""),
    t.removeAttribute("wf-algolia-element"),
    t.classList.add("wf-algolia-injected"),
    t
  );
}
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
function initRangeFilters(e, t = 250) {
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
function initInfiniteScroll(e, t) {
  let n = document.createElement("div");
  ((n.className = "wf-algolia-sentinel"),
    (n.style.height = "1px"),
    e.parentElement?.appendChild(n));
  let r = !1;
  new IntersectionObserver(
    (o) => {
      !o[0]?.isIntersecting ||
        r ||
        ((r = !0),
        (async () => {
          try {
            await t();
          } catch (s) {
            console.warn("[wf-algolia] infinite-scroll loader rejected:", s);
          } finally {
            r = !1;
          }
        })());
    },
    {
      rootMargin: "200px",
    },
  ).observe(n);
}
var currentSortIndex = "",
  sortInitialized = !1,
  primarySortIndex = "",
  warnedUnknownReplica = new Set(),
  warnedEmptySortGroup = new WeakSet(),
  SORT_URL_PARAM = "sort";
function getCurrentSort() {
  return currentSortIndex;
}
function sortIndexOf(e) {
  let t = e.getAttribute("wf-algolia-sort-index");
  return t === null || t === "" ? primarySortIndex : t;
}
function knownReplicaIndexes(e) {
  let t = new Set([primarySortIndex]);
  return (
    document
      .querySelectorAll(
        '[wf-algolia-element="sort-item"][wf-algolia-sort-index]',
      )
      .forEach((n) => {
        if (n === e) return;
        let r = n.getAttribute("wf-algolia-sort-index");
        r && t.add(r);
      }),
    document
      .querySelectorAll('[wf-algolia-element="mode-btn"][wf-algolia-mode]')
      .forEach((n) => {
        let r = n.getAttribute("wf-algolia-mode");
        r && r !== "all" && t.add(r);
      }),
    t
  );
}
function syncSortUI() {
  document
    .querySelectorAll('[wf-algolia-element="sort-group"]')
    .forEach((e) => {
      let t = [...e.querySelectorAll('[wf-algolia-element="sort-item"]')],
        n = null;
      for (let r of t) {
        let i = sortIndexOf(r);
        i === currentSortIndex || i === (currentSortIndex || primarySortIndex)
          ? (r.setAttribute("data-wf-algolia-active", "true"), (n = n ?? r))
          : r.removeAttribute("data-wf-algolia-active");
      }
      if (n) {
        let r = (n.textContent ?? "").trim();
        e.querySelectorAll(
          '[wf-algolia-element="sort-selected-label"]',
        ).forEach((i) => {
          let o = getTextTemplate(i, "{value}");
          i.textContent = interpolate(o, {
            value: r,
            count: 1,
          });
        });
      }
    });
}
function writeSortToURL() {
  let e = new URL(window.location.href);
  !currentSortIndex || currentSortIndex === primarySortIndex
    ? e.searchParams.delete(SORT_URL_PARAM)
    : e.searchParams.set(SORT_URL_PARAM, currentSortIndex);
  let t = e.toString();
  t !== window.location.href && window.history.pushState(null, "", t);
}
function readSortFromURL() {
  return new URL(window.location.href).searchParams.get(SORT_URL_PARAM) ?? "";
}
function pickInitialSortItem(e, t) {
  if (e.length === 0) return null;
  if (t) {
    let r = e.find((i) => i.getAttribute("wf-algolia-sort-index") === t);
    if (r) return r;
  }
  let n = e.find((r) => {
    let i = r.getAttribute("wf-algolia-sort-index");
    return i === null || i === "";
  });
  return n || e[0];
}
function onSortItemClick(e, t, n) {
  let r = sortIndexOf(e);
  (r === primarySortIndex ||
    (!knownReplicaIndexes(e).has(r) &&
      !warnedUnknownReplica.has(r) &&
      (warnedUnknownReplica.add(r),
      console.warn(
        `[wf-algolia] sort-by: replica "${r}" is not registered on the page; falling back to primary index "${primarySortIndex}" if Algolia rejects it.`,
        e,
      ))),
    (currentSortIndex = r),
    writeSortToURL(),
    syncSortUI(),
    (t.page = 0),
    closeDropdownOnPick(e),
    n());
}
function initSortGroups(e, t, n) {
  primarySortIndex = n;
  let r = [...document.querySelectorAll('[wf-algolia-element="sort-group"]')];
  if (r.length === 0) return;
  sortInitialized = !0;
  let i = readSortFromURL(),
    o = !1;
  for (let l of r) {
    let s = [...l.querySelectorAll('[wf-algolia-element="sort-item"]')];
    if (s.length === 0) {
      warnedEmptySortGroup.has(l) ||
        (warnedEmptySortGroup.add(l),
        console.warn(
          '[wf-algolia] sort-group has no sort-item descendants. Add `[wf-algolia-element="sort-item"]` children to enable sorting.',
          l,
        ));
      continue;
    }
    if (!o) {
      let c = pickInitialSortItem(s, i);
      c && ((currentSortIndex = sortIndexOf(c)), (o = !0));
    }
    for (let c of s)
      c.addEventListener("click", () => onSortItemClick(c, e, t));
  }
  syncSortUI();
}
function resetSortOnPopState(e) {
  if (!sortInitialized) return;
  ((primarySortIndex = e),
    (currentSortIndex = readSortFromURL() || e),
    syncSortUI());
}
function buildSnippetParam(e, t) {
  return t === "*" ? [`*:${e}`] : t.split(",").map((n) => `${n.trim()}:${e}`);
}
var HASH_PREFIX = "#wfa=";
function enc(e) {
  return encodeURIComponent(e);
}
function dec(e) {
  try {
    return decodeURIComponent(e);
  } catch {
    return e;
  }
}
function stateToQueryString(e, t) {
  let r = new URL(t).searchParams;
  (["q", "mode", "page"].forEach((s) => r.delete(s)),
    [...r.keys()].filter((s) => s.startsWith("f_")).forEach((s) => r.delete(s)),
    e.query && r.set("q", e.query),
    e.mode && e.mode !== "all" && r.set("mode", e.mode),
    e.pagination !== "infinite-scroll" &&
      e.page &&
      e.page > 0 &&
      r.set("page", String(e.page + 1)));
  let i = r.toString(),
    o = [];
  e.filters &&
    Object.entries(e.filters).forEach(([s, c]) => {
      let m = encodeURIComponent(s);
      if (c.type === "checkbox" || c.type === "boolean") {
        if (c.values && c.values.size > 0) {
          let g = [...c.values].map(enc).join(",");
          o.push(`f_${m}=${g}`);
        }
      } else
        (c.type === "number" || c.type === "date") &&
          (c.min !== void 0 &&
            o.push(`f_${m}_min=${encodeURIComponent(String(c.min))}`),
          c.max !== void 0 &&
            o.push(`f_${m}_max=${encodeURIComponent(String(c.max))}`));
    });
  let l = o.join("&");
  return i && l ? `${i}&${l}` : i || l;
}
function stateToHashPayload(e) {
  let t = {};
  return (
    e.filters &&
      Object.entries(e.filters).forEach(([n, r]) => {
        t[n] = {
          type: r.type,
          match: r.match,
          ...(r.values
            ? {
                values: [...r.values],
              }
            : {}),
          ...(r.min !== void 0
            ? {
                min: r.min,
              }
            : {}),
          ...(r.max !== void 0
            ? {
                max: r.max,
              }
            : {}),
        };
      }),
    encodeURIComponent(
      JSON.stringify({
        q: e.query || "",
        mode: e.mode || "",
        page: e.page || 0,
        f: t,
      }),
    )
  );
}
function writeStateToURL(e) {
  let t = window.location.href.split("#")[0] ?? "",
    n = stateToQueryString(e, t),
    r = new URL(t);
  r.search = n ? `?${n}` : "";
  let i = r.toString(),
    o;
  if (i.length <= 2e3) o = i;
  else {
    let l = new URL(t).searchParams;
    (["q", "mode", "page"].forEach((m) => l.delete(m)),
      [...l.keys()]
        .filter((m) => m.startsWith("f_"))
        .forEach((m) => l.delete(m)));
    let s = new URL(t);
    s.search = l.toString();
    let c = stateToHashPayload(e);
    o = `${s.toString()}${HASH_PREFIX}${c}`;
  }
  o !== window.location.href && window.history.pushState(null, "", o);
}
function readStateFromURL() {
  let { hash: e } = window.location;
  return e.startsWith(HASH_PREFIX)
    ? parseHashState(e.slice(HASH_PREFIX.length))
    : parseQueryState();
}
function parseHashState(e) {
  try {
    let t = JSON.parse(decodeURIComponent(e)),
      n = {};
    return (
      Object.entries(t.f || {}).forEach(([r, i]) => {
        let o = {
          type: i.type,
          match: i.match,
        };
        (i.values && (o.values = new Set(i.values)),
          i.min !== void 0 && (o.min = i.min),
          i.max !== void 0 && (o.max = i.max),
          (n[r] = o));
      }),
      {
        query: t.q || "",
        mode: t.mode || "all",
        page: typeof t.page == "number" ? t.page : 0,
        filters: n,
      }
    );
  } catch {
    return {
      query: "",
      mode: "all",
      page: 0,
      filters: {},
    };
  }
}
function parseQueryState() {
  let e = new URL(window.location.href),
    t = e.searchParams.get("q") || "",
    n = e.searchParams.get("mode") || "all",
    r = e.searchParams.get("page"),
    i = r ? Math.max(0, parseInt(r) - 1) : 0,
    o = {},
    l = e.search.startsWith("?") ? e.search.slice(1) : e.search;
  return (
    l.length > 0 &&
      l.split("&").forEach((s) => {
        if (!s.startsWith("f_")) return;
        let c = s.indexOf("=");
        if (c === -1) return;
        let m = s.slice(0, c),
          g = s.slice(c + 1),
          u = dec(m);
        if (u.endsWith("_min")) {
          let h = u.slice(2, -4);
          (o[h] ||
            (o[h] = {
              type: "number",
              match: "or",
            }),
            (o[h].min = parseFloat(dec(g))));
        } else if (u.endsWith("_max")) {
          let h = u.slice(2, -4);
          (o[h] ||
            (o[h] = {
              type: "number",
              match: "or",
            }),
            (o[h].max = parseFloat(dec(g))));
        } else {
          let h = u.slice(2);
          o[h] = {
            type: "checkbox",
            match: "or",
            values: new Set(g.split(",").filter(Boolean).map(dec)),
          };
        }
      }),
    {
      query: t,
      mode: n,
      page: i,
      filters: o,
    }
  );
}
function initModeButtons(e, t, n, r, i) {
  let o = document.querySelectorAll('[wf-algolia-element="mode-btn"]');
  function l() {
    document
      .querySelectorAll('[wf-algolia-element="filter-group"][wf-algolia-index]')
      .forEach((s) => {
        if (s.hasAttribute("wf-algolia-refines")) return;
        let c = s.getAttribute("wf-algolia-index"),
          m = e.mode === "all" || e.mode === c;
        if (((s.style.display = m ? "" : "none"), !m)) {
          let g = s.getAttribute("wf-algolia-field");
          g && t[g] && delete t[g];
        }
      });
  }
  (o.forEach((s) => {
    s.getAttribute("wf-algolia-mode") === e.mode && s.classList.add(r);
  }),
    l(),
    o.forEach((s) => {
      s.addEventListener("click", () => {
        ((e.mode = s.getAttribute("wf-algolia-mode") || "all"),
          (e.page = 0),
          o.forEach((c) => c.classList.remove(r)),
          s.classList.add(r),
          l(),
          n());
      });
    }));
}
function initSortSelect(e, t) {
  let n = document.querySelector('[wf-algolia-element="sort"]');
  n &&
    n.addEventListener("change", () => {
      ((e.sort = n.value), (e.page = 0), t());
    });
}
var urlSyncEnabled = !1,
  paginationMode = "load-more",
  baseFilters = [];
function withBaseFilters(e) {
  return baseFilters.length ? [...e, ...baseFilters] : e;
}
var browseState,
  browseClient,
  browseIndex,
  modeIndexes = [],
  browseElements,
  browseConfig;
async function initBrowsePage(e, t, n) {
  let r = (n.get("browse") || []).filter(
    (m) => m.getAttribute("wf-algolia-disable-filters") !== "true",
  );
  r.length > 1 &&
    console.warn(
      '[wf-algolia] multiple interactive browse wrappers found; only the first is initialized. Mark the others wf-algolia-disable-filters="true" to render them as static lists.',
      r.slice(1),
    );
  let i = r[0];
  if (!i) return;
  if (
    ((browseClient = e),
    (browseConfig = t),
    (browseElements = n),
    (browseConfig = t),
    (browseIndex = i.getAttribute("wf-algolia-index") || ""),
    !browseIndex)
  ) {
    console.error(
      "[wf-algolia] Browse page missing wf-algolia-index attribute",
    );
    return;
  }
  if (
    (document
      .querySelectorAll('[wf-algolia-element="mode-btn"]')
      .forEach((m) => {
        let g = m.getAttribute("wf-algolia-mode");
        g && g !== "all" && !modeIndexes.includes(g) && modeIndexes.push(g);
      }),
    modeIndexes.length === 0 && (modeIndexes = [browseIndex]),
    (browseState = {
      mode: "all",
      sort: "",
      query: "",
      page: 0,
      hitsPerPage: parseInt(i.getAttribute("wf-algolia-per-page") || "12"),
      topOffset: parseInt(i.getAttribute("wf-algolia-top-offset") || "0"),
    }),
    (urlSyncEnabled = i.getAttribute("wf-algolia-url-sync") === "true"),
    (baseFilters =
      readBaseFilter(i, "wf-algolia-base-filter", (m) =>
        console.warn(`[wf-algolia] ${m}`, i),
      ) ?? []),
    urlSyncEnabled)
  ) {
    let m = readStateFromURL();
    if (
      m.query ||
      m.mode !== "all" ||
      m.page > 0 ||
      Object.keys(m.filters).length > 0
    ) {
      ((browseState.query = m.query),
        (browseState.mode = m.mode),
        (browseState.page = m.page),
        Object.assign(FILTER_STATE, m.filters));
      let g = i.querySelector('[wf-algolia-element="browse-search"]');
      g && m.query && (g.value = m.query);
    }
  }
  let o = () => {
    ((browseState.page = 0), runBrowseQuery());
  };
  (initFilterGroups(o),
    syncHierarchyVisibility(FILTER_STATE),
    initDynamicFilters(e, n, runBrowseQuery),
    initFilterSearch(e, n, runBrowseQuery),
    initRangeFilters(o),
    initShowMore(),
    initModeButtons(
      browseState,
      FILTER_STATE,
      runBrowseQuery,
      t.activeClass,
      browseIndex,
    ),
    initSortSelect(browseState, runBrowseQuery),
    initSortGroups(browseState, runBrowseQuery, browseIndex));
  let l = i.querySelector('[wf-algolia-element="browse-search"]');
  l &&
    l.addEventListener(
      "input",
      debounce((m) => {
        ((browseState.query = m.target.value.trim()),
          (browseState.page = 0),
          runBrowseQuery());
      }, t.debounce),
    );
  let s = i.getAttribute("wf-algolia-pagination") || "load-more";
  paginationMode =
    s === "infinite-scroll" || s === "numbered" ? s : "load-more";
  let c = paginationMode === "load-more";
  if (
    (document
      .querySelector('[wf-algolia-element="page-next"]')
      ?.addEventListener("click", () => {
        (browseState.page++, runBrowseQuery(c));
      }),
    document
      .querySelector('[wf-algolia-element="page-prev"]')
      ?.addEventListener("click", () => {
        browseState.page > 0 && (browseState.page--, runBrowseQuery());
      }),
    document
      .querySelector('[wf-algolia-button="reset"]')
      ?.addEventListener("click", () => {
        ((browseState.page = 0), (browseState.query = ""));
        let m = i.querySelector('[wf-algolia-element="browse-search"]');
        (m && (m.value = ""), clearAllFilters(() => runBrowseQuery()));
      }),
    document.querySelectorAll('[wf-algolia-button="apply"]').forEach((m) => {
      m.addEventListener("click", () => {
        let g = resolveApplyTargetFields(m);
        g.length !== 0 &&
          (commitStaging(g), (browseState.page = 0), runBrowseQuery());
      });
    }),
    document
      .querySelectorAll('[wf-algolia-button="apply-cancel"]')
      .forEach((m) => {
        m.addEventListener("click", () => {
          let g = resolveApplyTargetFields(m);
          (discardStaging(g.length > 0 ? g : void 0), syncFilterDOM());
        });
      }),
    window.addEventListener("popstate", () => {
      if ((discardStaging(), resetSortOnPopState(browseIndex), !urlSyncEnabled))
        return;
      let m = readStateFromURL();
      ((browseState.query = m.query),
        (browseState.mode = m.mode),
        (browseState.page = m.page),
        Object.keys(FILTER_STATE).forEach((u) => delete FILTER_STATE[u]),
        Object.assign(FILTER_STATE, m.filters),
        syncHierarchyVisibility(FILTER_STATE));
      let g = document.querySelector('[wf-algolia-element="browse-search"]');
      (g && (g.value = m.query), runBrowseQuery());
    }),
    on("refresh", () => runBrowseQuery()),
    on("filter:parent-change", (m) => {
      let g = collectDescendants(m.parentGroupId);
      g.length !== 0 &&
        g.forEach((u) => {
          delete FILTER_STATE[u.childField];
          let h = getAncestorSelections(u, FILTER_STATE);
          h.length === u.depth
            ? (clearParentEmptyBehavior(u.childEl, u.whenParentEmpty),
              refreshChildGroup(
                browseClient,
                browseElements,
                u.childEl,
                h,
              ).catch((y) => {
                (console.warn("[wf-algolia] refreshChildGroup failed:", y),
                  emit("error", y));
              }))
            : (applyParentEmptyBehavior(u.childEl, u.whenParentEmpty),
              u.childEl
                .querySelectorAll(".wf-algolia-injected")
                .forEach((y) => y.remove()));
        });
    }),
    on("filter:parent-stage-change", (m) => {
      let g = getAllChildLinks().filter((h) => h.parentField === m.field);
      if (g.length === 0) return;
      let u = {
        ...FILTER_STATE,
        ...STAGING_STATE,
      };
      g.forEach((h) => {
        let y = getAncestorSelections(h, u);
        y.length === h.depth
          ? (clearParentEmptyBehavior(h.childEl, h.whenParentEmpty),
            refreshChildGroup(browseClient, browseElements, h.childEl, y).catch(
              (b) => {
                (console.warn(
                  "[wf-algolia] refreshChildGroup (staged) failed:",
                  b,
                ),
                  emit("error", b));
              },
            ))
          : (applyParentEmptyBehavior(h.childEl, h.whenParentEmpty),
            h.childEl
              .querySelectorAll(".wf-algolia-injected")
              .forEach((b) => b.remove()));
      });
    }),
    setIndexNameResolver(
      () =>
        getCurrentSort() ||
        browseState.sort ||
        (browseState.mode !== "all" ? browseState.mode : browseIndex),
    ),
    await runBrowseQuery(),
    paginationMode === "infinite-scroll")
  ) {
    let m = i.querySelector('[wf-algolia-element="results"]');
    m &&
      initInfiniteScroll(m, async () => {
        (browseState.page++, await runBrowseQuery(!0));
      });
  }
}
function resolveApplyTargetFields(e) {
  let t = e.getAttribute("wf-algolia-fields");
  if (t !== null)
    return t
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);
  let n = e.closest('[wf-algolia-element="filter-group"]');
  if (n) {
    let i = n.getAttribute("wf-algolia-field");
    return i ? [i] : [];
  }
  let r = e.closest('[wf-algolia-element="browse"]');
  return r
    ? Array.from(
        r.querySelectorAll(
          '[wf-algolia-element="filter-group"][wf-algolia-apply-mode="deferred"]',
        ),
      )
        .map((i) => i.getAttribute("wf-algolia-field"))
        .filter((i) => !!i)
    : [];
}
function buildPerIndexFilters() {
  let e = {},
    t = new Map();
  document
    .querySelectorAll('[wf-algolia-element="filter-group"][wf-algolia-index]')
    .forEach((n) => {
      let r = n.getAttribute("wf-algolia-field"),
        i = n.getAttribute("wf-algolia-index");
      r && i && t.set(r, i);
    });
  for (let n of modeIndexes) {
    let r = {};
    (Object.entries(FILTER_STATE).forEach(([i, o]) => {
      let l = t.get(i);
      (!l || l === n) && (r[i] = o);
    }),
      (e[n] = stateToAlgoliaFilters(r)));
  }
  return e;
}
function refreshFromPageZero() {
  ((browseState.page = 0), runBrowseQuery());
}
function runBrowseQuery(e = !1) {
  (renderSelectedCounts(FILTER_STATE), renderSelectedValues(FILTER_STATE));
  let t = document.querySelector(
      '[wf-algolia-element="browse"] [wf-algolia-element="results"]',
    ),
    n = t ? findTemplateFor(t, browseElements) : null,
    r = document.querySelector(
      '[wf-algolia-element="browse"] [wf-algolia-element="loader"]',
    ),
    i = document.querySelector(
      '[wf-algolia-element="browse"] [wf-algolia-element="no-results"]',
    );
  return !t || !n
    ? Promise.resolve()
    : (showElement(r),
      browseState.mode === "all" && !browseState.sort && !getCurrentSort()
        ? runFederatedQuery(t, n, r, i, e)
        : runSingleIndexQuery(t, n, r, i, e));
}
function runSingleIndexQuery(e, t, n, r, i) {
  let { facetFilters: o, numericFilters: l } =
      stateToAlgoliaFilters(FILTER_STATE),
    s =
      getCurrentSort() ||
      browseState.sort ||
      (browseState.mode !== "all" ? browseState.mode : browseIndex),
    c = withBaseFilters(o),
    m = {
      hitsPerPage: browseState.hitsPerPage,
      page: browseState.page,
      facets: ["*"],
      facetFilters: c,
      numericFilters: l,
      clickAnalytics: !0,
      attributesToSnippet: snippetParam(
        browseConfig.snippetWords,
        browseConfig.snippetAttrs,
      ),
    };
  return searchWithMiddleware(m, (g) =>
    browseClient.initIndex(s).search(browseState.query || "", g),
  )
    .then((g) => {
      hideElement(n);
      let u = g.hits.map((h) => ({
        ...h,
        __queryID: g.queryID,
        __indexName: s,
      }));
      (i || removeInjected(e),
        u.length === 0 && !i
          ? showElement(r)
          : (hideElement(r), renderHits(e, t, u, i, browseConfig)),
        syncFacetCounts(g.facets || {}),
        syncDynamicFacetCounts(g.facets || {}),
        toggleGroupsByFacetPresence(g.facets || {}),
        syncFilterDOM(),
        renderFilterTags(FILTER_STATE, browseElements, refreshFromPageZero),
        syncResultsCount(g.nbHits, g.nbPages),
        renderPaginationControls(g.nbPages),
        emit("results", g));
    })
    .catch((g) => {
      (hideElement(n),
        console.error("[wf-algolia] Browse query failed:", g),
        emit("error", g));
    });
}
function runFederatedQuery(e, t, n, r, i) {
  let o = buildPerIndexFilters(),
    l = Math.ceil(browseState.hitsPerPage / modeIndexes.length),
    s = modeIndexes.map((c) => {
      let m = o[c] || {
          facetFilters: [],
          numericFilters: [],
        },
        g = withBaseFilters(m.facetFilters);
      return {
        indexName: c,
        query: browseState.query || "",
        params: {
          hitsPerPage: l,
          page: browseState.page,
          facets: ["*"],
          facetFilters: g,
          numericFilters: m.numericFilters,
          clickAnalytics: !0,
          attributesToSnippet: snippetParam(
            browseConfig.snippetWords,
            browseConfig.snippetAttrs,
          ),
        },
      };
    });
  return multiQueryWithMiddleware(browseClient, s)
    .then(({ results: c }) => {
      hideElement(n);
      let m = [],
        g = {},
        u = 0,
        h = 0;
      (c.forEach((y, b) => {
        let w = modeIndexes[b],
          E = y.hits.map((T) => ({
            ...T,
            __queryID: y.queryID,
            __indexName: w,
          }));
        (m.push(...E),
          (u += y.nbHits),
          (h = Math.max(h, y.nbPages)),
          y.facets &&
            Object.entries(y.facets).forEach(([T, k]) => {
              let D = g[T] ?? (g[T] = {});
              Object.entries(k).forEach(([K, C]) => {
                D[K] = (D[K] ?? 0) + C;
              });
            }));
      }),
        i || removeInjected(e),
        m.length === 0 && !i
          ? showElement(r)
          : (hideElement(r), renderHits(e, t, m, i, browseConfig)),
        syncFacetCounts(g),
        syncDynamicFacetCounts(g),
        toggleGroupsByFacetPresence(g),
        syncFilterDOM(),
        renderFilterTags(FILTER_STATE, browseElements, refreshFromPageZero),
        syncResultsCount(u, h),
        renderPaginationControls(h),
        emit("results", {
          results: c,
          nbHits: u,
          nbPages: h,
        }));
    })
    .catch((c) => {
      (hideElement(n),
        console.error("[wf-algolia] Browse multi-query failed:", c),
        emit("error", c));
    });
}
function snippetParam(e, t) {
  return buildSnippetParam(e, t);
}
var DEFAULT_PAGE_WINDOW = 5;
function getPageWindow(e) {
  if (!e) return DEFAULT_PAGE_WINDOW;
  let t = e.getAttribute("wf-algolia-page-window");
  if (t === null || t === "") return DEFAULT_PAGE_WINDOW;
  let n = parseInt(t, 10);
  return Number.isNaN(n) ? DEFAULT_PAGE_WINDOW : Math.max(1, n);
}
function renderResultsCount(e, t) {
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
function syncResultsCount(e, t) {
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
function renderPaginationControls(e) {
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
function initAccessibility(e) {
  ((e.get("search-input") || []).forEach((t) => {
    (t.setAttribute("role", "searchbox"),
      t.getAttribute("aria-label") || t.setAttribute("aria-label", "Search"));
  }),
    (e.get("browse-search") || []).forEach((t) => {
      (t.setAttribute("role", "searchbox"),
        t.getAttribute("aria-label") || t.setAttribute("aria-label", "Search"));
    }),
    ["results", "autocomplete"].forEach((t) => {
      (e.get(t) || []).forEach((n) => {
        (n.setAttribute("role", "listbox"),
          n.getAttribute("aria-label") ||
            n.setAttribute("aria-label", "Search results"));
      });
    }),
    (e.get("results-count") || []).forEach((t) => {
      (t.setAttribute("role", "status"), t.setAttribute("aria-live", "polite"));
    }),
    (e.get("no-results") || []).forEach((t) => {
      (t.setAttribute("role", "status"), t.setAttribute("aria-live", "polite"));
    }),
    (e.get("mode-btn") || []).forEach((t) => {
      (t.setAttribute("role", "tab"),
        t.setAttribute("tabindex", "0"),
        t.addEventListener("keydown", (n) => {
          (n.key === "Enter" || n.key === " ") &&
            (n.preventDefault(), t.click());
        }));
    }),
    document
      .querySelectorAll('[wf-algolia-element="filter-item"]')
      .forEach((t) => {
        t.querySelector("input") ||
          (t.setAttribute("role", "button"), t.setAttribute("tabindex", "0"));
      }));
}
var clientSingleton = null;
function initClient(e) {
  return (
    clientSingleton ||
      (clientSingleton = algoliasearchFactory(e.appId, e.searchKey)),
    clientSingleton
  );
}
var TAG_NAME_RE = /^[a-z][a-z0-9-]*$/;
function initConfig() {
  let e = document.querySelector("script[data-app-id]");
  if (!e)
    throw new Error("[wf-algolia] Script tag missing data-app-id attribute");
  let t = e.getAttribute("data-app-id");
  t &&
    console.log(
      `%c[wf-algolia] Script initialized with App ID: ${t} at ${new Date().toISOString()}`,
      "font-size:1.5em; font-weight:bold; color:#76B900;",
    );
  let n = e.getAttribute("data-app-id"),
    r = e.getAttribute("data-search-key");
  if (!n || !r)
    throw new Error(
      "[wf-algolia] data-app-id and data-search-key are required",
    );
  let i = e.getAttribute("data-highlight-tag") || "mark",
    o = TAG_NAME_RE.test(i) ? i : "mark";
  return {
    appId: n,
    searchKey: r,
    insights: e.getAttribute("data-insights") === "true",
    insightsCookie: e.getAttribute("data-insights-cookie") === "true",
    debounce: parseInt(e.getAttribute("data-debounce") || "250"),
    autocompleteDebounce: parseInt(
      e.getAttribute("data-autocomplete-debounce") ||
        e.getAttribute("data-debounce") ||
        "150",
    ),
    highlightTag: o,
    snippetWords: (() => {
      let l = e.getAttribute("data-snippet-words");
      if (l === null) return 30;
      let s = parseInt(l, 10);
      return Number.isNaN(s) ? 30 : Math.max(1, s);
    })(),
    snippetAttrs: e.getAttribute("data-snippet-attrs") || "*",
    activeClass: e.getAttribute("data-activeclass") || "is-active",
    hideClass: e.getAttribute("data-hideclass") || "is-hidden",
  };
}
var TEMPLATE_ROLES = [
    "filter-template",
    "template",
    "filter-tag-template",
    "autocomplete-template",
  ],
  SLOT_ROLES = ["filter-value-text", "filter-count"];
function resolveFieldScope(e) {
  let t =
    e.getAttribute("wf-algolia-field") || e.getAttribute("wf-algolia-facet");
  if (t) return t;
  let n = e.closest("[wf-algolia-field], [wf-algolia-facet]");
  return !n || n === e
    ? null
    : n.getAttribute("wf-algolia-field") ||
        n.getAttribute("wf-algolia-facet") ||
        null;
}
function collectFilterGroups(e) {
  let t = [];
  return (
    e.querySelectorAll('[wf-algolia-element="filter-group"]').forEach((n) => {
      let r =
        n.getAttribute("wf-algolia-field") ||
        n.getAttribute("wf-algolia-facet");
      r &&
        t.push({
          el: n,
          field: r,
        });
    }),
    t
  );
}
function makeIssue(e, t, n, r, i) {
  return {
    ruleId: e,
    severity: t,
    element: n,
    message: r,
    fix: i,
  };
}
var ruleFilterItemOrphan = (e) => {
    let t = [];
    return (
      e.querySelectorAll('[wf-algolia-element="filter-item"]').forEach((n) => {
        resolveFieldScope(n) ||
          t.push(
            makeIssue(
              "filter-item-orphan",
              "error",
              n,
              "filter-item has no resolvable filter scope.",
              'Wrap in a `wf-algolia-field="\u2026"` container or add `wf-algolia-field="\u2026"` to the item.',
            ),
          );
      }),
      t
    );
  },
  ruleFilterGroupMissingField = (e) => {
    let t = [];
    return (
      e.querySelectorAll('[wf-algolia-element="filter-group"]').forEach((n) => {
        n.getAttribute("wf-algolia-field") ||
          n.getAttribute("wf-algolia-facet") ||
          t.push(
            makeIssue(
              "filter-group-missing-field",
              "error",
              n,
              "filter-group is missing the field it controls.",
              'Add `wf-algolia-field="<facet>"` (or `wf-algolia-facet` for dynamic groups).',
            ),
          );
      }),
      t
    );
  },
  ruleFilterSearchOrphan = (e) => {
    let t = [];
    return (
      e
        .querySelectorAll('[wf-algolia-element="filter-search"]')
        .forEach((n) => {
          resolveFieldScope(n) ||
            t.push(
              makeIssue(
                "filter-search-orphan",
                "error",
                n,
                "filter-search input has no resolvable filter scope.",
                'Place inside a `wf-algolia-field="\u2026"` wrapper or add `wf-algolia-field="\u2026"` to the input.',
              ),
            );
        }),
      t
    );
  },
  ruleFilterSearchResultsOrphan = (e) => {
    let t = [];
    return (
      e
        .querySelectorAll('[wf-algolia-element="filter-search-results"]')
        .forEach((n) => {
          let r = resolveFieldScope(n);
          if (!r) {
            t.push(
              makeIssue(
                "filter-search-results-orphan",
                "error",
                n,
                "filter-search-results has no resolvable filter scope.",
                'Place inside the same `wf-algolia-field="\u2026"` wrapper as the matching filter-search input.',
              ),
            );
            return;
          }
          Array.from(
            e.querySelectorAll('[wf-algolia-element="filter-search"]'),
          ).filter((o) => resolveFieldScope(o) === r).length === 0 &&
            t.push(
              makeIssue(
                "filter-search-results-orphan",
                "error",
                n,
                `filter-search-results for field "${r}" has no matching filter-search input on the page.`,
                'Add a `wf-algolia-element="filter-search"` input inside the same field wrapper.',
              ),
            );
        }),
      t
    );
  },
  ruleDuplicateFieldWrapper = (e) => {
    let t = [],
      n = new Map();
    return (
      collectFilterGroups(e).forEach(({ el: r, field: i }) => {
        n.get(i)
          ? t.push(
              makeIssue(
                "duplicate-filter-field-wrapper",
                "error",
                r,
                `Another filter-group on this page already declares field "${i}".`,
                "Merge into one filter-group, or rename one of the fields.",
              ),
            )
          : n.set(i, r);
      }),
      t
    );
  },
  ruleTemplateNotDirectChild = (e) => {
    let t = [];
    return (
      e
        .querySelectorAll('[wf-algolia-element="filter-template"]')
        .forEach((n) => {
          let r = n.parentElement;
          r &&
            r.getAttribute("wf-algolia-element") !== "filter-group" &&
            t.push(
              makeIssue(
                "filter-template-not-direct-child",
                "error",
                n,
                "filter-template is not a direct child of its filter-group.",
                "Move the template up one level so it is a direct child of the filter-group.",
              ),
            );
        }),
      t
    );
  },
  ruleFieldButNoRole = (e) => {
    let t = [];
    return (
      e.querySelectorAll("[wf-algolia-field]").forEach((n) => {
        n.hasAttribute("wf-algolia-element") ||
          n.querySelector("[wf-algolia-element]") ||
          t.push(
            makeIssue(
              "field-but-no-role",
              "warn",
              n,
              "Element has `wf-algolia-field` but no `wf-algolia-element` role.",
              "Either remove the field attribute (if unused) or add the role you intended.",
            ),
          );
      }),
      t
    );
  },
  ruleRoleButNoField = (e) => {
    let t = [],
      n = new Set([
        "filter-group",
        "filter-item",
        "filter-search",
        "filter-search-results",
        "filter-template",
      ]);
    return (
      e.querySelectorAll("[wf-algolia-element]").forEach((r) => {
        let i = r.getAttribute("wf-algolia-element");
        n.has(i) &&
          i !== "filter-template" &&
          i !== "filter-group" &&
          (resolveFieldScope(r) ||
            t.push(
              makeIssue(
                "role-but-no-field",
                "warn",
                r,
                `Element role "${i}" resolves to no field.`,
                'Wrap in a `wf-algolia-field="\u2026"` container or add the field attribute directly.',
              ),
            ));
      }),
      t
    );
  },
  ruleConflictingType = (e) => {
    let t = [];
    return (
      e
        .querySelectorAll(
          '[wf-algolia-element="filter-group"][wf-algolia-type]',
        )
        .forEach((n) => {
          let r = n.getAttribute("wf-algolia-type");
          if (r !== "checkbox" && r !== "radio") return;
          let i = Array.from(
            n.querySelectorAll('[wf-algolia-element="filter-item"]'),
          );
          if (i.length === 0) return;
          let o = i.filter((c) => !!c.querySelector('input[type="radio"]')),
            l = i.filter((c) => !!c.querySelector('input[type="checkbox"]'));
          if (o.length === 0 && l.length === 0) return;
          let s = (c) =>
            (c === "radio" ? o.length : l.length) === i.length &&
            (c === "radio" ? l.length : o.length) === 0;
          (r === "checkbox" &&
            s("radio") &&
            t.push(
              makeIssue(
                "conflicting-type",
                "warn",
                n,
                'filter-group declares type="checkbox" but every filter-item contains a radio input.',
                'Set `wf-algolia-type="radio"` (or change the inputs to checkboxes).',
              ),
            ),
            r === "radio" &&
              s("checkbox") &&
              t.push(
                makeIssue(
                  "conflicting-type",
                  "warn",
                  n,
                  'filter-group declares type="radio" but every filter-item contains a checkbox input.',
                  'Set `wf-algolia-type="checkbox"` (or change the inputs to radios).',
                ),
              ));
        }),
      t
    );
  },
  ruleHitPreviewNestedInBrowse = (e) => {
    let t = [];
    return (
      e.querySelectorAll('[wf-algolia-element="hit-preview"]').forEach((n) => {
        n.closest('[wf-algolia-element="browse"]') &&
          t.push(
            makeIssue(
              "hit-preview-nested-in-browse",
              "error",
              n,
              "hit-preview is nested inside a browse element.",
              "Move hit-preview outside the browse wrapper.",
            ),
          );
      }),
      t
    );
  },
  ruleHitPreviewNoTemplate = (e) => {
    let t = [];
    return (
      e.querySelectorAll('[wf-algolia-element="hit-preview"]').forEach((n) => {
        n.querySelector(
          "[wf-algolia-text], [wf-algolia-image], [wf-algolia-hit-link-template]",
        ) ||
          t.push(
            makeIssue(
              "hit-preview-no-template",
              "error",
              n,
              "hit-preview has no descendant carrying a bind attribute.",
              "Add a child with `wf-algolia-text` / `wf-algolia-image` / `wf-algolia-hit-link-template`.",
            ),
          );
      }),
      t
    );
  },
  ruleHitPreviewMissingFieldValue = (e) => {
    let t = [];
    return (
      e.querySelectorAll('[wf-algolia-element="hit-preview"]').forEach((n) => {
        (n.hasAttribute("wf-algolia-field") &&
          n.hasAttribute("wf-algolia-value")) ||
          n.closest('[wf-algolia-element="scope-facet"]') ||
          n.closest('[wf-algolia-element="filter-item"]') ||
          t.push(
            makeIssue(
              "hit-preview-missing-field-value",
              "error",
              n,
              "hit-preview has no own (field, value) pair and no scope-facet / filter-item ancestor.",
              "Add `wf-algolia-field` + `wf-algolia-value`, or wrap in a `scope-facet`.",
            ),
          );
      }),
      t
    );
  },
  ruleRefinesTargetMissing = (e) => {
    let t = [],
      n = new Set();
    return (
      e.querySelectorAll("[wf-algolia-group-id]").forEach((r) => {
        let i = r.getAttribute("wf-algolia-group-id");
        i && n.add(i);
      }),
      e.querySelectorAll("[wf-algolia-refines]").forEach((r) => {
        let i = r.getAttribute("wf-algolia-refines");
        i &&
          (n.has(i) ||
            t.push(
              makeIssue(
                "refines-target-missing",
                "error",
                r,
                `wf-algolia-refines="${i}" points at a group-id that does not exist on this page.`,
                "Add the parent group with the matching `wf-algolia-group-id`, or fix the refines value.",
              ),
            ));
      }),
      t
    );
  },
  ruleDuplicateGroupId = (e) => {
    let t = [],
      n = new Map();
    return (
      e.querySelectorAll("[wf-algolia-group-id]").forEach((r) => {
        let i = r.getAttribute("wf-algolia-group-id");
        if (!i) return;
        n.get(i)
          ? t.push(
              makeIssue(
                "duplicate-group-id",
                "error",
                r,
                `Another element on this page already declares wf-algolia-group-id="${i}".`,
                "Rename one of the duplicate group ids.",
              ),
            )
          : n.set(i, r);
      }),
      t
    );
  },
  ruleCascadeCollision = (e) => {
    let t = [],
      n = e instanceof Document ? e : (e.ownerDocument ?? null);
    return (
      n &&
        [n.body, n.documentElement].forEach((i) => {
          i &&
            i.hasAttribute("wf-algolia-index") &&
            t.push(
              makeIssue(
                "cascade-collision",
                "warn",
                i,
                "`wf-algolia-index` is set on <body> or <html>, overriding every Browse / Detail / Search on the page.",
                "Move the index attribute to a smaller ancestor that scopes only the relevant section.",
              ),
            );
        }),
      t
    );
  },
  ruleDataAlgoliaOnCanvas = (e) => {
    let t = [];
    return (
      e.querySelectorAll("*").forEach((n) => {
        if (n.tagName.toLowerCase() !== "script") {
          for (let r of Array.from(n.attributes))
            if (r.name.startsWith("data-algolia-")) {
              t.push(
                makeIssue(
                  "data-asterisk-on-canvas",
                  "error",
                  n,
                  `Canvas element has \`${r.name}\` \u2014 canvas uses the \`wf-algolia-*\` namespace.`,
                  `Rename \`${r.name}\` to \`wf-${r.name.slice(5)}\`.`,
                ),
              );
              return;
            }
        }
      }),
      t
    );
  },
  ruleWfAlgoliaOnScriptTag = (e) => {
    let t = [];
    return (
      e.querySelectorAll("script").forEach((n) => {
        for (let r of Array.from(n.attributes))
          if (r.name.startsWith("wf-algolia-")) {
            t.push(
              makeIssue(
                "wf-algolia-on-script-tag",
                "error",
                n,
                `<script> tag has \`${r.name}\` \u2014 script-tag attributes use the \`data-*\` namespace.`,
                `Rename \`${r.name}\` to \`data-${r.name.slice(11)}\`.`,
              ),
            );
            return;
          }
      }),
      t
    );
  },
  ruleTemplateNotHidden = (e) => {
    let t = [];
    return (
      TEMPLATE_ROLES.forEach((n) => {
        e.querySelectorAll(`[wf-algolia-element="${n}"]`).forEach((r) => {
          r.hasAttribute("hidden") ||
            (r.style && r.style.display === "none") ||
            t.push(
              makeIssue(
                "template-not-hidden",
                "warn",
                r,
                `Template element (${n}) is not hidden \u2014 visitors may briefly see the prototype.`,
                "Set Display: None on the template in the Designer Style panel (or add the `hidden` attribute).",
              ),
            );
        });
      }),
      t
    );
  },
  ruleSlotWithoutTemplateParent = (e) => {
    let t = [];
    return (
      SLOT_ROLES.forEach((n) => {
        e.querySelectorAll(`[wf-algolia-element="${n}"]`).forEach((r) => {
          let i = TEMPLATE_ROLES.map((o) => `[wf-algolia-element="${o}"]`).join(
            ", ",
          );
          r.closest(i) ||
            t.push(
              makeIssue(
                "slot-without-template-parent",
                "warn",
                r,
                `Slot role "${n}" is not inside any template element.`,
                "Move into a template (filter-template / template / filter-tag-template / autocomplete-template).",
              ),
            );
        });
      }),
      t
    );
  },
  ruleFieldPointerUndefined = (e) => {
    let t = [],
      n = new Set(collectFilterGroups(e).map((r) => r.field));
    return (
      e.querySelectorAll("[wf-algolia-field]").forEach((r) => {
        if (r.getAttribute("wf-algolia-element") === "filter-group") return;
        let i = r.getAttribute("wf-algolia-field");
        if (!i) return;
        let o = r.closest('[wf-algolia-element="filter-group"]');
        (o &&
          (o.getAttribute("wf-algolia-field") === i ||
            o.getAttribute("wf-algolia-facet") === i)) ||
          n.has(i) ||
          t.push(
            makeIssue(
              "field-pointer-to-undefined-filter",
              "error",
              r,
              `Element points at field "${i}" but no filter-group on this page declares that field.`,
              "Either author the filter-group, or fix the field pointer.",
            ),
          );
      }),
      t
    );
  },
  ruleDuplicateFieldPointer = (e) => {
    let t = [],
      n = new Map();
    return (
      e
        .querySelectorAll("[wf-algolia-field][wf-algolia-element]")
        .forEach((r) => {
          let i = r.getAttribute("wf-algolia-element"),
            o = r.getAttribute("wf-algolia-field");
          if (!i || !o) return;
          let l = r.closest('[wf-algolia-element="filter-group"]');
          if (
            (l &&
              (l.getAttribute("wf-algolia-field") === o ||
                l.getAttribute("wf-algolia-facet") === o)) ||
            i === "filter-group"
          )
            return;
          let s = `${i}::${o}`;
          n.get(s)
            ? t.push(
                makeIssue(
                  "duplicate-field-pointer-same-role",
                  "warn",
                  r,
                  `Another cross-scope element on this page already declares role="${i}" + field="${o}".`,
                  "Confirm intentional; otherwise remove the duplicate.",
                ),
              )
            : n.set(s, r);
        }),
      t
    );
  },
  ALL_RULES = [
    ruleFilterItemOrphan,
    ruleFilterGroupMissingField,
    ruleFilterSearchOrphan,
    ruleFilterSearchResultsOrphan,
    ruleDuplicateFieldWrapper,
    ruleTemplateNotDirectChild,
    ruleFieldButNoRole,
    ruleRoleButNoField,
    ruleConflictingType,
    ruleHitPreviewNestedInBrowse,
    ruleHitPreviewNoTemplate,
    ruleHitPreviewMissingFieldValue,
    ruleRefinesTargetMissing,
    ruleDuplicateGroupId,
    ruleCascadeCollision,
    ruleDataAlgoliaOnCanvas,
    ruleWfAlgoliaOnScriptTag,
    ruleTemplateNotHidden,
    ruleSlotWithoutTemplateParent,
    ruleFieldPointerUndefined,
    ruleDuplicateFieldPointer,
  ];
function runAudit(e, t = ALL_RULES) {
  let n = [];
  for (let r of t) n.push(...r(e));
  return n;
}
var DEBUG_ATTR = "data-wf-algolia-debug",
  ISSUE_ATTR = "data-wf-algolia-issue",
  DEBUG_LOG_PREFIX = "[wf-algolia debug]";
function isDebugEnabled(e = document) {
  let t = e.querySelector(`script[${DEBUG_ATTR}]`);
  return t ? t.getAttribute(DEBUG_ATTR) === "true" : !1;
}
var OBSERVED_ATTRS = [
  "wf-algolia-element",
  "wf-algolia-field",
  "wf-algolia-facet",
  "wf-algolia-value",
  "wf-algolia-index",
  "wf-algolia-type",
  "wf-algolia-match",
  "wf-algolia-group-id",
  "wf-algolia-refines",
  "wf-algolia-text",
  "wf-algolia-image",
  "wf-algolia-hit-link-template",
];
function newSeenMap() {
  return new Map();
}
function alreadyReported(e, t) {
  let n = e.get(t.ruleId);
  return (
    n || ((n = new WeakSet()), e.set(t.ruleId, n)),
    n.has(t.element) ? !0 : (n.add(t.element), !1)
  );
}
function tagIssue(e, t) {
  let n = e.getAttribute(ISSUE_ATTR);
  if (!n) {
    e.setAttribute(ISSUE_ATTR, t);
    return;
  }
  let r = n.split(/\s+/).filter(Boolean);
  r.includes(t) || (r.push(t), e.setAttribute(ISSUE_ATTR, r.join(" ")));
}
function logIssue(e) {
  let t = `${DEBUG_LOG_PREFIX} ${e.ruleId}: ${e.message} \u2014 fix: ${e.fix}`;
  e.severity === "error"
    ? console.error(t, e.element)
    : console.warn(t, e.element);
}
function auditAndLog(e = document, t = newSeenMap(), n = ALL_RULES) {
  let r = runAudit(e, n),
    i = 0;
  for (let o of r)
    alreadyReported(t, o) ||
      (logIssue(o), tagIssue(o.element, o.ruleId), (i += 1));
  return {
    issues: r,
    newlyLogged: i,
  };
}
var debugStarted = !1,
  debugObserver = null;
function initDebugAudit(e = document) {
  if (debugStarted || !isDebugEnabled(e)) return null;
  debugStarted = !0;
  let t = newSeenMap();
  auditAndLog(e, t);
  let n = !1,
    r = () => {
      if (n) return;
      ((n = !0),
        (typeof requestAnimationFrame < "u"
          ? requestAnimationFrame
          : (s) => setTimeout(() => s(0), 16))(() => {
          ((n = !1), auditAndLog(e, t));
        }));
    },
    i = new MutationObserver((l) => {
      for (let s of l) {
        if (s.type === "attributes") {
          r();
          return;
        }
        if (s.type === "childList")
          for (let c of [
            ...Array.from(s.addedNodes),
            ...Array.from(s.removedNodes),
          ]) {
            if (c.nodeType !== 1) continue;
            let m = c;
            if (
              m.hasAttribute?.("wf-algolia-element") ||
              m.hasAttribute?.("wf-algolia-field") ||
              m.hasAttribute?.("wf-algolia-facet") ||
              m.querySelector?.(
                "[wf-algolia-element], [wf-algolia-field], [wf-algolia-facet]",
              )
            ) {
              r();
              return;
            }
          }
      }
    }),
    o = e.body || e.documentElement;
  return (
    i.observe(o, {
      subtree: !0,
      childList: !0,
      attributes: !0,
      attributeFilter: OBSERVED_ATTRS,
    }),
    (debugObserver = i),
    i
  );
}
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
function initFacetStats(e, t) {
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
var warnedPreviewNoField = new WeakSet(),
  warnedPreviewNoValue = new WeakSet(),
  warnedPreviewNoTemplate = new WeakSet(),
  warnedPreviewInBrowse = new WeakSet(),
  warnedPreviewHasFilterTemplate = new WeakSet(),
  warnedDuplicatePair = new WeakSet(),
  warnedZeroHits = new WeakSet(),
  warnedScopeFacetNoField = new WeakSet(),
  warnedUnresolvedScopeValue = new WeakSet(),
  renderedPairKeys = new Map();
function resolvePreviewFieldValue(e) {
  let t = e.getAttribute("wf-algolia-field"),
    n = e.getAttribute("wf-algolia-value"),
    r = null,
    i = null,
    o = null,
    l = !0;
  (!t || !n) &&
    ((r = e.closest('[wf-algolia-element="scope-facet"]')),
    r &&
      ((i = r.getAttribute("wf-algolia-field")),
      (o = r.getAttribute("wf-algolia-value")),
      (l = i !== null && i !== "")));
  let s = !1;
  if (!t && !i) {
    let c = e.closest('[wf-algolia-element="filter-item"]');
    if (c) {
      let m = c.closest('[wf-algolia-element="filter-group"]'),
        g =
          m?.getAttribute("wf-algolia-facet") ??
          m?.getAttribute("wf-algolia-field") ??
          null,
        u = c.getAttribute("wf-algolia-value");
      (g && (i = g), !n && !o && u !== null && (o = u), (s = g !== null));
    }
  } else if (!n && !o) {
    let m =
      e
        .closest('[wf-algolia-element="filter-item"]')
        ?.getAttribute("wf-algolia-value") ?? null;
    m !== null && (o = m);
  }
  return (
    s && r === null && (l = !0),
    {
      field: t || i || null,
      value: n || o || null,
      scopeFacetEl: r,
      scopeFacetHasField: l,
    }
  );
}
function resolvePreviewIndex(e) {
  let t = e.getAttribute("wf-algolia-index");
  if (t) return t;
  let n = e.closest("[wf-algolia-index]");
  if (n && n !== e) {
    let o = n.getAttribute("wf-algolia-index");
    if (o) return o;
  }
  return (
    document.querySelector("script[data-app-id]")?.getAttribute("data-index") ||
    ""
  );
}
function findPreviewTemplate(e) {
  let t =
    "[wf-algolia-text], [wf-algolia-image], [wf-algolia-hit-link-template]";
  for (let n of Array.from(e.children)) {
    let r = n;
    if (r.matches(t) || r.querySelector(t)) return r;
  }
  return null;
}
function fillLinkTemplate(e, t) {
  return e.replace(/\{([a-zA-Z0-9_.-]+)\}/g, (n, r) => {
    let i = t[r];
    return i == null ? "" : String(i);
  });
}
function populatePreviewCard(e, t) {
  (e.querySelectorAll("[wf-algolia-text]").forEach((r) => {
    let i = r.getAttribute("wf-algolia-text");
    if (!i) return;
    let o = t[i];
    r.textContent = o == null ? "" : String(o);
  }),
    e.querySelectorAll("[wf-algolia-image]").forEach((r) => {
      let i = r.getAttribute("wf-algolia-image");
      if (!i) return;
      let o = t[i];
      (r.removeAttribute("srcset"),
        r.removeAttribute("data-src"),
        r.removeAttribute("data-srcset"),
        (r.src = o == null ? "" : String(o)));
    }));
  let n = [];
  (e.hasAttribute("wf-algolia-hit-link-template") && n.push(e),
    e
      .querySelectorAll("[wf-algolia-hit-link-template]")
      .forEach((r) => n.push(r)));
  for (let r of n) {
    let i = r.getAttribute("wf-algolia-hit-link-template");
    if (!i) continue;
    let o = fillLinkTemplate(i, t);
    r instanceof HTMLAnchorElement
      ? r.setAttribute("href", o)
      : r.setAttribute("data-wf-algolia-href", o);
  }
}
function isInsideHitPreview(e) {
  return e ? e.closest('[wf-algolia-element="hit-preview"]') !== null : !1;
}
var clickTrapInstalled = !1;
function installClickTrap() {
  clickTrapInstalled ||
    ((clickTrapInstalled = !0),
    document.addEventListener(
      "click",
      (e) => {
        let t = e.target;
        isInsideHitPreview(t) && e.stopPropagation();
      },
      !0,
    ));
}
var PREVIEW_BATCH_SIZE = 50;
function chunkQueries(e, t) {
  let n = [];
  for (let r = 0; r < e.length; r += t) n.push(e.slice(r, r + t));
  return n;
}
async function batchedPreviewFetch(e, t, n) {
  let r = t.map((s) => ({
      indexName: s.indexName,
      query: "",
      params: {
        facetFilters: [[`${s.field}:${s.value}`]],
        hitsPerPage: s.hitsPerPreview,
      },
    })),
    i = chunkQueries(r, PREVIEW_BATCH_SIZE),
    o = await Promise.all(
      i.map(async (s) => {
        try {
          return (await e.multipleQueries(s)).results;
        } catch (c) {
          return (
            console.error(`[wf-algolia] ${n} batched fetch failed:`, c),
            null
          );
        }
      }),
    ),
    l = [];
  return (
    o.forEach((s, c) => {
      let m = i[c];
      for (let g = 0; g < m.length; g++)
        l.push(
          s === null
            ? null
            : (s[g] ?? {
                hits: [],
              }),
        );
    }),
    l
  );
}
async function initHitPreviews(e, t) {
  let n = t.get("hit-preview") ?? [];
  if (n.length === 0) return;
  installClickTrap();
  let r = new Set();
  (t.get("filter-template") ?? []).forEach((c) => {
    let m = getTemplateParent(c);
    m && r.add(m);
  });
  let i = Array.from(
      document.querySelectorAll('[wf-algolia-element="filter-template"]'),
    ),
    o = [],
    l = new Map();
  for (let c of n) {
    if (!c.isConnected) continue;
    let m = resolvePreviewFieldValue(c);
    if (m.scopeFacetEl && !m.scopeFacetHasField) {
      let C = m.scopeFacetEl;
      warnedScopeFacetNoField.has(C) ||
        (warnedScopeFacetNoField.add(C),
        console.error(
          "[wf-algolia] scope-facet ancestor is missing required wf-algolia-field attribute.",
          C,
        ));
      continue;
    }
    let { field: g, value: u, scopeFacetEl: h } = m;
    if (!g) {
      warnedPreviewNoField.has(c) ||
        (warnedPreviewNoField.add(c),
        console.error(
          "[wf-algolia] hit-preview is missing required wf-algolia-field attribute.",
          c,
        ));
      continue;
    }
    if (!u) {
      if (h) {
        warnedUnresolvedScopeValue.has(c) ||
          (warnedUnresolvedScopeValue.add(c),
          console.warn(
            "[wf-algolia] hit-preview scope-facet value is unresolved at init \u2014 will render once the parent (standalone-filter-groups) populates the wf-algolia-value attribute.",
            c,
          ));
        continue;
      }
      warnedPreviewNoValue.has(c) ||
        (warnedPreviewNoValue.add(c),
        console.error(
          "[wf-algolia] hit-preview is missing required wf-algolia-value attribute.",
          c,
        ));
      continue;
    }
    let y = c.closest('[wf-algolia-element="browse"]');
    if (y && y !== c) {
      warnedPreviewInBrowse.has(c) ||
        (warnedPreviewInBrowse.add(c),
        console.error(
          '[wf-algolia] hit-preview cannot be nested inside a wf-algolia-element="browse" container.',
          c,
        ));
      continue;
    }
    let b = i.some((C) => C !== c && c.contains(C)),
      w = Array.from(r).some((C) => C !== c && c.contains(C));
    if (b || w) {
      warnedPreviewHasFilterTemplate.has(c) ||
        (warnedPreviewHasFilterTemplate.add(c),
        console.error(
          '[wf-algolia] hit-preview cannot contain a wf-algolia-element="filter-template" descendant.',
          c,
        ));
      continue;
    }
    let E = findPreviewTemplate(c);
    if (!E) {
      warnedPreviewNoTemplate.has(c) ||
        (warnedPreviewNoTemplate.add(c),
        console.error(
          "[wf-algolia] hit-preview has no card template \u2014 add at least one descendant with wf-algolia-text, wf-algolia-image, or wf-algolia-hit-link-template.",
          c,
        ));
      continue;
    }
    let T = c.getAttribute("wf-algolia-hits-per-preview"),
      k = 3;
    if (T !== null) {
      let C = parseInt(T, 10);
      !Number.isNaN(C) && C > 0 && (k = C);
    }
    let D = resolvePreviewIndex(c),
      K = `${g}::${u}`;
    (l.has(K)
      ? warnedDuplicatePair.has(c) ||
        (warnedDuplicatePair.add(c),
        console.warn(
          `[wf-algolia] hit-preview duplicate (field, value) pair "${g}=${u}" \u2014 multiple previews share the same filter.`,
          c,
        ))
      : l.set(K, c),
      o.push({
        el: c,
        field: g,
        value: u,
        hitsPerPreview: k,
        indexName: D,
        template: E,
      }));
  }
  if (o.length === 0) return;
  let s = await batchedPreviewFetch(e, o, "hit-preview");
  o.forEach((c, m) => {
    let g = s[m];
    if (g == null) return;
    let u = g.hits ?? [];
    if (u.length === 0) {
      (warnedZeroHits.has(c.el) ||
        (warnedZeroHits.add(c.el),
        console.warn(
          `[wf-algolia] hit-preview returned zero hits for "${c.field}=${c.value}".`,
          c.el,
        )),
        (c.template.style.display = "none"),
        renderedPairKeys.set(c.el, previewKey(c)));
      return;
    }
    let h = c.template.parentElement ?? c.el,
      y = document.createDocumentFragment();
    for (let b of u) {
      let w = c.template.cloneNode(!0);
      (w.setAttribute("data-wf-algolia-hit-preview", "true"),
        w.classList.add("wf-algolia-injected"),
        (w.style.display = ""),
        populatePreviewCard(w, b),
        y.appendChild(w));
    }
    (h.appendChild(y),
      (c.template.style.display = "none"),
      renderedPairKeys.set(c.el, previewKey(c)));
  });
}
function previewKey(e) {
  return `${e.indexName}::${e.field}::${e.value}::${e.hitsPerPreview}`;
}
function clearPreviewCards(e) {
  e.querySelectorAll('[data-wf-algolia-hit-preview="true"]').forEach((t) =>
    t.remove(),
  );
}
async function refreshHitPreviews(e) {
  let t = Array.from(
    document.querySelectorAll('[wf-algolia-element="hit-preview"]'),
  );
  if (t.length === 0) return;
  let n = [];
  for (let i of t) {
    let o = resolvePreviewFieldValue(i);
    if (o.scopeFacetEl && !o.scopeFacetHasField) {
      let b = o.scopeFacetEl;
      warnedScopeFacetNoField.has(b) ||
        (warnedScopeFacetNoField.add(b),
        console.error(
          "[wf-algolia] scope-facet ancestor is missing required wf-algolia-field attribute.",
          b,
        ));
      continue;
    }
    let { field: l, value: s, scopeFacetEl: c } = o;
    if (!l) continue;
    if (!s) {
      c &&
        (warnedUnresolvedScopeValue.has(i) ||
          (warnedUnresolvedScopeValue.add(i),
          console.warn(
            "[wf-algolia] hit-preview scope-facet value is unresolved at refresh \u2014 skipping render.",
            i,
          )));
      continue;
    }
    let m = findPreviewTemplate(i);
    if (!m) continue;
    let g = i.getAttribute("wf-algolia-hits-per-preview"),
      u = 3;
    if (g !== null) {
      let b = parseInt(g, 10);
      !Number.isNaN(b) && b > 0 && (u = b);
    }
    let h = resolvePreviewIndex(i),
      y = previewKey({
        indexName: h,
        field: l,
        value: s,
        hitsPerPreview: u,
      });
    renderedPairKeys.get(i) !== y &&
      n.push({
        el: i,
        field: l,
        value: s,
        hitsPerPreview: u,
        indexName: h,
        template: m,
        pairKey: y,
      });
  }
  if (n.length === 0) return;
  let r = await batchedPreviewFetch(e, n, "hit-preview refresh");
  n.forEach((i, o) => {
    let l = r[o];
    if (l == null) return;
    let s = l.hits ?? [];
    if ((clearPreviewCards(i.el), s.length === 0)) {
      (warnedZeroHits.has(i.el) ||
        (warnedZeroHits.add(i.el),
        console.warn(
          `[wf-algolia] hit-preview returned zero hits for "${i.field}=${i.value}".`,
          i.el,
        )),
        (i.template.style.display = "none"),
        renderedPairKeys.set(i.el, i.pairKey));
      return;
    }
    let c = i.template.parentElement ?? i.el,
      m = document.createDocumentFragment();
    for (let g of s) {
      let u = i.template.cloneNode(!0);
      (u.setAttribute("data-wf-algolia-hit-preview", "true"),
        u.classList.add("wf-algolia-injected"),
        (u.style.display = ""),
        populatePreviewCard(u, g),
        m.appendChild(u));
    }
    (c.appendChild(m),
      (i.template.style.display = "none"),
      renderedPairKeys.set(i.el, i.pairKey));
  });
}
function initSelectFilters(e) {
  document
    .querySelectorAll('[wf-algolia-element="filter-group"]')
    .forEach((t) => {
      let n = t.getAttribute("wf-algolia-type");
      if (n !== "select" && n !== "select-multiple") return;
      let r = t.getAttribute("wf-algolia-field");
      if (!r) return;
      let i = t.querySelector("select");
      if (!i) return;
      let o = t.getAttribute("wf-algolia-apply-mode"),
        l = o === "deferred";
      (o !== null &&
        o !== "deferred" &&
        o !== "immediate" &&
        console.warn(
          `[wf-algolia] Unknown wf-algolia-apply-mode='${o}' on filter-group; falling back to immediate. Valid values: 'immediate' (default) | 'deferred'.`,
        ),
        i.addEventListener("change", () => {
          let s;
          if (i.multiple) {
            let c = [...i.selectedOptions].map((m) => m.value).filter(Boolean);
            s =
              c.length === 0
                ? null
                : {
                    type: "checkbox",
                    match: "or",
                    values: new Set(c),
                  };
          } else {
            let { value: c } = i;
            s = c
              ? {
                  type: "checkbox",
                  match: "or",
                  values: new Set([c]),
                }
              : null;
          }
          if (l) {
            (s === null ? delete STAGING_STATE[r] : stageFilter(r, s),
              i.setAttribute("data-wf-algolia-staged", "true"),
              renderSelectedValues(),
              renderSelectedCounts());
            let c = t.getAttribute("wf-algolia-group-id");
            (c &&
              isParentGroup(c) &&
              emit("filter:parent-stage-change", {
                field: r,
              }),
              closeDropdownOnPick(i));
            return;
          }
          (s === null ? delete FILTER_STATE[r] : (FILTER_STATE[r] = s),
            closeDropdownOnPick(i),
            e());
        }));
    });
}
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
async function initStandaloneFilterGroups(e, t, n) {
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
function getMaxRecommendations(e) {
  let t = e.getAttribute("wf-algolia-max-results");
  if (!t) return 8;
  let n = parseInt(t, 10);
  return Number.isNaN(n) ? 8 : Math.max(1, n);
}
async function initRecommendations(e, t, n) {
  let r = recommendFactory(t.appId, t.searchKey),
    i = n.get("recommend") || [];
  for (let o of i) {
    let l = o.getAttribute("wf-algolia-model"),
      s = o.getAttribute("wf-algolia-index"),
      c = o.querySelector('[wf-algolia-element="recommend-grid"]'),
      m = c ? findTemplateFor(c, n) : null;
    if (!l || !s || !c || !m) {
      console.warn(
        "[wf-algolia] recommend section missing model, index, grid, or template",
      );
      return;
    }
    let u =
        document
          .querySelector('[wf-algolia-element="detail"]')
          ?.getAttribute("wf-algolia-objectid") || "id",
      h = new URLSearchParams(window.location.search).get(u);
    if (l !== "trending-items" && !h) {
      hideElement(o);
      return;
    }
    try {
      let b = [],
        w = getMaxRecommendations(o);
      if (
        (l === "related-products"
          ? (b =
              (
                await r.getRelatedProducts([
                  {
                    indexName: s,
                    objectID: h,
                    maxRecommendations: w,
                  },
                ])
              ).results[0]?.hits || [])
          : l === "looking-similar"
            ? (b =
                (
                  await r.getLookingSimilar([
                    {
                      indexName: s,
                      objectID: h,
                      maxRecommendations: w,
                    },
                  ])
                ).results[0]?.hits || [])
            : l === "trending-items"
              ? (b =
                  (
                    await r.getTrendingItems([
                      {
                        indexName: s,
                        maxRecommendations: w,
                      },
                    ])
                  ).results[0]?.hits || [])
              : l === "frequently-bought-together" &&
                (b =
                  (
                    await r.getFrequentlyBoughtTogether([
                      {
                        indexName: s,
                        objectID: h,
                        maxRecommendations: w,
                      },
                    ])
                  ).results[0]?.hits || []),
        h && (b = b.filter((E) => E.objectID !== h)),
        b.length === 0)
      ) {
        hideElement(o);
        return;
      }
      (removeInjected(c), renderHits(c, m, b, !1, t), showElement(o));
    } catch (b) {
      (console.error(`[wf-algolia] Recommend (${l}) failed:`, b),
        hideElement(o));
    }
  }
}
function findArrayWrapper(e) {
  let t = e.closest('[wf-algolia-element="array-wrapper"]');
  return t || e.parentElement;
}
function resolveDetailObjectID(e) {
  let t = e.getAttribute("wf-algolia-objectid-value");
  if (t)
    return {
      objectID: t,
      isSlug: !0,
    };
  if (e.getAttribute("wf-algolia-objectid-from") === "path") {
    let o = window.location.pathname.split("/").filter(Boolean);
    return {
      objectID: o[o.length - 1] || null,
      isSlug: !0,
    };
  }
  let r = e.getAttribute("wf-algolia-objectid") || "id";
  return {
    objectID: new URLSearchParams(window.location.search).get(r),
    isSlug: !1,
  };
}
function initDetailPage(e, t, n) {
  let r = (n.get("detail") || [])[0];
  if (!r) return;
  let i = r.getAttribute("wf-algolia-index");
  if (!i) {
    console.warn("[wf-algolia] Detail page missing wf-algolia-index");
    return;
  }
  let { objectID: o, isSlug: l } = resolveDetailObjectID(r);
  if (!o) {
    console.warn(
      "[wf-algolia] Detail page: no objectID found in URL or attributes",
    );
    return;
  }
  let s = e.initIndex(i),
    c = r.getAttribute("wf-algolia-objectid-field") || "slug",
    m = escapeFilterValue(o);
  (l
    ? s
        .search("", {
          filters: `${c}:"${m}"`,
          hitsPerPage: 1,
        })
        .then((u) =>
          u.hits.length === 0 && c !== "objectid"
            ? s
                .search("", {
                  filters: `objectid:"${m}"`,
                  hitsPerPage: 1,
                })
                .then((h) => h.hits[0] || null)
            : u.hits[0],
        )
    : s.getObject(o)
  )
    .then((u) => {
      if (!u) {
        console.warn("[wf-algolia] Detail page: object not found for", o);
        return;
      }
      (populateCard(r, u, t),
        r.querySelectorAll('[wf-algolia-element="array-item"]').forEach((h) => {
          let y = h.getAttribute("wf-algolia-text");
          if (!y) return;
          let b = u[y];
          if (!Array.isArray(b)) return;
          let w = findArrayWrapper(h);
          w &&
            (hideElement(h),
            removeInjected(w),
            b.forEach((E) => {
              let T = h.cloneNode(!0);
              (showElement(T, "inline-block"),
                T.removeAttribute("wf-algolia-element"),
                T.classList.add("wf-algolia-injected"),
                (T.textContent = E),
                w.appendChild(T));
            }));
        }),
        restartIx2());
    })
    .catch((u) => {
      console.error("[wf-algolia] Detail page fetch failed:", u);
    });
}
var warnedMultiAnchorCard = new WeakSet();
function initAutocomplete(e, t, n) {
  (n.get("autocomplete") || []).forEach((i) => {
    let o = i.parentElement,
      l = o?.querySelector('[wf-algolia-element="search-input"]');
    if (!l || !o) return;
    let s = i.querySelectorAll('[wf-algolia-element="autocomplete-section"]'),
      c = [...s].filter(
        (y) => y.getAttribute("wf-algolia-show-on-focus") === "true",
      ),
      m = new AbortController(),
      g = -1;
    async function u(y, b) {
      (m.abort(), (m = new AbortController()), (g = -1));
      let w = [];
      for (let T of b) {
        let k =
          T.getAttribute("wf-algolia-index") ??
          T.closest('[wf-algolia-element="autocomplete"]')?.getAttribute(
            "wf-algolia-index",
          ) ??
          null;
        if (!k) {
          console.warn(
            '[wf-algolia] Autocomplete section is missing wf-algolia-index. Add it to the section element or to the parent [wf-algolia-element="autocomplete"] container. Section skipped.',
            T,
          );
          continue;
        }
        w.push({
          sec: T,
          q: {
            indexName: k,
            query: y,
            params: {
              hitsPerPage: parseInt(T.getAttribute("wf-algolia-hits") || "4"),
              clickAnalytics: !0,
            },
          },
        });
      }
      let E = w.map(({ q: T }) => T);
      if (E.length !== 0) {
        showElement(i);
        try {
          let { results: T } = await multiQueryWithMiddleware(e, E);
          (T.forEach((D, K) => {
            let C = w[K]?.sec;
            if (!C) return;
            let ee = findTemplateFor(C, n, "autocomplete-template");
            if (!ee) return;
            let ye = D.hits.map((he) => ({
              ...he,
              __queryID: D.queryID,
              __indexName: E[K]?.indexName,
            }));
            (removeInjected(C),
              ye.length
                ? (renderHits(C, ee, ye, !1, t), showElement(C))
                : hideElement(C));
          }),
            i
              .querySelectorAll(
                '[wf-algolia-element="autocomplete-section-label"]',
              )
              .forEach((D) => {
                let K = D.closest(
                  '[wf-algolia-element="autocomplete-section"]',
                );
                K &&
                  (K.querySelector(".wf-algolia-injected")
                    ? showElement(D)
                    : hideElement(D));
              }));
        } catch (T) {
          T.name !== "AbortError" &&
            console.error("[wf-algolia] Autocomplete search failed:", T);
        }
      }
    }
    let h = debounce(async (y) => {
      if (!y.trim()) {
        hideElement(i);
        return;
      }
      await u(y, [...s]);
    }, t.autocompleteDebounce);
    (l.addEventListener("input", (y) => {
      h(y.target.value);
    }),
      l.addEventListener("keydown", (y) => {
        let b = i.querySelectorAll(".wf-algolia-injected");
        if (b.length)
          if (y.key === "ArrowDown") {
            (y.preventDefault(),
              (g = Math.min(g + 1, b.length - 1)),
              b.forEach((E, T) =>
                E.classList.toggle("wf-algolia-focused", T === g),
              ));
            let w = b[g];
            w?.id && l.setAttribute("aria-activedescendant", w.id);
          } else if (y.key === "ArrowUp")
            (y.preventDefault(),
              (g = Math.max(g - 1, 0)),
              b.forEach((w, E) =>
                w.classList.toggle("wf-algolia-focused", E === g),
              ));
          else if (y.key === "Enter" && g >= 0) {
            y.preventDefault();
            let w = b[g],
              E =
                w?.querySelector(
                  "a[wf-algolia-link-url], a[wf-algolia-link]",
                ) ||
                w?.querySelector("a") ||
                (w instanceof HTMLAnchorElement ? w : null),
              T = w?.querySelectorAll("a") ?? [],
              k = w?.querySelector(
                "a[wf-algolia-link-url], a[wf-algolia-link]",
              );
            (T.length > 1 &&
              !k &&
              w &&
              !warnedMultiAnchorCard.has(w) &&
              (warnedMultiAnchorCard.add(w),
              console.warn(
                "[wf-algolia] Autocomplete card has multiple <a> elements. Enter navigates to the first one. Mark the primary link with wf-algolia-link-url to make this explicit.",
                w,
              )),
              E?.href && (window.location.href = E.href));
          } else y.key === "Escape" && (hideElement(i), (g = -1));
      }),
      document.addEventListener("click", (y) => {
        o.contains(y.target) || (hideElement(i), (g = -1));
      }),
      l.addEventListener("focus", () => {
        l.value.trim() && i.querySelector(".wf-algolia-injected")
          ? showElement(i)
          : !l.value.trim() && c.length > 0 && u("", c);
      }));
  });
}
function initMergedSearch(e, t, n) {
  document.querySelectorAll("[wf-algolia-index]").forEach((r) => {
    let i = r.getAttribute("wf-algolia-index");
    if (!i.includes(",")) return;
    let o = i
      .split(",")
      .map((b) => b.trim())
      .filter(Boolean);
    if (o.length < 2) return;
    let l = r.querySelector('[wf-algolia-element="search-input"]'),
      s = r.querySelector('[wf-algolia-element="results"]'),
      c = s ? findTemplateFor(s, n) : null,
      m = r.querySelector('[wf-algolia-element="no-results"]'),
      g = r.querySelector('[wf-algolia-element="loader"]'),
      u = parseInt(r.getAttribute("wf-algolia-hits") || "8");
    if (!l || !s || !c) return;
    let h = new AbortController(),
      y = debounce(async (b) => {
        if ((h.abort(), (h = new AbortController()), !b.trim())) {
          hideElement(s);
          return;
        }
        (showElement(s), showElement(g));
        let w = Math.ceil(u / o.length),
          E = o.map((T) => ({
            indexName: T,
            query: b,
            params: {
              hitsPerPage: w,
              clickAnalytics: !0,
            },
          }));
        try {
          let { results: T } = await multiQueryWithMiddleware(e, E);
          hideElement(g);
          let k = T.map((C, ee) =>
              C.hits.map((ye) => ({
                ...ye,
                __queryID: C.queryID,
                __indexName: o[ee],
              })),
            ),
            D = [],
            K = Math.max(...k.map((C) => C.length));
          for (let C = 0; C < K; C++)
            for (let ee of k) C < ee.length && D.push(ee[C]);
          (removeInjected(s),
            D.length === 0
              ? showElement(m)
              : (hideElement(m), renderHits(s, c, D, !1, t)));
        } catch (T) {
          (T.name !== "AbortError" &&
            console.error("[wf-algolia] Merged search failed:", T),
            hideElement(g));
        }
      }, t.debounce);
    (l.addEventListener("input", (b) => {
      y(b.target.value);
    }),
      document.addEventListener("click", (b) => {
        r.contains(b.target) || hideElement(s);
      }));
  });
}
function initSectionSearch(e, t, n) {
  (n.get("search-input") || [])
    .filter((i) => !i.closest("[wf-algolia-index]"))
    .forEach((i) => {
      let o =
          i.closest('[wf-algolia-element="search-wrapper"]') ||
          i.closest('[wf-algolia-element="results"]')?.parentElement ||
          i.parentElement,
        l = o?.querySelector('[wf-algolia-element="results"]');
      if (!l) return;
      let s = l.querySelectorAll('[wf-algolia-element="section"]'),
        c = l.querySelector('[wf-algolia-element="no-results"]'),
        m = l.querySelector('[wf-algolia-element="divider"]'),
        g = l.querySelector('[wf-algolia-element="loader"]'),
        u = new AbortController(),
        h = debounce(async (y) => {
          if ((u.abort(), (u = new AbortController()), !y.trim())) {
            hideElement(l);
            return;
          }
          (showElement(l), showElement(g));
          let b = buildSnippetParam(t.snippetWords, t.snippetAttrs),
            w = [...s].map((E) => ({
              indexName: E.getAttribute("wf-algolia-index"),
              query: y,
              params: {
                hitsPerPage: parseInt(E.getAttribute("wf-algolia-hits") || "5"),
                clickAnalytics: !0,
                attributesToSnippet: b,
              },
            }));
          try {
            let { results: E } = await multiQueryWithMiddleware(e, w);
            hideElement(g);
            let T = 0,
              k = 0;
            (E.forEach((K, C) => {
              let ee = s[C];
              if (!ee) return;
              let ye = findTemplateFor(ee, n);
              if (!ye) return;
              let he = K.hits.map((X) => ({
                ...X,
                __queryID: K.queryID,
                __indexName: w[C]?.indexName,
              }));
              (removeInjected(ee),
                he.length
                  ? (renderHits(ee, ye, he, !1, t), showElement(ee), k++)
                  : hideElement(ee),
                (T += he.length));
            }),
              k > 1 ? showElement(m) : hideElement(m),
              T === 0 ? showElement(c) : hideElement(c));
            let D = o?.querySelector('[wf-algolia-element="results-count"]');
            if (D) {
              let K = getTextTemplate(D, "{count} results");
              D.textContent = interpolate(K, {
                count: T,
                total: T,
              });
            }
          } catch (E) {
            if (E.name === "AbortError") return;
            (console.error("[wf-algolia] Multi-section search failed:", E),
              hideElement(g));
          }
        }, t.debounce);
      (i.addEventListener("input", (y) => {
        h(y.target.value);
      }),
        document.addEventListener("click", (y) => {
          o?.contains(y.target) || hideElement(l);
        }),
        i.addEventListener("focus", () => {
          i.value.trim() && showElement(l);
        }),
        i.addEventListener("keydown", (y) => {
          y.key === "Escape" && hideElement(l);
        }));
    });
}
function initScopedSearch(e, t, n) {
  (n.get("search-input") || [])
    .filter((i) => !!i.closest("[wf-algolia-index]"))
    .forEach((i) => {
      let o = i.closest("[wf-algolia-index]"),
        l = o.getAttribute("wf-algolia-index"),
        s = o.querySelector('[wf-algolia-element="results"]'),
        c = s ? findTemplateFor(s, n) : null,
        m = o.querySelector('[wf-algolia-element="no-results"]'),
        g = o.querySelector('[wf-algolia-element="loader"]'),
        u = parseInt(o.getAttribute("wf-algolia-hits") || "8");
      if (!s || !c) return;
      let h = new AbortController(),
        y = debounce(async (b) => {
          if ((h.abort(), (h = new AbortController()), !b.trim())) {
            hideElement(s);
            return;
          }
          (showElement(s), showElement(g));
          try {
            let w = await searchWithMiddleware(
              {
                hitsPerPage: u,
                clickAnalytics: !0,
                attributesToSnippet: buildSnippetParam(
                  t.snippetWords,
                  t.snippetAttrs,
                ),
              },
              (k) => e.initIndex(l).search(b, k),
            );
            hideElement(g);
            let E = w.hits.map((k) => ({
              ...k,
              __queryID: w.queryID,
              __indexName: l,
            }));
            E.length === 0
              ? (removeInjected(s), showElement(m))
              : (hideElement(m), renderHits(s, c, E, !1, t));
            let T = o.querySelector('[wf-algolia-element="results-count"]');
            if (T) {
              let k = getTextTemplate(T, "{count} results");
              T.textContent = interpolate(k, {
                count: w.nbHits,
                total: w.nbHits,
              });
            }
          } catch (w) {
            (hideElement(g),
              console.error(
                `[wf-algolia] Scoped search failed for "${l}":`,
                w,
              ));
          }
        }, t.debounce);
      (i.addEventListener("input", (b) => {
        y(b.target.value);
      }),
        document.addEventListener("click", (b) => {
          o.contains(b.target) || hideElement(s);
        }));
    });
}
var STATIC_DEFAULT_PER_PAGE = 12,
  warnedStaticNoIndex = new WeakSet(),
  warnedStaticBadFilter = new WeakSet(),
  warnedStaticNoTemplate = new WeakSet();
function initStaticLists(e, t, n) {
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
