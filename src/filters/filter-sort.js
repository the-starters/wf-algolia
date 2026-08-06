// filters/filter-sort — wf-algolia-sort ordering for filter-group item lists
import { canAnimateReorder, captureRects, playFlip } from "../utils/flip.js";
var ORDER_KEY = "__wfAlgoliaOrder";
export function isItemSelected(e) {
  if (
    e instanceof HTMLInputElement &&
    (e.type === "checkbox" || e.type === "radio")
  )
    return e.checked;
  let t = e.querySelector('input[type="radio"], input[type="checkbox"]');
  return t ? t.checked : e.getAttribute("data-wf-algolia-active") === "true";
}
export function isSelectedFirst(e) {
  return e.getAttribute("wf-algolia-sort") === "selected-first";
}
function assignBaselineOrder(e) {
  if (e.every((n) => typeof n[ORDER_KEY] == "number")) return;
  let t = 0;
  for (; t < e.length;) {
    if (typeof e[t][ORDER_KEY] == "number") {
      t++;
      continue;
    }
    let n = t;
    for (; t < e.length && typeof e[t][ORDER_KEY] != "number";) t++;
    let r = n > 0 ? e[n - 1][ORDER_KEY] : null,
      i = t < e.length ? e[t][ORDER_KEY] : null,
      o = r ?? (i !== null ? i - 1 : 0),
      l = i ?? o + 1,
      s = t - n;
    for (let c = 0; c < s; c++)
      e[n + c][ORDER_KEY] = o + ((l - o) * (c + 1)) / (s + 1);
  }
}
function resolveHosts(e, t) {
  let n = new Map(),
    r = e[0].parentElement;
  if (r && e.every((l) => l.parentElement === r))
    return (
      e.forEach((l) => n.set(l, l)),
      {
        hosts: n,
        parent: r,
      }
    );
  let i = e.map((l) => {
      let s = l.closest('[role="listitem"]');
      return s && t.contains(s) && s !== t ? s : l.parentElement;
    }),
    o = i[0]?.parentElement ?? null;
  return !o ||
    o === t.ownerDocument.documentElement ||
    i.some((l, s) => !l || l === t || l.parentElement !== o || i.indexOf(l) !== s)
    ? null
    : (e.forEach((l, s) => n.set(l, i[s])),
      {
        hosts: n,
        parent: o,
      });
}
export function applyFilterItemSort(e, t = {}) {
  let n = e.getAttribute("wf-algolia-sort");
  if (
    !n ||
    n === "natural" ||
    (n !== "selected-first" && n !== "alpha" && n !== "count")
  )
    return;
  let d = [...e.querySelectorAll('[wf-algolia-element="filter-search-results"]')],
    r = [...e.querySelectorAll('[wf-algolia-element="filter-item"]')].filter(
      (u) => !d.some((h) => h.contains(u)),
    );
  if (r.length < 2) return;
  let a = resolveHosts(r, e);
  if (!a) return;
  let { hosts: f, parent: i } = a,
    o = (u) => u.getAttribute("wf-algolia-value") || "",
    l = (u) => {
      let h = u.querySelector('[wf-algolia-element="filter-count"]'),
        y = parseInt((h?.textContent ?? "0").trim(), 10);
      return Number.isFinite(y) ? y : 0;
    },
    s;
  if (n === "selected-first") {
    assignBaselineOrder(r);
    let u = [...r].sort((b, w) => b[ORDER_KEY] - w[ORDER_KEY]),
      h = [],
      y = [];
    for (let b of u) (isItemSelected(b) ? h : y).push(b);
    s = [...h, ...y];
  } else
    n === "alpha"
      ? (s = [...r].sort((u, h) =>
          o(u).localeCompare(o(h), void 0, {
            sensitivity: "base",
          }),
        ))
      : (s = [...r].sort((u, h) => l(h) - l(u)));
  if (s.every((u, h) => u === r[h])) return;
  let p = s.map((u) => f.get(u)),
    c = t.animate === !0 && canAnimateReorder(),
    m = c ? captureRects(p) : null,
    g = document.activeElement;
  for (let u of p) i.appendChild(u);
  (m && playFlip(p, m),
    g instanceof HTMLElement &&
      e.contains(g) &&
      document.activeElement !== g &&
      g.focus({
        preventScroll: !0,
      }));
}
