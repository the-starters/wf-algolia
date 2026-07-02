// core/events — split from app.carved.js (see docs/MODULE-MAP.md)
var eventHandlers = new Map();
export function on(e, t) {
  (eventHandlers.has(e) || eventHandlers.set(e, new Set()),
    eventHandlers.get(e).add(t));
}
export function off(e, t) {
  eventHandlers.get(e)?.delete(t);
}
export function emit(e, ...t) {
  eventHandlers.get(e)?.forEach((n) => {
    try {
      n(...t);
    } catch (r) {
      console.warn(`[wf-algolia] Event handler error (${e}):`, r);
    }
  });
}
