// render/template — split from app.carved.js (see docs/MODULE-MAP.md)
import { sanitizeUrl } from "../utils/sanitize.js";
import { getPath, restartIx2 } from "../utils/misc.js";
import { applySlugifyAttr } from "../utils/format.js";
import { isInsightsReady, trackView } from "../insights/insights.js";
import { populateCard } from "./populate.js";
export function cloneAndPopulate(e, t, n) {
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
export function removeInjected(e) {
  e.querySelectorAll(".wf-algolia-injected").forEach((t) => t.remove());
}
var detachedTemplates = new WeakSet();
function detachTemplateOnce(e) {
  return (
    detachedTemplates.has(e) || (detachedTemplates.add(e), e.remove()),
    e
  );
}
export function renderHits(e, t, n, r = !1, i) {
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
