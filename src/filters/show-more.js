// filters/show-more — split from app.carved.js (see docs/MODULE-MAP.md)
var showMoreReapplyFns = new WeakMap();
export function initShowMore() {
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
export function reapplyShowMore(e) {
  let t = showMoreReapplyFns.get(e);
  t && t();
}
