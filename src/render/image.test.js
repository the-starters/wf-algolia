import assert from "node:assert/strict";
import test from "node:test";
import { populatePreviewCard } from "../elements/hit-preview.js";
import { applyImageSource, buildXanoSrcset, normalizeSrcset } from "./image.js";
import { populateCard } from "./populate.js";

class FakeImage {
  constructor(attributes = {}) {
    this.attributes = new Map(Object.entries(attributes));
    this.src = attributes.src || "";
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
  constructor(image) {
    this.image = image;
  }

  querySelectorAll(selector) {
    return selector.includes("wf-algolia-image") ? [this.image] : [];
  }

  hasAttribute() {
    return false;
  }
}

test("removes a placeholder srcset when no dynamic binding is present", () => {
  let image = new FakeImage({
    srcset: "https://placeholder.test/photo-500.jpg 500w",
    "data-srcset": "https://placeholder.test/photo-800.jpg 800w",
  });

  applyImageSource(image, {}, "https://images.test/profile.jpg");

  assert.equal(image.src, "https://images.test/profile.jpg");
  assert.equal(image.getAttribute("srcset"), null);
  assert.equal(image.getAttribute("data-srcset"), null);
});

test("preserves non-Xano data image sources", () => {
  let image = new FakeImage(),
    source = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

  applyImageSource(image, {}, source);

  assert.equal(image.src, source);
  assert.equal(image.getAttribute("srcset"), null);
});

test("binds a responsive srcset from an Algolia field and preserves sizes", () => {
  let image = new FakeImage({
    "wf-algolia-srcset": "missing|profile.srcset",
    sizes: "(max-width: 479px) 92vw, 280px",
  });
  let hit = {
    profile: {
      srcset:
        "https://images.test/profile-280.jpg 280w, https://images.test/profile-560.jpg 560w",
    },
  };

  applyImageSource(image, hit, "https://images.test/profile-560.jpg");

  assert.equal(
    image.getAttribute("srcset"),
    "https://images.test/profile-280.jpg 280w, https://images.test/profile-560.jpg 560w",
  );
  assert.equal(image.getAttribute("sizes"), "(max-width: 479px) 92vw, 280px");
});

test("builds Xano candidates and replaces the existing template", () => {
  assert.equal(
    buildXanoSrcset(
      "https://x08a.example.n7c.xano.io/vault/abc/profile.jpg?token=public&tpl=large",
    ),
    "https://x08a.example.n7c.xano.io/vault/abc/profile.jpg?token=public&tpl=tiny.webp 32w, https://x08a.example.n7c.xano.io/vault/abc/profile.jpg?token=public&tpl=small.webp 50w, https://x08a.example.n7c.xano.io/vault/abc/profile.jpg?token=public&tpl=med.webp 160w, https://x08a.example.n7c.xano.io/vault/abc/profile.jpg?token=public&tpl=big.webp 360w, https://x08a.example.n7c.xano.io/vault/abc/profile.jpg?token=public&tpl=bigger.webp 600w, https://x08a.example.n7c.xano.io/vault/abc/profile.jpg?token=public&tpl=large.webp 800w",
  );
});

test("automatically applies Xano candidates with concrete auto sizes", () => {
  let source =
      "https://x08a.example.n7c.xano.io/vault/abc/profile.jpg?tpl=large",
    explicit = new FakeImage({
      "wf-algolia-srcset": "xano",
      sizes: "50px",
    }),
    automatic = new FakeImage();

  applyImageSource(explicit, {}, source);
  applyImageSource(automatic, {}, source);

  assert.match(explicit.getAttribute("srcset"), /tpl=small\.webp 50w/);
  assert.equal(explicit.getAttribute("sizes"), "50px");
  assert.match(automatic.getAttribute("srcset"), /tpl=big\.webp 360w/);
  assert.match(automatic.getAttribute("srcset"), /tpl=large\.webp 800w/);
  assert.equal(automatic.getAttribute("sizes"), "auto, 360px");
  assert.equal(automatic.loading, "lazy");
});

test("preserves an authored empty sizes attribute", () => {
  let image = new FakeImage({ sizes: "" });

  applyImageSource(
    image,
    {},
    "https://x08a.example.n7c.xano.io/vault/abc/profile.jpg",
  );

  assert.equal(image.getAttribute("sizes"), "");
});

test("rejects unsafe or malformed responsive candidates", () => {
  assert.equal(normalizeSrcset("javascript:alert(1) 500w"), "");
  assert.equal(normalizeSrcset("data:image/gif;base64,R0lGODlhAQAB 1x"), "");
  assert.equal(normalizeSrcset("https://images.test/a.jpg nope"), "");
  assert.equal(buildXanoSrcset("https://images.test/profile.jpg"), "");
});

test("rejects invalid descriptor sets", () => {
  for (let srcset of [
    "https://images.test/a.jpg 0w",
    "https://images.test/a.jpg 0x",
    "https://images.test/a.jpg 360w, https://images.test/b.jpg 360w",
    "https://images.test/a.jpg 1x, https://images.test/b.jpg 1.0x",
    "https://images.test/a.jpg 360w, https://images.test/b.jpg 2x",
  ]) {
    assert.equal(normalizeSrcset(srcset), "");
  }
});

test("clears an earlier dynamic srcset when repeated data is empty", () => {
  let image = new FakeImage({ "wf-algolia-srcset": "profile.srcset" });

  applyImageSource(
    image,
    { profile: { srcset: "https://images.test/profile-360.webp 360w" } },
    "https://images.test/profile.jpg",
  );
  assert.equal(
    image.getAttribute("srcset"),
    "https://images.test/profile-360.webp 360w",
  );

  applyImageSource(image, { profile: { srcset: "" } }, "");
  assert.equal(image.getAttribute("srcset"), null);
  assert.equal(image.getAttribute("sizes"), null);
  assert.equal(image.src, "");
});

test("normal cards and hit previews share the Xano image contract", () => {
  let source = "https://x08a.example.n7c.xano.io/vault/abc/profile.jpg",
    normalImage = new FakeImage({ "wf-algolia-image": "photo" }),
    previewImage = new FakeImage({ "wf-algolia-image": "photo" });

  populateCard(new FakeCard(normalImage), { photo: source });
  populatePreviewCard(new FakeCard(previewImage), { photo: source });

  for (let image of [normalImage, previewImage]) {
    assert.match(image.getAttribute("srcset"), /tpl=big\.webp 360w/);
    assert.equal(image.getAttribute("sizes"), "auto, 360px");
  }
});

test("supports an explicit opt-out for a Xano image", () => {
  let image = new FakeImage({
    "wf-algolia-srcset": "off",
    srcset: "https://placeholder.test/profile-800.jpg 800w",
  });

  applyImageSource(
    image,
    { off: "https://images.test/unexpected-800.webp 800w" },
    "https://x08a.example.n7c.xano.io/vault/abc/profile.jpg",
  );

  assert.equal(image.getAttribute("srcset"), null);
});
