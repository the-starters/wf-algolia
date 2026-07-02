/**
 * Public type surface for `window.WfAlgolia` — mirrors the runtime API
 * attached by `api/public-api.ts:exposePublicAPI`.
 *
 * For customers using TypeScript: this file is published to npm as
 * `dist/index.d.ts` (the build copies it after esbuild runs). Adding
 * `@candid-leap/wf-algolia` to a TS project's `compilerOptions.types` (or
 * triple-slashing it) makes `window.WfAlgolia` typed everywhere.
 *
 * For customers using the CDN `<script>` tag: types do not apply at
 * runtime; this file is purely a TypeScript-author convenience.
 *
 * IMPORTANT: when `exposePublicAPI` (`src/api/public-api.ts:19`) gains or
 * removes a method, update this file in the same commit.
 */

import type { SearchOptions, SearchResponse } from '@algolia/client-search';
import type { SearchClient } from 'algoliasearch';

/**
 * Outgoing search params passed to a `beforeSearch` interceptor. Extends
 * Algolia's `SearchOptions` with the script's internal extras (hitsPerPage,
 * facets, clickAnalytics, etc.) — extras are preserved verbatim on return.
 */
export type WfAlgoliaSearchParams = SearchOptions & Record<string, unknown>;

/**
 * Algolia search response shape handed to an `afterSearch` interceptor.
 * Generic over the hit type; defaults to `Record<string, unknown>`.
 */
export type WfAlgoliaSearchResponse<T = Record<string, unknown>> = SearchResponse<T>;

/**
 * `beforeSearch` / `afterSearch` interceptor registered via `WfAlgolia.use()`.
 *
 * - `beforeSearch` may mutate or replace the outgoing search params; returning
 *   `undefined` keeps the prior value.
 * - `afterSearch` may transform the response or return a new object; returning
 *   `undefined` keeps the prior value.
 */
export interface WfAlgoliaMiddleware {
  beforeSearch?: (params: WfAlgoliaSearchParams) => WfAlgoliaSearchParams | undefined;
  afterSearch?: (response: WfAlgoliaSearchResponse) => WfAlgoliaSearchResponse | undefined;
}

/**
 * Map of customer-facing event names to their handler arg tuple.
 * Mirrors the internal EventMap in `core/events.ts` but exposes only the
 * subset documented as part of the public API surface.
 */
export interface WfAlgoliaPublicEventMap {
  refresh: [];
  ready: [];
  error: [err: unknown];
  results: [
    res:
      | WfAlgoliaSearchResponse
      | { results: WfAlgoliaSearchResponse[]; nbHits: number; nbPages: number },
  ];
  filter: [state: WfAlgoliaFilterState];
  search: [query: string];
}

/**
 * Filter state snapshot returned by `WfAlgolia.getFilterState()`.
 * Keys are Algolia attribute names; values describe the active selection.
 */
export type WfAlgoliaFilterState = Record<string, { values?: string[]; [key: string]: unknown }>;

/**
 * Public runtime API attached to `window.WfAlgolia` after init.
 * Undefined before init and after `destroy()`.
 */
export interface WfAlgoliaPublicAPI {
  /** Script version (matches the npm package version). */
  readonly version: string;

  /** Returns the underlying Algolia search client. */
  getClient(): SearchClient;

  /** Run a single-index search. Returns the Algolia search response. */
  search(indexName: string, query: string, params?: Record<string, unknown>): Promise<unknown>;

  /** Run multiple queries in a single network round-trip. */
  multiSearch(queries: unknown[]): Promise<unknown>;

  /** Fetch a single record by objectID (no filter DSL). */
  getObject(indexName: string, objectID: string): Promise<unknown>;

  /**
   * Clone a template element and bind a hit's fields into the clone.
   * Uses the script-loaded `config` (incl. `data-highlight-tag`, audit #14)
   * automatically — callers do not pass config themselves.
   */
  cloneAndPopulate(template: HTMLElement, hit: Record<string, unknown>): HTMLElement;

  /**
   * Bind a hit's fields onto an existing card element (in-place).
   * Uses the script-loaded `config` (incl. `data-highlight-tag`, audit #14)
   * automatically — callers do not pass config themselves.
   */
  populateCard(card: HTMLElement, hit: Record<string, unknown>): void;

  /** Send an Algolia Insights click event. */
  trackClick: (...args: unknown[]) => void;

  /** Send an Algolia Insights conversion event. */
  trackConversion: (...args: unknown[]) => void;

  /** Returns the underlying `search-insights` module for advanced events. */
  getInsights(): unknown;

  /**
   * Subscribe to a runtime event. Handler args are inferred from the event name.
   * Example: `WfAlgolia.on('refresh', () => {})` — handler takes no args.
   */
  on<K extends keyof WfAlgoliaPublicEventMap>(
    event: K,
    handler: (...args: WfAlgoliaPublicEventMap[K]) => void
  ): void;

  /** Unsubscribe a previously registered handler. */
  off<K extends keyof WfAlgoliaPublicEventMap>(
    event: K,
    handler: (...args: WfAlgoliaPublicEventMap[K]) => void
  ): void;

  /** Set the active values for a filter field; triggers a refresh. */
  setFilter(field: string, values: string[]): void;

  /** Clear values for a single filter field; triggers a refresh. */
  clearFilter(field: string): void;

  /** Clear ALL filter selections; triggers a refresh. */
  clearAllFilters(): void;

  /**
   * Commit staged filter values back into the active state in one transaction.
   * Does NOT auto-refresh — callers chain `refresh()` if needed.
   *
   * @param fields - the fields to commit. Omit or pass `[]` to commit ALL
   *   staged fields. Deferred-apply primitive (spec §9 Q5).
   */
  commitStaging(fields?: string[]): void;

  /**
   * Discard staged filter values without touching the active state.
   *
   * @param fields - the fields to discard. Omit or pass `[]` to discard ALL
   *   staged fields. Deferred-apply primitive (spec §9 Q5).
   */
  discardStaging(fields?: string[]): void;

  /** Snapshot of the current filter state (deep copy — safe to mutate). */
  getFilterState(): WfAlgoliaFilterState;

  /** Set the search query (mirrors `[wf-algolia-element="search-input"]`). */
  setQuery(query: string): void;

  /** Read the current search query string. */
  getQuery(): string;

  /** Re-run the active query/browse with current state. */
  refresh(): void;

  /** Register a beforeSearch/afterSearch middleware. */
  use(mw: WfAlgoliaMiddleware): void;

  /** Tear down — removes injected DOM + deletes `window.WfAlgolia`. */
  destroy(): void;
}

declare global {
  interface Window {
    /**
     * Public API attached after script init. Undefined before init or
     * after `destroy()`. See `WfAlgoliaPublicAPI` for the full surface.
     */
    WfAlgolia?: WfAlgoliaPublicAPI;
  }
}

// Module marker — required for TypeScript to treat this file as a module
// (so `declare global` augmentation works).
export {};
