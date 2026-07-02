// core/filter-state — split from app.carved.js (see docs/MODULE-MAP.md)
import { escapeFilterValue } from "../utils/misc.js";
export var FILTER_STATE = {},
  STAGING_STATE = {};
export function toggleStateValue(e, t, n, r, i, o) {
  (e[t] ||
    (e[t] = {
      type: o,
      match: i,
      values: new Set(),
    }),
    r
      ? e[t].values.add(n)
      : (e[t].values.delete(n), e[t].values.size === 0 && delete e[t]));
}
export function clearState(e) {
  Object.keys(e).forEach((t) => delete e[t]);
}
export function stageFilter(e, t) {
  STAGING_STATE[e] = t;
}
export function commitStaging(e) {
  let t = e && e.length > 0 ? e : Object.keys(STAGING_STATE);
  for (let n of t) {
    let r = STAGING_STATE[n];
    r !== void 0 && ((FILTER_STATE[n] = r), delete STAGING_STATE[n]);
  }
}
export function discardStaging(e) {
  if (!e || e.length === 0) {
    for (let t of Object.keys(STAGING_STATE)) delete STAGING_STATE[t];
    return;
  }
  for (let t of e) delete STAGING_STATE[t];
}
export function getEffectiveState() {
  return {
    ...FILTER_STATE,
    ...STAGING_STATE,
  };
}
export function stateToAlgoliaFilters(e) {
  let t = [],
    n = [];
  return (
    Object.entries(e).forEach(([r, i]) => {
      if (i.type === "checkbox" || i.type === "boolean") {
        if (!i.values || i.values.size === 0) return;
        i.match === "and"
          ? i.values.forEach((o) => t.push([`${r}:${escapeFilterValue(o)}`]))
          : t.push([...i.values].map((o) => `${r}:${escapeFilterValue(o)}`));
      }
      (i.type === "number" || i.type === "date") &&
        (i.min !== void 0 && n.push(`${r}>=${i.min}`),
        i.max !== void 0 && n.push(`${r}<=${i.max}`));
    }),
    {
      facetFilters: t,
      numericFilters: n,
    }
  );
}
