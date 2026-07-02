// utils/sanitize — split from app.carved.js (see docs/MODULE-MAP.md)
export function sanitizeUrl(e) {
  let t = e.trim(),
    n = t.toLowerCase();
  return n.startsWith("javascript:") ||
    n.startsWith("data:") ||
    n.startsWith("vbscript:")
    ? (console.warn("[wf-algolia] Blocked unsafe URL:", t), "#")
    : t;
}
var ALLOWED_TAGS = {
    em: new Set(),
    mark: new Set(),
    strong: new Set(),
    b: new Set(),
    i: new Set(),
    u: new Set(),
    p: new Set(),
    br: new Set(),
    ul: new Set(),
    ol: new Set(),
    li: new Set(),
    h1: new Set(),
    h2: new Set(),
    h3: new Set(),
    h4: new Set(),
    blockquote: new Set(),
    code: new Set(),
    pre: new Set(),
    a: new Set(["href", "title", "target", "rel"]),
    img: new Set(["src", "alt", "title", "width", "height"]),
  },
  ELEMENT_NODE = 1,
  TEXT_NODE = 3;
export function sanitizeHtml(e) {
  let t = new DOMParser().parseFromString(e, "text/html");
  return (
    sanitizeNode(t.head),
    sanitizeNode(t.body),
    t.head.innerHTML + t.body.innerHTML
  );
}
function sanitizeNode(e) {
  let t = Array.from(e.childNodes);
  for (let n of t)
    if (n.nodeType === ELEMENT_NODE) {
      let r = n,
        i = r.tagName.toLowerCase();
      if (!(i in ALLOWED_TAGS)) {
        sanitizeNode(r);
        let l = r.parentNode;
        if (l) {
          for (; r.firstChild;) l.insertBefore(r.firstChild, r);
          l.removeChild(r);
        }
        continue;
      }
      let o = ALLOWED_TAGS[i] ?? new Set();
      for (let l of Array.from(r.attributes))
        o.has(l.name.toLowerCase()) || r.removeAttribute(l.name);
      (i === "a" &&
        r.hasAttribute("href") &&
        r.setAttribute("href", sanitizeUrl(r.getAttribute("href") ?? "")),
        i === "img" &&
          r.hasAttribute("src") &&
          r.setAttribute("src", sanitizeUrl(r.getAttribute("src") ?? "")),
        sanitizeNode(r));
    } else n.nodeType !== TEXT_NODE && n.parentNode?.removeChild(n);
}
