# Examples

Self-contained demo pages. Each page loads `../dist/index.js`, so run
`npm run build` first (or view via GitHub Pages, where dist is committed).
Most run against Algolia's public demo app (`latency`, search-only key — safe to
publish); the leaf-resolution harness needs real hierarchical data, so it uses
The Starters' own `Freelancers3.0-dev` index with its browser-facing search-only
key (the same one already embedded in the live Webflow pages).

- `basic-search.html` — single-index search-as-you-type over `instant_search`.
- `multi-index.html` — federated search wrapper over `instant_search`, `bestbuy`,
  `ikea` + sort replicas, filters, pagination.
- `repro-base-filter-leaf-resolve.html` — `facet-stat` +
  `wf-algolia-base-filter-resolve="leaf"` harness: resolved / control / skip /
  0-match / unknown-mode / empty-mode / cache-sharing / currency-template cases.
  Captures console output and Algolia XHR bodies on `window.__repro` so the
  assertions can be read straight off the page.

Local preview: serve the **repo root**, not this folder — the pages reference
`../dist/`, so serving `examples/` itself 404s the bundle. From the repo root run
`python3 -m http.server 8000`, then open
`http://localhost:8000/examples/multi-index.html`.
