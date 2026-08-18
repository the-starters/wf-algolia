// Hidden Facet Values — Facet display Hide for one facet (exact match).
const renderingContentByIndex = new Map();

function facetValueName(entry) {
  return Array.isArray(entry) ? entry[0] : entry?.value;
}

export function omitHiddenFacetValues(facetName, entries, renderingContent) {
  let hide =
    renderingContent?.facetOrdering?.values?.[facetName]?.hide;
  if (!Array.isArray(hide) || hide.length === 0) return entries;
  let hidden = new Set(hide);
  return entries.filter((entry) => !hidden.has(facetValueName(entry)));
}

export function rememberRenderingContent(indexName, renderingContent) {
  if (indexName && renderingContent != null)
    renderingContentByIndex.set(indexName, renderingContent);
}

export async function ensureRenderingContent(client, indexName) {
  if (renderingContentByIndex.has(indexName))
    return renderingContentByIndex.get(indexName);
  let result = await client.initIndex(indexName).search("", {
    hitsPerPage: 0,
  });
  let content = result.renderingContent ?? {};
  rememberRenderingContent(indexName, content);
  return content;
}
