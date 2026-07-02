// utils/base-filter — split from app.carved.js (see docs/MODULE-MAP.md)
function parseFieldColonValue(e) {
  if (e === null) return null;
  let t = e.trim(),
    n = t.indexOf(":");
  if (n <= 0 || n >= t.length - 1) return null;
  let r = t.slice(0, n).trim(),
    i = t.slice(n + 1).trim();
  return !r || !i ? null : [[`${r}:${i}`]];
}
function pairToFacetFilter(e, t) {
  let n = e?.trim() ?? "",
    r = t?.trim() ?? "";
  return !n || !r ? null : [[`${n}:${r}`]];
}
export function readBaseFilter(e, t, n) {
  let r = e.getAttribute(`${t}-value`);
  if (r !== null && r.trim() !== "") {
    let o = pairToFacetFilter(e.getAttribute(`${t}-field`), r);
    return (
      o === null &&
        n?.(`${t}-value is set but ${t}-field is missing/empty; ignoring.`),
      o
    );
  }
  let i = e.getAttribute(t);
  if (i !== null) {
    let o = parseFieldColonValue(i);
    return (
      o === null &&
        n?.(`${t}="${i}" is malformed (expected "field:value"); ignoring.`),
      o
    );
  }
  return null;
}
