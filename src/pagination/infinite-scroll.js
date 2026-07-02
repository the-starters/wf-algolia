// pagination/infinite-scroll — split from app.carved.js (see docs/MODULE-MAP.md)
export function initInfiniteScroll(e, t) {
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
    {
      rootMargin: "200px",
    },
  ).observe(n);
}
