// recommend/recommend — split from app.carved.js (see docs/MODULE-MAP.md)
import { hideElement, showElement } from "../utils/dom.js";
import { removeInjected, renderHits } from "../render/template.js";
import { findTemplateFor } from "../core/attributes.js";
import recommendFactory from "@algolia/recommend";
function getMaxRecommendations(e) {
  let t = e.getAttribute("wf-algolia-max-results");
  if (!t) return 8;
  let n = parseInt(t, 10);
  return Number.isNaN(n) ? 8 : Math.max(1, n);
}
export async function initRecommendations(e, t, n) {
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
