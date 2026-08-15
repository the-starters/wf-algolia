// utils/base-numeric-filter — fork addition (v1.0.14): always-on numeric
// filters for browse / static-list wrappers, with relative-time tokens.
//
// Grammar (attribute value, comma-separated expressions):
//   wf-algolia-base-numeric-filter="createdDate >= now-30d, points > 100"
//   field <op> value   op: >= <= != > < =   value: number | now[±N{s|m|h|d|w}]
//
// `now` resolves at query time (not init), so long-lived tabs stay correct.
// Resolved epoch unit defaults to milliseconds (Xano-native); indexes that
// store seconds set wf-algolia-base-numeric-filter-unit="s".
var NUMERIC_OPS = [">=", "<=", "!=", ">", "<", "="],
  REL_NOW_RE = /^now(?:\s*([+-])\s*(\d+)\s*(s|m|h|d|w))?$/i,
  UNIT_MS = {
    s: 1e3,
    m: 6e4,
    h: 36e5,
    d: 864e5,
    w: 6048e5,
  };
function parseNumericExpression(e) {
  let t = e.trim();
  if (!t) return null;
  for (let n of NUMERIC_OPS) {
    let r = t.indexOf(n);
    if (r > 0) {
      let i = t.slice(0, r).trim(),
        o = t.slice(r + n.length).trim();
      if (!i || !o || !/^[A-Za-z0-9_.\-]+$/.test(i)) return null;
      let l = REL_NOW_RE.exec(o);
      if (l)
        return {
          field: i,
          op: n,
          rel: {
            sign: l[1] === "+" ? 1 : -1,
            amount: l[2] ? parseInt(l[2], 10) : 0,
            unit: (l[3] || "s").toLowerCase(),
          },
        };
      let s = Number(o);
      return Number.isFinite(s)
        ? {
            field: i,
            op: n,
            value: s,
          }
        : null;
    }
  }
  return null;
}
export function readBaseNumericFilter(e, t, n) {
  let r = e.getAttribute(t);
  if (r === null || r.trim() === "") return null;
  let i = [];
  for (let l of r.split(",")) {
    if (!l.trim()) continue;
    let s = parseNumericExpression(l);
    s === null
      ? n?.(
          `${t} expression "${l.trim()}" is malformed (expected "field <op> number" or "field <op> now[±N{s|m|h|d|w}]"); ignoring it.`,
        )
      : i.push(s);
  }
  let o = (e.getAttribute(`${t}-unit`) || "ms").trim().toLowerCase();
  return (
    o !== "ms" &&
      o !== "s" &&
      (n?.(`${t}-unit="${o}" is invalid (expected "ms" or "s"); using "ms".`),
      (o = "ms")),
    i.length === 0
      ? null
      : {
          specs: i,
          unit: o,
        }
  );
}
export function resolveBaseNumericFilters(e) {
  if (!e) return [];
  let t = Date.now();
  return e.specs.map((n) => {
    let r = n.value;
    if (n.rel) {
      let i = t + n.rel.sign * n.rel.amount * UNIT_MS[n.rel.unit];
      r = e.unit === "s" ? Math.floor(i / 1e3) : i;
    }
    return `${n.field}${n.op}${r}`;
  });
}
