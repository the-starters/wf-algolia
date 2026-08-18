# Honor Facet display Hide in Filter groups

Algolia Facet display Hide is `renderingContent.facetOrdering.values[<facet>].hide`. InstantSearch reads it; this fork does not use InstantSearch. We honor **Hide only** in dynamic Filter groups and typeahead: exact match, omit even if the URL already applied the value. We do not implement pin, `sortRemainingBy`, or Facet display’s drag list (`facets.order`). Hits, cards, chips, URL restore, and static Webflow items stay unchanged.
