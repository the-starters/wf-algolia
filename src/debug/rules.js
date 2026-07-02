// debug/rules — split from app.carved.js (see docs/MODULE-MAP.md)
var TEMPLATE_ROLES = [
    "filter-template",
    "template",
    "filter-tag-template",
    "autocomplete-template",
  ],
  SLOT_ROLES = ["filter-value-text", "filter-count"];
function resolveFieldScope(e) {
  let t =
    e.getAttribute("wf-algolia-field") || e.getAttribute("wf-algolia-facet");
  if (t) return t;
  let n = e.closest("[wf-algolia-field], [wf-algolia-facet]");
  return !n || n === e
    ? null
    : n.getAttribute("wf-algolia-field") ||
        n.getAttribute("wf-algolia-facet") ||
        null;
}
function collectFilterGroups(e) {
  let t = [];
  return (
    e.querySelectorAll('[wf-algolia-element="filter-group"]').forEach((n) => {
      let r =
        n.getAttribute("wf-algolia-field") ||
        n.getAttribute("wf-algolia-facet");
      r &&
        t.push({
          el: n,
          field: r,
        });
    }),
    t
  );
}
function makeIssue(e, t, n, r, i) {
  return {
    ruleId: e,
    severity: t,
    element: n,
    message: r,
    fix: i,
  };
}
export var ruleFilterItemOrphan = (e) => {
    let t = [];
    return (
      e.querySelectorAll('[wf-algolia-element="filter-item"]').forEach((n) => {
        resolveFieldScope(n) ||
          t.push(
            makeIssue(
              "filter-item-orphan",
              "error",
              n,
              "filter-item has no resolvable filter scope.",
              'Wrap in a `wf-algolia-field="\u2026"` container or add `wf-algolia-field="\u2026"` to the item.',
            ),
          );
      }),
      t
    );
  },
  ruleFilterGroupMissingField = (e) => {
    let t = [];
    return (
      e.querySelectorAll('[wf-algolia-element="filter-group"]').forEach((n) => {
        n.getAttribute("wf-algolia-field") ||
          n.getAttribute("wf-algolia-facet") ||
          t.push(
            makeIssue(
              "filter-group-missing-field",
              "error",
              n,
              "filter-group is missing the field it controls.",
              'Add `wf-algolia-field="<facet>"` (or `wf-algolia-facet` for dynamic groups).',
            ),
          );
      }),
      t
    );
  },
  ruleFilterSearchOrphan = (e) => {
    let t = [];
    return (
      e
        .querySelectorAll('[wf-algolia-element="filter-search"]')
        .forEach((n) => {
          resolveFieldScope(n) ||
            t.push(
              makeIssue(
                "filter-search-orphan",
                "error",
                n,
                "filter-search input has no resolvable filter scope.",
                'Place inside a `wf-algolia-field="\u2026"` wrapper or add `wf-algolia-field="\u2026"` to the input.',
              ),
            );
        }),
      t
    );
  },
  ruleFilterSearchResultsOrphan = (e) => {
    let t = [];
    return (
      e
        .querySelectorAll('[wf-algolia-element="filter-search-results"]')
        .forEach((n) => {
          let r = resolveFieldScope(n);
          if (!r) {
            t.push(
              makeIssue(
                "filter-search-results-orphan",
                "error",
                n,
                "filter-search-results has no resolvable filter scope.",
                'Place inside the same `wf-algolia-field="\u2026"` wrapper as the matching filter-search input.',
              ),
            );
            return;
          }
          Array.from(
            e.querySelectorAll('[wf-algolia-element="filter-search"]'),
          ).filter((o) => resolveFieldScope(o) === r).length === 0 &&
            t.push(
              makeIssue(
                "filter-search-results-orphan",
                "error",
                n,
                `filter-search-results for field "${r}" has no matching filter-search input on the page.`,
                'Add a `wf-algolia-element="filter-search"` input inside the same field wrapper.',
              ),
            );
        }),
      t
    );
  },
  ruleDuplicateFieldWrapper = (e) => {
    let t = [],
      n = new Map();
    return (
      collectFilterGroups(e).forEach(({ el: r, field: i }) => {
        n.get(i)
          ? t.push(
              makeIssue(
                "duplicate-filter-field-wrapper",
                "error",
                r,
                `Another filter-group on this page already declares field "${i}".`,
                "Merge into one filter-group, or rename one of the fields.",
              ),
            )
          : n.set(i, r);
      }),
      t
    );
  },
  ruleTemplateNotDirectChild = (e) => {
    let t = [];
    return (
      e
        .querySelectorAll('[wf-algolia-element="filter-template"]')
        .forEach((n) => {
          let r = n.parentElement;
          r &&
            r.getAttribute("wf-algolia-element") !== "filter-group" &&
            t.push(
              makeIssue(
                "filter-template-not-direct-child",
                "error",
                n,
                "filter-template is not a direct child of its filter-group.",
                "Move the template up one level so it is a direct child of the filter-group.",
              ),
            );
        }),
      t
    );
  },
  ruleFieldButNoRole = (e) => {
    let t = [];
    return (
      e.querySelectorAll("[wf-algolia-field]").forEach((n) => {
        n.hasAttribute("wf-algolia-element") ||
          n.querySelector("[wf-algolia-element]") ||
          t.push(
            makeIssue(
              "field-but-no-role",
              "warn",
              n,
              "Element has `wf-algolia-field` but no `wf-algolia-element` role.",
              "Either remove the field attribute (if unused) or add the role you intended.",
            ),
          );
      }),
      t
    );
  },
  ruleRoleButNoField = (e) => {
    let t = [],
      n = new Set([
        "filter-group",
        "filter-item",
        "filter-search",
        "filter-search-results",
        "filter-template",
      ]);
    return (
      e.querySelectorAll("[wf-algolia-element]").forEach((r) => {
        let i = r.getAttribute("wf-algolia-element");
        n.has(i) &&
          i !== "filter-template" &&
          i !== "filter-group" &&
          (resolveFieldScope(r) ||
            t.push(
              makeIssue(
                "role-but-no-field",
                "warn",
                r,
                `Element role "${i}" resolves to no field.`,
                'Wrap in a `wf-algolia-field="\u2026"` container or add the field attribute directly.',
              ),
            ));
      }),
      t
    );
  },
  ruleConflictingType = (e) => {
    let t = [];
    return (
      e
        .querySelectorAll(
          '[wf-algolia-element="filter-group"][wf-algolia-type]',
        )
        .forEach((n) => {
          let r = n.getAttribute("wf-algolia-type");
          if (r !== "checkbox" && r !== "radio") return;
          let i = Array.from(
            n.querySelectorAll('[wf-algolia-element="filter-item"]'),
          );
          if (i.length === 0) return;
          let o = i.filter((c) => !!c.querySelector('input[type="radio"]')),
            l = i.filter((c) => !!c.querySelector('input[type="checkbox"]'));
          if (o.length === 0 && l.length === 0) return;
          let s = (c) =>
            (c === "radio" ? o.length : l.length) === i.length &&
            (c === "radio" ? l.length : o.length) === 0;
          (r === "checkbox" &&
            s("radio") &&
            t.push(
              makeIssue(
                "conflicting-type",
                "warn",
                n,
                'filter-group declares type="checkbox" but every filter-item contains a radio input.',
                'Set `wf-algolia-type="radio"` (or change the inputs to checkboxes).',
              ),
            ),
            r === "radio" &&
              s("checkbox") &&
              t.push(
                makeIssue(
                  "conflicting-type",
                  "warn",
                  n,
                  'filter-group declares type="radio" but every filter-item contains a checkbox input.',
                  'Set `wf-algolia-type="checkbox"` (or change the inputs to radios).',
                ),
              ));
        }),
      t
    );
  },
  ruleHitPreviewNestedInBrowse = (e) => {
    let t = [];
    return (
      e.querySelectorAll('[wf-algolia-element="hit-preview"]').forEach((n) => {
        n.closest('[wf-algolia-element="browse"]') &&
          t.push(
            makeIssue(
              "hit-preview-nested-in-browse",
              "error",
              n,
              "hit-preview is nested inside a browse element.",
              "Move hit-preview outside the browse wrapper.",
            ),
          );
      }),
      t
    );
  },
  ruleHitPreviewNoTemplate = (e) => {
    let t = [];
    return (
      e.querySelectorAll('[wf-algolia-element="hit-preview"]').forEach((n) => {
        n.querySelector(
          "[wf-algolia-text], [wf-algolia-image], [wf-algolia-hit-link-template]",
        ) ||
          t.push(
            makeIssue(
              "hit-preview-no-template",
              "error",
              n,
              "hit-preview has no descendant carrying a bind attribute.",
              "Add a child with `wf-algolia-text` / `wf-algolia-image` / `wf-algolia-hit-link-template`.",
            ),
          );
      }),
      t
    );
  },
  ruleHitPreviewMissingFieldValue = (e) => {
    let t = [];
    return (
      e.querySelectorAll('[wf-algolia-element="hit-preview"]').forEach((n) => {
        (n.hasAttribute("wf-algolia-field") &&
          n.hasAttribute("wf-algolia-value")) ||
          n.closest('[wf-algolia-element="scope-facet"]') ||
          n.closest('[wf-algolia-element="filter-item"]') ||
          t.push(
            makeIssue(
              "hit-preview-missing-field-value",
              "error",
              n,
              "hit-preview has no own (field, value) pair and no scope-facet / filter-item ancestor.",
              "Add `wf-algolia-field` + `wf-algolia-value`, or wrap in a `scope-facet`.",
            ),
          );
      }),
      t
    );
  },
  ruleRefinesTargetMissing = (e) => {
    let t = [],
      n = new Set();
    return (
      e.querySelectorAll("[wf-algolia-group-id]").forEach((r) => {
        let i = r.getAttribute("wf-algolia-group-id");
        i && n.add(i);
      }),
      e.querySelectorAll("[wf-algolia-refines]").forEach((r) => {
        let i = r.getAttribute("wf-algolia-refines");
        i &&
          (n.has(i) ||
            t.push(
              makeIssue(
                "refines-target-missing",
                "error",
                r,
                `wf-algolia-refines="${i}" points at a group-id that does not exist on this page.`,
                "Add the parent group with the matching `wf-algolia-group-id`, or fix the refines value.",
              ),
            ));
      }),
      t
    );
  },
  ruleDuplicateGroupId = (e) => {
    let t = [],
      n = new Map();
    return (
      e.querySelectorAll("[wf-algolia-group-id]").forEach((r) => {
        let i = r.getAttribute("wf-algolia-group-id");
        if (!i) return;
        n.get(i)
          ? t.push(
              makeIssue(
                "duplicate-group-id",
                "error",
                r,
                `Another element on this page already declares wf-algolia-group-id="${i}".`,
                "Rename one of the duplicate group ids.",
              ),
            )
          : n.set(i, r);
      }),
      t
    );
  },
  ruleCascadeCollision = (e) => {
    let t = [],
      n = e instanceof Document ? e : (e.ownerDocument ?? null);
    return (
      n &&
        [n.body, n.documentElement].forEach((i) => {
          i &&
            i.hasAttribute("wf-algolia-index") &&
            t.push(
              makeIssue(
                "cascade-collision",
                "warn",
                i,
                "`wf-algolia-index` is set on <body> or <html>, overriding every Browse / Detail / Search on the page.",
                "Move the index attribute to a smaller ancestor that scopes only the relevant section.",
              ),
            );
        }),
      t
    );
  },
  ruleDataAlgoliaOnCanvas = (e) => {
    let t = [];
    return (
      e.querySelectorAll("*").forEach((n) => {
        if (n.tagName.toLowerCase() !== "script") {
          for (let r of Array.from(n.attributes))
            if (r.name.startsWith("data-algolia-")) {
              t.push(
                makeIssue(
                  "data-asterisk-on-canvas",
                  "error",
                  n,
                  `Canvas element has \`${r.name}\` \u2014 canvas uses the \`wf-algolia-*\` namespace.`,
                  `Rename \`${r.name}\` to \`wf-${r.name.slice(5)}\`.`,
                ),
              );
              return;
            }
        }
      }),
      t
    );
  },
  ruleWfAlgoliaOnScriptTag = (e) => {
    let t = [];
    return (
      e.querySelectorAll("script").forEach((n) => {
        for (let r of Array.from(n.attributes))
          if (r.name.startsWith("wf-algolia-")) {
            t.push(
              makeIssue(
                "wf-algolia-on-script-tag",
                "error",
                n,
                `<script> tag has \`${r.name}\` \u2014 script-tag attributes use the \`data-*\` namespace.`,
                `Rename \`${r.name}\` to \`data-${r.name.slice(11)}\`.`,
              ),
            );
            return;
          }
      }),
      t
    );
  },
  ruleTemplateNotHidden = (e) => {
    let t = [];
    return (
      TEMPLATE_ROLES.forEach((n) => {
        e.querySelectorAll(`[wf-algolia-element="${n}"]`).forEach((r) => {
          r.hasAttribute("hidden") ||
            (r.style && r.style.display === "none") ||
            t.push(
              makeIssue(
                "template-not-hidden",
                "warn",
                r,
                `Template element (${n}) is not hidden \u2014 visitors may briefly see the prototype.`,
                "Set Display: None on the template in the Designer Style panel (or add the `hidden` attribute).",
              ),
            );
        });
      }),
      t
    );
  },
  ruleSlotWithoutTemplateParent = (e) => {
    let t = [];
    return (
      SLOT_ROLES.forEach((n) => {
        e.querySelectorAll(`[wf-algolia-element="${n}"]`).forEach((r) => {
          let i = TEMPLATE_ROLES.map((o) => `[wf-algolia-element="${o}"]`).join(
            ", ",
          );
          r.closest(i) ||
            t.push(
              makeIssue(
                "slot-without-template-parent",
                "warn",
                r,
                `Slot role "${n}" is not inside any template element.`,
                "Move into a template (filter-template / template / filter-tag-template / autocomplete-template).",
              ),
            );
        });
      }),
      t
    );
  },
  ruleFieldPointerUndefined = (e) => {
    let t = [],
      n = new Set(collectFilterGroups(e).map((r) => r.field));
    return (
      e.querySelectorAll("[wf-algolia-field]").forEach((r) => {
        if (r.getAttribute("wf-algolia-element") === "filter-group") return;
        let i = r.getAttribute("wf-algolia-field");
        if (!i) return;
        let o = r.closest('[wf-algolia-element="filter-group"]');
        (o &&
          (o.getAttribute("wf-algolia-field") === i ||
            o.getAttribute("wf-algolia-facet") === i)) ||
          n.has(i) ||
          t.push(
            makeIssue(
              "field-pointer-to-undefined-filter",
              "error",
              r,
              `Element points at field "${i}" but no filter-group on this page declares that field.`,
              "Either author the filter-group, or fix the field pointer.",
            ),
          );
      }),
      t
    );
  },
  ruleDuplicateFieldPointer = (e) => {
    let t = [],
      n = new Map();
    return (
      e
        .querySelectorAll("[wf-algolia-field][wf-algolia-element]")
        .forEach((r) => {
          let i = r.getAttribute("wf-algolia-element"),
            o = r.getAttribute("wf-algolia-field");
          if (!i || !o) return;
          let l = r.closest('[wf-algolia-element="filter-group"]');
          if (
            (l &&
              (l.getAttribute("wf-algolia-field") === o ||
                l.getAttribute("wf-algolia-facet") === o)) ||
            i === "filter-group"
          )
            return;
          let s = `${i}::${o}`;
          n.get(s)
            ? t.push(
                makeIssue(
                  "duplicate-field-pointer-same-role",
                  "warn",
                  r,
                  `Another cross-scope element on this page already declares role="${i}" + field="${o}".`,
                  "Confirm intentional; otherwise remove the duplicate.",
                ),
              )
            : n.set(s, r);
        }),
      t
    );
  },
  ALL_RULES = [
    ruleFilterItemOrphan,
    ruleFilterGroupMissingField,
    ruleFilterSearchOrphan,
    ruleFilterSearchResultsOrphan,
    ruleDuplicateFieldWrapper,
    ruleTemplateNotDirectChild,
    ruleFieldButNoRole,
    ruleRoleButNoField,
    ruleConflictingType,
    ruleHitPreviewNestedInBrowse,
    ruleHitPreviewNoTemplate,
    ruleHitPreviewMissingFieldValue,
    ruleRefinesTargetMissing,
    ruleDuplicateGroupId,
    ruleCascadeCollision,
    ruleDataAlgoliaOnCanvas,
    ruleWfAlgoliaOnScriptTag,
    ruleTemplateNotHidden,
    ruleSlotWithoutTemplateParent,
    ruleFieldPointerUndefined,
    ruleDuplicateFieldPointer,
  ];
