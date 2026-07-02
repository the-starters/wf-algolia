// vendor/finsweet — split from app.carved.js (see docs/MODULE-MAP.md)
export var WEBFLOW_CSS = {
  formBlock: "w-form",
  checkboxField: "w-checkbox",
  checkboxInput: "w-checkbox-input",
  radioField: "w-radio",
  radioInput: "w-radio-input",
  checkboxOrRadioLabel: "w-form-label",
  checkboxOrRadioFocus: "w--redirected-focus",
  checkboxOrRadioChecked: "w--redirected-checked",
  successMessage: "w-form-done",
  errorMessage: "w-form-fail",
};
var getSiteId = (e = document) =>
  e.documentElement.getAttribute("data-wf-site");
export var restartWebflow = async (e) => {
  let { Webflow: t } = window;
  if (
    !(!t || !("destroy" in t) || !("ready" in t) || !("require" in t)) &&
    !(e && !e.length)
  ) {
    if ((e || (t.destroy(), t.ready()), !e || e.includes("ix2"))) {
      let n = t.require("ix2");
      if (n) {
        let { store: r, actions: i } = n,
          { eventState: o } = r.getState().ixSession,
          l = Object.entries(o);
        (e || n.destroy(),
          n.init(),
          await Promise.all(
            l.map((s) => r.dispatch(i.eventStateChanged(...s))),
          ));
      }
    }
    if (!e || e.includes("commerce")) {
      let n = t.require("commerce"),
        r = getSiteId();
      n &&
        r &&
        (n.destroy(),
        n.init({
          siteId: r,
          apiUrl: "https://render.webflow.com",
        }));
    }
    if (
      (e?.includes("lightbox") && t.require("lightbox")?.ready(),
      e?.includes("slider"))
    ) {
      let n = t.require("slider");
      n && (n.redraw(), n.ready());
    }
    return (
      e?.includes("tabs") && t.require("tabs")?.redraw(),
      new Promise((n) => t.push(() => n(void 0)))
    );
  }
};
