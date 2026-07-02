// core/config — split from app.carved.js (see docs/MODULE-MAP.md)
import algoliasearchFactory from "algoliasearch";
var clientSingleton = null;
export function initClient(e) {
  return (
    clientSingleton ||
      (clientSingleton = algoliasearchFactory(e.appId, e.searchKey)),
    clientSingleton
  );
}
var TAG_NAME_RE = /^[a-z][a-z0-9-]*$/;
export function initConfig() {
  let e = document.querySelector("script[data-app-id]");
  if (!e)
    throw new Error("[wf-algolia] Script tag missing data-app-id attribute");
  let t = e.getAttribute("data-app-id");
  t &&
    console.log(
      `%c[wf-algolia] Script initialized with App ID: ${t} at ${new Date().toISOString()}`,
      "font-size:1.5em; font-weight:bold; color:#76B900;",
    );
  let n = e.getAttribute("data-app-id"),
    r = e.getAttribute("data-search-key");
  if (!n || !r)
    throw new Error(
      "[wf-algolia] data-app-id and data-search-key are required",
    );
  let i = e.getAttribute("data-highlight-tag") || "mark",
    o = TAG_NAME_RE.test(i) ? i : "mark";
  return {
    appId: n,
    searchKey: r,
    insights: e.getAttribute("data-insights") === "true",
    insightsCookie: e.getAttribute("data-insights-cookie") === "true",
    debounce: parseInt(e.getAttribute("data-debounce") || "250"),
    autocompleteDebounce: parseInt(
      e.getAttribute("data-autocomplete-debounce") ||
        e.getAttribute("data-debounce") ||
        "150",
    ),
    highlightTag: o,
    snippetWords: (() => {
      let l = e.getAttribute("data-snippet-words");
      if (l === null) return 30;
      let s = parseInt(l, 10);
      return Number.isNaN(s) ? 30 : Math.max(1, s);
    })(),
    snippetAttrs: e.getAttribute("data-snippet-attrs") || "*",
    activeClass: e.getAttribute("data-activeclass") || "is-active",
    hideClass: e.getAttribute("data-hideclass") || "is-hidden",
  };
}
