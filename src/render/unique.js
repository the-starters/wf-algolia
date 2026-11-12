// render/unique — `wf-algolia-unique="<group>"` card attribute (fork addition).
//
// Inside one populated card, elements that share a group name show each text
// value once. The first element (in DOM order) with a given value stays; a
// later element in the same group whose text matches it, ignoring case and
// repeated or surrounding whitespace, is hidden AND emptied. Emptying matters
// because Webflow comma separators are often written with `:empty` selectors
// (for example `p:has(+ p:not(:empty))::after`), which would otherwise still
// draw a trailing comma before a hidden duplicate.
//
// Elements that are already hidden (for example by `wf-algolia-if`) or have
// no text are skipped and never count as a "seen" value. Cards without the
// attribute are unchanged.
import { hideElement, showElement } from "../utils/dom.js";

var HIDDEN_MARK = "data-wf-algolia-unique-hidden";

function normalizeText(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function applyUniqueGroups(card) {
  if (!card?.querySelectorAll) return;
  let elements = card.querySelectorAll("[wf-algolia-unique]"),
    seenByGroup = new Map();
  for (let element of elements) {
    try {
      // A previous populate of this same node may have hidden it. Elements
      // with wf-algolia-if were already re-evaluated by the caller; restore
      // only the ones nothing else controls.
      if (element.hasAttribute(HIDDEN_MARK)) {
        element.removeAttribute(HIDDEN_MARK);
        if (!element.hasAttribute("wf-algolia-if")) showElement(element, "");
      }
      if (element.style?.display === "none") continue;
      let key = normalizeText(element.textContent);
      if (!key) continue;
      let group = String(
          element.getAttribute("wf-algolia-unique") || "",
        ).trim(),
        seen = seenByGroup.get(group);
      if (!seen) seenByGroup.set(group, (seen = new Set()));
      if (seen.has(key)) {
        element.textContent = "";
        hideElement(element);
        element.setAttribute(HIDDEN_MARK, "");
      } else seen.add(key);
    } catch (error) {
      console.warn("[wf-algolia] populateCard unique error:", error);
    }
  }
}
