// insights/insights — split from app.carved.js (see docs/MODULE-MAP.md)
import wfAlgoliaInsights from "search-insights";
export var insights = wfAlgoliaInsights;
var insightsReady = !1,
  indexNameResolver = null;
export function setIndexNameResolver(e) {
  indexNameResolver = e;
}
function hasEventAttrAncestor(e) {
  let t = e instanceof Element ? e : e?.parentElement;
  return t ? !!t.closest("[wf-algolia-event], [wf-algolia-conversion]") : !1;
}
export function initInsights(e) {
  (insights("init", {
    appId: e.appId,
    apiKey: e.searchKey,
    useCookie: e.insightsCookie,
  }),
    (insightsReady = !0),
    (window.aa = insights),
    document.addEventListener("click", (t) => {
      let n = t.target.closest(".wf-algolia-injected");
      if (!n || hasEventAttrAncestor(t.target)) return;
      let r = n.dataset.wfAlgoliaHitObjectid,
        i = n.dataset.wfAlgoliaHitIndex,
        o = n.dataset.wfAlgoliaHitQueryid,
        l = parseInt(n.dataset.wfAlgoliaHitPosition || "0");
      !r ||
        !i ||
        trackClick({
          index: i,
          objectIDs: [r],
          queryID: o || void 0,
          positions: l > 0 ? [l] : void 0,
        });
    }),
    document.addEventListener("click", (t) => {
      let n = t.target;
      if (n.closest('[wf-algolia-element="hit-preview"]')) return;
      let r = n.closest('[wf-algolia-element="filter-item"]');
      if (!r) return;
      let i = r.closest('[wf-algolia-element="filter-group"]');
      if (!i) return;
      let o =
          i.getAttribute("wf-algolia-field") ||
          i.getAttribute("wf-algolia-facet"),
        l = r.getAttribute("wf-algolia-value"),
        s =
          i.closest("[wf-algolia-index]")?.getAttribute("wf-algolia-index") ||
          indexNameResolver?.() ||
          "";
      o &&
        l &&
        s &&
        insights("clickedFilters", {
          index: s,
          filters: [`${o}:${l}`],
          eventName: "Filter Clicked",
        });
    }),
    document.addEventListener("click", (t) => {
      let n = t.target.closest("[wf-algolia-event]");
      if (!n) return;
      let r = n.getAttribute("wf-algolia-event"),
        i = n.getAttribute("wf-algolia-event-name"),
        o = n.closest(".wf-algolia-injected") || n,
        l = o.dataset?.wfAlgoliaHitObjectid,
        s = o.dataset?.wfAlgoliaHitIndex,
        c = o.dataset?.wfAlgoliaHitQueryid;
      if (!(!l || !s))
        switch (r) {
          case "click":
            trackClick({
              index: s,
              objectIDs: [l],
              queryID: c || void 0,
              eventName: i || void 0,
            });
            break;
          case "conversion":
            trackConversion({
              index: s,
              objectIDs: [l],
              queryID: c || void 0,
              eventName: i || "Converted",
            });
            break;
          case "view":
            trackView(s, [l]);
            break;
        }
    }),
    document.addEventListener("click", (t) => {
      let n = t.target.closest("[wf-algolia-conversion]");
      if (!n) return;
      let r = n.getAttribute("wf-algolia-conversion"),
        i = n.closest(".wf-algolia-injected") || n,
        o = i.dataset?.wfAlgoliaHitObjectid,
        l = i.dataset?.wfAlgoliaHitIndex,
        s = i.dataset?.wfAlgoliaHitQueryid;
      o &&
        l &&
        trackConversion({
          index: l,
          objectIDs: [o],
          eventName: r,
          queryID: s || void 0,
        });
    }));
}
var VIEW_CHUNK_SIZE = 20,
  MAX_EVENT_NAME_LEN = 64;
function chunkArray(e, t) {
  let n = [];
  for (let r = 0; r < e.length; r += t) n.push(e.slice(r, r + t));
  return n;
}
function validObjectIDs(e) {
  return e.filter((t) => typeof t == "string" && t.length > 0);
}
function truncateEventName(e) {
  return e.length > MAX_EVENT_NAME_LEN ? e.slice(0, MAX_EVENT_NAME_LEN) : e;
}
export function trackView(e, t) {
  if (!insightsReady) return;
  let n = validObjectIDs(t);
  if (n.length !== 0)
    for (let r of chunkArray(n, VIEW_CHUNK_SIZE))
      insights("viewedObjectIDs", {
        index: e,
        objectIDs: r,
        eventName: "Hits Viewed",
      });
}
export function trackClick(e) {
  if (!insightsReady) return;
  let t = validObjectIDs(e.objectIDs);
  if (t.length === 0) return;
  let n = truncateEventName(e.eventName || "Hit Clicked");
  e.queryID
    ? insights("clickedObjectIDsAfterSearch", {
        index: e.index,
        objectIDs: t,
        queryID: e.queryID,
        positions: e.positions || [1],
        eventName: n,
      })
    : insights("clickedObjectIDs", {
        index: e.index,
        objectIDs: t,
        eventName: n,
      });
}
export function trackConversion(e) {
  if (!insightsReady) return;
  let t = validObjectIDs(e.objectIDs);
  if (t.length === 0) return;
  let n = truncateEventName(e.eventName || "Hit Converted");
  e.queryID
    ? insights("convertedObjectIDsAfterSearch", {
        index: e.index,
        objectIDs: t,
        queryID: e.queryID,
        eventName: n,
      })
    : insights("convertedObjectIDs", {
        index: e.index,
        objectIDs: t,
        eventName: n,
      });
}
export function isInsightsReady() {
  return insightsReady;
}
