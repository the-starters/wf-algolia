# wf-algolia — The Starters' fork of `@candid-leap/wf-algolia`

Owned fork of the wf-algolia CDN script (attribute-driven Algolia search for
Webflow), reconstructed from the published npm dist under its ISC license (see
`LICENSE` — original © Candidleap). Goal: full control over platform features
now that upstream no longer builds for us.

- **Repo:** `the-starters/wf-algolia` (local checkout: `platform-search/wf-algolia-re/`)
- **Docs:** [`docs/attributes-quickref.md`](docs/attributes-quickref.md) (our reference),
  [`docs/public-api.d.ts`](docs/public-api.d.ts) (typed `window.WfAlgolia` surface);
  upstream docs at https://wf-algolia-docs.candidleap.com/ stay valid while we keep the grammar.
- **Examples:** [`examples/`](examples/) — demo pages on Algolia's public demo index.
- **CDN (once released):** `https://cdn.jsdelivr.net/gh/the-starters/wf-algolia@latest/dist/index.min.js`

## Status

- ✅ **Carved**: app code (~5.5k lines) separated from vendored libs
  (`algoliasearch`, `@algolia/recommend`, `search-insights` → now real npm imports).
- ✅ **Rebuilds**: `npm run build` → `dist/index.js` (IIFE, esbuild — same tool upstream used).
- ✅ **Behavior-verified**: rebuilt bundle is parity-identical to upstream 1.0.4 on the
  multi-index test harness (same `WfAlgolia` API surface, same injected clone counts,
  same search hits, same console output).
- ⏳ **Module split + rename**: in progress — see `docs/MODULE-MAP.md`.

## Layout

```
build/index.1.0.4.min.js     upstream 1.0.4 dist, byte-for-byte (behavioral reference — never edit)
build/index.1.0.4.pretty.js  prettified copy (line numbers referenced by docs)
src/app.carved.js            the deobfuscation target: app code with npm vendor imports
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
- Full attribute/feature documentation: `../wf-algolia/llms-full.txt` and
  https://wf-algolia-docs.candidleap.com/ (their docs stay valid for our fork as long
  as we keep the attribute grammar).
- The public API includes `WfAlgolia.use({beforeSearch, afterSearch})` middleware —
  check whether a wanted feature is achievable there before patching the fork.

## Verification workflow

1. `npm run build`
2. `cp dist/index.js ../wf-algolia/examples/wf-algolia-rebuilt.js`
3. Start the `wf-algolia` preview server (port 8766, see `.claude/skills/local-test-harness`)
4. Compare `wf-algolia-multi-index-test.html` (upstream CDN) vs
   `wf-algolia-multi-index-test-rebuilt.html` (our build): API keys of `window.WfAlgolia`,
   `.wf-algolia-injected` counts, search-for-"apple" hit texts, console errors.

## Deployment intent

Once the fork is stable: publish via the existing tag-driven jsDelivr pipeline
(see `webflow-cdn-release` skill) and swap Webflow footer URLs off
`@candid-leap/wf-algolia@1`. Until then, production keeps using the upstream CDN URL —
consider pinning it (`@1.0.4`) so upstream releases stop auto-applying.
