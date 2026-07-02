// filters/hierarchy — split from app.carved.js (see docs/MODULE-MAP.md)
import { emit } from "../core/events.js";
export var MAX_DEPTH = 5,
  HIERARCHY_SEPARATOR = " > ";
export function leafValue(e) {
  let t = e.lastIndexOf(HIERARCHY_SEPARATOR);
  return t === -1 ? e : e.slice(t + HIERARCHY_SEPARATOR.length);
}
export function getLabelMode(e) {
  return e.getAttribute("wf-algolia-label") === "leaf" ? "leaf" : "full";
}
export function formatFacetLabel(e, t) {
  return t === "leaf" ? leafValue(e) : e;
}
var groupFieldById = new Map(),
  groupElById = new Map(),
  childLinksByParentId = new Map(),
  linkByChildEl = new WeakMap(),
  allChildLinks = [],
  linkByGroupId = new Map(),
  warnedWhenParentEmpty = new WeakSet();
export function parseWhenParentEmpty(e) {
  let t = e.getAttribute("wf-algolia-when-parent-empty");
  return t === null
    ? null
    : t === "hide"
      ? "hide"
      : t === "disable"
        ? "disable"
        : (warnedWhenParentEmpty.has(e) ||
            (warnedWhenParentEmpty.add(e),
            console.warn(
              `[wf-algolia] Unknown wf-algolia-when-parent-empty='${t}'; valid values: 'hide' | 'disable'. Treating as absent.`,
              e,
            )),
          null);
}
export function registerGroup(e, t, n) {
  (groupFieldById.set(e, t), groupElById.set(e, n));
}
export function getGroupField(e) {
  return groupFieldById.get(e) ?? null;
}
export function registerChildLink(e) {
  let t = childLinksByParentId.get(e.parentGroupId) ?? [];
  (t.push(e),
    childLinksByParentId.set(e.parentGroupId, t),
    linkByChildEl.set(e.childEl, e),
    linkByGroupId.set(e.groupId, e),
    allChildLinks.push(e));
}
export function getChildLink(e) {
  return linkByGroupId.get(e) ?? null;
}
export function isParentGroup(e) {
  return childLinksByParentId.has(e);
}
export function getAllChildLinks() {
  return allChildLinks.slice();
}
function hideEl(e, t = "is-hidden") {
  (e.classList.add(t), e.style.setProperty("display", "none", "important"));
}
function unhideEl(e, t = "is-hidden") {
  (e.classList.remove(t), e.style.removeProperty("display"));
}
function disableEl(e, t = "is-disabled") {
  (e.classList.add(t),
    e.setAttribute("data-wf-algolia-disabled", "true"),
    e.setAttribute("aria-disabled", "true"),
    (e.style.pointerEvents = "none"));
}
function enableEl(e, t = "is-disabled") {
  (e.classList.remove(t),
    e.removeAttribute("data-wf-algolia-disabled"),
    e.removeAttribute("aria-disabled"),
    e.style.removeProperty("pointer-events"));
}
export function applyParentEmptyBehavior(e, t) {
  t === "hide" ? hideEl(e) : t === "disable" && disableEl(e);
}
export function clearParentEmptyBehavior(e, t) {
  t === "hide" ? unhideEl(e) : t === "disable" && enableEl(e);
}
function collectAncestors(e) {
  let t = [],
    n = new Set(),
    r = linkByGroupId.get(e);
  for (; r;) {
    if (n.has(r.groupId)) {
      (console.warn(
        `[wf-algolia] Cycle detected in hierarchy at '${r.groupId}'`,
      ),
        emit(
          "error",
          new Error(`wf-algolia: hierarchy cycle at '${r.groupId}'`),
        ));
      break;
    }
    if ((n.add(r.groupId), t.length >= MAX_DEPTH)) {
      console.warn(
        `[wf-algolia] collectAncestors exceeded MAX_DEPTH=${MAX_DEPTH} at '${r.groupId}'`,
      );
      break;
    }
    let i = linkByGroupId.get(r.parentGroupId);
    if (!i) break;
    (t.unshift(i), (r = i));
  }
  return t;
}
export function collectDescendants(e) {
  let t = [],
    n = [
      {
        id: e,
        depthFromRoot: 0,
      },
    ],
    r = new WeakSet(),
    i = new Set([e]);
  for (; n.length > 0;) {
    let { id: o, depthFromRoot: l } = n.shift();
    if (l >= MAX_DEPTH) continue;
    let s = childLinksByParentId.get(o) ?? [];
    for (let c of s)
      r.has(c.childEl) ||
        (r.add(c.childEl),
        t.push(c),
        i.has(c.groupId) ||
          (i.add(c.groupId),
          n.push({
            id: c.groupId,
            depthFromRoot: l + 1,
          })));
  }
  return t;
}
export function getAncestorSelections(e, t) {
  let n = collectAncestors(e.groupId),
    r = [];
  for (let o of n) {
    let l = firstValueOf(t, o.childField);
    if (l === null) return r;
    r.push({
      field: o.childField,
      value: l,
    });
  }
  let i = firstValueOf(t, e.parentField);
  return (
    i === null ||
      r.push({
        field: e.parentField,
        value: i,
      }),
    r
  );
}
function firstValueOf(e, t) {
  let n = e[t];
  return !n || !n.values || n.values.size === 0
    ? null
    : (Array.from(n.values)[0] ?? null);
}
export function syncHierarchyVisibility(e) {
  for (let t of allChildLinks)
    getAncestorSelections(t, e).length === t.depth
      ? clearParentEmptyBehavior(t.childEl, t.whenParentEmpty)
      : applyParentEmptyBehavior(t.childEl, t.whenParentEmpty);
}
