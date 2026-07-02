// search/multi-search — split from app.carved.js (see docs/MODULE-MAP.md)
import { hideElement, showElement } from "../utils/dom.js";
import { getTextTemplate, interpolate } from "../utils/format.js";
import { debounce } from "../utils/debounce.js";
import { buildSnippetParam } from "../utils/snippet.js";
import { removeInjected, renderHits } from "../render/template.js";
import { multiQueryWithMiddleware } from "../api/public-api.js";
import { findTemplateFor } from "../core/attributes.js";
export function initMergedSearch(e, t, n) {
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
export function initSectionSearch(e, t, n) {
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
