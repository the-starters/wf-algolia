// utils/flip — FLIP transition helper for list reorders
var FLIP_DURATION = 200,
  FLIP_EASING = "cubic-bezier(0.22, 0.61, 0.36, 1)",
  inFlight = new WeakMap();
export function canAnimateReorder() {
  return !(
    typeof window > "u" ||
    typeof document > "u" ||
    document.visibilityState === "hidden" ||
    (typeof window.matchMedia == "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  );
}
export function captureRects(e) {
  let t = new Map();
  for (let n of e) t.set(n, n.getBoundingClientRect());
  return t;
}
function settle(e) {
  let t = inFlight.get(e);
  t &&
    (inFlight.delete(e),
    window.clearTimeout(t.timer),
    t.onEnd && e.removeEventListener("transitionend", t.onEnd),
    (e.style.transition = t.transition),
    (e.style.transform = t.transform));
}
export function playFlip(e, t) {
  let n = [];
  for (let r of e) {
    let i = t.get(r);
    if (!i) continue;
    let o = r.getBoundingClientRect();
    if (i.width === 0 && i.height === 0 && o.width === 0 && o.height === 0)
      continue;
    let l = i.left - o.left,
      s = i.top - o.top;
    (Math.abs(l) < 1 && Math.abs(s) < 1) || (settle(r), n.push([r, l, s]));
  }
  if (n.length === 0) return;
  for (let [r, i, o] of n)
    (inFlight.set(r, {
      transition: r.style.transition,
      transform: r.style.transform,
      timer: 0,
      onEnd: null,
    }),
      (r.style.transition = "none"),
      (r.style.transform = `translate(${i}px, ${o}px)`));
  void n[0][0].offsetWidth;
  for (let [r] of n) {
    let i = inFlight.get(r);
    if (!i) continue;
    let o = (l) => {
      l.target === r && l.propertyName === "transform" && settle(r);
    };
    ((i.onEnd = o),
      (i.timer = window.setTimeout(() => settle(r), FLIP_DURATION + 80)),
      r.addEventListener("transitionend", o),
      (r.style.transition = `transform ${FLIP_DURATION}ms ${FLIP_EASING}`),
      (r.style.transform = "translate(0px, 0px)"));
  }
}
