import assert from "node:assert/strict";
import { test } from "node:test";
import { omitHiddenFacetValues } from "./hidden-facet-values.js";

const COMPANY = "work-history.company";
const hideCompany = {
  facetOrdering: {
    values: {
      [COMPANY]: {
        hide: ["Freelance", "The Starters", "Self Employed"],
      },
    },
  },
};

test("omits Hidden Facet Values from the Company list", () => {
  const entries = [
    ["Google", 40],
    ["Freelance", 12],
    ["The Starters", 8],
    ["Self Employed", 5],
    ["Acme", 3],
  ];
  assert.deepEqual(omitHiddenFacetValues(COMPANY, entries, hideCompany), [
    ["Google", 40],
    ["Acme", 3],
  ]);
});

test("keeps Self-employed when Hide says Self Employed", () => {
  const entries = [
    ["Self Employed", 5],
    ["Self-employed", 4],
  ];
  assert.deepEqual(omitHiddenFacetValues(COMPANY, entries, hideCompany), [
    ["Self-employed", 4],
  ]);
});

test("does not omit Company values when Hide is on a different facet", () => {
  const entries = [
    ["Freelance", 12],
    ["Google", 40],
  ];
  const hideSkills = {
    facetOrdering: {
      values: {
        skills: { hide: ["Freelance"] },
      },
    },
  };
  assert.deepEqual(omitHiddenFacetValues(COMPANY, entries, hideSkills), [
    ["Freelance", 12],
    ["Google", 40],
  ]);
});

test("does not omit another facet's list when Hide is only on Company", () => {
  const skills = [
    ["Freelance", 3],
    ["Figma", 10],
  ];
  assert.deepEqual(omitHiddenFacetValues("skills", skills, hideCompany), [
    ["Freelance", 3],
    ["Figma", 10],
  ]);
});

test("returns the list unchanged when Hide is missing", () => {
  const entries = [
    ["Freelance", 12],
    ["Google", 40],
  ];
  const unchanged = [
    ["Freelance", 12],
    ["Google", 40],
  ];
  assert.deepEqual(omitHiddenFacetValues(COMPANY, entries, undefined), unchanged);
  assert.deepEqual(omitHiddenFacetValues(COMPANY, entries, {}), unchanged);
  assert.deepEqual(
    omitHiddenFacetValues(COMPANY, entries, {
      facetOrdering: { values: { [COMPANY]: { hide: [] } } },
    }),
    unchanged,
  );
});

test("omits Hidden Facet Values from typeahead hits", () => {
  const hits = [
    { value: "Google", count: 40 },
    { value: "Freelance", count: 12 },
    { value: "Self-employed", count: 4 },
  ];
  assert.deepEqual(omitHiddenFacetValues(COMPANY, hits, hideCompany), [
    { value: "Google", count: 40 },
    { value: "Self-employed", count: 4 },
  ]);
});
