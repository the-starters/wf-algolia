// actions/filter-actions — split from app.carved.js (see docs/MODULE-MAP.md)
import { emit } from "../core/events.js";
import { getOriginalText, getTextTemplate, interpolate } from "../utils/format.js";
import { FILTER_STATE, clearState, commitStaging, discardStaging, getEffectiveState } from "../core/filter-state.js";
import { applyParentEmptyBehavior, getAllChildLinks } from "../filters/hierarchy.js";
import { applyActiveLabelClasses, syncWebflowInputVisual } from "../filters/filter-group.js";
import { reapplyShowMore } from "../filters/show-more.js";
export function syncFilterDOM(e = FILTER_STATE) {
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
export function renderSelectedCounts(e = getEffectiveState()) {
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
export function renderSelectedValues(e = getEffectiveState()) {
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
export function clearAllFilters(e) {
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
export function clearFilter(e, t) {
  (delete FILTER_STATE[e], syncFilterDOM(), emit("filter", FILTER_STATE), t());
}
export function setFilter(e, t, n) {
  ((FILTER_STATE[e] = {
    type: "checkbox",
    match: "or",
    values: new Set(t),
  }),
    syncFilterDOM(),
    emit("filter", FILTER_STATE),
    n());
}
export function commitStagingAndSync(e) {
  (commitStaging(e), renderSelectedValues(), renderSelectedCounts());
}
export function discardStagingAndSync(e) {
  (discardStaging(e), renderSelectedValues(), renderSelectedCounts());
}
export function setQuery(e, t) {
  let n =
    document.querySelector('[wf-algolia-element="browse-search"]') ||
    document.querySelector('[wf-algolia-element="search-input"]');
  (n && (n.value = e), emit("search", e), t());
}
