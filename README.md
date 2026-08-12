# wf-algolia — The Starters' fork of `@candid-leap/wf-algolia`

Owned fork of the wf-algolia CDN script (attribute-driven Algolia search for
Webflow), reconstructed from the published npm dist under its ISC license (see
`LICENSE` — original © Candidleap). Goal: full control over platform features
now that upstream no longer builds for us.

- **Repo:** `the-starters/wf-algolia` (local checkout: `starters-git/wf-algolia/`)
- **Docs:** [`docs/attributes-quickref.md`](docs/attributes-quickref.md) (our reference),
  [`docs/public-api.d.ts`](docs/public-api.d.ts) (typed `window.WfAlgolia` surface);
  upstream docs at https://wf-algolia-docs.candidleap.com/ stay valid while we keep the grammar.
- **Examples:** [`examples/`](examples/) — demo pages on Algolia's public demo index
  ([live](https://the-starters.github.io/wf-algolia/examples/)).
- **CDN:** `https://cdn.jsdelivr.net/gh/the-starters/wf-algolia@latest/dist/index.min.js`
  (releases are git tags; `@latest` resolves to the newest tag, never to `main`. Pin
  `@vX.Y.Z` for stability. To check what a URL is actually serving, read line 1 of the
  file: every build carries a `/* @the-starters/wf-algolia vX.Y.Z */` banner.)

## Live usage

All Opportunities 3.0 pages load the fork via `@latest` — e.g.
[`/opportunities-brands-view`](https://the-starters-3-0.webflow.io/opportunities-brands-view)
(navbar Explore search) and `/opportunities-freelancer-view` (browse feed with the talent
match filter). The 3.0 site is behind a site password until it launches on
[hirethestarters.com](https://www.hirethestarters.com). State-heavy lists on the same pages
render via the complementary [wf-xano](https://github.com/the-starters/wf-xano) library.

## Status

- ✅ **Carved**: app code (~5.5k lines) separated from vendored libs
  (`algoliasearch`, `@algolia/recommend`, `search-insights` → now real npm imports).
- ✅ **Rebuilds**: `npm run build` → `dist/index.js` (IIFE, esbuild — same tool upstream used).
- ✅ **Behavior-verified**: rebuilt bundle is parity-identical to upstream 1.0.4 on the
  multi-index test harness (same `WfAlgolia` API surface, same injected clone counts,
  same search hits, same console output).
- ✅ **Module split + rename**: done — `src/` is a 44-file module tree with all 343 top-level
  symbols renamed per `docs/MODULE-MAP.md`.
- ✅ **Released & deployed**: tagged from `v1.0.4-re.0` (parity build) onward; fork-only
  features continue upstream's numbering (starting with `v1.0.5`, which added
  `wf-algolia-format="short-name"`).

## Layout

```
build/index.1.0.4.min.js     upstream 1.0.4 dist, byte-for-byte (behavioral reference — never edit)
build/index.1.0.4.pretty.js  prettified copy (line numbers referenced by docs)
src/                         deobfuscated 44-file module tree (mirrors upstream's documented layout)
docs/public-api.d.ts         upstream-published types for window.WfAlgolia (rich JSDoc)
docs/upstream-package.json   upstream package.json (deps, build scripts)
docs/MODULE-MAP.md           line-range → original-module map + symbol rename tables
docs/attributes-quickref.md  our condensed attribute/API reference
examples/                    demo pages (Algolia public demo app; load ../dist/index.js)
dist/                        rebuilt output — COMMITTED (jsDelivr serves it from GitHub)
```

## Key facts

- Upstream repo `Candid-leap/webflow-algolia-app` is **private**; npm ships only the
  minified dist + `index.d.ts`. This folder is reconstructed from dist + public docs.
- Original module tree is known from doc references: `src/{index, core/{attributes,events},
  api/public-api, search/{search,multi-search,autocomplete}, browse/browse,
  filters/{filter-group,filter-search,range,filter-tags,dynamic-filters,standalone-filter-groups},
  actions/filter-actions, pagination/{numbered,load-more,infinite-scroll},
  render/{template,populate,detail}, recommend/recommend, elements/hit-preview, utils/sanitize}`.
- Full attribute/feature documentation lives upstream at
  https://wf-algolia-docs.candidleap.com/ (their docs stay valid for our fork as long
  as we keep the attribute grammar); the condensed local copy is
  [`docs/attributes-quickref.md`](docs/attributes-quickref.md).
- The public API includes `WfAlgolia.use({beforeSearch, afterSearch})` middleware —
  check whether a wanted feature is achievable there before patching the fork.

## Verification workflow

The pages in [`examples/`](examples/) already load `../dist/index.js`, so they exercise
whatever you just built — no copying, no separate harness.

1. `npm run build && npm run build:min`
2. Serve the **repo root** (the pages reach up to `../dist/`, so serving `examples/`
   itself will 404 the bundle): `python3 -m http.server 8000`, then open
   `http://localhost:8000/examples/multi-index.html` — it runs against Algolia's public
   `latency` demo app, so no keys of your own are needed.
3. Check, with the console open: no errors, `window.WfAlgolia.version` matches
   `package.json`, `.wf-algolia-injected` clone counts look right, and a search returns
   the hits you expect.
4. To confirm a change is really in the bundle, grep `dist/` for it — and check line 1
   of `dist/index.js` for the `/* @the-starters/wf-algolia vX.Y.Z */` banner.

Two gotchas when running a page outside Webflow: the bundle defers init to
`window.Webflow.push(fn)`, so a standalone page needs the small shim that drains that
queue (`multi-index.html` and `repro-base-filter-leaf-resolve.html` have one) — without
it nothing initialises and `window.WfAlgolia` stays undefined. And `basic-search.html`
is a **markup skeleton**, not a runnable demo: it ships placeholder `data-app-id` /
`data-search-key` values and no shim, so use it as an attribute reference rather than a
verification target.

## Deployment

`package.json` `version` is the single source of truth: it feeds both the dist banner and
`window.WfAlgolia.version`. **Bump it and rebuild before tagging**, so the tag, the banner
and the runtime API all report the same number.

Released via the tag-driven jsDelivr pipeline: bump `version`, `npm run build && npm run build:min`,
commit the rebuilt `dist/`, tag (`vX.Y.Z`), push, then purge
`https://purge.jsdelivr.net/gh/the-starters/wf-algolia@latest/dist/index.min.js`.
The Opportunities 3.0 Webflow pages reference `@latest`, so a purge is all it takes for a new
tag to go live — no Webflow edits needed.
