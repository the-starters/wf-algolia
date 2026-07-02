// utils/debounce — split from app.carved.js (see docs/MODULE-MAP.md)
export function debounce(e, t) {
  let n;
  return (...r) => {
    (clearTimeout(n), (n = setTimeout(() => e(...r), t)));
  };
}
