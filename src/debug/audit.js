// debug/audit — split from app.carved.js (see docs/MODULE-MAP.md)
import { ALL_RULES } from "./rules.js";
function runAudit(e, t = ALL_RULES) {
  let n = [];
  for (let r of t) n.push(...r(e));
  return n;
}
var DEBUG_ATTR = "data-wf-algolia-debug",
  ISSUE_ATTR = "data-wf-algolia-issue",
  DEBUG_LOG_PREFIX = "[wf-algolia debug]";
function isDebugEnabled(e = document) {
  let t = e.querySelector(`script[${DEBUG_ATTR}]`);
  return t ? t.getAttribute(DEBUG_ATTR) === "true" : !1;
}
var OBSERVED_ATTRS = [
  "wf-algolia-element",
  "wf-algolia-field",
  "wf-algolia-facet",
  "wf-algolia-value",
  "wf-algolia-index",
  "wf-algolia-type",
  "wf-algolia-match",
  "wf-algolia-group-id",
  "wf-algolia-refines",
  "wf-algolia-text",
  "wf-algolia-image",
  "wf-algolia-hit-link-template",
];
function newSeenMap() {
  return new Map();
}
function alreadyReported(e, t) {
  let n = e.get(t.ruleId);
  return (
    n || ((n = new WeakSet()), e.set(t.ruleId, n)),
    n.has(t.element) ? !0 : (n.add(t.element), !1)
  );
}
function tagIssue(e, t) {
  let n = e.getAttribute(ISSUE_ATTR);
  if (!n) {
    e.setAttribute(ISSUE_ATTR, t);
    return;
  }
  let r = n.split(/\s+/).filter(Boolean);
  r.includes(t) || (r.push(t), e.setAttribute(ISSUE_ATTR, r.join(" ")));
}
function logIssue(e) {
  let t = `${DEBUG_LOG_PREFIX} ${e.ruleId}: ${e.message} \u2014 fix: ${e.fix}`;
  e.severity === "error"
    ? console.error(t, e.element)
    : console.warn(t, e.element);
}
function auditAndLog(e = document, t = newSeenMap(), n = ALL_RULES) {
  let r = runAudit(e, n),
    i = 0;
  for (let o of r)
    alreadyReported(t, o) ||
      (logIssue(o), tagIssue(o.element, o.ruleId), (i += 1));
  return {
    issues: r,
    newlyLogged: i,
  };
}
var debugStarted = !1,
  debugObserver = null;
export function initDebugAudit(e = document) {
  if (debugStarted || !isDebugEnabled(e)) return null;
  debugStarted = !0;
  let t = newSeenMap();
  auditAndLog(e, t);
  let n = !1,
    r = () => {
      if (n) return;
      ((n = !0),
        (typeof requestAnimationFrame < "u"
          ? requestAnimationFrame
          : (s) => setTimeout(() => s(0), 16))(() => {
          ((n = !1), auditAndLog(e, t));
        }));
    },
    i = new MutationObserver((l) => {
      for (let s of l) {
        if (s.type === "attributes") {
          r();
          return;
        }
        if (s.type === "childList")
          for (let c of [
            ...Array.from(s.addedNodes),
            ...Array.from(s.removedNodes),
          ]) {
            if (c.nodeType !== 1) continue;
            let m = c;
            if (
              m.hasAttribute?.("wf-algolia-element") ||
              m.hasAttribute?.("wf-algolia-field") ||
              m.hasAttribute?.("wf-algolia-facet") ||
              m.querySelector?.(
                "[wf-algolia-element], [wf-algolia-field], [wf-algolia-facet]",
              )
            ) {
              r();
              return;
            }
          }
      }
    }),
    o = e.body || e.documentElement;
  return (
    i.observe(o, {
      subtree: !0,
      childList: !0,
      attributes: !0,
      attributeFilter: OBSERVED_ATTRS,
    }),
    (debugObserver = i),
    i
  );
}
