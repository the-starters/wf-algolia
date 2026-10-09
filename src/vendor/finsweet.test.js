import assert from "node:assert/strict";
import { test } from "node:test";
import { restartIx2 } from "../utils/misc.js";
import { restartWebflow } from "./finsweet.js";

// Providerless Webflow contract fixture. IX2 can be registered before the
// generated page script imports ixData.mediaQueries. Its native initializer
// reads that array's length when it starts the session.
function webflowFixture(t, { mediaQueries, missingIxData = false } = {}) {
  const previousWindow = globalThis.window;
  const previousDocument = globalThis.document;
  t.after(() => {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
  });

  const calls = [];
  const authoredData = {
    mediaQueries,
    actionLists: { "authored-animation": { id: "authored-animation" } },
    events: { "authored-event": { id: "authored-event" } },
  };
  const state = {
    ixData: missingIxData ? undefined : authoredData,
    ixSession: {
      eventState: {
        "authored-event:0": { elementHovered: true },
        "authored-event:1": { clickCount: 1 },
      },
    },
  };
  const ix2 = {
    store: {
      getState: () => state,
      dispatch(action) {
        calls.push(["dispatch", action]);
        state.ixSession.eventState[action.key] = action.value;
      },
    },
    actions: {
      eventStateChanged: (key, value) => ({ type: "eventStateChanged", key, value }),
    },
    destroy() {
      calls.push(["ix2.destroy"]);
    },
    init(...args) {
      calls.push(["ix2.init", args]);
      const queries = state.ixData?.mediaQueries;
      // Execute the failing native contract, rather than checking source text.
      const queryCount = queries.length;
      calls.push(["ix2.mediaQueryCount", queryCount]);
      state.ixSession.eventState = {};
    },
  };
  const modules = {
    ix2,
    commerce: {
      destroy: () => calls.push(["commerce.destroy"]),
      init: (options) => calls.push(["commerce.init", options]),
    },
    lightbox: { ready: () => calls.push(["lightbox.ready"]) },
    slider: {
      redraw: () => calls.push(["slider.redraw"]),
      ready: () => calls.push(["slider.ready"]),
    },
    tabs: { redraw: () => calls.push(["tabs.redraw"]) },
  };
  globalThis.window = {
    Webflow: {
      destroy: () => calls.push(["Webflow.destroy"]),
      ready: () => calls.push(["Webflow.ready"]),
      require: (name) => modules[name],
      push: (callback) => {
        calls.push(["Webflow.push"]);
        callback();
      },
    },
  };
  globalThis.document = {
    documentElement: {
      getAttribute: (name) => (name === "data-wf-site" ? "fixture-site" : null),
    },
  };
  return { calls, state, authoredData, ix2, modules };
}

test("skips registered IX2 until the generated page imports mediaQueries", async (t) => {
  const fixture = webflowFixture(t);
  const originalEventState = fixture.state.ixSession.eventState;

  await restartWebflow(["ix2"]);

  assert.deepEqual(fixture.calls, [["Webflow.push"]]);
  assert.equal(fixture.state.ixSession.eventState, originalEventState);

  // The next render can restart IX2 after the ordinary generated page import.
  fixture.state.ixData.mediaQueries = [{ key: "main", min: 992, max: 10000 }];
  await restartWebflow(["ix2"]);
  assert.deepEqual(fixture.calls.filter(([name]) => name === "ix2.init"), [
    ["ix2.init", []],
  ]);
  assert.deepEqual(fixture.state.ixSession.eventState, originalEventState);
});

test("skips IX2 when ixData has not been imported", async (t) => {
  const fixture = webflowFixture(t, { missingIxData: true });
  await restartWebflow(["ix2"]);
  assert.deepEqual(fixture.calls, [["Webflow.push"]]);
});

test("skips malformed mediaQueries rather than treating it as readiness", async (t) => {
  const fixture = webflowFixture(t, { mediaQueries: { length: 1 } });
  await restartWebflow(["ix2"]);
  assert.deepEqual(fixture.calls, [["Webflow.push"]]);
});

for (const mediaQueries of [[], [{ key: "main", min: 992, max: 10000 }]]) {
  test(`restarts ready IX2 with ${mediaQueries.length} media queries and restores event state`, async (t) => {
    const fixture = webflowFixture(t, { mediaQueries });
    const originalAuthoredData = globalThis.structuredClone(fixture.authoredData);
    const originalEventState = fixture.state.ixSession.eventState;
    const originalEntries = Object.entries(originalEventState);

    await restartWebflow(["ix2"]);

    assert.deepEqual(fixture.calls.filter(([name]) => name === "ix2.init"), [
      ["ix2.init", []],
    ]);
    assert.equal(fixture.state.ixData, fixture.authoredData);
    assert.deepEqual(fixture.state.ixData, originalAuthoredData);
    assert.equal(fixture.state.ixData.mediaQueries, mediaQueries);
    assert.deepEqual(fixture.state.ixSession.eventState, originalEventState);
    for (const [key, value] of originalEntries) {
      assert.equal(fixture.state.ixSession.eventState[key], value);
    }
    assert.deepEqual(
      fixture.calls.filter(([name]) => name === "dispatch").map(([, action]) => action),
      originalEntries.map(([key, value]) => ({ type: "eventStateChanged", key, value })),
    );
    assert.equal(fixture.calls.some(([name]) => name === "ix2.destroy"), false);
  });
}

test("does nothing when the IX2 module is absent", async (t) => {
  const fixture = webflowFixture(t);
  delete fixture.modules.ix2;
  await restartWebflow(["ix2"]);
  assert.deepEqual(fixture.calls, [["Webflow.push"]]);
});

test("unready IX2 does not skip requested commerce or other modules", async (t) => {
  const fixture = webflowFixture(t);
  await restartWebflow(["ix2", "commerce", "lightbox", "slider", "tabs"]);
  assert.deepEqual(fixture.calls, [
    ["commerce.destroy"],
    ["commerce.init", { siteId: "fixture-site", apiUrl: "https://render.webflow.com" }],
    ["lightbox.ready"],
    ["slider.redraw"],
    ["slider.ready"],
    ["tabs.redraw"],
    ["Webflow.push"],
  ]);
});

test("a full restart retains Webflow and commerce behavior when IX2 is unready", async (t) => {
  const fixture = webflowFixture(t);
  await restartWebflow();
  assert.deepEqual(fixture.calls, [
    ["Webflow.destroy"],
    ["Webflow.ready"],
    ["commerce.destroy"],
    ["commerce.init", { siteId: "fixture-site", apiUrl: "https://render.webflow.com" }],
    ["Webflow.push"],
  ]);
});

test("a full ready restart retains IX2 destruction and restores its event state", async (t) => {
  const fixture = webflowFixture(t, { mediaQueries: [] });
  const originalEventState = fixture.state.ixSession.eventState;
  await restartWebflow();
  assert.deepEqual(fixture.calls.slice(0, 5), [
    ["Webflow.destroy"],
    ["Webflow.ready"],
    ["ix2.destroy"],
    ["ix2.init", []],
    ["ix2.mediaQueryCount", 0],
  ]);
  assert.deepEqual(fixture.state.ixSession.eventState, originalEventState);
  assert.equal(fixture.state.ixData, fixture.authoredData);
});

for (const failureStage of ["initialization", "event-state restoration"]) {
  test(`restartIx2 catches rejected ${failureStage} and preserves its warning`, async (t) => {
    const fixture = webflowFixture(t, { mediaQueries: [] });
    const failure = new Error(`fixture ${failureStage} failure`);
    if (failureStage === "initialization") fixture.ix2.init = () => { throw failure; };
    else fixture.ix2.store.dispatch = () => Promise.reject(failure);
    const warnings = [];
    const previousWarn = console.warn;
    console.warn = (...args) => warnings.push(args);
    t.after(() => { console.warn = previousWarn; });

    await assert.doesNotReject(async () => restartIx2());

    assert.deepEqual(warnings, [
      ["[wf-algolia] Could not restart Webflow interactions:", failure],
    ]);
  });
}
