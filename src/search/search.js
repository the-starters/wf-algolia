// search/search — split from app.carved.js (see docs/MODULE-MAP.md)
import { hideElement, showElement } from "../utils/dom.js";
import { getTextTemplate, interpolate } from "../utils/format.js";
import { debounce } from "../utils/debounce.js";
import { buildSnippetParam } from "../utils/snippet.js";
import { removeInjected, renderHits } from "../render/template.js";
import { searchWithMiddleware } from "../api/public-api.js";
import { findTemplateFor } from "../core/attributes.js";
export function initScopedSearch(e, t, n) {
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
