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
// Shared "truly disabled" state for filter items. A CSS class alone is not
// enough: the consuming Webflow site's zeroclass may only set color/cursor, so
// the element stays clickable. Callers pass the group's own zeroclass name.
// pointer-events cannot stop a native control from being reached by keyboard,
// so the controls inside are disabled too. Only controls we disabled ourselves
// carry the marker attribute, so re-enabling never overrides the page author.
var DISABLED_CONTROL_ATTR = "data-wf-algolia-disabled-control";
function eachNativeControl(e, t) {
  ("disabled" in e && t(e),
    e.querySelectorAll("input, select, button, textarea").forEach(t));
}
export function disableFilterEl(e, t = "is-disabled") {
  (e.classList.add(t),
    e.setAttribute("data-wf-algolia-disabled", "true"),
    e.setAttribute("aria-disabled", "true"),
    (e.style.pointerEvents = "none"),
    eachNativeControl(e, (n) => {
      n.disabled ||
        ((n.disabled = !0), n.setAttribute(DISABLED_CONTROL_ATTR, "true"));
    }));
}
export function enableFilterEl(e, t = "is-disabled") {
  (e.classList.remove(t),
    e.removeAttribute("data-wf-algolia-disabled"),
    e.removeAttribute("aria-disabled"),
    e.style.removeProperty("pointer-events"),
    eachNativeControl(e, (n) => {
      n.hasAttribute(DISABLED_CONTROL_ATTR) &&
        (n.removeAttribute(DISABLED_CONTROL_ATTR), (n.disabled = !1));
    }));
}
