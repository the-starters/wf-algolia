# Examples

Self-contained demo pages running against Algolia's public demo app (`latency`,
search-only key — safe to publish). Each page loads `../dist/index.js`, so run
`npm run build` first (or view via GitHub Pages, where dist is committed).

- `basic-search.html` — single-index search-as-you-type over `instant_search`.
- `multi-index.html` — federated search wrapper over `instant_search`, `bestbuy`,
  `ikea` + sort replicas, filters, pagination.

Local preview: serve this folder with any static server (in the workspace:
`preview_start wf-algolia` serves the sibling reference folder; for this repo
just `npx serve examples`).
