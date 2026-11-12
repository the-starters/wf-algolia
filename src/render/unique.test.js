import assert from "node:assert/strict";
import test from "node:test";
import { populateCard } from "./populate.js";

// Minimal element/card doubles: populateCard only uses getAttribute,
// hasAttribute, textContent, style and querySelectorAll on these nodes.
class FakeElement {
  constructor(attributes = {}) {
    this.attributes = new Map(Object.entries(attributes));
    this.textContent = "";
    this.style = { display: "" };
  }

  getAttribute(name) {
    return this.attributes.has(name) ? this.attributes.get(name) : null;
  }

  hasAttribute(name) {
    return this.attributes.has(name);
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  removeAttribute(name) {
    this.attributes.delete(name);
  }
}

class FakeCard {
  constructor(elements) {
    this.elements = elements;
  }

  // Supports the single-attribute selectors populateCard issues, such as
  // "[wf-algolia-text]" or "[wf-algolia-image], [wf-algolia-img]".
  querySelectorAll(selector) {
    let names = [...selector.matchAll(/\[([^\]=]+)\]/g)].map((m) => m[1]);
    return this.elements.filter((el) => names.some((n) => el.hasAttribute(n)));
  }
}

function companySlot(index, extra = {}) {
  return new FakeElement({
    "wf-algolia-text": `work-history.${index}.company`,
    "wf-algolia-if": `work-history.${index}.company`,
    "wf-algolia-display": "inline",
    ...extra,
  });
}

function companyCard(extra) {
  return new FakeCard([0, 1, 2].map((i) => companySlot(i, extra)));
}

function hit(...companies) {
  return {
    objectID: "1",
    "work-history": companies.map((company, i) => ({
      company,
      title: `Role ${i + 1}`,
    })),
  };
}

function visibleText(card) {
  return card.elements
    .filter((el) => el.style.display !== "none")
    .map((el) => el.textContent);
}

const UNIQUE = { "wf-algolia-unique": "companies" };

test("wf-algolia-unique shows a repeated company once", () => {
  let card = companyCard(UNIQUE);

  populateCard(card, hit("Kargo", "Kargo", "Kargo"));

  assert.deepEqual(visibleText(card), ["Kargo"]);
});

test("wf-algolia-unique keeps the first spelling and order, ignoring case and spaces", () => {
  let card = companyCard(UNIQUE);

  populateCard(card, hit("PrettyLitter", "  prettylitter ", "Cubicle™"));

  assert.deepEqual(visibleText(card), ["PrettyLitter", "Cubicle™"]);
});

test("a hidden duplicate is emptied so CSS :empty comma rules skip it", () => {
  let card = companyCard(UNIQUE);

  populateCard(
    card,
    hit("Fat Earth Media", "Fat Earth Media", "Fat Earth Media"),
  );

  assert.equal(card.elements[1].textContent, "");
  assert.equal(card.elements[2].textContent, "");
  assert.equal(card.elements[1].style.display, "none");
});

test("a later distinct value moves into the freed slot so adjacent-sibling separators stay correct", () => {
  // Site CSS draws ", " after a company only when its NEXT sibling has text
  // (p:has(+ p:not(:empty))::after). With an empty slot in the middle,
  // "PrettyLitter" would lose its comma before "Cubicle™".
  let card = companyCard(UNIQUE);

  populateCard(card, hit("PrettyLitter", "PrettyLitter", "Cubicle™"));

  assert.equal(card.elements[0].textContent, "PrettyLitter");
  assert.equal(card.elements[1].textContent, "Cubicle™");
  assert.equal(card.elements[1].style.display, "inline");
  assert.equal(card.elements[2].textContent, "");
  assert.equal(card.elements[2].style.display, "none");
});

test("distinct companies all stay visible", () => {
  let card = companyCard(UNIQUE);

  populateCard(card, hit("Nike", "Adidas", "Puma"));

  assert.deepEqual(visibleText(card), ["Nike", "Adidas", "Puma"]);
});

test("cards without wf-algolia-unique keep repeated values unchanged", () => {
  let card = companyCard();

  populateCard(card, hit("Kargo", "Kargo", "Kargo"));

  assert.deepEqual(visibleText(card), ["Kargo", "Kargo", "Kargo"]);
});

test("different unique groups do not hide each other", () => {
  let card = new FakeCard([
    companySlot(0, { "wf-algolia-unique": "companies" }),
    new FakeElement({
      "wf-algolia-text": "agency-name",
      "wf-algolia-unique": "agency",
    }),
  ]);

  populateCard(card, {
    "work-history": [{ company: "Kargo" }],
    "agency-name": "Kargo",
  });

  assert.deepEqual(visibleText(card), ["Kargo", "Kargo"]);
});

test("an element without wf-algolia-if is shown again when a later hit has no duplicate", () => {
  let first = new FakeElement({
      "wf-algolia-text": "a",
      "wf-algolia-unique": "g",
    }),
    second = new FakeElement({
      "wf-algolia-text": "b",
      "wf-algolia-unique": "g",
      "wf-algolia-display": "inline",
    }),
    card = new FakeCard([first, second]);

  populateCard(card, { a: "Same", b: "same" });
  assert.deepEqual(visibleText(card), ["Same"]);

  populateCard(card, { a: "One", b: "Two" });
  assert.deepEqual(visibleText(card), ["One", "Two"]);
  assert.equal(second.style.display, "inline");
});

test("a formatted slot hidden as a duplicate stays hidden when its next value formats to empty", () => {
  let first = new FakeElement({
      "wf-algolia-text": "a",
      "wf-algolia-unique": "g",
    }),
    second = new FakeElement({
      "wf-algolia-text": "b",
      "wf-algolia-unique": "g",
      "wf-algolia-format": "year",
    }),
    card = new FakeCard([first, second]);

  populateCard(card, { a: "2020", b: "2020" });
  assert.deepEqual(visibleText(card), ["2020"]);
  assert.equal(second.style.display, "none");

  populateCard(card, { a: "One", b: "not a date" });
  assert.equal(second.textContent, "");
  assert.equal(second.style.display, "none");
  assert.deepEqual(visibleText(card), ["One"]);
});

test("empty slots are not treated as duplicates of each other", () => {
  let card = companyCard(UNIQUE);

  populateCard(card, hit("Kargo"));

  assert.deepEqual(visibleText(card), ["Kargo"]);
  assert.equal(card.elements[1].style.display, "none");
});
