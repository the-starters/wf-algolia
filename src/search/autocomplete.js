// search/autocomplete — split from app.carved.js (see docs/MODULE-MAP.md)
import { hideElement, showElement } from "../utils/dom.js";
import { debounce } from "../utils/debounce.js";
import { removeInjected, renderHits } from "../render/template.js";
import { multiQueryWithMiddleware } from "../api/public-api.js";
import { findTemplateFor } from "../core/attributes.js";
var warnedMultiAnchorCard = new WeakSet();
export function initAutocomplete(e, t, n) {
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
