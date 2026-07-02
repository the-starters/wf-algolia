// render/detail — split from app.carved.js (see docs/MODULE-MAP.md)
import { hideElement, showElement } from "../utils/dom.js";
import { escapeFilterValue, restartIx2 } from "../utils/misc.js";
import { populateCard } from "./populate.js";
import { removeInjected } from "./template.js";
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
export function initDetailPage(e, t, n) {
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
