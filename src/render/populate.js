// render/populate — split from app.carved.js (see docs/MODULE-MAP.md)
import { hideElement, showElement } from "../utils/dom.js";
import { sanitizeHtml, sanitizeUrl } from "../utils/sanitize.js";
import { getPath } from "../utils/misc.js";
import { applySlugifyAttr, evalCondition, formatValue } from "../utils/format.js";
var warnedEmptyAlt = new WeakSet();
export function populateCard(e, t, n) {
  let r = n?.highlightTag || "mark",
    i = `<${r}>`,
    o = `</${r}>`;
  (e.querySelectorAll("[wf-algolia-text]").forEach((l) => {
    try {
      let s = l.getAttribute("wf-algolia-text"),
        c = l.getAttribute("wf-algolia-format"),
        m = l.getAttribute("wf-algolia-highlight") === "true",
        g = s.split("|").map((y) => y.trim()),
        u,
        h = g[0];
      for (let y of g) {
        let b = getPath(t, y);
        if (b != null && b !== "") {
          ((u = b), (h = y));
          break;
        }
      }
      if (c) {
        let y = formatValue(u, c);
        ((l.textContent = y), (l.style.display = y ? "" : "none"));
      } else if (m && h !== void 0 && t._highlightResult?.[h]?.value) {
        let y = sanitizeHtml(t._highlightResult[h].value)
          .replace(/<em>/g, i)
          .replace(/<\/em>/g, o);
        l.innerHTML = y;
      } else l.textContent = u ?? "";
    } catch (s) {
      console.warn("[wf-algolia] populateCard text error:", s);
    }
  }),
    e.querySelectorAll("[wf-algolia-html]").forEach((l) => {
      try {
        let s = l.getAttribute("wf-algolia-html"),
          c = getPath(t, s);
        l.innerHTML = c ? sanitizeHtml(c) : "";
      } catch (s) {
        console.warn("[wf-algolia] populateCard html error:", s);
      }
    }),
    e.querySelectorAll("[wf-algolia-snippet]").forEach((l) => {
      try {
        let s = l.getAttribute("wf-algolia-snippet"),
          c = t._snippetResult?.[s]?.value;
        if (c) {
          let m = sanitizeHtml(c)
            .replace(/<em>/g, i)
            .replace(/<\/em>/g, o);
          l.innerHTML = m;
        } else {
          let m = getPath(t, s);
          l.textContent = m ?? "";
        }
      } catch (s) {
        console.warn("[wf-algolia] populateCard snippet error:", s);
      }
    }),
    e.querySelectorAll("[wf-algolia-image]").forEach((l) => {
      try {
        let s = l.getAttribute("wf-algolia-image").split("|"),
          c = "";
        for (let u of s) {
          let h = getPath(t, u.trim());
          if (h) {
            c = h;
            break;
          }
        }
        (l.removeAttribute("data-src"),
          l.removeAttribute("data-srcset"),
          l.removeAttribute("srcset"),
          (l.src = c || ""));
        let m = l.getAttribute("wf-algolia-alt"),
          g = "";
        if (m !== null) {
          if (m === "") g = "";
          else {
            let u = m.split("|").map((h) => h.trim());
            for (let h of u) {
              let y = getPath(t, h);
              if (y) {
                g = String(y);
                break;
              }
            }
          }
        } else
          ((g = t.name || t.title || ""),
            !g &&
              !warnedEmptyAlt.has(l) &&
              (warnedEmptyAlt.add(l),
              console.warn(
                '[wf-algolia] image has empty alt and no wf-algolia-alt attribute. Add wf-algolia-alt="fieldName" (e.g. imageAlt|name|title), or wf-algolia-alt="" to mark as decorative. See https://wf-algolia-docs.candidleap.com/attribute-reference#wf-algolia-alt',
                l,
              )));
        ((l.alt = g), (l.loading = "lazy"));
      } catch (s) {
        console.warn("[wf-algolia] populateCard image error:", s);
      }
    }),
    e
      .querySelectorAll("[wf-algolia-link], [wf-algolia-link-url]")
      .forEach((l) => {
        try {
          let s = l.getAttribute("wf-algolia-link-url");
          if (s) {
            let h = getPath(t, s);
            l.href = sanitizeUrl(h || "#");
            return;
          }
          let c = l.getAttribute("wf-algolia-link"),
            m =
              l.getAttribute("wf-algolia-link-prefix") ||
              l.getAttribute("wf-algolia-link-folder") ||
              "",
            g = l.getAttribute("wf-algolia-link-suffix") || "",
            u = getPath(t, c);
          l.href = sanitizeUrl(m + applySlugifyAttr(l, u || "") + g);
        } catch (s) {
          console.warn("[wf-algolia] populateCard link error:", s);
        }
      }),
    e.querySelectorAll("[wf-algolia-if]").forEach((l) => {
      let s = l.getAttribute("wf-algolia-if");
      evalCondition(s, t) ? showElement(l) : hideElement(l);
    }));
}
