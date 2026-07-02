// filters/filter-tags — split from app.carved.js (see docs/MODULE-MAP.md)
import { getTextTemplate, interpolate } from "../utils/format.js";
import { STAGING_STATE } from "../core/filter-state.js";
import { formatFacetLabel, getLabelMode } from "./hierarchy.js";
import { getFieldOrFacet } from "./filter-group.js";
import { syncFilterDOM } from "../actions/filter-actions.js";
import { removeInjected } from "../render/template.js";
import { findTemplateFor, getTemplateParent } from "../core/attributes.js";
var warnedNoChipTemplate = new WeakSet();
export function renderFilterTags(e, t, n) {
  let r = document.querySelector('[wf-algolia-element="filter-tag-wrapper"]');
  if (!r) return;
  let i = findTemplateFor(r, t, "filter-tag-template");
  if (!i) {
    Object.keys(e).length > 0 &&
      !warnedNoChipTemplate.has(r) &&
      (warnedNoChipTemplate.add(r),
      console.warn(
        '[wf-algolia] active filter detected but no [wf-algolia-element="filter-tag-template"] in DOM. Chips will not render. See https://wf-algolia-docs.candidleap.com/filters/dynamic-filters',
        r,
      ));
    return;
  }
  removeInjected(r);
  let o = getTemplateParent(i) ?? r,
    l = parseReplaceFieldMap(r);
  Object.entries(e).forEach(([s, c]) => {
    if (c.values && c.values.size > 0)
      c.values.forEach((m) => {
        let g = buildValueChip(i, s, m, c, e, n, l);
        o.appendChild(g);
      });
    else if (c.min !== void 0 && c.max !== void 0) {
      let m = buildRangeChip(i, s, c, e, n, l);
      o.appendChild(m);
    }
  });
}
function buildValueChip(e, t, n, r, i, o, l) {
  let s = cloneChip(e),
    c = getFieldPrefixSuffix(t),
    m = s.querySelector('[wf-algolia-element="filter-tag-text"]');
  if (m) {
    let u = formatFacetLabel(n, getLabelMode(m)),
      h = getTextTemplate(m, "{value}");
    m.textContent = interpolate(h, {
      field: fieldDisplayName(l, t),
      value: `${c.prefix}${u}${c.suffix}`,
    });
  }
  let g = s.querySelector('[wf-algolia-element="filter-tag-remove"]');
  return (
    g &&
      g.addEventListener("click", (u) => {
        (u.stopPropagation(),
          r.values.delete(n),
          r.values.size === 0 && delete i[t],
          delete STAGING_STATE[t],
          syncFilterDOM(i),
          o());
      }),
    s
  );
}
function fieldDisplayName(e, t) {
  let n = e?.[t];
  return typeof n == "string" ? n : t;
}
function parseReplaceFieldMap(e) {
  let t = e.getAttribute("wf-algolia-replace-field");
  if (!t) return null;
  try {
    return JSON.parse(t);
  } catch {}
  try {
    return JSON.parse(t.replace(/'/g, '"'));
  } catch {
    return (
      console.error(
        "[wf-algolia] invalid wf-algolia-replace-field JSON on filter-tag-wrapper; rendering raw field names",
        e,
      ),
      null
    );
  }
}
function getFieldPrefixSuffix(e) {
  let t = typeof CSS < "u" && CSS.escape ? CSS.escape(e) : e,
    n = document.querySelector(
      `[wf-algolia-element="filter-group"][wf-algolia-field="${t}"]`,
    );
  return {
    prefix: n?.getAttribute("wf-algolia-prefix") ?? "",
    suffix: n?.getAttribute("wf-algolia-suffix") ?? "",
  };
}
function buildRangeChip(e, t, n, r, i, o) {
  let l = cloneChip(e),
    s = n.min,
    c = n.max,
    m = getFieldPrefixSuffix(t),
    g = `${m.prefix}${s}${m.suffix}`,
    u = `${m.prefix}${c}${m.suffix}`,
    h = l.querySelector('[wf-algolia-element="filter-tag-text"]');
  if (h) {
    let b = getTextTemplate(h, "{min} \u2013 {max}");
    h.textContent = interpolate(b, {
      field: fieldDisplayName(o, t),
      min: g,
      max: u,
      value: `${g} \u2013 ${u}`,
    });
  }
  let y = l.querySelector('[wf-algolia-element="filter-tag-remove"]');
  return (
    y &&
      y.addEventListener("click", (b) => {
        (b.stopPropagation(),
          delete r[t],
          delete STAGING_STATE[t],
          document
            .querySelectorAll('[wf-algolia-element="filter-group"]')
            .forEach((w) => {
              if (getFieldOrFacet(w) !== t) return;
              let E = w.querySelector('[wf-algolia-element="range-min"]'),
                T = w.querySelector('[wf-algolia-element="range-max"]');
              (E && (E.value = E.defaultValue),
                T && (T.value = T.defaultValue));
            }),
          i());
      }),
    l
  );
}
function cloneChip(e) {
  let t = e.cloneNode(!0);
  return (
    (t.style.display = ""),
    t.removeAttribute("wf-algolia-element"),
    t.classList.add("wf-algolia-injected"),
    t
  );
}
