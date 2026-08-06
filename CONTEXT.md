# CONTEXT.md — wf-algolia ubiquitous language

Glossary only. No implementation details; those live in `docs/`.

## Filter list ordering

- **Filter group** — one facet's UI block (its list of pickable values). Two kinds:
  a **dynamic group** (the engine fetches and injects its values) and a
  **static group** (values authored by hand in Webflow).
- **Underlying order** — a group's baseline value order: count-descending for a
  dynamic group, authored order for a static group. Fixed at load time; live
  count updates never change it.
- **Ticked** — a value the visitor has picked, whether applied or merely staged.
  Ticked is a visual/DOM truth, not a query truth.
- **Selected-first ordering** — the opt-in per-group rule: ticked values form a
  **pinned block** at the top; both the pinned block and the remainder keep
  their underlying relative order. Pinning follows ticked state (so staged
  picks pin immediately), reacts on the pick itself (not on results), and
  applies after every list mutation so the list is always one deterministic
  function of (ticked set, underlying order).
- **Pinned block** — the ticked values sitting above the remainder. Unticking
  removes a value from the block and returns it to its underlying slot.
- **Fold** — the show-more cutoff hiding values past a group's limit. In a
  selected-first group, pinned values never fold and count toward the limit.
- **Staged vs applied** — in deferred groups a pick is *staged* (ticked, not
  yet querying) until committed, at which point it is *applied*. Cancel
  reverts staged picks. Ordering treats staged and applied identically.
