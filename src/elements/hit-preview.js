// elements/hit-preview — split from app.carved.js (see docs/MODULE-MAP.md)
import { getTemplateParent } from "../core/attributes.js";
var warnedPreviewNoField = new WeakSet(),
  warnedPreviewNoValue = new WeakSet(),
  warnedPreviewNoTemplate = new WeakSet(),
  warnedPreviewInBrowse = new WeakSet(),
  warnedPreviewHasFilterTemplate = new WeakSet(),
  warnedDuplicatePair = new WeakSet(),
  warnedZeroHits = new WeakSet(),
  warnedScopeFacetNoField = new WeakSet(),
  warnedUnresolvedScopeValue = new WeakSet(),
  renderedPairKeys = new Map();
function resolvePreviewFieldValue(e) {
  let t = e.getAttribute("wf-algolia-field"),
    n = e.getAttribute("wf-algolia-value"),
    r = null,
    i = null,
    o = null,
    l = !0;
  (!t || !n) &&
    ((r = e.closest('[wf-algolia-element="scope-facet"]')),
    r &&
      ((i = r.getAttribute("wf-algolia-field")),
      (o = r.getAttribute("wf-algolia-value")),
      (l = i !== null && i !== "")));
  let s = !1;
  if (!t && !i) {
    let c = e.closest('[wf-algolia-element="filter-item"]');
    if (c) {
      let m = c.closest('[wf-algolia-element="filter-group"]'),
        g =
          m?.getAttribute("wf-algolia-facet") ??
          m?.getAttribute("wf-algolia-field") ??
          null,
        u = c.getAttribute("wf-algolia-value");
      (g && (i = g), !n && !o && u !== null && (o = u), (s = g !== null));
    }
  } else if (!n && !o) {
    let m =
      e
        .closest('[wf-algolia-element="filter-item"]')
        ?.getAttribute("wf-algolia-value") ?? null;
    m !== null && (o = m);
  }
  return (
    s && r === null && (l = !0),
    {
      field: t || i || null,
      value: n || o || null,
      scopeFacetEl: r,
      scopeFacetHasField: l,
    }
  );
}
function resolvePreviewIndex(e) {
  let t = e.getAttribute("wf-algolia-index");
  if (t) return t;
  let n = e.closest("[wf-algolia-index]");
  if (n && n !== e) {
    let o = n.getAttribute("wf-algolia-index");
    if (o) return o;
  }
  return (
    document.querySelector("script[data-app-id]")?.getAttribute("data-index") ||
    ""
  );
}
function findPreviewTemplate(e) {
  let t =
    "[wf-algolia-text], [wf-algolia-image], [wf-algolia-hit-link-template]";
  for (let n of Array.from(e.children)) {
    let r = n;
    if (r.matches(t) || r.querySelector(t)) return r;
  }
  return null;
}
function fillLinkTemplate(e, t) {
  return e.replace(/\{([a-zA-Z0-9_.-]+)\}/g, (n, r) => {
    let i = t[r];
    return i == null ? "" : String(i);
  });
}
function populatePreviewCard(e, t) {
  (e.querySelectorAll("[wf-algolia-text]").forEach((r) => {
    let i = r.getAttribute("wf-algolia-text");
    if (!i) return;
    let o = t[i];
    r.textContent = o == null ? "" : String(o);
  }),
    e.querySelectorAll("[wf-algolia-image]").forEach((r) => {
      let i = r.getAttribute("wf-algolia-image");
      if (!i) return;
      let o = t[i];
      (r.removeAttribute("srcset"),
        r.removeAttribute("data-src"),
        r.removeAttribute("data-srcset"),
        (r.src = o == null ? "" : String(o)));
    }));
  let n = [];
  (e.hasAttribute("wf-algolia-hit-link-template") && n.push(e),
    e
      .querySelectorAll("[wf-algolia-hit-link-template]")
      .forEach((r) => n.push(r)));
  for (let r of n) {
    let i = r.getAttribute("wf-algolia-hit-link-template");
    if (!i) continue;
    let o = fillLinkTemplate(i, t);
    r instanceof HTMLAnchorElement
      ? r.setAttribute("href", o)
      : r.setAttribute("data-wf-algolia-href", o);
  }
}
function isInsideHitPreview(e) {
  return e ? e.closest('[wf-algolia-element="hit-preview"]') !== null : !1;
}
var clickTrapInstalled = !1;
function installClickTrap() {
  clickTrapInstalled ||
    ((clickTrapInstalled = !0),
    document.addEventListener(
      "click",
      (e) => {
        let t = e.target;
        isInsideHitPreview(t) && e.stopPropagation();
      },
      !0,
    ));
}
var PREVIEW_BATCH_SIZE = 50;
function chunkQueries(e, t) {
  let n = [];
  for (let r = 0; r < e.length; r += t) n.push(e.slice(r, r + t));
  return n;
}
async function batchedPreviewFetch(e, t, n) {
  let r = t.map((s) => ({
      indexName: s.indexName,
      query: "",
      params: {
        facetFilters: [[`${s.field}:${s.value}`]],
        hitsPerPage: s.hitsPerPreview,
      },
    })),
    i = chunkQueries(r, PREVIEW_BATCH_SIZE),
    o = await Promise.all(
      i.map(async (s) => {
        try {
          return (await e.multipleQueries(s)).results;
        } catch (c) {
          return (
            console.error(`[wf-algolia] ${n} batched fetch failed:`, c),
            null
          );
        }
      }),
    ),
    l = [];
  return (
    o.forEach((s, c) => {
      let m = i[c];
      for (let g = 0; g < m.length; g++)
        l.push(
          s === null
            ? null
            : (s[g] ?? {
                hits: [],
              }),
        );
    }),
    l
  );
}
export async function initHitPreviews(e, t) {
  let n = t.get("hit-preview") ?? [];
  if (n.length === 0) return;
  installClickTrap();
  let r = new Set();
  (t.get("filter-template") ?? []).forEach((c) => {
    let m = getTemplateParent(c);
    m && r.add(m);
  });
  let i = Array.from(
      document.querySelectorAll('[wf-algolia-element="filter-template"]'),
    ),
    o = [],
    l = new Map();
  for (let c of n) {
    if (!c.isConnected) continue;
    let m = resolvePreviewFieldValue(c);
    if (m.scopeFacetEl && !m.scopeFacetHasField) {
      let C = m.scopeFacetEl;
      warnedScopeFacetNoField.has(C) ||
        (warnedScopeFacetNoField.add(C),
        console.error(
          "[wf-algolia] scope-facet ancestor is missing required wf-algolia-field attribute.",
          C,
        ));
      continue;
    }
    let { field: g, value: u, scopeFacetEl: h } = m;
    if (!g) {
      warnedPreviewNoField.has(c) ||
        (warnedPreviewNoField.add(c),
        console.error(
          "[wf-algolia] hit-preview is missing required wf-algolia-field attribute.",
          c,
        ));
      continue;
    }
    if (!u) {
      if (h) {
        warnedUnresolvedScopeValue.has(c) ||
          (warnedUnresolvedScopeValue.add(c),
          console.warn(
            "[wf-algolia] hit-preview scope-facet value is unresolved at init \u2014 will render once the parent (standalone-filter-groups) populates the wf-algolia-value attribute.",
            c,
          ));
        continue;
      }
      warnedPreviewNoValue.has(c) ||
        (warnedPreviewNoValue.add(c),
        console.error(
          "[wf-algolia] hit-preview is missing required wf-algolia-value attribute.",
          c,
        ));
      continue;
    }
    let y = c.closest('[wf-algolia-element="browse"]');
    if (y && y !== c) {
      warnedPreviewInBrowse.has(c) ||
        (warnedPreviewInBrowse.add(c),
        console.error(
          '[wf-algolia] hit-preview cannot be nested inside a wf-algolia-element="browse" container.',
          c,
        ));
      continue;
    }
    let b = i.some((C) => C !== c && c.contains(C)),
      w = Array.from(r).some((C) => C !== c && c.contains(C));
    if (b || w) {
      warnedPreviewHasFilterTemplate.has(c) ||
        (warnedPreviewHasFilterTemplate.add(c),
        console.error(
          '[wf-algolia] hit-preview cannot contain a wf-algolia-element="filter-template" descendant.',
          c,
        ));
      continue;
    }
    let E = findPreviewTemplate(c);
    if (!E) {
      warnedPreviewNoTemplate.has(c) ||
        (warnedPreviewNoTemplate.add(c),
        console.error(
          "[wf-algolia] hit-preview has no card template \u2014 add at least one descendant with wf-algolia-text, wf-algolia-image, or wf-algolia-hit-link-template.",
          c,
        ));
      continue;
    }
    let T = c.getAttribute("wf-algolia-hits-per-preview"),
      k = 3;
    if (T !== null) {
      let C = parseInt(T, 10);
      !Number.isNaN(C) && C > 0 && (k = C);
    }
    let D = resolvePreviewIndex(c),
      K = `${g}::${u}`;
    (l.has(K)
      ? warnedDuplicatePair.has(c) ||
        (warnedDuplicatePair.add(c),
        console.warn(
          `[wf-algolia] hit-preview duplicate (field, value) pair "${g}=${u}" \u2014 multiple previews share the same filter.`,
          c,
        ))
      : l.set(K, c),
      o.push({
        el: c,
        field: g,
        value: u,
        hitsPerPreview: k,
        indexName: D,
        template: E,
      }));
  }
  if (o.length === 0) return;
  let s = await batchedPreviewFetch(e, o, "hit-preview");
  o.forEach((c, m) => {
    let g = s[m];
    if (g == null) return;
    let u = g.hits ?? [];
    if (u.length === 0) {
      (warnedZeroHits.has(c.el) ||
        (warnedZeroHits.add(c.el),
        console.warn(
          `[wf-algolia] hit-preview returned zero hits for "${c.field}=${c.value}".`,
          c.el,
        )),
        (c.template.style.display = "none"),
        renderedPairKeys.set(c.el, previewKey(c)));
      return;
    }
    let h = c.template.parentElement ?? c.el,
      y = document.createDocumentFragment();
    for (let b of u) {
      let w = c.template.cloneNode(!0);
      (w.setAttribute("data-wf-algolia-hit-preview", "true"),
        w.classList.add("wf-algolia-injected"),
        (w.style.display = ""),
        populatePreviewCard(w, b),
        y.appendChild(w));
    }
    (h.appendChild(y),
      (c.template.style.display = "none"),
      renderedPairKeys.set(c.el, previewKey(c)));
  });
}
function previewKey(e) {
  return `${e.indexName}::${e.field}::${e.value}::${e.hitsPerPreview}`;
}
function clearPreviewCards(e) {
  e.querySelectorAll('[data-wf-algolia-hit-preview="true"]').forEach((t) =>
    t.remove(),
  );
}
export async function refreshHitPreviews(e) {
  let t = Array.from(
    document.querySelectorAll('[wf-algolia-element="hit-preview"]'),
  );
  if (t.length === 0) return;
  let n = [];
  for (let i of t) {
    let o = resolvePreviewFieldValue(i);
    if (o.scopeFacetEl && !o.scopeFacetHasField) {
      let b = o.scopeFacetEl;
      warnedScopeFacetNoField.has(b) ||
        (warnedScopeFacetNoField.add(b),
        console.error(
          "[wf-algolia] scope-facet ancestor is missing required wf-algolia-field attribute.",
          b,
        ));
      continue;
    }
    let { field: l, value: s, scopeFacetEl: c } = o;
    if (!l) continue;
    if (!s) {
      c &&
        (warnedUnresolvedScopeValue.has(i) ||
          (warnedUnresolvedScopeValue.add(i),
          console.warn(
            "[wf-algolia] hit-preview scope-facet value is unresolved at refresh \u2014 skipping render.",
            i,
          )));
      continue;
    }
    let m = findPreviewTemplate(i);
    if (!m) continue;
    let g = i.getAttribute("wf-algolia-hits-per-preview"),
      u = 3;
    if (g !== null) {
      let b = parseInt(g, 10);
      !Number.isNaN(b) && b > 0 && (u = b);
    }
    let h = resolvePreviewIndex(i),
      y = previewKey({
        indexName: h,
        field: l,
        value: s,
        hitsPerPreview: u,
      });
    renderedPairKeys.get(i) !== y &&
      n.push({
        el: i,
        field: l,
        value: s,
        hitsPerPreview: u,
        indexName: h,
        template: m,
        pairKey: y,
      });
  }
  if (n.length === 0) return;
  let r = await batchedPreviewFetch(e, n, "hit-preview refresh");
  n.forEach((i, o) => {
    let l = r[o];
    if (l == null) return;
    let s = l.hits ?? [];
    if ((clearPreviewCards(i.el), s.length === 0)) {
      (warnedZeroHits.has(i.el) ||
        (warnedZeroHits.add(i.el),
        console.warn(
          `[wf-algolia] hit-preview returned zero hits for "${i.field}=${i.value}".`,
          i.el,
        )),
        (i.template.style.display = "none"),
        renderedPairKeys.set(i.el, i.pairKey));
      return;
    }
    let c = i.template.parentElement ?? i.el,
      m = document.createDocumentFragment();
    for (let g of s) {
      let u = i.template.cloneNode(!0);
      (u.setAttribute("data-wf-algolia-hit-preview", "true"),
        u.classList.add("wf-algolia-injected"),
        (u.style.display = ""),
        populatePreviewCard(u, g),
        m.appendChild(u));
    }
    (c.appendChild(m),
      (i.template.style.display = "none"),
      renderedPairKeys.set(i.el, i.pairKey));
  });
}
