// wf-algolia 1.0.4 — carved app code (vendors replaced with npm imports).
// Source of truth for behavior: build/index.1.0.4.min.js (ISC, © Candidleap).
import wfAlgoliaInsights from "search-insights";
import algoliasearchFactory from "algoliasearch";
import recommendFactory from "@algolia/recommend";
var Ce = wfAlgoliaInsights;
  var Ft = new Map();
  function Je(e, t) {
    (Ft.has(e) || Ft.set(e, new Set()), Ft.get(e).add(t));
  }
  function Un(e, t) {
    Ft.get(e)?.delete(t);
  }
  function Y(e, ...t) {
    Ft.get(e)?.forEach((n) => {
      try {
        n(...t);
      } catch (r) {
        console.warn(`[wf-algolia] Event handler error (${e}):`, r);
      }
    });
  }
  var Ne = {
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
  var Bn = (e = document) => e.documentElement.getAttribute("data-wf-site");
  var Gn = async (e) => {
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
          r = Bn();
        n &&
          r &&
          (n.destroy(),
          n.init({ siteId: r, apiUrl: "https://render.webflow.com" }));
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
  function Xe(e) {
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
        (r.classList.remove("w--open"),
        r.setAttribute("aria-expanded", "false")),
      i &&
        (i.classList.remove("w--open"), i.setAttribute("aria-hidden", "true")),
      r && r.click());
  }
  var N = {},
    pe = {};
  function Vn(e, t, n, r, i, o) {
    (e[t] || (e[t] = { type: o, match: i, values: new Set() }),
      r
        ? e[t].values.add(n)
        : (e[t].values.delete(n), e[t].values.size === 0 && delete e[t]));
  }
  function Jr(e) {
    Object.keys(e).forEach((t) => delete e[t]);
  }
  function yt(e, t) {
    pe[e] = t;
  }
  function nn(e) {
    let t = e && e.length > 0 ? e : Object.keys(pe);
    for (let n of t) {
      let r = pe[n];
      r !== void 0 && ((N[n] = r), delete pe[n]);
    }
  }
  function bt(e) {
    if (!e || e.length === 0) {
      for (let t of Object.keys(pe)) delete pe[t];
      return;
    }
    for (let t of e) delete pe[t];
  }
  function zn() {
    return { ...N, ...pe };
  }
  var st = 5,
    rn = " > ";
  function Kn(e) {
    let t = e.lastIndexOf(rn);
    return t === -1 ? e : e.slice(t + rn.length);
  }
  function vt(e) {
    return e.getAttribute("wf-algolia-label") === "leaf" ? "leaf" : "full";
  }
  function Et(e, t) {
    return t === "leaf" ? Kn(e) : e;
  }
  var Zr = new Map(),
    gs = new Map(),
    on = new Map(),
    ps = new WeakMap(),
    Qn = [],
    an = new Map(),
    Xr = new WeakSet();
  function Ot(e) {
    let t = e.getAttribute("wf-algolia-when-parent-empty");
    return t === null
      ? null
      : t === "hide"
        ? "hide"
        : t === "disable"
          ? "disable"
          : (Xr.has(e) ||
              (Xr.add(e),
              console.warn(
                `[wf-algolia] Unknown wf-algolia-when-parent-empty='${t}'; valid values: 'hide' | 'disable'. Treating as absent.`,
                e,
              )),
            null);
  }
  function ln(e, t, n) {
    (Zr.set(e, t), gs.set(e, n));
  }
  function Dt(e) {
    return Zr.get(e) ?? null;
  }
  function sn(e) {
    let t = on.get(e.parentGroupId) ?? [];
    (t.push(e),
      on.set(e.parentGroupId, t),
      ps.set(e.childEl, e),
      an.set(e.groupId, e),
      Qn.push(e));
  }
  function cn(e) {
    return an.get(e) ?? null;
  }
  function Ye(e) {
    return on.has(e);
  }
  function un() {
    return Qn.slice();
  }
  function hs(e, t = "is-hidden") {
    (e.classList.add(t), e.style.setProperty("display", "none", "important"));
  }
  function ws(e, t = "is-hidden") {
    (e.classList.remove(t), e.style.removeProperty("display"));
  }
  function ys(e, t = "is-disabled") {
    (e.classList.add(t),
      e.setAttribute("data-wf-algolia-disabled", "true"),
      e.setAttribute("aria-disabled", "true"),
      (e.style.pointerEvents = "none"));
  }
  function bs(e, t = "is-disabled") {
    (e.classList.remove(t),
      e.removeAttribute("data-wf-algolia-disabled"),
      e.removeAttribute("aria-disabled"),
      e.style.removeProperty("pointer-events"));
  }
  function Fe(e, t) {
    t === "hide" ? hs(e) : t === "disable" && ys(e);
  }
  function Tt(e, t) {
    t === "hide" ? ws(e) : t === "disable" && bs(e);
  }
  function vs(e) {
    let t = [],
      n = new Set(),
      r = an.get(e);
    for (; r;) {
      if (n.has(r.groupId)) {
        (console.warn(
          `[wf-algolia] Cycle detected in hierarchy at '${r.groupId}'`,
        ),
          Y(
            "error",
            new Error(`wf-algolia: hierarchy cycle at '${r.groupId}'`),
          ));
        break;
      }
      if ((n.add(r.groupId), t.length >= st)) {
        console.warn(
          `[wf-algolia] collectAncestors exceeded MAX_DEPTH=${st} at '${r.groupId}'`,
        );
        break;
      }
      let i = an.get(r.parentGroupId);
      if (!i) break;
      (t.unshift(i), (r = i));
    }
    return t;
  }
  function fn(e) {
    let t = [],
      n = [{ id: e, depthFromRoot: 0 }],
      r = new WeakSet(),
      i = new Set([e]);
    for (; n.length > 0;) {
      let { id: o, depthFromRoot: l } = n.shift();
      if (l >= st) continue;
      let s = on.get(o) ?? [];
      for (let c of s)
        r.has(c.childEl) ||
          (r.add(c.childEl),
          t.push(c),
          i.has(c.groupId) ||
            (i.add(c.groupId),
            n.push({ id: c.groupId, depthFromRoot: l + 1 })));
    }
    return t;
  }
  function St(e, t) {
    let n = vs(e.groupId),
      r = [];
    for (let o of n) {
      let l = Yr(t, o.childField);
      if (l === null) return r;
      r.push({ field: o.childField, value: l });
    }
    let i = Yr(t, e.parentField);
    return (i === null || r.push({ field: e.parentField, value: i }), r);
  }
  function Yr(e, t) {
    let n = e[t];
    return !n || !n.values || n.values.size === 0
      ? null
      : (Array.from(n.values)[0] ?? null);
  }
  function Jn(e) {
    for (let t of Qn)
      St(t, e).length === t.depth
        ? Tt(t.childEl, t.whenParentEmpty)
        : Fe(t.childEl, t.whenParentEmpty);
  }
  var ti = new WeakMap(),
    jt = `.${Ne.radioInput}, .${Ne.checkboxInput}`;
  function We(e, t) {
    let n = e.closest("label");
    if (
      !n ||
      !(
        n.classList.contains(Ne.radioField) ||
        n.classList.contains(Ne.checkboxField)
      )
    )
      return;
    let i = n.querySelector(jt);
    i &&
      (t
        ? i.classList.add(Ne.checkboxOrRadioChecked)
        : (i.classList.remove(Ne.checkboxOrRadioChecked),
          i.classList.remove(Ne.checkboxOrRadioFocus)));
  }
  function Es(e, t) {
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
    let o = new Set([Ne.checkboxOrRadioChecked, Ne.checkboxOrRadioFocus]),
      l = new Set([...r.classList].filter(Boolean)),
      s = new Set([...i.classList].filter(Boolean)),
      c = [...l].filter((h) => !s.has(h) && !o.has(h)),
      m = r.querySelector(jt),
      g = i.querySelector(jt),
      u = [];
    if (m && g) {
      let h = new Set([...m.classList].filter(Boolean)),
        y = new Set([...g.classList].filter(Boolean));
      u = [...h].filter((b) => !y.has(b) && !o.has(b));
    }
    return { labelClasses: c, innerDivClasses: u, activeLabel: r };
  }
  function Rt(e, t) {
    let n = ti.get(e);
    if (!n) return;
    let { labelClasses: r, innerDivClasses: i } = n;
    if (
      !(r.length === 0 && i.length === 0) &&
      (e.querySelectorAll("label").forEach((o) => {
        if (o === t) return;
        r.forEach((s) => o.classList.remove(s));
        let l = o.querySelector(jt);
        l && i.forEach((s) => l.classList.remove(s));
      }),
      t)
    ) {
      r.forEach((l) => t.classList.add(l));
      let o = t.querySelector(jt);
      o && i.forEach((l) => o.classList.add(l));
    }
  }
  function ct(e) {
    return (
      e.getAttribute("wf-algolia-field") ||
      e.getAttribute("wf-algolia-facet") ||
      null
    );
  }
  function Ts(e, t) {
    t
      ? e.setAttribute("data-wf-algolia-active", "true")
      : e.removeAttribute("data-wf-algolia-active");
  }
  function dn(e) {
    let t = e.getAttribute("wf-algolia-activeclass") || "is-active";
    e.querySelectorAll('[wf-algolia-element="filter-item"]').forEach((n) => {
      let r = mn(n);
      Ts(n, r);
      let i = n instanceof HTMLInputElement ? n.closest("label") : null;
      r
        ? (n.classList.add(t), i && i.classList.add(t))
        : (n.classList.remove(t), i && i.classList.remove(t));
    });
  }
  function mn(e) {
    let t = e.querySelector('input[type="radio"]');
    if (t) return t.checked;
    let n = e.querySelector('input[type="checkbox"]');
    return n ? n.checked : e.getAttribute("data-wf-algolia-active") === "true";
  }
  function Ss(e, t, n, r) {
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
  var ei = new WeakSet();
  function As() {
    document
      .querySelectorAll(
        '[wf-algolia-element="filter-group"][wf-algolia-refines]',
      )
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
          if (!ei.has(e)) {
            ei.add(e);
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
  function ni(e) {
    As();
    let t = [
      ...document.querySelectorAll('[wf-algolia-element="filter-group"]'),
    ];
    (t.forEach((n) => {
      let r = ct(n),
        i = n.getAttribute("wf-algolia-group-id");
      r && i && ln(i, r, n);
    }),
      t.forEach((n) => {
        let r = n.getAttribute("wf-algolia-refines");
        if (!r) return;
        let i = ct(n);
        if (!i) return;
        let o = Dt(r),
          l = Ot(n);
        if (!o) {
          (console.warn(
            `[wf-algolia] filter-group refines '${r}' but no parent group with that id was found; falling back to independent facet.`,
          ),
            Y("error", new Error(`wf-algolia: unknown refines target '${r}'`)));
          return;
        }
        let s = cn(r),
          c = s ? s.depth + 1 : 1;
        if (c > st) {
          (console.warn(
            `[wf-algolia] Hierarchy chain depth exceeds MAX_DEPTH=${st}; skipping group '${n.getAttribute("wf-algolia-group-id") || i}' (falls back to independent facet).`,
          ),
            Y("error", new Error(`wf-algolia: chain depth > ${st}`)));
          return;
        }
        (Fe(n, l),
          sn({
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
        if (!r || !Ye(r)) return;
        let i = n.getAttribute("wf-algolia-type") || "checkbox";
        i !== "radio" &&
          (console.warn(
            `[wf-algolia] Non-leaf filter-group '${r}' has type='${i}'; hierarchical scoping requires radio. Coercing.`,
          ),
          Y("error", new Error(`wf-algolia: non-leaf '${r}' coerced to radio`)),
          n.setAttribute("wf-algolia-type", "radio"));
      }),
      t.forEach((n) => {
        let r = ct(n);
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
            (Ss(n, k, i, l),
            window.setTimeout(() => {
              if (c) {
                let C = mn(k);
                if (l)
                  if (C) {
                    let ye = {
                      type: "number",
                      match: "or",
                      min: parseFloat(D),
                    };
                    yt(r, ye);
                  } else delete pe[r];
                else
                  (i === "radio" && C && delete pe[r],
                    Vn(pe, r, D, C, o, "checkbox"));
                (k.setAttribute("data-wf-algolia-staged", "true"), Ue(), $e());
                let ee = n.getAttribute("wf-algolia-group-id");
                (ee && Ye(ee) && Y("filter:parent-stage-change", { field: r }),
                  Xe(k));
                return;
              }
              if (l)
                mn(k)
                  ? (N[r] = { type: "number", match: "or", min: parseFloat(D) })
                  : delete N[r];
              else {
                let C = mn(k);
                (i === "radio" && C && delete N[r],
                  Vn(N, r, D, C, o, "checkbox"));
              }
              dn(n);
              let K = n.getAttribute("wf-algolia-group-id");
              if (K && Ye(K)) {
                let C = N[r]?.values ?? new Set();
                Y("filter:parent-change", {
                  parentGroupId: K,
                  parentField: r,
                  newValue: C.size > 0 ? (Array.from(C)[0] ?? "") : "",
                  selectedValues: Array.from(C),
                });
              }
              (Xe(k), e());
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
            (delete N[r],
              n
                .querySelectorAll('input[type="checkbox"], input[type="radio"]')
                .forEach((E) => {
                  E !== u &&
                    ((E.checked = !1),
                    We(E, !1),
                    E.dispatchEvent(new Event("change", { bubbles: !0 })));
                }),
              u instanceof HTMLInputElement &&
                u.type === "radio" &&
                ((u.checked = !0),
                We(u, !0),
                u.dispatchEvent(new Event("change", { bubbles: !0 }))),
              n
                .querySelectorAll('[wf-algolia-element="filter-item"]')
                .forEach((E) => {
                  E.removeAttribute("data-wf-algolia-active");
                }));
            let w = u instanceof HTMLInputElement ? u.closest("label") : null;
            (Rt(n, w), dn(n), e());
          });
        let h = Es(n, r);
        h &&
          ti.set(n, {
            labelClasses: h.labelClasses,
            innerDivClasses: h.innerDivClasses,
          });
        let b = N[r]?.values;
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
                We(D, k),
                D.dispatchEvent(new Event("change", { bubbles: !0 })),
                k && (w = D.closest("label"))),
                k && E.setAttribute("data-wf-algolia-active", "true"));
            }),
            i === "radio" &&
              u instanceof HTMLInputElement &&
              u.type === "radio" &&
              ((u.checked = !1),
              We(u, !1),
              u.dispatchEvent(new Event("change", { bubbles: !0 }))),
            Rt(n, w),
            dn(n),
            window.setTimeout(() => {
              let E = N[r]?.values;
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
                    ((C.checked = K), We(C, K), K && (T = C.closest("label")));
                }),
                i === "radio" &&
                  u instanceof HTMLInputElement &&
                  u.type === "radio" &&
                  ((u.checked = !1), We(u, !1)),
                Rt(n, T),
                dn(n));
            }, 0));
        }
      }));
  }
  var ri = new WeakMap();
  function ii() {
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
              m || h < t
                ? (b.classList.remove(n), (h += 1))
                : b.classList.add(n);
            }),
              r && (r.textContent = m ? c : s));
          };
        (r &&
          r.addEventListener("click", () => {
            ((m = !m), g());
          }),
          ri.set(e, g),
          g());
      });
  }
  function ut(e) {
    let t = ri.get(e);
    t && t();
  }
  function oe(e, t) {
    return e.replace(/\{(\w+)\}/g, (n, r) => {
      let i = t[r];
      return i == null ? "" : String(i);
    });
  }
  var oi = new WeakMap();
  function ae(e, t) {
    let n = oi.get(e);
    if (n === void 0) {
      let r = e.getAttribute("wf-algolia-text-template");
      if (r !== null) n = r;
      else {
        let i = (e.textContent ?? "").trim();
        n = i.includes("{") && i.includes("}") ? i : t;
      }
      oi.set(e, n);
    }
    return n;
  }
  var ai = new WeakMap();
  function li(e) {
    let t = ai.get(e);
    return (
      t === void 0 && ((t = (e.textContent ?? "").trim()), ai.set(e, t)),
      t
    );
  }
  function Be(e = N) {
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
            (Ls(t, n, e),
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
                let u =
                  l instanceof HTMLInputElement ? l.closest("label") : null;
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
            We(l, l.checked);
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
              ((s.checked = !0), We(s, !0), (i = s.closest("label")));
          }
          (Rt(t, i), xs(t, n, e), ut(t));
        }),
      $e(e),
      Ue(e));
  }
  function Ls(e, t, n) {
    if (e.getAttribute("wf-algolia-show-selected-missing") !== "true" || !t)
      return;
    let r = n[t]?.values;
    if (
      (e
        .querySelectorAll('[data-wf-algolia-synthesized="true"]')
        .forEach((g) => {
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
  function xs(e, t, n) {
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
            l(g).localeCompare(l(u), void 0, { sensitivity: "base" }),
          ))
        : (m = [...i].sort((g, u) => c(u) - c(g)));
    for (let g of m) o.appendChild(g);
  }
  var si = new WeakSet();
  function Ms(e) {
    let t = e.getAttribute("wf-algolia-field");
    if (t) return t;
    let n = e.closest('[wf-algolia-element="filter-group"]');
    if (n) {
      let r =
        n.getAttribute("wf-algolia-field") ||
        n.getAttribute("wf-algolia-facet");
      if (r) return r;
    }
    return null;
  }
  var ci = new WeakSet();
  function $e(e = zn()) {
    document
      .querySelectorAll('[wf-algolia-element="filter-selected-count"]')
      .forEach((t) => {
        let n = Ms(t);
        if (!n) {
          si.has(t) ||
            (si.add(t),
            console.warn(
              '[wf-algolia] filter-selected-count cannot resolve its field. Place the badge inside a `wf-algolia-element="filter-group"` wrapper (Model A \u2014 inherits its `wf-algolia-field`), or set `wf-algolia-field="<facet>"` on the badge itself (Model B \u2014 explicit cross-scope pointer).',
              t,
            ));
          return;
        }
        let r = e[n]?.values,
          i = r?.size ?? 0,
          o = i > 0 ? [...r].join(", ") : "",
          l = { count: i, value: o },
          s = t.querySelectorAll('[wf-algolia-element="filter-count-text"]');
        if (s.length > 0)
          s.forEach((g) => {
            let u = ae(g, "{count}");
            g.textContent = oe(u, l);
          });
        else if (t.children.length === 0) {
          let g = ae(t, "{count}");
          t.textContent = oe(g, l);
        } else
          ci.has(t) ||
            (ci.add(t),
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
  var ui = new WeakSet(),
    fi = new WeakSet();
  function Hs(e) {
    let t = e.getAttribute("wf-algolia-field");
    if (t) return t;
    let n = e.closest('[wf-algolia-element="filter-group"]');
    if (n) {
      let r =
        n.getAttribute("wf-algolia-field") ||
        n.getAttribute("wf-algolia-facet");
      if (r) return r;
    }
    return null;
  }
  function di(e, t) {
    let n = li(e);
    if (t.count === 0) {
      e.textContent = n;
      return;
    }
    let r = ae(e, "{value}");
    e.textContent = oe(r, t);
  }
  function Ue(e = zn()) {
    document
      .querySelectorAll('[wf-algolia-element="filter-selected-value"]')
      .forEach((t) => {
        let n = Hs(t);
        if (!n) {
          ui.has(t) ||
            (ui.add(t),
            console.warn(
              '[wf-algolia] filter-selected-value cannot resolve its field. Place the slot inside a `wf-algolia-element="filter-group"` wrapper (Model A \u2014 inherits its `wf-algolia-field`), or set `wf-algolia-field="<facet>"` on the slot itself (Model B \u2014 explicit cross-scope pointer).',
              t,
            ));
          return;
        }
        let r = e[n]?.values,
          i = r?.size ?? 0,
          l = { value: i > 0 ? [...r].join(", ") : "", count: i },
          s = t.querySelectorAll(
            '[wf-algolia-element="filter-value-text-target"]',
          );
        s.length > 0
          ? s.forEach((m) => di(m, l))
          : t.children.length === 0
            ? di(t, l)
            : fi.has(t) ||
              (fi.add(t),
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
  function gn(e) {
    (Jr(N),
      bt(),
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
            n.dispatchEvent(new Event("input", { bubbles: !0 }))),
            r.value !== o &&
              ((r.value = o),
              r.dispatchEvent(new Event("input", { bubbles: !0 }))));
        }),
      Be(),
      un().forEach((t) => {
        (Fe(t.childEl, t.whenParentEmpty),
          t.childEl
            .querySelectorAll(".wf-algolia-injected")
            .forEach((n) => n.remove()));
      }),
      Y("filter", N),
      e());
  }
  function mi(e, t) {
    (delete N[e], Be(), Y("filter", N), t());
  }
  function gi(e, t, n) {
    ((N[e] = { type: "checkbox", match: "or", values: new Set(t) }),
      Be(),
      Y("filter", N),
      n());
  }
  function pi(e) {
    (nn(e), Ue(), $e());
  }
  function hi(e) {
    (bt(e), Ue(), $e());
  }
  function wi(e, t) {
    let n =
      document.querySelector('[wf-algolia-element="browse-search"]') ||
      document.querySelector('[wf-algolia-element="search-input"]');
    (n && (n.value = e), Y("search", e), t());
  }
  var Nt = !1,
    bi = null;
  function vi(e) {
    bi = e;
  }
  function Is(e) {
    let t = e instanceof Element ? e : e?.parentElement;
    return t ? !!t.closest("[wf-algolia-event], [wf-algolia-conversion]") : !1;
  }
  function Ei(e) {
    (Ce("init", {
      appId: e.appId,
      apiKey: e.searchKey,
      useCookie: e.insightsCookie,
    }),
      (Nt = !0),
      (window.aa = Ce),
      document.addEventListener("click", (t) => {
        let n = t.target.closest(".wf-algolia-injected");
        if (!n || Is(t.target)) return;
        let r = n.dataset.wfAlgoliaHitObjectid,
          i = n.dataset.wfAlgoliaHitIndex,
          o = n.dataset.wfAlgoliaHitQueryid,
          l = parseInt(n.dataset.wfAlgoliaHitPosition || "0");
        !r ||
          !i ||
          pn({
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
            bi?.() ||
            "";
        o &&
          l &&
          s &&
          Ce("clickedFilters", {
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
              pn({
                index: s,
                objectIDs: [l],
                queryID: c || void 0,
                eventName: i || void 0,
              });
              break;
            case "conversion":
              hn({
                index: s,
                objectIDs: [l],
                queryID: c || void 0,
                eventName: i || "Converted",
              });
              break;
            case "view":
              Yn(s, [l]);
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
          hn({ index: l, objectIDs: [o], eventName: r, queryID: s || void 0 });
      }));
  }
  var ks = 20,
    yi = 64;
  function qs(e, t) {
    let n = [];
    for (let r = 0; r < e.length; r += t) n.push(e.slice(r, r + t));
    return n;
  }
  function Xn(e) {
    return e.filter((t) => typeof t == "string" && t.length > 0);
  }
  function Ti(e) {
    return e.length > yi ? e.slice(0, yi) : e;
  }
  function Yn(e, t) {
    if (!Nt) return;
    let n = Xn(t);
    if (n.length !== 0)
      for (let r of qs(n, ks))
        Ce("viewedObjectIDs", {
          index: e,
          objectIDs: r,
          eventName: "Hits Viewed",
        });
  }
  function pn(e) {
    if (!Nt) return;
    let t = Xn(e.objectIDs);
    if (t.length === 0) return;
    let n = Ti(e.eventName || "Hit Clicked");
    e.queryID
      ? Ce("clickedObjectIDsAfterSearch", {
          index: e.index,
          objectIDs: t,
          queryID: e.queryID,
          positions: e.positions || [1],
          eventName: n,
        })
      : Ce("clickedObjectIDs", { index: e.index, objectIDs: t, eventName: n });
  }
  function hn(e) {
    if (!Nt) return;
    let t = Xn(e.objectIDs);
    if (t.length === 0) return;
    let n = Ti(e.eventName || "Hit Converted");
    e.queryID
      ? Ce("convertedObjectIDsAfterSearch", {
          index: e.index,
          objectIDs: t,
          queryID: e.queryID,
          eventName: n,
        })
      : Ce("convertedObjectIDs", {
          index: e.index,
          objectIDs: t,
          eventName: n,
        });
  }
  function Si() {
    return Nt;
  }
  var Ai = new WeakSet();
  function J(e, t) {
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
    (Ai.has(e) ||
      (Ai.add(e),
      console.warn(
        '[wf-algolia] showing element with display:block. If your Webflow layout uses flex/grid, add wf-algolia-display="flex" (or grid/inline-flex/etc.). See https://wf-algolia-docs.candidleap.com/attribute-reference#wf-algolia-display',
        e,
      )),
      (e.style.display = "block"));
  }
  function B(e) {
    e && (e.style.display = "none");
  }
  function ft(e) {
    let t = e.trim(),
      n = t.toLowerCase();
    return n.startsWith("javascript:") ||
      n.startsWith("data:") ||
      n.startsWith("vbscript:")
      ? (console.warn("[wf-algolia] Blocked unsafe URL:", t), "#")
      : t;
  }
  var Li = {
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
    Ps = 1,
    Cs = 3;
  function At(e) {
    let t = new DOMParser().parseFromString(e, "text/html");
    return (wn(t.head), wn(t.body), t.head.innerHTML + t.body.innerHTML);
  }
  function wn(e) {
    let t = Array.from(e.childNodes);
    for (let n of t)
      if (n.nodeType === Ps) {
        let r = n,
          i = r.tagName.toLowerCase();
        if (!(i in Li)) {
          wn(r);
          let l = r.parentNode;
          if (l) {
            for (; r.firstChild;) l.insertBefore(r.firstChild, r);
            l.removeChild(r);
          }
          continue;
        }
        let o = Li[i] ?? new Set();
        for (let l of Array.from(r.attributes))
          o.has(l.name.toLowerCase()) || r.removeAttribute(l.name);
        (i === "a" &&
          r.hasAttribute("href") &&
          r.setAttribute("href", ft(r.getAttribute("href") ?? "")),
          i === "img" &&
            r.hasAttribute("src") &&
            r.setAttribute("src", ft(r.getAttribute("src") ?? "")),
          wn(r));
      } else n.nodeType !== Cs && n.parentNode?.removeChild(n);
  }
  function _t(e) {
    return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  }
  function xe(e, t) {
    return t.split(".").reduce((n, r) => n?.[r], e);
  }
  function yn(e, t = "-") {
    return e
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim()
      .replace(/ /g, t);
  }
  function bn() {
    try {
      Gn(["ix2"]);
    } catch (e) {
      console.warn("[wf-algolia] Could not restart Webflow interactions:", e);
    }
  }
  var Fs = ["!==", "===", ">=", "<=", ">", "<"];
  function xi(e, t) {
    let n = Fs.find((g) => e.includes(g));
    if (!n) return !!xe(t, e.trim());
    let [r, i] = e.split(n).map((g) => g.trim());
    if (r === void 0 || i === void 0) return !1;
    let o = xe(t, r),
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
  function vn(e, t) {
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
  function Ii(e, t) {
    return e.getAttribute("wf-algolia-slugify") === "true" ? yn(t) : t;
  }
  var Mi = new WeakSet();
  function Wt(e, t, n) {
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
          let b = xe(t, y);
          if (b != null && b !== "") {
            ((u = b), (h = y));
            break;
          }
        }
        if (c) {
          let y = vn(u, c);
          ((l.textContent = y), (l.style.display = y ? "" : "none"));
        } else if (m && h !== void 0 && t._highlightResult?.[h]?.value) {
          let y = At(t._highlightResult[h].value)
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
            c = xe(t, s);
          l.innerHTML = c ? At(c) : "";
        } catch (s) {
          console.warn("[wf-algolia] populateCard html error:", s);
        }
      }),
      e.querySelectorAll("[wf-algolia-snippet]").forEach((l) => {
        try {
          let s = l.getAttribute("wf-algolia-snippet"),
            c = t._snippetResult?.[s]?.value;
          if (c) {
            let m = At(c)
              .replace(/<em>/g, i)
              .replace(/<\/em>/g, o);
            l.innerHTML = m;
          } else {
            let m = xe(t, s);
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
            let h = xe(t, u.trim());
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
          if (m !== null)
            if (m === "") g = "";
            else {
              let u = m.split("|").map((h) => h.trim());
              for (let h of u) {
                let y = xe(t, h);
                if (y) {
                  g = String(y);
                  break;
                }
              }
            }
          else
            ((g = t.name || t.title || ""),
              !g &&
                !Mi.has(l) &&
                (Mi.add(l),
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
              let h = xe(t, s);
              l.href = ft(h || "#");
              return;
            }
            let c = l.getAttribute("wf-algolia-link"),
              m =
                l.getAttribute("wf-algolia-link-prefix") ||
                l.getAttribute("wf-algolia-link-folder") ||
                "",
              g = l.getAttribute("wf-algolia-link-suffix") || "",
              u = xe(t, c);
            l.href = ft(m + Ii(l, u || "") + g);
          } catch (s) {
            console.warn("[wf-algolia] populateCard link error:", s);
          }
        }),
      e.querySelectorAll("[wf-algolia-if]").forEach((l) => {
        let s = l.getAttribute("wf-algolia-if");
        xi(s, t) ? J(l) : B(l);
      }));
  }
  function Zn(e, t, n) {
    let r = e.cloneNode(!0);
    ((r.style.display = ""),
      r.removeAttribute("wf-algolia-element"),
      r.classList.add("wf-algolia-injected"));
    let i = r.getAttribute("wf-algolia-link-url"),
      o = r.getAttribute("wf-algolia-link");
    if (i) {
      let l = xe(t, i);
      r.href = ft(l || "#");
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
      let c = xe(t, o) || "";
      r.href = ft(l + Ii(r, c) + s);
    }
    return (
      Wt(r, t, n),
      (r.dataset.wfAlgoliaHitObjectid = t.objectID),
      (r.dataset.wfAlgoliaHitIndex = t.__indexName || ""),
      t.__queryID && (r.dataset.wfAlgoliaHitQueryid = t.__queryID),
      r
    );
  }
  function re(e) {
    e.querySelectorAll(".wf-algolia-injected").forEach((t) => t.remove());
  }
  var Hi = new WeakSet();
  function Os(e) {
    return (Hi.has(e) || (Hi.add(e), e.remove()), e);
  }
  function Se(e, t, n, r = !1, i) {
    (r || re(e), Os(t));
    let o = document.createDocumentFragment(),
      l = r ? e.querySelectorAll(".wf-algolia-injected").length : 0;
    if (
      (n.forEach((s, c) => {
        try {
          let m = Zn(t, s, i);
          ((m.dataset.wfAlgoliaHitPosition = String(l + c + 1)),
            o.appendChild(m));
        } catch (m) {
          console.warn("[wf-algolia] Failed to clone hit:", s.objectID, m);
        }
      }),
      e.appendChild(o),
      bn(),
      Si())
    ) {
      let s = n[0]?.__indexName || "",
        c = n.map((m) => m.objectID).filter(Boolean);
      s && c.length && Yn(s, c);
    }
  }
  var er = [];
  function ki(e) {
    er.push(e);
  }
  function qi(e) {
    let t = e;
    for (let n of er) n.beforeSearch && (t = n.beforeSearch(t) ?? t);
    return t;
  }
  function Pi(e) {
    let t = e;
    for (let n of er) n.afterSearch && (t = n.afterSearch(t) ?? t);
    return t;
  }
  async function Ze(e, t) {
    let n = qi(e),
      r = await t(n);
    return Pi(r);
  }
  async function et(e, t) {
    let n = t.map((i) => ({ ...i, params: qi(i.params) })),
      r = await e.multipleQueries(n);
    return { ...r, results: r.results.map((i) => Pi(i)) };
  }
  function Ci(e, t) {
    let n = () => Y("refresh");
    window.WfAlgolia = {
      version: "1.0.0",
      getClient: () => e,
      search: (r, i, o) =>
        e.initIndex(r).search(i, { clickAnalytics: !0, ...o }),
      multiSearch: (r) => e.multipleQueries(r),
      getObject: (r, i) => e.initIndex(r).getObject(i),
      cloneAndPopulate: (r, i) => Zn(r, i, t),
      populateCard: (r, i) => Wt(r, i, t),
      trackClick: pn,
      trackConversion: hn,
      getInsights: () => Ce,
      on: Je,
      off: Un,
      setFilter: (r, i) => gi(r, i, n),
      clearFilter: (r) => mi(r, n),
      clearAllFilters: () => gn(n),
      commitStaging: pi,
      discardStaging: hi,
      getFilterState: () => {
        let r = {};
        return (
          Object.entries(N).forEach(([i, o]) => {
            r[i] = { ...o, values: o.values ? [...o.values] : void 0 };
          }),
          r
        );
      },
      setQuery: (r) => wi(r, n),
      getQuery: () =>
        (
          document.querySelector('[wf-algolia-element="browse-search"]') ||
          document.querySelector('[wf-algolia-element="search-input"]')
        )?.value || "",
      refresh: n,
      use: (r) => ki(r),
      destroy: () => {
        (document
          .querySelectorAll(".wf-algolia-injected")
          .forEach((r) => r.remove()),
          delete window.WfAlgolia);
      },
    };
  }
  function Oi() {
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
          let o = Ds[n],
            l = o ? (r.closest(o) ?? null) : null;
          (o &&
            !l &&
            !Fi.has(r) &&
            (Fi.add(r),
            console.warn(
              `[wf-algolia] "${n}" has no ancestor matching "${o}". Falling back to immediate parent for matching \u2014 confirm the template lives inside the right wrapper.`,
              r,
            )),
            Rs(r, i, l ?? i),
            r.remove());
        });
      }),
      e
    );
  }
  var Ds = {
      template: null,
      "autocomplete-template": null,
      "filter-template": '[wf-algolia-element="filter-group"]',
      "filter-tag-template": '[wf-algolia-element="filter-tag-wrapper"]',
    },
    Fi = new WeakSet();
  function dt(e, t, n = "") {
    let r = e.getAttribute(`wf-algolia-${t}`);
    if (r !== null) return r;
    let i = e.closest(`[wf-algolia-${t}]`);
    if (i) return i.getAttribute(`wf-algolia-${t}`);
    let l = document
      .querySelector("script[data-app-id]")
      ?.getAttribute(`data-${t}`);
    return l ?? n;
  }
  var Di = new WeakMap(),
    Ri = new WeakMap();
  function Rs(e, t, n) {
    (Ri.set(e, t), Di.set(e, n));
  }
  function de(e, t, n = "template") {
    return (t.get(n) || []).find((i) => Di.get(i) === e) || null;
  }
  function Oe(e) {
    return Ri.get(e) ?? null;
  }
  function ji(e) {
    return typeof CSS < "u" && typeof CSS.escape == "function"
      ? CSS.escape(e)
      : e.replace(/[^a-zA-Z0-9_-]/g, "\\$&");
  }
  async function En(e, t, n, r) {
    let o = (
      await e
        .initIndex(t)
        .search("", {
          facets: [n],
          hitsPerPage: 0,
          ...(r && r.length > 0 ? { facetFilters: r } : {}),
        })
    ).facets?.[n];
    return !o || Object.keys(o).length === 0
      ? []
      : Object.entries(o).sort((l, s) => s[1] - l[1]);
  }
  async function Ni(e, t, n, r) {
    let i = await e
        .initIndex(t)
        .search("", {
          facets: n,
          hitsPerPage: 0,
          maxValuesPerFacet: 50,
          ...(r && r.length > 0 ? { facetFilters: r } : {}),
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
  function _i(e, t, n) {
    let r = [
      ...document.querySelectorAll(
        '[wf-algolia-element="filter-group"][wf-algolia-facet]',
      ),
    ].filter((i) => i.closest('[wf-algolia-element="browse"]'));
    r.length !== 0 &&
      Promise.all(r.map((i) => Wi(e, t, i)))
        .then(() => n())
        .catch((i) => console.error("[wf-algolia] Dynamic filters failed:", i));
  }
  async function Wi(e, t, n, r) {
    let i = n.getAttribute("wf-algolia-facet"),
      o = n.querySelector(
        `[wf-algolia-element="filter-group"][wf-algolia-field="${ji(i)}"], [wf-algolia-element="filter-group"][wf-algolia-facet="${ji(i)}"]`,
      );
    if (o && o !== n) return;
    let l = n.querySelector('[wf-algolia-element="filter-field-text"]');
    if (l) {
      let m = n.getAttribute("wf-algolia-field-label") ?? i,
        g = ae(l, "{field}");
      l.textContent = oe(g, { field: m });
    }
    let s =
        n.getAttribute("wf-algolia-index") ||
        n
          .closest('[wf-algolia-element="browse"]')
          ?.getAttribute("wf-algolia-index") ||
        null,
      c = de(n, t, "filter-template");
    if (!s || !c) {
      console.error(
        `[wf-algolia] Dynamic filter "${i}" missing index=${!!s} template=${!!c}. Elements map has filter-template: ${t.has("filter-template")} (${(t.get("filter-template") || []).length} items)`,
      );
      return;
    }
    try {
      let m = await En(e, s, i, r?.facetFilters);
      if (m.length === 0) {
        console.error(`[wf-algolia] No facet values for "${i}" on "${s}"`);
        return;
      }
      let g = Oe(c) ?? n,
        u = vt(n);
      (re(n),
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
          E && (E.textContent = Et(y, u));
          let T = w.querySelector('[wf-algolia-element="filter-count"]');
          (T && (T.textContent = String(b)),
            w.querySelector("input") ||
              (w.setAttribute("role", "button"),
              w.setAttribute("tabindex", "0")),
            g.appendChild(w));
        }),
        ut(n));
      let h = n.querySelector('[wf-algolia-element="filter-group-count"]');
      if (h) {
        let y = m.length,
          b = ae(h, "{count}");
        h.textContent = oe(b, { distinct: y, count: y });
      }
    } catch (m) {
      console.error(`[wf-algolia] Dynamic filter "${i}" failed:`, m);
    }
  }
  async function tr(e, t, n, r) {
    if (r.length === 0) return;
    let i = r.map(({ field: o, value: l }) => [`${o}:${l}`]);
    await Wi(e, t, n, { facetFilters: i });
  }
  function nr(e) {
    document
      .querySelectorAll('[wf-algolia-element="filter-group"][wf-algolia-facet]')
      .forEach((t) => {
        if (!t.closest('[wf-algolia-element="browse"]')) return;
        let n = t.getAttribute("wf-algolia-facet"),
          r = e[n] || {};
        t.querySelectorAll('[wf-algolia-element="filter-item"]').forEach(
          (i) => {
            let o = i.getAttribute("wf-algolia-value");
            if (!o) return;
            let l = r[o] ?? 0,
              s = i.querySelector('[wf-algolia-element="filter-count"]');
            s && (s.textContent = String(l));
            let c = t.getAttribute("wf-algolia-zeroclass") || "is-disabled",
              m = i.hasAttribute("data-wf-algolia-active");
            l === 0 && !m ? i.classList.add(c) : i.classList.remove(c);
          },
        );
      });
  }
  function rr(e) {
    document
      .querySelectorAll('[wf-algolia-element="filter-group"][wf-algolia-field]')
      .forEach((t) => {
        if (t.hasAttribute("wf-algolia-refines")) return;
        let n = t.getAttribute("wf-algolia-field"),
          r = e[n],
          i = r && Object.keys(r).length > 0,
          o = !!N[n];
        i || o ? (t.style.display = "") : (t.style.display = "none");
      });
  }
  function js(e) {
    if (e === null) return null;
    let t = e.trim(),
      n = t.indexOf(":");
    if (n <= 0 || n >= t.length - 1) return null;
    let r = t.slice(0, n).trim(),
      i = t.slice(n + 1).trim();
    return !r || !i ? null : [[`${r}:${i}`]];
  }
  function Ns(e, t) {
    let n = e?.trim() ?? "",
      r = t?.trim() ?? "";
    return !n || !r ? null : [[`${n}:${r}`]];
  }
  function Lt(e, t, n) {
    let r = e.getAttribute(`${t}-value`);
    if (r !== null && r.trim() !== "") {
      let o = Ns(e.getAttribute(`${t}-field`), r);
      return (
        o === null &&
          n?.(`${t}-value is set but ${t}-field is missing/empty; ignoring.`),
        o
      );
    }
    let i = e.getAttribute(t);
    if (i !== null) {
      let o = js(i);
      return (
        o === null &&
          n?.(`${t}="${i}" is malformed (expected "field:value"); ignoring.`),
        o
      );
    }
    return null;
  }
  function ir(e) {
    document
      .querySelectorAll('[wf-algolia-element="filter-group"]')
      .forEach((t) => {
        if (!t.closest('[wf-algolia-element="browse"]')) return;
        let n = ct(t);
        if (!n) return;
        let r = e[n] || {},
          i = t.getAttribute("wf-algolia-zeroclass") || "is-disabled";
        t.querySelectorAll('[wf-algolia-element="filter-item"]').forEach(
          (l) => {
            let s = l.getAttribute("wf-algolia-value");
            if (!s) return;
            let c = l.querySelector('[wf-algolia-element="filter-count"]'),
              m = r[s] ?? 0;
            c && (c.textContent = String(m));
            let g = l.hasAttribute("data-wf-algolia-active");
            m === 0 && !g ? l.classList.add(i) : l.classList.remove(i);
          },
        );
        let o = t.querySelector('[wf-algolia-element="filter-group-count"]');
        if (o) {
          let l = Object.keys(r).length,
            s = ae(o, "{count}");
          o.textContent = oe(s, { distinct: l, count: l });
        }
      });
  }
  function or(e) {
    let t = [],
      n = [];
    return (
      Object.entries(e).forEach(([r, i]) => {
        if (i.type === "checkbox" || i.type === "boolean") {
          if (!i.values || i.values.size === 0) return;
          i.match === "and"
            ? i.values.forEach((o) => t.push([`${r}:${_t(o)}`]))
            : t.push([...i.values].map((o) => `${r}:${_t(o)}`));
        }
        (i.type === "number" || i.type === "date") &&
          (i.min !== void 0 && n.push(`${r}>=${i.min}`),
          i.max !== void 0 && n.push(`${r}<=${i.max}`));
      }),
      { facetFilters: t, numericFilters: n }
    );
  }
  function Le(e, t) {
    let n;
    return (...r) => {
      (clearTimeout(n), (n = setTimeout(() => e(...r), t)));
    };
  }
  var $i = 200,
    Ui = new WeakSet(),
    $t = "data-wf-algolia-local-hidden";
  function _s(e, t, n) {
    let r = n.trim().toLowerCase(),
      i = [
        ...e.querySelectorAll('[wf-algolia-element="filter-search-results"]'),
      ],
      o = (m) => i.some((g) => g.contains(m)),
      l = [...e.querySelectorAll('[wf-algolia-element="filter-item"]')].filter(
        (m) => !o(m),
      ),
      s = 0;
    for (let m of l) {
      if (r === "") {
        (m.hasAttribute($t) &&
          (m.removeAttribute($t), m.style.removeProperty("display")),
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
        ? (m.hasAttribute($t) &&
            (m.removeAttribute($t), m.style.removeProperty("display")),
          s++)
        : (m.setAttribute($t, "true"), (m.style.display = "none"));
    }
    let c = r === "" ? !0 : s > 0;
    Bi(t, n.trim(), c);
  }
  function Ws(e) {
    let t = e.getAttribute("wf-algolia-index");
    if (t) return t;
    let n = e.closest("[wf-algolia-index]");
    if (n && n !== e) {
      let o = n.getAttribute("wf-algolia-index");
      if (o) return o;
    }
    return (
      document
        .querySelector("script[data-app-id]")
        ?.getAttribute("data-index") ?? null
    );
  }
  function $s(e, t) {
    let n =
      e.getAttribute("wf-algolia-debounce") ??
      t.getAttribute("wf-algolia-debounce");
    if (n === null || n === "") return $i;
    let r = parseInt(n, 10);
    return Number.isNaN(r) ? $i : Math.max(0, r);
  }
  function Us(e) {
    let t = e.getAttribute("wf-algolia-refines");
    if (!t) return;
    let n = document.querySelector(
      `[wf-algolia-element="filter-group"][wf-algolia-group-id="${t}"]`,
    );
    if (!n) return;
    let r = n.getAttribute("wf-algolia-field");
    if (!r) return;
    let i = N[r];
    return !i?.values || i.values.size === 0
      ? void 0
      : [[...i.values].map((l) => `${r}:${l}`)];
  }
  function Bs(e, t, n, r) {
    let i = Oe(r) ?? e;
    re(e);
    let o = e.getAttribute("wf-algolia-activeclass") || "is-active",
      s = N[t]?.values ?? new Set();
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
          (g.setAttribute("data-wf-algolia-active", "true"),
          g.classList.add(o)),
        i.appendChild(g));
    });
  }
  function Bi(e, t, n) {
    if (!e) return;
    if (n) {
      e.style.display = "none";
      return;
    }
    let r = ae(e, "");
    (r && (e.textContent = oe(r, { query: t })), (e.style.display = ""));
  }
  function Tn(e, t, n) {
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
  function Gi(e, t, n) {
    document
      .querySelectorAll('[wf-algolia-element="filter-group"]')
      .forEach((r) => {
        let i = r.getAttribute("wf-algolia-field");
        if (!i) return;
        let o = Tn(r, i, "filter-search");
        if (!o) return;
        if (o.getAttribute("wf-algolia-search-mode") === "local") {
          let b = Tn(r, i, "filter-search-empty");
          o.addEventListener("input", () => {
            _s(r, b, o.value);
          });
          return;
        }
        let s = r.getAttribute("wf-algolia-facet") ?? i,
          c = Ws(r);
        if (!s || !c) return;
        let m = Tn(r, i, "filter-search-empty"),
          g = Tn(r, i, "filter-search-results"),
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
          y = Le(
            async (b) => {
              if (b.length === 0) {
                (m && (m.style.display = "none"), g ? h() : n());
                return;
              }
              try {
                let w = Us(r),
                  E = await e
                    .initIndex(c)
                    .searchForFacetValues(s, b, {
                      ...(w ? { facetFilters: w } : {}),
                    });
                Bi(m, b, E.facetHits.length > 0);
                let T = de(r, t, "filter-template");
                if (g) {
                  let k = u ?? T;
                  k &&
                    (Gs(g, r, i, E.facetHits, k, u !== null),
                    (g.style.display = ""));
                } else T && (Bs(r, i, E.facetHits, T), ut(r));
              } catch (w) {
                let E = w;
                if (E.status === 400 && /searchable/i.test(E.message ?? "")) {
                  Ui.has(r) ||
                    (Ui.add(r),
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
            $s(o, r),
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
                Vs(r, T, E).click(),
                h(),
                (o.value = ""));
            }),
            document.addEventListener("click", (b) => {
              let w = b.target;
              w && (r.contains(w) || g.contains(w) || h());
            })));
      });
  }
  function Gs(e, t, n, r, i, o = !1) {
    for (; e.firstChild;) e.removeChild(e.firstChild);
    let l = t.getAttribute("wf-algolia-activeclass") || "is-active",
      c = N[n]?.values ?? new Set();
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
          (u.setAttribute("data-wf-algolia-active", "true"),
          u.classList.add(l)),
        e.appendChild(u));
    });
  }
  function Vs(e, t, n) {
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
    return (y.insertBefore(m, y.firstChild), ut(e), m);
  }
  var Vi = new WeakSet();
  function ar(e, t, n) {
    let r = document.querySelector('[wf-algolia-element="filter-tag-wrapper"]');
    if (!r) return;
    let i = de(r, t, "filter-tag-template");
    if (!i) {
      Object.keys(e).length > 0 &&
        !Vi.has(r) &&
        (Vi.add(r),
        console.warn(
          '[wf-algolia] active filter detected but no [wf-algolia-element="filter-tag-template"] in DOM. Chips will not render. See https://wf-algolia-docs.candidleap.com/filters/dynamic-filters',
          r,
        ));
      return;
    }
    re(r);
    let o = Oe(i) ?? r,
      l = Ks(r);
    Object.entries(e).forEach(([s, c]) => {
      if (c.values && c.values.size > 0)
        c.values.forEach((m) => {
          let g = zs(i, s, m, c, e, n, l);
          o.appendChild(g);
        });
      else if (c.min !== void 0 && c.max !== void 0) {
        let m = Qs(i, s, c, e, n, l);
        o.appendChild(m);
      }
    });
  }
  function zs(e, t, n, r, i, o, l) {
    let s = Qi(e),
      c = Ki(t),
      m = s.querySelector('[wf-algolia-element="filter-tag-text"]');
    if (m) {
      let u = Et(n, vt(m)),
        h = ae(m, "{value}");
      m.textContent = oe(h, {
        field: zi(l, t),
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
            delete pe[t],
            Be(i),
            o());
        }),
      s
    );
  }
  function zi(e, t) {
    let n = e?.[t];
    return typeof n == "string" ? n : t;
  }
  function Ks(e) {
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
  function Ki(e) {
    let t = typeof CSS < "u" && CSS.escape ? CSS.escape(e) : e,
      n = document.querySelector(
        `[wf-algolia-element="filter-group"][wf-algolia-field="${t}"]`,
      );
    return {
      prefix: n?.getAttribute("wf-algolia-prefix") ?? "",
      suffix: n?.getAttribute("wf-algolia-suffix") ?? "",
    };
  }
  function Qs(e, t, n, r, i, o) {
    let l = Qi(e),
      s = n.min,
      c = n.max,
      m = Ki(t),
      g = `${m.prefix}${s}${m.suffix}`,
      u = `${m.prefix}${c}${m.suffix}`,
      h = l.querySelector('[wf-algolia-element="filter-tag-text"]');
    if (h) {
      let b = ae(h, "{min} \u2013 {max}");
      h.textContent = oe(b, {
        field: zi(o, t),
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
            delete pe[t],
            document
              .querySelectorAll('[wf-algolia-element="filter-group"]')
              .forEach((w) => {
                if (ct(w) !== t) return;
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
  function Qi(e) {
    let t = e.cloneNode(!0);
    return (
      (t.style.display = ""),
      t.removeAttribute("wf-algolia-element"),
      t.classList.add("wf-algolia-injected"),
      t
    );
  }
  var lr = {};
  function Js(e, t, n) {
    let r = e.getAttribute("fs-rangeslider-min"),
      i = e.getAttribute("fs-rangeslider-max"),
      o = r ?? t.getAttribute("min"),
      l = i ?? n.getAttribute("max");
    if (o === null || l === null) return null;
    let s = parseFloat(o),
      c = parseFloat(l);
    return !Number.isFinite(s) || !Number.isFinite(c)
      ? null
      : { min: s, max: c };
  }
  function Ji(e, t = 250) {
    for (let n of Object.keys(lr)) delete lr[n];
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
        let h = Js(n, i, o);
        h && (lr[r] = h);
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
                N[r] && (delete N[r], e());
                return;
              }
              N[r] && (delete N[r], e());
              return;
            }
            let T = { type: "number", match: "or", min: w, max: E };
            if (u) {
              (yt(r, T), n.setAttribute("data-wf-algolia-staged", "true"));
              return;
            }
            ((N[r] = T), e());
          },
          b = m > 0 ? Le(y, m) : y;
        (i.addEventListener("input", b),
          o.addEventListener("input", b),
          l && (l.textContent = `${i.value} \u2013 ${o.value}`));
      });
  }
  function Xi(e, t) {
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
      { rootMargin: "200px" },
    ).observe(n);
  }
  var Ge = "",
    eo = !1,
    tt = "",
    Yi = new Set(),
    Zi = new WeakSet(),
    sr = "sort";
  function Sn() {
    return Ge;
  }
  function cr(e) {
    let t = e.getAttribute("wf-algolia-sort-index");
    return t === null || t === "" ? tt : t;
  }
  function Xs(e) {
    let t = new Set([tt]);
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
  function ur() {
    document
      .querySelectorAll('[wf-algolia-element="sort-group"]')
      .forEach((e) => {
        let t = [...e.querySelectorAll('[wf-algolia-element="sort-item"]')],
          n = null;
        for (let r of t) {
          let i = cr(r);
          i === Ge || i === (Ge || tt)
            ? (r.setAttribute("data-wf-algolia-active", "true"), (n = n ?? r))
            : r.removeAttribute("data-wf-algolia-active");
        }
        if (n) {
          let r = (n.textContent ?? "").trim();
          e.querySelectorAll(
            '[wf-algolia-element="sort-selected-label"]',
          ).forEach((i) => {
            let o = ae(i, "{value}");
            i.textContent = oe(o, { value: r, count: 1 });
          });
        }
      });
  }
  function Ys() {
    let e = new URL(window.location.href);
    !Ge || Ge === tt ? e.searchParams.delete(sr) : e.searchParams.set(sr, Ge);
    let t = e.toString();
    t !== window.location.href && window.history.pushState(null, "", t);
  }
  function to() {
    return new URL(window.location.href).searchParams.get(sr) ?? "";
  }
  function Zs(e, t) {
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
  function ec(e, t, n) {
    let r = cr(e);
    (r === tt ||
      (!Xs(e).has(r) &&
        !Yi.has(r) &&
        (Yi.add(r),
        console.warn(
          `[wf-algolia] sort-by: replica "${r}" is not registered on the page; falling back to primary index "${tt}" if Algolia rejects it.`,
          e,
        ))),
      (Ge = r),
      Ys(),
      ur(),
      (t.page = 0),
      Xe(e),
      n());
  }
  function no(e, t, n) {
    tt = n;
    let r = [...document.querySelectorAll('[wf-algolia-element="sort-group"]')];
    if (r.length === 0) return;
    eo = !0;
    let i = to(),
      o = !1;
    for (let l of r) {
      let s = [...l.querySelectorAll('[wf-algolia-element="sort-item"]')];
      if (s.length === 0) {
        Zi.has(l) ||
          (Zi.add(l),
          console.warn(
            '[wf-algolia] sort-group has no sort-item descendants. Add `[wf-algolia-element="sort-item"]` children to enable sorting.',
            l,
          ));
        continue;
      }
      if (!o) {
        let c = Zs(s, i);
        c && ((Ge = cr(c)), (o = !0));
      }
      for (let c of s) c.addEventListener("click", () => ec(c, e, t));
    }
    ur();
  }
  function ro(e) {
    if (!eo) return;
    ((tt = e), (Ge = to() || e), ur());
  }
  function nt(e, t) {
    return t === "*" ? [`*:${e}`] : t.split(",").map((n) => `${n.trim()}:${e}`);
  }
  var fr = "#wfa=";
  function Ln(e) {
    return encodeURIComponent(e);
  }
  function An(e) {
    try {
      return decodeURIComponent(e);
    } catch {
      return e;
    }
  }
  function tc(e, t) {
    let r = new URL(t).searchParams;
    (["q", "mode", "page"].forEach((s) => r.delete(s)),
      [...r.keys()]
        .filter((s) => s.startsWith("f_"))
        .forEach((s) => r.delete(s)),
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
            let g = [...c.values].map(Ln).join(",");
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
  function nc(e) {
    let t = {};
    return (
      e.filters &&
        Object.entries(e.filters).forEach(([n, r]) => {
          t[n] = {
            type: r.type,
            match: r.match,
            ...(r.values ? { values: [...r.values] } : {}),
            ...(r.min !== void 0 ? { min: r.min } : {}),
            ...(r.max !== void 0 ? { max: r.max } : {}),
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
  function io(e) {
    let t = window.location.href.split("#")[0] ?? "",
      n = tc(e, t),
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
      let c = nc(e);
      o = `${s.toString()}${fr}${c}`;
    }
    o !== window.location.href && window.history.pushState(null, "", o);
  }
  function dr() {
    let { hash: e } = window.location;
    return e.startsWith(fr) ? rc(e.slice(fr.length)) : ic();
  }
  function rc(e) {
    try {
      let t = JSON.parse(decodeURIComponent(e)),
        n = {};
      return (
        Object.entries(t.f || {}).forEach(([r, i]) => {
          let o = { type: i.type, match: i.match };
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
      return { query: "", mode: "all", page: 0, filters: {} };
    }
  }
  function ic() {
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
            u = An(m);
          if (u.endsWith("_min")) {
            let h = u.slice(2, -4);
            (o[h] || (o[h] = { type: "number", match: "or" }),
              (o[h].min = parseFloat(An(g))));
          } else if (u.endsWith("_max")) {
            let h = u.slice(2, -4);
            (o[h] || (o[h] = { type: "number", match: "or" }),
              (o[h].max = parseFloat(An(g))));
          } else {
            let h = u.slice(2);
            o[h] = {
              type: "checkbox",
              match: "or",
              values: new Set(g.split(",").filter(Boolean).map(An)),
            };
          }
        }),
      { query: t, mode: n, page: i, filters: o }
    );
  }
  function oo(e, t, n, r, i) {
    let o = document.querySelectorAll('[wf-algolia-element="mode-btn"]');
    function l() {
      document
        .querySelectorAll(
          '[wf-algolia-element="filter-group"][wf-algolia-index]',
        )
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
  function ao(e, t) {
    let n = document.querySelector('[wf-algolia-element="sort"]');
    n &&
      n.addEventListener("change", () => {
        ((e.sort = n.value), (e.page = 0), t());
      });
  }
  var xn = !1,
    Mn = "load-more",
    gr = [];
  function so(e) {
    return gr.length ? [...e, ...gr] : e;
  }
  var $,
    Ut,
    rt,
    it = [],
    xt,
    ot;
  async function co(e, t, n) {
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
      ((Ut = e),
      (ot = t),
      (xt = n),
      (ot = t),
      (rt = i.getAttribute("wf-algolia-index") || ""),
      !rt)
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
          g && g !== "all" && !it.includes(g) && it.push(g);
        }),
      it.length === 0 && (it = [rt]),
      ($ = {
        mode: "all",
        sort: "",
        query: "",
        page: 0,
        hitsPerPage: parseInt(i.getAttribute("wf-algolia-per-page") || "12"),
        topOffset: parseInt(i.getAttribute("wf-algolia-top-offset") || "0"),
      }),
      (xn = i.getAttribute("wf-algolia-url-sync") === "true"),
      (gr =
        Lt(i, "wf-algolia-base-filter", (m) =>
          console.warn(`[wf-algolia] ${m}`, i),
        ) ?? []),
      xn)
    ) {
      let m = dr();
      if (
        m.query ||
        m.mode !== "all" ||
        m.page > 0 ||
        Object.keys(m.filters).length > 0
      ) {
        (($.query = m.query),
          ($.mode = m.mode),
          ($.page = m.page),
          Object.assign(N, m.filters));
        let g = i.querySelector('[wf-algolia-element="browse-search"]');
        g && m.query && (g.value = m.query);
      }
    }
    let o = () => {
      (($.page = 0), Ee());
    };
    (ni(o),
      Jn(N),
      _i(e, n, Ee),
      Gi(e, n, Ee),
      Ji(o),
      ii(),
      oo($, N, Ee, t.activeClass, rt),
      ao($, Ee),
      no($, Ee, rt));
    let l = i.querySelector('[wf-algolia-element="browse-search"]');
    l &&
      l.addEventListener(
        "input",
        Le((m) => {
          (($.query = m.target.value.trim()), ($.page = 0), Ee());
        }, t.debounce),
      );
    let s = i.getAttribute("wf-algolia-pagination") || "load-more";
    Mn = s === "infinite-scroll" || s === "numbered" ? s : "load-more";
    let c = Mn === "load-more";
    if (
      (document
        .querySelector('[wf-algolia-element="page-next"]')
        ?.addEventListener("click", () => {
          ($.page++, Ee(c));
        }),
      document
        .querySelector('[wf-algolia-element="page-prev"]')
        ?.addEventListener("click", () => {
          $.page > 0 && ($.page--, Ee());
        }),
      document
        .querySelector('[wf-algolia-button="reset"]')
        ?.addEventListener("click", () => {
          (($.page = 0), ($.query = ""));
          let m = i.querySelector('[wf-algolia-element="browse-search"]');
          (m && (m.value = ""), gn(() => Ee()));
        }),
      document.querySelectorAll('[wf-algolia-button="apply"]').forEach((m) => {
        m.addEventListener("click", () => {
          let g = lo(m);
          g.length !== 0 && (nn(g), ($.page = 0), Ee());
        });
      }),
      document
        .querySelectorAll('[wf-algolia-button="apply-cancel"]')
        .forEach((m) => {
          m.addEventListener("click", () => {
            let g = lo(m);
            (bt(g.length > 0 ? g : void 0), Be());
          });
        }),
      window.addEventListener("popstate", () => {
        if ((bt(), ro(rt), !xn)) return;
        let m = dr();
        (($.query = m.query),
          ($.mode = m.mode),
          ($.page = m.page),
          Object.keys(N).forEach((u) => delete N[u]),
          Object.assign(N, m.filters),
          Jn(N));
        let g = document.querySelector('[wf-algolia-element="browse-search"]');
        (g && (g.value = m.query), Ee());
      }),
      Je("refresh", () => Ee()),
      Je("filter:parent-change", (m) => {
        let g = fn(m.parentGroupId);
        g.length !== 0 &&
          g.forEach((u) => {
            delete N[u.childField];
            let h = St(u, N);
            h.length === u.depth
              ? (Tt(u.childEl, u.whenParentEmpty),
                tr(Ut, xt, u.childEl, h).catch((y) => {
                  (console.warn("[wf-algolia] refreshChildGroup failed:", y),
                    Y("error", y));
                }))
              : (Fe(u.childEl, u.whenParentEmpty),
                u.childEl
                  .querySelectorAll(".wf-algolia-injected")
                  .forEach((y) => y.remove()));
          });
      }),
      Je("filter:parent-stage-change", (m) => {
        let g = un().filter((h) => h.parentField === m.field);
        if (g.length === 0) return;
        let u = { ...N, ...pe };
        g.forEach((h) => {
          let y = St(h, u);
          y.length === h.depth
            ? (Tt(h.childEl, h.whenParentEmpty),
              tr(Ut, xt, h.childEl, y).catch((b) => {
                (console.warn(
                  "[wf-algolia] refreshChildGroup (staged) failed:",
                  b,
                ),
                  Y("error", b));
              }))
            : (Fe(h.childEl, h.whenParentEmpty),
              h.childEl
                .querySelectorAll(".wf-algolia-injected")
                .forEach((b) => b.remove()));
        });
      }),
      vi(() => Sn() || $.sort || ($.mode !== "all" ? $.mode : rt)),
      await Ee(),
      Mn === "infinite-scroll")
    ) {
      let m = i.querySelector('[wf-algolia-element="results"]');
      m &&
        Xi(m, async () => {
          ($.page++, await Ee(!0));
        });
    }
  }
  function lo(e) {
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
  function oc() {
    let e = {},
      t = new Map();
    document
      .querySelectorAll('[wf-algolia-element="filter-group"][wf-algolia-index]')
      .forEach((n) => {
        let r = n.getAttribute("wf-algolia-field"),
          i = n.getAttribute("wf-algolia-index");
        r && i && t.set(r, i);
      });
    for (let n of it) {
      let r = {};
      (Object.entries(N).forEach(([i, o]) => {
        let l = t.get(i);
        (!l || l === n) && (r[i] = o);
      }),
        (e[n] = or(r)));
    }
    return e;
  }
  function uo() {
    (($.page = 0), Ee());
  }
  function Ee(e = !1) {
    ($e(N), Ue(N));
    let t = document.querySelector(
        '[wf-algolia-element="browse"] [wf-algolia-element="results"]',
      ),
      n = t ? de(t, xt) : null,
      r = document.querySelector(
        '[wf-algolia-element="browse"] [wf-algolia-element="loader"]',
      ),
      i = document.querySelector(
        '[wf-algolia-element="browse"] [wf-algolia-element="no-results"]',
      );
    return !t || !n
      ? Promise.resolve()
      : (J(r),
        $.mode === "all" && !$.sort && !Sn()
          ? lc(t, n, r, i, e)
          : ac(t, n, r, i, e));
  }
  function ac(e, t, n, r, i) {
    let { facetFilters: o, numericFilters: l } = or(N),
      s = Sn() || $.sort || ($.mode !== "all" ? $.mode : rt),
      c = so(o),
      m = {
        hitsPerPage: $.hitsPerPage,
        page: $.page,
        facets: ["*"],
        facetFilters: c,
        numericFilters: l,
        clickAnalytics: !0,
        attributesToSnippet: fo(ot.snippetWords, ot.snippetAttrs),
      };
    return Ze(m, (g) => Ut.initIndex(s).search($.query || "", g))
      .then((g) => {
        B(n);
        let u = g.hits.map((h) => ({
          ...h,
          __queryID: g.queryID,
          __indexName: s,
        }));
        (i || re(e),
          u.length === 0 && !i ? J(r) : (B(r), Se(e, t, u, i, ot)),
          ir(g.facets || {}),
          nr(g.facets || {}),
          rr(g.facets || {}),
          Be(),
          ar(N, xt, uo),
          mo(g.nbHits, g.nbPages),
          go(g.nbPages),
          Y("results", g));
      })
      .catch((g) => {
        (B(n),
          console.error("[wf-algolia] Browse query failed:", g),
          Y("error", g));
      });
  }
  function lc(e, t, n, r, i) {
    let o = oc(),
      l = Math.ceil($.hitsPerPage / it.length),
      s = it.map((c) => {
        let m = o[c] || { facetFilters: [], numericFilters: [] },
          g = so(m.facetFilters);
        return {
          indexName: c,
          query: $.query || "",
          params: {
            hitsPerPage: l,
            page: $.page,
            facets: ["*"],
            facetFilters: g,
            numericFilters: m.numericFilters,
            clickAnalytics: !0,
            attributesToSnippet: fo(ot.snippetWords, ot.snippetAttrs),
          },
        };
      });
    return et(Ut, s)
      .then(({ results: c }) => {
        B(n);
        let m = [],
          g = {},
          u = 0,
          h = 0;
        (c.forEach((y, b) => {
          let w = it[b],
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
          i || re(e),
          m.length === 0 && !i ? J(r) : (B(r), Se(e, t, m, i, ot)),
          ir(g),
          nr(g),
          rr(g),
          Be(),
          ar(N, xt, uo),
          mo(u, h),
          go(h),
          Y("results", { results: c, nbHits: u, nbPages: h }));
      })
      .catch((c) => {
        (B(n),
          console.error("[wf-algolia] Browse multi-query failed:", c),
          Y("error", c));
      });
  }
  function fo(e, t) {
    return nt(e, t);
  }
  var mr = 5;
  function sc(e) {
    if (!e) return mr;
    let t = e.getAttribute("wf-algolia-page-window");
    if (t === null || t === "") return mr;
    let n = parseInt(t, 10);
    return Number.isNaN(n) ? mr : Math.max(1, n);
  }
  function pr(e, t) {
    let n = ae(e, "Showing {shown} of {total}");
    e.textContent = oe(n, {
      shown: t.shown,
      total: t.total,
      count: t.total,
      page: t.page,
      pages: t.pages,
    });
  }
  function cc(e, t) {
    let n = ae(e, "Page {page} of {pages}");
    e.textContent = oe(n, t);
  }
  function uc(e, t, n) {
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
  function mo(e, t) {
    document
      .querySelectorAll('[wf-algolia-element="results-count"]')
      .forEach((n) => {
        let r = Math.min(e, ($.page + 1) * $.hitsPerPage);
        pr(n, { shown: r, total: e, page: $.page + 1, pages: t });
      });
  }
  function go(e) {
    let t = document.querySelector('[wf-algolia-element="page-prev"]'),
      n = document.querySelector('[wf-algolia-element="page-next"]');
    (t && (t.style.display = $.page > 0 ? "" : "none"),
      n && (n.style.display = $.page < e - 1 ? "" : "none"),
      document
        .querySelectorAll('[wf-algolia-element="page-info"]')
        .forEach((i) => {
          cc(i, { page: $.page + 1, pages: e });
        }));
    let r = document.querySelector('[wf-algolia-element="page-number"]');
    if (r) {
      let i = r.parentElement;
      if (i) {
        (i.querySelectorAll(".wf-algolia-page-num").forEach((m) => m.remove()),
          (r.style.display = "none"));
        let o = document.querySelector('[wf-algolia-element="browse"]'),
          l = sc(o),
          s = Math.max(0, $.page - Math.floor(l / 2)),
          c = Math.min(e, s + l);
        s = Math.max(0, c - l);
        for (let m = s; m < c; m++) {
          let g = uc(r, m, m === $.page);
          (g.addEventListener("click", () => {
            (($.page = m), Ee());
          }),
            n ? i.insertBefore(g, n) : i.appendChild(g));
        }
      }
    }
    (xn &&
      io({
        query: $.query,
        mode: $.mode,
        page: $.page,
        filters: N,
        pagination: Mn,
      }),
      $.topOffset &&
        $.page > 0 &&
        window.scrollTo({ top: $.topOffset, behavior: "smooth" }));
  }
  function po(e) {
    ((e.get("search-input") || []).forEach((t) => {
      (t.setAttribute("role", "searchbox"),
        t.getAttribute("aria-label") || t.setAttribute("aria-label", "Search"));
    }),
      (e.get("browse-search") || []).forEach((t) => {
        (t.setAttribute("role", "searchbox"),
          t.getAttribute("aria-label") ||
            t.setAttribute("aria-label", "Search"));
      }),
      ["results", "autocomplete"].forEach((t) => {
        (e.get(t) || []).forEach((n) => {
          (n.setAttribute("role", "listbox"),
            n.getAttribute("aria-label") ||
              n.setAttribute("aria-label", "Search results"));
        });
      }),
      (e.get("results-count") || []).forEach((t) => {
        (t.setAttribute("role", "status"),
          t.setAttribute("aria-live", "polite"));
      }),
      (e.get("no-results") || []).forEach((t) => {
        (t.setAttribute("role", "status"),
          t.setAttribute("aria-live", "polite"));
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
  var yr = null;
  function yo(e) {
    return (yr || (yr = algoliasearchFactory(e.appId, e.searchKey)), yr);
  }
  var fc = /^[a-z][a-z0-9-]*$/;
  function bo() {
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
      o = fc.test(i) ? i : "mark";
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
  var vo = [
      "filter-template",
      "template",
      "filter-tag-template",
      "autocomplete-template",
    ],
    dc = ["filter-value-text", "filter-count"];
  function Bt(e) {
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
  function Eo(e) {
    let t = [];
    return (
      e.querySelectorAll('[wf-algolia-element="filter-group"]').forEach((n) => {
        let r =
          n.getAttribute("wf-algolia-field") ||
          n.getAttribute("wf-algolia-facet");
        r && t.push({ el: n, field: r });
      }),
      t
    );
  }
  function ue(e, t, n, r, i) {
    return { ruleId: e, severity: t, element: n, message: r, fix: i };
  }
  var mc = (e) => {
      let t = [];
      return (
        e
          .querySelectorAll('[wf-algolia-element="filter-item"]')
          .forEach((n) => {
            Bt(n) ||
              t.push(
                ue(
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
    gc = (e) => {
      let t = [];
      return (
        e
          .querySelectorAll('[wf-algolia-element="filter-group"]')
          .forEach((n) => {
            n.getAttribute("wf-algolia-field") ||
              n.getAttribute("wf-algolia-facet") ||
              t.push(
                ue(
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
    pc = (e) => {
      let t = [];
      return (
        e
          .querySelectorAll('[wf-algolia-element="filter-search"]')
          .forEach((n) => {
            Bt(n) ||
              t.push(
                ue(
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
    hc = (e) => {
      let t = [];
      return (
        e
          .querySelectorAll('[wf-algolia-element="filter-search-results"]')
          .forEach((n) => {
            let r = Bt(n);
            if (!r) {
              t.push(
                ue(
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
            ).filter((o) => Bt(o) === r).length === 0 &&
              t.push(
                ue(
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
    wc = (e) => {
      let t = [],
        n = new Map();
      return (
        Eo(e).forEach(({ el: r, field: i }) => {
          n.get(i)
            ? t.push(
                ue(
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
    yc = (e) => {
      let t = [];
      return (
        e
          .querySelectorAll('[wf-algolia-element="filter-template"]')
          .forEach((n) => {
            let r = n.parentElement;
            r &&
              r.getAttribute("wf-algolia-element") !== "filter-group" &&
              t.push(
                ue(
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
    bc = (e) => {
      let t = [];
      return (
        e.querySelectorAll("[wf-algolia-field]").forEach((n) => {
          n.hasAttribute("wf-algolia-element") ||
            n.querySelector("[wf-algolia-element]") ||
            t.push(
              ue(
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
    vc = (e) => {
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
            (Bt(r) ||
              t.push(
                ue(
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
    Ec = (e) => {
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
                ue(
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
                  ue(
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
    Tc = (e) => {
      let t = [];
      return (
        e
          .querySelectorAll('[wf-algolia-element="hit-preview"]')
          .forEach((n) => {
            n.closest('[wf-algolia-element="browse"]') &&
              t.push(
                ue(
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
    Sc = (e) => {
      let t = [];
      return (
        e
          .querySelectorAll('[wf-algolia-element="hit-preview"]')
          .forEach((n) => {
            n.querySelector(
              "[wf-algolia-text], [wf-algolia-image], [wf-algolia-hit-link-template]",
            ) ||
              t.push(
                ue(
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
    Ac = (e) => {
      let t = [];
      return (
        e
          .querySelectorAll('[wf-algolia-element="hit-preview"]')
          .forEach((n) => {
            (n.hasAttribute("wf-algolia-field") &&
              n.hasAttribute("wf-algolia-value")) ||
              n.closest('[wf-algolia-element="scope-facet"]') ||
              n.closest('[wf-algolia-element="filter-item"]') ||
              t.push(
                ue(
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
    Lc = (e) => {
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
                ue(
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
    xc = (e) => {
      let t = [],
        n = new Map();
      return (
        e.querySelectorAll("[wf-algolia-group-id]").forEach((r) => {
          let i = r.getAttribute("wf-algolia-group-id");
          if (!i) return;
          n.get(i)
            ? t.push(
                ue(
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
    Mc = (e) => {
      let t = [],
        n = e instanceof Document ? e : (e.ownerDocument ?? null);
      return (
        n &&
          [n.body, n.documentElement].forEach((i) => {
            i &&
              i.hasAttribute("wf-algolia-index") &&
              t.push(
                ue(
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
    Hc = (e) => {
      let t = [];
      return (
        e.querySelectorAll("*").forEach((n) => {
          if (n.tagName.toLowerCase() !== "script") {
            for (let r of Array.from(n.attributes))
              if (r.name.startsWith("data-algolia-")) {
                t.push(
                  ue(
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
    Ic = (e) => {
      let t = [];
      return (
        e.querySelectorAll("script").forEach((n) => {
          for (let r of Array.from(n.attributes))
            if (r.name.startsWith("wf-algolia-")) {
              t.push(
                ue(
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
    kc = (e) => {
      let t = [];
      return (
        vo.forEach((n) => {
          e.querySelectorAll(`[wf-algolia-element="${n}"]`).forEach((r) => {
            r.hasAttribute("hidden") ||
              (r.style && r.style.display === "none") ||
              t.push(
                ue(
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
    qc = (e) => {
      let t = [];
      return (
        dc.forEach((n) => {
          e.querySelectorAll(`[wf-algolia-element="${n}"]`).forEach((r) => {
            let i = vo.map((o) => `[wf-algolia-element="${o}"]`).join(", ");
            r.closest(i) ||
              t.push(
                ue(
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
    Pc = (e) => {
      let t = [],
        n = new Set(Eo(e).map((r) => r.field));
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
              ue(
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
    Cc = (e) => {
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
                  ue(
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
    br = [
      mc,
      gc,
      pc,
      hc,
      wc,
      yc,
      bc,
      vc,
      Ec,
      Tc,
      Sc,
      Ac,
      Lc,
      xc,
      Mc,
      Hc,
      Ic,
      kc,
      qc,
      Pc,
      Cc,
    ];
  function To(e, t = br) {
    let n = [];
    for (let r of t) n.push(...r(e));
    return n;
  }
  var So = "data-wf-algolia-debug",
    vr = "data-wf-algolia-issue",
    Fc = "[wf-algolia debug]";
  function Oc(e = document) {
    let t = e.querySelector(`script[${So}]`);
    return t ? t.getAttribute(So) === "true" : !1;
  }
  var Dc = [
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
  function xo() {
    return new Map();
  }
  function Rc(e, t) {
    let n = e.get(t.ruleId);
    return (
      n || ((n = new WeakSet()), e.set(t.ruleId, n)),
      n.has(t.element) ? !0 : (n.add(t.element), !1)
    );
  }
  function jc(e, t) {
    let n = e.getAttribute(vr);
    if (!n) {
      e.setAttribute(vr, t);
      return;
    }
    let r = n.split(/\s+/).filter(Boolean);
    r.includes(t) || (r.push(t), e.setAttribute(vr, r.join(" ")));
  }
  function Nc(e) {
    let t = `${Fc} ${e.ruleId}: ${e.message} \u2014 fix: ${e.fix}`;
    e.severity === "error"
      ? console.error(t, e.element)
      : console.warn(t, e.element);
  }
  function Ao(e = document, t = xo(), n = br) {
    let r = To(e, n),
      i = 0;
    for (let o of r) Rc(t, o) || (Nc(o), jc(o.element, o.ruleId), (i += 1));
    return { issues: r, newlyLogged: i };
  }
  var Lo = !1,
    _c = null;
  function Mo(e = document) {
    if (Lo || !Oc(e)) return null;
    Lo = !0;
    let t = xo();
    Ao(e, t);
    let n = !1,
      r = () => {
        if (n) return;
        ((n = !0),
          (typeof requestAnimationFrame < "u"
            ? requestAnimationFrame
            : (s) => setTimeout(() => s(0), 16))(() => {
            ((n = !1), Ao(e, t));
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
        attributeFilter: Dc,
      }),
      (_c = i),
      i
    );
  }
  var Ho = ["min", "max", "avg", "sum"],
    Io = new WeakSet(),
    ko = new WeakSet(),
    qo = new WeakSet(),
    Po = new WeakSet();
  function Wc(e) {
    let t = e.getAttribute("wf-algolia-index");
    if (t) return t;
    let n = e.closest("[wf-algolia-index]");
    if (n && n !== e) {
      let i = n.getAttribute("wf-algolia-index");
      if (i) return i;
    }
    return (
      document
        .querySelector("script[data-app-id]")
        ?.getAttribute("data-index") || ""
    );
  }
  function Co(e, t) {
    (t.get("facet-stat") ?? []).forEach((r) => void $c(e, r));
  }
  function $c(e, t) {
    let n = t.getAttribute("wf-algolia-field");
    if (!n)
      return (
        Io.has(t) ||
          (Io.add(t),
          console.error(
            "[wf-algolia] facet-stat missing required wf-algolia-field.",
            t,
          )),
        Promise.resolve()
      );
    let r = t.getAttribute("wf-algolia-stat");
    if (!r || !Ho.includes(r))
      return (
        ko.has(t) ||
          (ko.add(t),
          console.error(
            `[wf-algolia] facet-stat wf-algolia-stat must be one of ${Ho.join("|")} (got "${r ?? ""}").`,
            t,
          )),
        Promise.resolve()
      );
    let i = Wc(t);
    if (!i)
      return (
        qo.has(t) ||
          (qo.add(t),
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
      l = Lt(o, "wf-algolia-base-filter", (c) =>
        console.warn(`[wf-algolia] facet-stat ${c}`, t),
      ),
      s = { facets: [n], hitsPerPage: 0, ...(l ? { facetFilters: l } : {}) };
    return Ze(s, (c) => e.initIndex(i).search("", c))
      .then((c) => {
        let g = c.facets_stats?.[n]?.[r];
        if (g == null) {
          Po.has(t) ||
            (Po.add(t),
            console.warn(
              `[wf-algolia] facet-stat: no numeric stats for "${n}" on "${i}". Ensure "${n}" is numeric and listed in attributesForFaceting. Leaving the authored text.`,
              t,
            ));
          return;
        }
        let u = t.getAttribute("wf-algolia-format"),
          h = u ? vn(g, u) : String(g),
          y = ae(t, "{value}");
        t.textContent = oe(y, { value: h });
      })
      .catch((c) => {
        console.error("[wf-algolia] facet-stat query failed:", c);
      });
  }
  var Fo = new WeakSet(),
    Oo = new WeakSet(),
    Do = new WeakSet(),
    Ro = new WeakSet(),
    jo = new WeakSet(),
    No = new WeakSet(),
    Hn = new WeakSet(),
    In = new WeakSet(),
    kn = new WeakSet(),
    Gt = new Map();
  function Wo(e) {
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
  function $o(e) {
    let t = e.getAttribute("wf-algolia-index");
    if (t) return t;
    let n = e.closest("[wf-algolia-index]");
    if (n && n !== e) {
      let o = n.getAttribute("wf-algolia-index");
      if (o) return o;
    }
    return (
      document
        .querySelector("script[data-app-id]")
        ?.getAttribute("data-index") || ""
    );
  }
  function Uo(e) {
    let t =
      "[wf-algolia-text], [wf-algolia-image], [wf-algolia-hit-link-template]";
    for (let n of Array.from(e.children)) {
      let r = n;
      if (r.matches(t) || r.querySelector(t)) return r;
    }
    return null;
  }
  function Uc(e, t) {
    return e.replace(/\{([a-zA-Z0-9_.-]+)\}/g, (n, r) => {
      let i = t[r];
      return i == null ? "" : String(i);
    });
  }
  function Bo(e, t) {
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
      let o = Uc(i, t);
      r instanceof HTMLAnchorElement
        ? r.setAttribute("href", o)
        : r.setAttribute("data-wf-algolia-href", o);
    }
  }
  function Bc(e) {
    return e ? e.closest('[wf-algolia-element="hit-preview"]') !== null : !1;
  }
  var _o = !1;
  function Gc() {
    _o ||
      ((_o = !0),
      document.addEventListener(
        "click",
        (e) => {
          let t = e.target;
          Bc(t) && e.stopPropagation();
        },
        !0,
      ));
  }
  var Vc = 50;
  function zc(e, t) {
    let n = [];
    for (let r = 0; r < e.length; r += t) n.push(e.slice(r, r + t));
    return n;
  }
  async function Go(e, t, n) {
    let r = t.map((s) => ({
        indexName: s.indexName,
        query: "",
        params: {
          facetFilters: [[`${s.field}:${s.value}`]],
          hitsPerPage: s.hitsPerPreview,
        },
      })),
      i = zc(r, Vc),
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
          l.push(s === null ? null : (s[g] ?? { hits: [] }));
      }),
      l
    );
  }
  async function Vo(e, t) {
    let n = t.get("hit-preview") ?? [];
    if (n.length === 0) return;
    Gc();
    let r = new Set();
    (t.get("filter-template") ?? []).forEach((c) => {
      let m = Oe(c);
      m && r.add(m);
    });
    let i = Array.from(
        document.querySelectorAll('[wf-algolia-element="filter-template"]'),
      ),
      o = [],
      l = new Map();
    for (let c of n) {
      if (!c.isConnected) continue;
      let m = Wo(c);
      if (m.scopeFacetEl && !m.scopeFacetHasField) {
        let C = m.scopeFacetEl;
        In.has(C) ||
          (In.add(C),
          console.error(
            "[wf-algolia] scope-facet ancestor is missing required wf-algolia-field attribute.",
            C,
          ));
        continue;
      }
      let { field: g, value: u, scopeFacetEl: h } = m;
      if (!g) {
        Fo.has(c) ||
          (Fo.add(c),
          console.error(
            "[wf-algolia] hit-preview is missing required wf-algolia-field attribute.",
            c,
          ));
        continue;
      }
      if (!u) {
        if (h) {
          kn.has(c) ||
            (kn.add(c),
            console.warn(
              "[wf-algolia] hit-preview scope-facet value is unresolved at init \u2014 will render once the parent (standalone-filter-groups) populates the wf-algolia-value attribute.",
              c,
            ));
          continue;
        }
        Oo.has(c) ||
          (Oo.add(c),
          console.error(
            "[wf-algolia] hit-preview is missing required wf-algolia-value attribute.",
            c,
          ));
        continue;
      }
      let y = c.closest('[wf-algolia-element="browse"]');
      if (y && y !== c) {
        Ro.has(c) ||
          (Ro.add(c),
          console.error(
            '[wf-algolia] hit-preview cannot be nested inside a wf-algolia-element="browse" container.',
            c,
          ));
        continue;
      }
      let b = i.some((C) => C !== c && c.contains(C)),
        w = Array.from(r).some((C) => C !== c && c.contains(C));
      if (b || w) {
        jo.has(c) ||
          (jo.add(c),
          console.error(
            '[wf-algolia] hit-preview cannot contain a wf-algolia-element="filter-template" descendant.',
            c,
          ));
        continue;
      }
      let E = Uo(c);
      if (!E) {
        Do.has(c) ||
          (Do.add(c),
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
      let D = $o(c),
        K = `${g}::${u}`;
      (l.has(K)
        ? No.has(c) ||
          (No.add(c),
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
    let s = await Go(e, o, "hit-preview");
    o.forEach((c, m) => {
      let g = s[m];
      if (g == null) return;
      let u = g.hits ?? [];
      if (u.length === 0) {
        (Hn.has(c.el) ||
          (Hn.add(c.el),
          console.warn(
            `[wf-algolia] hit-preview returned zero hits for "${c.field}=${c.value}".`,
            c.el,
          )),
          (c.template.style.display = "none"),
          Gt.set(c.el, Er(c)));
        return;
      }
      let h = c.template.parentElement ?? c.el,
        y = document.createDocumentFragment();
      for (let b of u) {
        let w = c.template.cloneNode(!0);
        (w.setAttribute("data-wf-algolia-hit-preview", "true"),
          w.classList.add("wf-algolia-injected"),
          (w.style.display = ""),
          Bo(w, b),
          y.appendChild(w));
      }
      (h.appendChild(y),
        (c.template.style.display = "none"),
        Gt.set(c.el, Er(c)));
    });
  }
  function Er(e) {
    return `${e.indexName}::${e.field}::${e.value}::${e.hitsPerPreview}`;
  }
  function Kc(e) {
    e.querySelectorAll('[data-wf-algolia-hit-preview="true"]').forEach((t) =>
      t.remove(),
    );
  }
  async function Tr(e) {
    let t = Array.from(
      document.querySelectorAll('[wf-algolia-element="hit-preview"]'),
    );
    if (t.length === 0) return;
    let n = [];
    for (let i of t) {
      let o = Wo(i);
      if (o.scopeFacetEl && !o.scopeFacetHasField) {
        let b = o.scopeFacetEl;
        In.has(b) ||
          (In.add(b),
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
          (kn.has(i) ||
            (kn.add(i),
            console.warn(
              "[wf-algolia] hit-preview scope-facet value is unresolved at refresh \u2014 skipping render.",
              i,
            )));
        continue;
      }
      let m = Uo(i);
      if (!m) continue;
      let g = i.getAttribute("wf-algolia-hits-per-preview"),
        u = 3;
      if (g !== null) {
        let b = parseInt(g, 10);
        !Number.isNaN(b) && b > 0 && (u = b);
      }
      let h = $o(i),
        y = Er({ indexName: h, field: l, value: s, hitsPerPreview: u });
      Gt.get(i) !== y &&
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
    let r = await Go(e, n, "hit-preview refresh");
    n.forEach((i, o) => {
      let l = r[o];
      if (l == null) return;
      let s = l.hits ?? [];
      if ((Kc(i.el), s.length === 0)) {
        (Hn.has(i.el) ||
          (Hn.add(i.el),
          console.warn(
            `[wf-algolia] hit-preview returned zero hits for "${i.field}=${i.value}".`,
            i.el,
          )),
          (i.template.style.display = "none"),
          Gt.set(i.el, i.pairKey));
        return;
      }
      let c = i.template.parentElement ?? i.el,
        m = document.createDocumentFragment();
      for (let g of s) {
        let u = i.template.cloneNode(!0);
        (u.setAttribute("data-wf-algolia-hit-preview", "true"),
          u.classList.add("wf-algolia-injected"),
          (u.style.display = ""),
          Bo(u, g),
          m.appendChild(u));
      }
      (c.appendChild(m),
        (i.template.style.display = "none"),
        Gt.set(i.el, i.pairKey));
    });
  }
  function zo(e) {
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
              let c = [...i.selectedOptions]
                .map((m) => m.value)
                .filter(Boolean);
              s =
                c.length === 0
                  ? null
                  : { type: "checkbox", match: "or", values: new Set(c) };
            } else {
              let { value: c } = i;
              s = c
                ? { type: "checkbox", match: "or", values: new Set([c]) }
                : null;
            }
            if (l) {
              (s === null ? delete pe[r] : yt(r, s),
                i.setAttribute("data-wf-algolia-staged", "true"),
                Ue(),
                $e());
              let c = t.getAttribute("wf-algolia-group-id");
              (c && Ye(c) && Y("filter:parent-stage-change", { field: r }),
                Xe(i));
              return;
            }
            (s === null ? delete N[r] : (N[r] = s), Xe(i), e());
          }));
      });
  }
  var Qo = new Map(),
    Jo = new Map(),
    Xo = new Map(),
    Sr = null,
    Ko = new Map();
  function Yo(e, t) {
    return de(e, t, "filter-template");
  }
  function Qc(e, t) {
    let n = e.getAttribute("wf-algolia-link-template");
    if (n) return n;
    let r = e.closest("[wf-algolia-link-template]");
    if (r) return r.getAttribute("wf-algolia-link-template");
    if (t) {
      let i = Jo.get(t);
      if (i) return i;
    }
    return null;
  }
  function Jc(e, t) {
    let n = e.getAttribute("wf-algolia-slugify");
    if (n !== null) return n === "true";
    let r = e.closest("[wf-algolia-slugify]");
    if (r) return r.getAttribute("wf-algolia-slugify") === "true";
    if (t) {
      let i = Xo.get(t);
      if (i !== void 0) return i;
    }
    return !1;
  }
  function Zo(e, t) {
    e.querySelectorAll('[wf-algolia-element="scope-facet"]').forEach((n) =>
      n.setAttribute("wf-algolia-value", t),
    );
  }
  function Ar(e, t, n) {
    re(e);
    let r = Oe(t) ?? e,
      i = [],
      o = dt(e, "activeclass", "is-active"),
      l = dt(e, "hideclass", "is-hidden"),
      s = dt(e, "zeroclass", "is-disabled"),
      c = vt(e);
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
        h && (h.textContent = Et(m, c));
        let y = u.querySelector('[wf-algolia-element="filter-count"]');
        (y && (y.textContent = String(g)),
          u.querySelector("input") ||
            (u.setAttribute("role", "button"), u.setAttribute("tabindex", "0")),
          Zo(u, m),
          r.appendChild(u),
          i.push(u));
      }),
      i
    );
  }
  function Xc(e, t, n, r, i) {
    let o = Array.from(
      n.querySelectorAll('[wf-algolia-element="filter-group"]'),
    );
    o.length !== 0 &&
      o.forEach((l) => {
        let s =
          l.getAttribute("wf-algolia-facet") ||
          l.getAttribute("wf-algolia-field");
        if (!s) return;
        let c = Yo(l, i);
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
        let u = t + rn,
          y = (r.get(s) ?? [])
            .filter(([D]) => D.startsWith(u))
            .map(([D, K]) => [D, K]);
        if (y.length === 0) return;
        let b = dt(l, "activeclass", "is-active"),
          w = dt(l, "hideclass", "is-hidden"),
          E = dt(l, "zeroclass", "is-disabled"),
          T = Oe(c) ?? g,
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
              (C.setAttribute("role", "button"),
              C.setAttribute("tabindex", "0")),
            Zo(C, D),
            k.appendChild(C));
        });
      });
  }
  function Yc(e, t, n, r = !1) {
    let i = r ? yn(Kn(n)) : Ln(n);
    return e.replace("{field}", Ln(t)).replace("{value}", i);
  }
  function Zc() {
    let e = {};
    return (
      Qo.forEach((t, n) => {
        let r = Dt(n);
        r && (e[r] = { type: "checkbox", match: "or", values: new Set([t]) });
      }),
      e
    );
  }
  async function ea(e, t, n) {
    let r = Array.from(
        n.querySelectorAll('[wf-algolia-element="filter-group"]'),
      ),
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
      if ((h && y && ln(y, h, u), y)) {
        let b = u.getAttribute("wf-algolia-link-template");
        b && Jo.set(y, b);
        let w = u.getAttribute("wf-algolia-slugify");
        w !== null && Xo.set(y, w === "true");
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
        let b = Dt(h);
        if (!b) {
          console.warn(
            `[wf-algolia] standalone filter-group refines '${h}' but no parent with that id was found; skipping hierarchy.`,
          );
          return;
        }
        let w = Ot(u);
        Fe(u, w);
        let E = cn(h),
          T = E ? E.depth + 1 : 1;
        sn({
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
        let w = Qc(u, b),
          E = Jc(u, b),
          T = u.getAttribute("wf-algolia-group-id") || `__standalone:${h}`,
          k = Yo(u, t);
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
    (s.forEach((u) => Ko.set(u.el, u)),
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
            Ye(u.groupId)
              ? (Qo.set(u.groupId, w),
                Y("filter:parent-change", {
                  parentGroupId: u.groupId,
                  parentField: u.facetField,
                  newValue: w,
                  selectedValues: [w],
                }))
              : u.linkTemplate &&
                window.location.assign(
                  Yc(u.linkTemplate, u.facetField, w, u.slugify),
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
      Sr === null &&
        ((Sr = (u) => {
          let h = fn(u.parentGroupId);
          h.length !== 0 &&
            h.forEach((y) => {
              if (y.childEl.closest('[wf-algolia-element="browse"]')) return;
              let b = Ko.get(y.childEl);
              if (!b || !b.template) return;
              let w = Zc(),
                E = St(y, w);
              if (E.length === y.depth) {
                Tt(y.childEl, y.whenParentEmpty);
                let T = E.map(({ field: k, value: D }) => [`${k}:${D}`]);
                En(e, b.indexName, b.facetField, T)
                  .then((k) => {
                    k.length > 0 &&
                      b.template &&
                      (Ar(y.childEl, b.template, k), Tr(e));
                  })
                  .catch((k) => {
                    (console.warn(
                      "[wf-algolia] standalone child re-scope failed:",
                      k,
                    ),
                      Y("error", k));
                  });
              } else
                (Fe(y.childEl, y.whenParentEmpty),
                  y.childEl
                    .querySelectorAll(".wf-algolia-injected")
                    .forEach((T) => T.remove()));
            });
        }),
        Je("filter:parent-change", Sr)));
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
          ? Ot(u.el) !== "hide"
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
              w = await Ni(e, u.indexName, b),
              E = w.get(u.facetField) ?? [];
            E.length > 0 &&
              Ar(u.el, u.template, E).forEach((k) => {
                let D = k.getAttribute("wf-algolia-value");
                D != null && Xc(k, D, u.template, w, t);
              });
          } else {
            let y = await En(e, u.indexName, u.facetField);
            y.length > 0 && Ar(u.el, u.template, y);
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
      await Tr(e);
    } catch (u) {
      console.error(
        "[wf-algolia] standalone post-population hit-preview refresh failed:",
        u,
      );
    }
  }
  function eu(e) {
    let t = e.getAttribute("wf-algolia-max-results");
    if (!t) return 8;
    let n = parseInt(t, 10);
    return Number.isNaN(n) ? 8 : Math.max(1, n);
  }
  async function ra(e, t, n) {
    let r = recommendFactory(t.appId, t.searchKey),
      i = n.get("recommend") || [];
    for (let o of i) {
      let l = o.getAttribute("wf-algolia-model"),
        s = o.getAttribute("wf-algolia-index"),
        c = o.querySelector('[wf-algolia-element="recommend-grid"]'),
        m = c ? de(c, n) : null;
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
        B(o);
        return;
      }
      try {
        let b = [],
          w = eu(o);
        if (
          (l === "related-products"
            ? (b =
                (
                  await r.getRelatedProducts([
                    { indexName: s, objectID: h, maxRecommendations: w },
                  ])
                ).results[0]?.hits || [])
            : l === "looking-similar"
              ? (b =
                  (
                    await r.getLookingSimilar([
                      { indexName: s, objectID: h, maxRecommendations: w },
                    ])
                  ).results[0]?.hits || [])
              : l === "trending-items"
                ? (b =
                    (
                      await r.getTrendingItems([
                        { indexName: s, maxRecommendations: w },
                      ])
                    ).results[0]?.hits || [])
                : l === "frequently-bought-together" &&
                  (b =
                    (
                      await r.getFrequentlyBoughtTogether([
                        { indexName: s, objectID: h, maxRecommendations: w },
                      ])
                    ).results[0]?.hits || []),
          h && (b = b.filter((E) => E.objectID !== h)),
          b.length === 0)
        ) {
          B(o);
          return;
        }
        (re(c), Se(c, m, b, !1, t), J(o));
      } catch (b) {
        (console.error(`[wf-algolia] Recommend (${l}) failed:`, b), B(o));
      }
    }
  }
  function tu(e) {
    let t = e.closest('[wf-algolia-element="array-wrapper"]');
    return t || e.parentElement;
  }
  function nu(e) {
    let t = e.getAttribute("wf-algolia-objectid-value");
    if (t) return { objectID: t, isSlug: !0 };
    if (e.getAttribute("wf-algolia-objectid-from") === "path") {
      let o = window.location.pathname.split("/").filter(Boolean);
      return { objectID: o[o.length - 1] || null, isSlug: !0 };
    }
    let r = e.getAttribute("wf-algolia-objectid") || "id";
    return {
      objectID: new URLSearchParams(window.location.search).get(r),
      isSlug: !1,
    };
  }
  function ia(e, t, n) {
    let r = (n.get("detail") || [])[0];
    if (!r) return;
    let i = r.getAttribute("wf-algolia-index");
    if (!i) {
      console.warn("[wf-algolia] Detail page missing wf-algolia-index");
      return;
    }
    let { objectID: o, isSlug: l } = nu(r);
    if (!o) {
      console.warn(
        "[wf-algolia] Detail page: no objectID found in URL or attributes",
      );
      return;
    }
    let s = e.initIndex(i),
      c = r.getAttribute("wf-algolia-objectid-field") || "slug",
      m = _t(o);
    (l
      ? s
          .search("", { filters: `${c}:"${m}"`, hitsPerPage: 1 })
          .then((u) =>
            u.hits.length === 0 && c !== "objectid"
              ? s
                  .search("", { filters: `objectid:"${m}"`, hitsPerPage: 1 })
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
        (Wt(r, u, t),
          r
            .querySelectorAll('[wf-algolia-element="array-item"]')
            .forEach((h) => {
              let y = h.getAttribute("wf-algolia-text");
              if (!y) return;
              let b = u[y];
              if (!Array.isArray(b)) return;
              let w = tu(h);
              w &&
                (B(h),
                re(w),
                b.forEach((E) => {
                  let T = h.cloneNode(!0);
                  (J(T, "inline-block"),
                    T.removeAttribute("wf-algolia-element"),
                    T.classList.add("wf-algolia-injected"),
                    (T.textContent = E),
                    w.appendChild(T));
                }));
            }),
          bn());
      })
      .catch((u) => {
        console.error("[wf-algolia] Detail page fetch failed:", u);
      });
  }
  var oa = new WeakSet();
  function aa(e, t, n) {
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
          J(i);
          try {
            let { results: T } = await et(e, E);
            (T.forEach((D, K) => {
              let C = w[K]?.sec;
              if (!C) return;
              let ee = de(C, n, "autocomplete-template");
              if (!ee) return;
              let ye = D.hits.map((he) => ({
                ...he,
                __queryID: D.queryID,
                __indexName: E[K]?.indexName,
              }));
              (re(C), ye.length ? (Se(C, ee, ye, !1, t), J(C)) : B(C));
            }),
              i
                .querySelectorAll(
                  '[wf-algolia-element="autocomplete-section-label"]',
                )
                .forEach((D) => {
                  let K = D.closest(
                    '[wf-algolia-element="autocomplete-section"]',
                  );
                  K && (K.querySelector(".wf-algolia-injected") ? J(D) : B(D));
                }));
          } catch (T) {
            T.name !== "AbortError" &&
              console.error("[wf-algolia] Autocomplete search failed:", T);
          }
        }
      }
      let h = Le(async (y) => {
        if (!y.trim()) {
          B(i);
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
                !oa.has(w) &&
                (oa.add(w),
                console.warn(
                  "[wf-algolia] Autocomplete card has multiple <a> elements. Enter navigates to the first one. Mark the primary link with wf-algolia-link-url to make this explicit.",
                  w,
                )),
                E?.href && (window.location.href = E.href));
            } else y.key === "Escape" && (B(i), (g = -1));
        }),
        document.addEventListener("click", (y) => {
          o.contains(y.target) || (B(i), (g = -1));
        }),
        l.addEventListener("focus", () => {
          l.value.trim() && i.querySelector(".wf-algolia-injected")
            ? J(i)
            : !l.value.trim() && c.length > 0 && u("", c);
        }));
    });
  }
  function la(e, t, n) {
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
        c = s ? de(s, n) : null,
        m = r.querySelector('[wf-algolia-element="no-results"]'),
        g = r.querySelector('[wf-algolia-element="loader"]'),
        u = parseInt(r.getAttribute("wf-algolia-hits") || "8");
      if (!l || !s || !c) return;
      let h = new AbortController(),
        y = Le(async (b) => {
          if ((h.abort(), (h = new AbortController()), !b.trim())) {
            B(s);
            return;
          }
          (J(s), J(g));
          let w = Math.ceil(u / o.length),
            E = o.map((T) => ({
              indexName: T,
              query: b,
              params: { hitsPerPage: w, clickAnalytics: !0 },
            }));
          try {
            let { results: T } = await et(e, E);
            B(g);
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
            (re(s), D.length === 0 ? J(m) : (B(m), Se(s, c, D, !1, t)));
          } catch (T) {
            (T.name !== "AbortError" &&
              console.error("[wf-algolia] Merged search failed:", T),
              B(g));
          }
        }, t.debounce);
      (l.addEventListener("input", (b) => {
        y(b.target.value);
      }),
        document.addEventListener("click", (b) => {
          r.contains(b.target) || B(s);
        }));
    });
  }
  function sa(e, t, n) {
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
          h = Le(async (y) => {
            if ((u.abort(), (u = new AbortController()), !y.trim())) {
              B(l);
              return;
            }
            (J(l), J(g));
            let b = nt(t.snippetWords, t.snippetAttrs),
              w = [...s].map((E) => ({
                indexName: E.getAttribute("wf-algolia-index"),
                query: y,
                params: {
                  hitsPerPage: parseInt(
                    E.getAttribute("wf-algolia-hits") || "5",
                  ),
                  clickAnalytics: !0,
                  attributesToSnippet: b,
                },
              }));
            try {
              let { results: E } = await et(e, w);
              B(g);
              let T = 0,
                k = 0;
              (E.forEach((K, C) => {
                let ee = s[C];
                if (!ee) return;
                let ye = de(ee, n);
                if (!ye) return;
                let he = K.hits.map((X) => ({
                  ...X,
                  __queryID: K.queryID,
                  __indexName: w[C]?.indexName,
                }));
                (re(ee),
                  he.length ? (Se(ee, ye, he, !1, t), J(ee), k++) : B(ee),
                  (T += he.length));
              }),
                k > 1 ? J(m) : B(m),
                T === 0 ? J(c) : B(c));
              let D = o?.querySelector('[wf-algolia-element="results-count"]');
              if (D) {
                let K = ae(D, "{count} results");
                D.textContent = oe(K, { count: T, total: T });
              }
            } catch (E) {
              if (E.name === "AbortError") return;
              (console.error("[wf-algolia] Multi-section search failed:", E),
                B(g));
            }
          }, t.debounce);
        (i.addEventListener("input", (y) => {
          h(y.target.value);
        }),
          document.addEventListener("click", (y) => {
            o?.contains(y.target) || B(l);
          }),
          i.addEventListener("focus", () => {
            i.value.trim() && J(l);
          }),
          i.addEventListener("keydown", (y) => {
            y.key === "Escape" && B(l);
          }));
      });
  }
  function ca(e, t, n) {
    (n.get("search-input") || [])
      .filter((i) => !!i.closest("[wf-algolia-index]"))
      .forEach((i) => {
        let o = i.closest("[wf-algolia-index]"),
          l = o.getAttribute("wf-algolia-index"),
          s = o.querySelector('[wf-algolia-element="results"]'),
          c = s ? de(s, n) : null,
          m = o.querySelector('[wf-algolia-element="no-results"]'),
          g = o.querySelector('[wf-algolia-element="loader"]'),
          u = parseInt(o.getAttribute("wf-algolia-hits") || "8");
        if (!s || !c) return;
        let h = new AbortController(),
          y = Le(async (b) => {
            if ((h.abort(), (h = new AbortController()), !b.trim())) {
              B(s);
              return;
            }
            (J(s), J(g));
            try {
              let w = await Ze(
                {
                  hitsPerPage: u,
                  clickAnalytics: !0,
                  attributesToSnippet: nt(t.snippetWords, t.snippetAttrs),
                },
                (k) => e.initIndex(l).search(b, k),
              );
              B(g);
              let E = w.hits.map((k) => ({
                ...k,
                __queryID: w.queryID,
                __indexName: l,
              }));
              E.length === 0 ? (re(s), J(m)) : (B(m), Se(s, c, E, !1, t));
              let T = o.querySelector('[wf-algolia-element="results-count"]');
              if (T) {
                let k = ae(T, "{count} results");
                T.textContent = oe(k, { count: w.nbHits, total: w.nbHits });
              }
            } catch (w) {
              (B(g),
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
            o.contains(b.target) || B(s);
          }));
      });
  }
  var ru = 12,
    ua = new WeakSet(),
    fa = new WeakSet(),
    da = new WeakSet();
  function ma(e, t, n) {
    (n.get("browse") || [])
      .filter((i) => i.getAttribute("wf-algolia-disable-filters") === "true")
      .forEach((i) => void iu(e, t, n, i));
  }
  function iu(e, t, n, r) {
    let i = r.getAttribute("wf-algolia-index");
    if (!i)
      return (
        ua.has(r) ||
          (ua.add(r),
          console.error(
            "[wf-algolia] static list (wf-algolia-disable-filters) missing required wf-algolia-index.",
            r,
          )),
        Promise.resolve()
      );
    let o = r.querySelector('[wf-algolia-element="results"]'),
      l = o ? de(o, n) : null;
    if (!o || !l)
      return (
        da.has(r) ||
          (da.add(r),
          console.warn(
            "[wf-algolia] static list has no results container/template; skipping.",
            r,
          )),
        Promise.resolve()
      );
    let s = Lt(r, "wf-algolia-filter", (y) => {
        fa.has(r) ||
          (fa.add(r), console.warn(`[wf-algolia] static list ${y}`, r));
      }),
      c = parseInt(r.getAttribute("wf-algolia-per-page") || "", 10),
      m = Number.isNaN(c) || c <= 0 ? ru : c,
      g = r.querySelector('[wf-algolia-element="loader"]'),
      u = r.querySelector('[wf-algolia-element="no-results"]');
    J(g);
    let h = {
      hitsPerPage: m,
      clickAnalytics: !0,
      attributesToSnippet: nt(t.snippetWords, t.snippetAttrs),
      ...(s ? { facetFilters: s } : {}),
    };
    return Ze(h, (y) => e.initIndex(i).search("", y))
      .then((y) => {
        B(g);
        let b = y.hits.map((w) => ({
          ...w,
          __queryID: y.queryID,
          __indexName: i,
        }));
        (re(o),
          b.length === 0 ? J(u) : (B(u), Se(o, l, b, !1, t)),
          r
            .querySelectorAll('[wf-algolia-element="results-count"]')
            .forEach((w) => {
              pr(w, {
                shown: b.length,
                total: y.nbHits,
                page: 1,
                pages: y.nbPages,
              });
            }));
      })
      .catch((y) => {
        (B(g), console.error("[wf-algolia] static list query failed:", y));
      });
  }
  function ga() {
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
      Mo();
      let e = bo(),
        t = yo(e),
        n = Oi();
      (ga(),
        po(n),
        n.has("browse") && co(t, e, n),
        n.has("browse") && ma(t, e, n),
        ea(t, n, document),
        n.has("hit-preview") && Vo(t, n),
        n.has("facet-stat") && Co(t, n),
        zo(() => Y("refresh")),
        n.has("detail") && ia(t, e, n),
        n.has("recommend") && ra(t, e, n),
        ca(t, e, n),
        sa(t, e, n),
        la(t, e, n),
        n.has("autocomplete") && aa(t, e, n),
        e.insights && Ei(e),
        Ci(t, e),
        (window.WfAlgolia.__sanitize = At),
        Y("ready"));
    } catch (e) {
      console.error("[wf-algolia] Initialization failed:", e);
    }
  });
