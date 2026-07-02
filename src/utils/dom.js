// utils/dom — split from app.carved.js (see docs/MODULE-MAP.md)
export function closeDropdownOnPick(e) {
  if (!e.closest("[wf-algolia-close-on-pick]")) return;
  let t = e.closest(".w-dropdown");
  if (!t) return;
  let n = window.$ ?? window.jQuery;
  if (typeof n == "function")
    try {
      n(t).trigger("w-close");
    } catch {}
  let r = t.querySelector(".w-dropdown-toggle"),
    i = t.querySelector(".w-dropdown-list");
  (t.classList.remove("w--open"),
    r &&
      (r.classList.remove("w--open"), r.setAttribute("aria-expanded", "false")),
    i && (i.classList.remove("w--open"), i.setAttribute("aria-hidden", "true")),
    r && r.click());
}
var warnedDisplayBlock = new WeakSet();
export function showElement(e, t) {
  if (!e) return;
  let n = e.getAttribute("wf-algolia-display");
  if (n) {
    e.style.display = n;
    return;
  }
  if (t !== void 0) {
    e.style.display = t;
    return;
  }
  (warnedDisplayBlock.has(e) ||
    (warnedDisplayBlock.add(e),
    console.warn(
      '[wf-algolia] showing element with display:block. If your Webflow layout uses flex/grid, add wf-algolia-display="flex" (or grid/inline-flex/etc.). See https://wf-algolia-docs.candidleap.com/attribute-reference#wf-algolia-display',
      e,
    )),
    (e.style.display = "block"));
}
export function hideElement(e) {
  e && (e.style.display = "none");
}
