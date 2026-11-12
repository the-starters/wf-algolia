// render/unique — `wf-algolia-unique="<group>"` card attribute (fork addition).
//
// Inside one populated card, the text elements that share a group name show
// each value once. Values are compared ignoring case and repeated or
// surrounding whitespace, and the first spelling wins.
//
// The group's distinct values are compacted, in order, into its earliest
// visible slots; the leftover slots are emptied AND hidden. Compacting (rather
// than hiding a duplicate where it sits) keeps the visible items adjacent in
// the DOM, which matters because Webflow comma separators are often written
// with sibling selectors such as `p:has(+ p:not(:empty))::after`: an empty
// slot between two visible items would drop the comma, and a hidden but
// non-empty one would leave a trailing comma.
//
// Because values can move between slots, use it on plain text elements whose
// only per-slot binding is the text (for example the three
// `work-history.N.company` tags on the expert card).
//
// Elements that are already hidden (for example by `wf-algolia-if`) or have
// no text are not slots. Cards without the attribute are unchanged.
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
  let groups = new Map();
  for (let element of card.querySelectorAll("[wf-algolia-unique]")) {
    try {
      // A previous populate of this same node may have hidden it. The text
      // pass already set display for wf-algolia-format elements and the
      // caller re-evaluated wf-algolia-if; restore only the ones nothing else
      // controls.
      if (element.hasAttribute(HIDDEN_MARK)) {
        element.removeAttribute(HIDDEN_MARK);
        if (
          !element.hasAttribute("wf-algolia-if") &&
          !element.hasAttribute("wf-algolia-format")
        )
          showElement(element, "");
      }
      if (element.style?.display === "none") continue;
      if (!normalizeText(element.textContent)) continue;
      let name = String(element.getAttribute("wf-algolia-unique") || "").trim();
      if (!groups.has(name)) groups.set(name, []);
      groups.get(name).push(element);
    } catch (error) {
      console.warn("[wf-algolia] populateCard unique error:", error);
    }
  }
  for (let slots of groups.values()) {
    try {
      let seen = new Set(),
        values = [];
      for (let slot of slots) {
        let key = normalizeText(slot.textContent);
        if (seen.has(key)) continue;
        seen.add(key);
        values.push({ key, text: slot.textContent });
      }
      slots.forEach((slot, index) => {
        let value = values[index];
        if (!value) {
          slot.textContent = "";
          hideElement(slot);
          slot.setAttribute(HIDDEN_MARK, "");
        } else if (normalizeText(slot.textContent) !== value.key) {
          slot.textContent = value.text;
        }
      });
    } catch (error) {
      console.warn("[wf-algolia] populateCard unique error:", error);
    }
  }
}
