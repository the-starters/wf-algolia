// core/attributes — split from app.carved.js (see docs/MODULE-MAP.md)
export function scanAttributes() {
  let e = new Map();
  return (
    document.querySelectorAll("[wf-algolia-element]").forEach((n) => {
      let r = n.getAttribute("wf-algolia-element");
      (e.has(r) || e.set(r, []), e.get(r).push(n));
    }),
    [
      "template",
      "autocomplete-template",
      "filter-template",
      "filter-tag-template",
    ].forEach((n) => {
      (e.get(n) || []).forEach((r) => {
        let i = r.parentElement;
        if (!i) {
          r.remove();
          return;
        }
        let o = TEMPLATE_ANCHOR_SELECTORS[n],
          l = o ? (r.closest(o) ?? null) : null;
        (o &&
          !l &&
          !warnedTemplateAnchor.has(r) &&
          (warnedTemplateAnchor.add(r),
          console.warn(
            `[wf-algolia] "${n}" has no ancestor matching "${o}". Falling back to immediate parent for matching \u2014 confirm the template lives inside the right wrapper.`,
            r,
          )),
          registerTemplateHome(r, i, l ?? i),
          r.remove());
      });
    }),
    e
  );
}
var TEMPLATE_ANCHOR_SELECTORS = {
    template: null,
    "autocomplete-template": null,
    "filter-template": '[wf-algolia-element="filter-group"]',
    "filter-tag-template": '[wf-algolia-element="filter-tag-wrapper"]',
  },
  warnedTemplateAnchor = new WeakSet();
export function getCascadingAttr(e, t, n = "") {
  let r = e.getAttribute(`wf-algolia-${t}`);
  if (r !== null) return r;
  let i = e.closest(`[wf-algolia-${t}]`);
  if (i) return i.getAttribute(`wf-algolia-${t}`);
  let l = document
    .querySelector("script[data-app-id]")
    ?.getAttribute(`data-${t}`);
  return l ?? n;
}
var templateAnchorByEl = new WeakMap(),
  templateParentByEl = new WeakMap();
function registerTemplateHome(e, t, n) {
  (templateParentByEl.set(e, t), templateAnchorByEl.set(e, n));
}
export function findTemplateFor(e, t, n = "template") {
  return (t.get(n) || []).find((i) => templateAnchorByEl.get(i) === e) || null;
}
export function getTemplateParent(e) {
  return templateParentByEl.get(e) ?? null;
}
export function cssEscape(e) {
  return typeof CSS < "u" && typeof CSS.escape == "function"
    ? CSS.escape(e)
    : e.replace(/[^a-zA-Z0-9_-]/g, "\\$&");
}
