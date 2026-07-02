// filters/filter-group — split from app.carved.js (see docs/MODULE-MAP.md)
import { emit } from "../core/events.js";
import { WEBFLOW_CSS } from "../vendor/finsweet.js";
import { closeDropdownOnPick } from "../utils/dom.js";
import { getTextTemplate, interpolate } from "../utils/format.js";
import { FILTER_STATE, STAGING_STATE, stageFilter, toggleStateValue } from "../core/filter-state.js";
import { MAX_DEPTH, applyParentEmptyBehavior, getChildLink, getGroupField, isParentGroup, parseWhenParentEmpty, registerChildLink, registerGroup } from "./hierarchy.js";
import { renderSelectedCounts, renderSelectedValues } from "../actions/filter-actions.js";
var activeLabelClassCache = new WeakMap(),
  WF_INPUT_VISUAL_SELECTOR = `.${WEBFLOW_CSS.radioInput}, .${WEBFLOW_CSS.checkboxInput}`;
export function syncWebflowInputVisual(e, t) {
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
export function applyActiveLabelClasses(e, t) {
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
export function getFieldOrFacet(e) {
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
export function initFilterGroups(e) {
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
export function syncFacetCounts(e) {
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
export function initSelectFilters(e) {
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
