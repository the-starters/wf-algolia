// browse/sort — split from app.carved.js (see docs/MODULE-MAP.md)
import { closeDropdownOnPick } from "../utils/dom.js";
import { getTextTemplate, interpolate } from "../utils/format.js";
var currentSortIndex = "",
  sortInitialized = !1,
  primarySortIndex = "",
  warnedUnknownReplica = new Set(),
  warnedEmptySortGroup = new WeakSet(),
  SORT_URL_PARAM = "sort";
export function getCurrentSort() {
  return currentSortIndex;
}
function sortIndexOf(e) {
  let t = e.getAttribute("wf-algolia-sort-index");
  return t === null || t === "" ? primarySortIndex : t;
}
function knownReplicaIndexes(e) {
  let t = new Set([primarySortIndex]);
  return (
    document
      .querySelectorAll(
        '[wf-algolia-element="sort-item"][wf-algolia-sort-index]',
      )
      .forEach((n) => {
        if (n === e) return;
        let r = n.getAttribute("wf-algolia-sort-index");
        r && t.add(r);
      }),
    document
      .querySelectorAll('[wf-algolia-element="mode-btn"][wf-algolia-mode]')
      .forEach((n) => {
        let r = n.getAttribute("wf-algolia-mode");
        r && r !== "all" && t.add(r);
      }),
    t
  );
}
function syncSortUI() {
  document
    .querySelectorAll('[wf-algolia-element="sort-group"]')
    .forEach((e) => {
      let t = [...e.querySelectorAll('[wf-algolia-element="sort-item"]')],
        n = null;
      for (let r of t) {
        let i = sortIndexOf(r);
        i === currentSortIndex || i === (currentSortIndex || primarySortIndex)
          ? (r.setAttribute("data-wf-algolia-active", "true"), (n = n ?? r))
          : r.removeAttribute("data-wf-algolia-active");
      }
      if (n) {
        let r = (n.textContent ?? "").trim();
        e.querySelectorAll(
          '[wf-algolia-element="sort-selected-label"]',
        ).forEach((i) => {
          let o = getTextTemplate(i, "{value}");
          i.textContent = interpolate(o, {
            value: r,
            count: 1,
          });
        });
      }
    });
}
function writeSortToURL() {
  let e = new URL(window.location.href);
  !currentSortIndex || currentSortIndex === primarySortIndex
    ? e.searchParams.delete(SORT_URL_PARAM)
    : e.searchParams.set(SORT_URL_PARAM, currentSortIndex);
  let t = e.toString();
  t !== window.location.href && window.history.pushState(null, "", t);
}
function readSortFromURL() {
  return new URL(window.location.href).searchParams.get(SORT_URL_PARAM) ?? "";
}
function pickInitialSortItem(e, t) {
  if (e.length === 0) return null;
  if (t) {
    let r = e.find((i) => i.getAttribute("wf-algolia-sort-index") === t);
    if (r) return r;
  }
  let n = e.find((r) => {
    let i = r.getAttribute("wf-algolia-sort-index");
    return i === null || i === "";
  });
  return n || e[0];
}
function onSortItemClick(e, t, n) {
  let r = sortIndexOf(e);
  (r === primarySortIndex ||
    (!knownReplicaIndexes(e).has(r) &&
      !warnedUnknownReplica.has(r) &&
      (warnedUnknownReplica.add(r),
      console.warn(
        `[wf-algolia] sort-by: replica "${r}" is not registered on the page; falling back to primary index "${primarySortIndex}" if Algolia rejects it.`,
        e,
      ))),
    (currentSortIndex = r),
    writeSortToURL(),
    syncSortUI(),
    (t.page = 0),
    closeDropdownOnPick(e),
    n());
}
export function initSortGroups(e, t, n) {
  primarySortIndex = n;
  let r = [...document.querySelectorAll('[wf-algolia-element="sort-group"]')];
  if (r.length === 0) return;
  sortInitialized = !0;
  let i = readSortFromURL(),
    o = !1;
  for (let l of r) {
    let s = [...l.querySelectorAll('[wf-algolia-element="sort-item"]')];
    if (s.length === 0) {
      warnedEmptySortGroup.has(l) ||
        (warnedEmptySortGroup.add(l),
        console.warn(
          '[wf-algolia] sort-group has no sort-item descendants. Add `[wf-algolia-element="sort-item"]` children to enable sorting.',
          l,
        ));
      continue;
    }
    if (!o) {
      let c = pickInitialSortItem(s, i);
      c && ((currentSortIndex = sortIndexOf(c)), (o = !0));
    }
    for (let c of s)
      c.addEventListener("click", () => onSortItemClick(c, e, t));
  }
  syncSortUI();
}
export function resetSortOnPopState(e) {
  if (!sortInitialized) return;
  ((primarySortIndex = e),
    (currentSortIndex = readSortFromURL() || e),
    syncSortUI());
}
