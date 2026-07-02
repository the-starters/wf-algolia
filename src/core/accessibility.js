// core/accessibility — split from app.carved.js (see docs/MODULE-MAP.md)
export function initAccessibility(e) {
  ((e.get("search-input") || []).forEach((t) => {
    (t.setAttribute("role", "searchbox"),
      t.getAttribute("aria-label") || t.setAttribute("aria-label", "Search"));
  }),
    (e.get("browse-search") || []).forEach((t) => {
      (t.setAttribute("role", "searchbox"),
        t.getAttribute("aria-label") || t.setAttribute("aria-label", "Search"));
    }),
    ["results", "autocomplete"].forEach((t) => {
      (e.get(t) || []).forEach((n) => {
        (n.setAttribute("role", "listbox"),
          n.getAttribute("aria-label") ||
            n.setAttribute("aria-label", "Search results"));
      });
    }),
    (e.get("results-count") || []).forEach((t) => {
      (t.setAttribute("role", "status"), t.setAttribute("aria-live", "polite"));
    }),
    (e.get("no-results") || []).forEach((t) => {
      (t.setAttribute("role", "status"), t.setAttribute("aria-live", "polite"));
    }),
    (e.get("mode-btn") || []).forEach((t) => {
      (t.setAttribute("role", "tab"),
        t.setAttribute("tabindex", "0"),
        t.addEventListener("keydown", (n) => {
          (n.key === "Enter" || n.key === " ") &&
            (n.preventDefault(), t.click());
        }));
    }),
    document
      .querySelectorAll('[wf-algolia-element="filter-item"]')
      .forEach((t) => {
        t.querySelector("input") ||
          (t.setAttribute("role", "button"), t.setAttribute("tabindex", "0"));
      }));
}
