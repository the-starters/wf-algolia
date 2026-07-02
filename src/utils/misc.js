// utils/misc — split from app.carved.js (see docs/MODULE-MAP.md)
import { restartWebflow } from "../vendor/finsweet.js";
export function escapeFilterValue(e) {
  return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}
export function getPath(e, t) {
  return t.split(".").reduce((n, r) => n?.[r], e);
}
export function slugify(e, t = "-") {
  return e
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/ /g, t);
}
export function restartIx2() {
  try {
    restartWebflow(["ix2"]);
  } catch (e) {
    console.warn("[wf-algolia] Could not restart Webflow interactions:", e);
  }
}
