// utils/snippet — split from app.carved.js (see docs/MODULE-MAP.md)
export function buildSnippetParam(e, t) {
  return t === "*" ? [`*:${e}`] : t.split(",").map((n) => `${n.trim()}:${e}`);
}
