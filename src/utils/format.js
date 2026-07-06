// utils/format — split from app.carved.js (see docs/MODULE-MAP.md)
import { getPath, slugify } from "./misc.js";
export function interpolate(e, t) {
  return e.replace(/\{(\w+)\}/g, (n, r) => {
    let i = t[r];
    return i == null ? "" : String(i);
  });
}
var textTemplateCache = new WeakMap();
export function getTextTemplate(e, t) {
  let n = textTemplateCache.get(e);
  if (n === void 0) {
    let r = e.getAttribute("wf-algolia-text-template");
    if (r !== null) n = r;
    else {
      let i = (e.textContent ?? "").trim();
      n = i.includes("{") && i.includes("}") ? i : t;
    }
    textTemplateCache.set(e, n);
  }
  return n;
}
var originalTextCache = new WeakMap();
export function getOriginalText(e) {
  let t = originalTextCache.get(e);
  return (
    t === void 0 &&
      ((t = (e.textContent ?? "").trim()), originalTextCache.set(e, t)),
    t
  );
}
var COMPARATORS = ["!==", "===", ">=", "<=", ">", "<"];
export function evalCondition(e, t) {
  let n = COMPARATORS.find((g) => e.includes(g));
  if (!n) return !!getPath(t, e.trim());
  let [r, i] = e.split(n).map((g) => g.trim());
  if (r === void 0 || i === void 0) return !1;
  let o = getPath(t, r),
    l = i.replace(/^["']|["']$/g, ""),
    s = parseFloat(o),
    c = parseFloat(l),
    m = !isNaN(s) && !isNaN(c);
  switch (n) {
    case "===":
      return String(o) === l;
    case "!==":
      return String(o) !== l;
    case ">":
      return m && s > c;
    case ">=":
      return m && s >= c;
    case "<":
      return m && s < c;
    case "<=":
      return m && s <= c;
    default:
      return !1;
  }
}
export function formatValue(e, t) {
  if (e == null || e === "") return "";
  switch (t) {
    case "rating": {
      let n = parseFloat(e);
      return isNaN(n) ? "" : `\u2605 ${n.toFixed(1)}`;
    }
    case "year": {
      let n = String(e);
      if (/^\d{4}$/.test(n)) return n;
      let r = new Date(n);
      return isNaN(r.getTime()) ? "" : String(r.getFullYear());
    }
    case "currency": {
      let n = parseFloat(e);
      return isNaN(n) ? "" : `$${n.toFixed(2)}`;
    }
    case "number": {
      let n = parseFloat(e);
      return isNaN(n) ? "" : n.toLocaleString();
    }
    case "short-name": {
      let n = String(e).trim().split(/\s+/).filter(Boolean);
      return n.length
        ? [n[0]]
            .concat(n.slice(1).map((r) => r.charAt(0).toUpperCase() + "."))
            .join(" ")
        : "";
    }
    default:
      return String(e);
  }
}
export function applySlugifyAttr(e, t) {
  return e.getAttribute("wf-algolia-slugify") === "true" ? slugify(t) : t;
}
