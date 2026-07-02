// browse/url-sync — split from app.carved.js (see docs/MODULE-MAP.md)
var HASH_PREFIX = "#wfa=";
export function enc(e) {
  return encodeURIComponent(e);
}
function dec(e) {
  try {
    return decodeURIComponent(e);
  } catch {
    return e;
  }
}
function stateToQueryString(e, t) {
  let r = new URL(t).searchParams;
  (["q", "mode", "page"].forEach((s) => r.delete(s)),
    [...r.keys()].filter((s) => s.startsWith("f_")).forEach((s) => r.delete(s)),
    e.query && r.set("q", e.query),
    e.mode && e.mode !== "all" && r.set("mode", e.mode),
    e.pagination !== "infinite-scroll" &&
      e.page &&
      e.page > 0 &&
      r.set("page", String(e.page + 1)));
  let i = r.toString(),
    o = [];
  e.filters &&
    Object.entries(e.filters).forEach(([s, c]) => {
      let m = encodeURIComponent(s);
      if (c.type === "checkbox" || c.type === "boolean") {
        if (c.values && c.values.size > 0) {
          let g = [...c.values].map(enc).join(",");
          o.push(`f_${m}=${g}`);
        }
      } else
        (c.type === "number" || c.type === "date") &&
          (c.min !== void 0 &&
            o.push(`f_${m}_min=${encodeURIComponent(String(c.min))}`),
          c.max !== void 0 &&
            o.push(`f_${m}_max=${encodeURIComponent(String(c.max))}`));
    });
  let l = o.join("&");
  return i && l ? `${i}&${l}` : i || l;
}
function stateToHashPayload(e) {
  let t = {};
  return (
    e.filters &&
      Object.entries(e.filters).forEach(([n, r]) => {
        t[n] = {
          type: r.type,
          match: r.match,
          ...(r.values
            ? {
                values: [...r.values],
              }
            : {}),
          ...(r.min !== void 0
            ? {
                min: r.min,
              }
            : {}),
          ...(r.max !== void 0
            ? {
                max: r.max,
              }
            : {}),
        };
      }),
    encodeURIComponent(
      JSON.stringify({
        q: e.query || "",
        mode: e.mode || "",
        page: e.page || 0,
        f: t,
      }),
    )
  );
}
export function writeStateToURL(e) {
  let t = window.location.href.split("#")[0] ?? "",
    n = stateToQueryString(e, t),
    r = new URL(t);
  r.search = n ? `?${n}` : "";
  let i = r.toString(),
    o;
  if (i.length <= 2e3) o = i;
  else {
    let l = new URL(t).searchParams;
    (["q", "mode", "page"].forEach((m) => l.delete(m)),
      [...l.keys()]
        .filter((m) => m.startsWith("f_"))
        .forEach((m) => l.delete(m)));
    let s = new URL(t);
    s.search = l.toString();
    let c = stateToHashPayload(e);
    o = `${s.toString()}${HASH_PREFIX}${c}`;
  }
  o !== window.location.href && window.history.pushState(null, "", o);
}
export function readStateFromURL() {
  let { hash: e } = window.location;
  return e.startsWith(HASH_PREFIX)
    ? parseHashState(e.slice(HASH_PREFIX.length))
    : parseQueryState();
}
function parseHashState(e) {
  try {
    let t = JSON.parse(decodeURIComponent(e)),
      n = {};
    return (
      Object.entries(t.f || {}).forEach(([r, i]) => {
        let o = {
          type: i.type,
          match: i.match,
        };
        (i.values && (o.values = new Set(i.values)),
          i.min !== void 0 && (o.min = i.min),
          i.max !== void 0 && (o.max = i.max),
          (n[r] = o));
      }),
      {
        query: t.q || "",
        mode: t.mode || "all",
        page: typeof t.page == "number" ? t.page : 0,
        filters: n,
      }
    );
  } catch {
    return {
      query: "",
      mode: "all",
      page: 0,
      filters: {},
    };
  }
}
function parseQueryState() {
  let e = new URL(window.location.href),
    t = e.searchParams.get("q") || "",
    n = e.searchParams.get("mode") || "all",
    r = e.searchParams.get("page"),
    i = r ? Math.max(0, parseInt(r) - 1) : 0,
    o = {},
    l = e.search.startsWith("?") ? e.search.slice(1) : e.search;
  return (
    l.length > 0 &&
      l.split("&").forEach((s) => {
        if (!s.startsWith("f_")) return;
        let c = s.indexOf("=");
        if (c === -1) return;
        let m = s.slice(0, c),
          g = s.slice(c + 1),
          u = dec(m);
        if (u.endsWith("_min")) {
          let h = u.slice(2, -4);
          (o[h] ||
            (o[h] = {
              type: "number",
              match: "or",
            }),
            (o[h].min = parseFloat(dec(g))));
        } else if (u.endsWith("_max")) {
          let h = u.slice(2, -4);
          (o[h] ||
            (o[h] = {
              type: "number",
              match: "or",
            }),
            (o[h].max = parseFloat(dec(g))));
        } else {
          let h = u.slice(2);
          o[h] = {
            type: "checkbox",
            match: "or",
            values: new Set(g.split(",").filter(Boolean).map(dec)),
          };
        }
      }),
    {
      query: t,
      mode: n,
      page: i,
      filters: o,
    }
  );
}
