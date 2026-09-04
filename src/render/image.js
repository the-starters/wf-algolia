import { getPath } from "../utils/misc.js";
import { sanitizeUrl } from "../utils/sanitize.js";

var autoSizedImages = new WeakSet();

function resolveFallbackValue(hit, fields) {
  for (let field of fields.split("|")) {
    let value = getPath(hit, field.trim());
    if (value != null && value !== "") return String(value);
  }
  return "";
}

export function buildXanoSrcset(sourceUrl) {
  try {
    let url = new URL(sourceUrl),
      isXanoHost =
        url.hostname === "xano.io" || url.hostname.endsWith(".xano.io");
    if (
      url.protocol !== "https:" ||
      !isXanoHost ||
      !url.pathname.includes("/vault/")
    )
      return "";

    return [
      ["tiny", 32],
      ["small", 50],
      ["med", 160],
      ["big", 360],
      ["bigger", 600],
      ["large", 800],
    ]
      .map(([template, width]) => {
        let candidate = new URL(url);
        candidate.searchParams.set("tpl", `${template}.webp`);
        return `${candidate.toString()} ${width}w`;
      })
      .join(", ");
  } catch {
    return "";
  }
}

export function normalizeSrcset(value) {
  if (typeof value !== "string" || value.trim() === "") return "";
  let candidates = value.split(",").map((candidate) => candidate.trim());
  if (candidates.some((candidate) => candidate === "")) return "";

  let normalized = [],
    descriptorType = "",
    descriptorValues = new Set();
  for (let candidate of candidates) {
    let parts = candidate.split(/\s+/),
      url = sanitizeUrl(parts[0]),
      descriptor = parts[1] || "",
      widthMatch = descriptor.match(/^(\d+)w$/),
      densityMatch = descriptor.match(/^(\d+(?:\.\d+)?)x$/),
      currentType = widthMatch ? "w" : "x",
      descriptorValue = widthMatch
        ? Number(widthMatch[1])
        : densityMatch
          ? Number(densityMatch[1])
          : descriptor === ""
            ? 1
            : 0;
    if (url === "#" || parts.length > 2 || descriptorValue <= 0) return "";
    if (descriptorType && descriptorType !== currentType) return "";
    if (descriptorValues.has(descriptorValue)) return "";
    descriptorType = currentType;
    descriptorValues.add(descriptorValue);
    normalized.push(descriptor ? `${url} ${descriptor}` : url);
  }
  return normalized.join(", ");
}

export function applyImageSource(element, hit, sourceUrl) {
  element.removeAttribute("data-src");
  element.removeAttribute("data-srcset");

  element.src = String(sourceUrl || "");

  let srcsetBinding = element.getAttribute("wf-algolia-srcset"),
    xanoSrcset = buildXanoSrcset(element.src),
    srcset = "";
  if (srcsetBinding === "xano" || (srcsetBinding === null && xanoSrcset)) {
    srcset = xanoSrcset;
  } else if (srcsetBinding) {
    srcset = normalizeSrcset(resolveFallbackValue(hit, srcsetBinding));
  }

  if (srcset) {
    element.loading = "lazy";
    if (/\s\d+w(?:,|$)/.test(srcset) && !element.hasAttribute("sizes")) {
      element.setAttribute("sizes", "auto, 360px");
      autoSizedImages.add(element);
    } else if (!/\s\d+w(?:,|$)/.test(srcset) && autoSizedImages.has(element)) {
      element.removeAttribute("sizes");
      autoSizedImages.delete(element);
    }
    element.setAttribute("srcset", srcset);
  } else {
    element.removeAttribute("srcset");
    if (autoSizedImages.has(element)) {
      element.removeAttribute("sizes");
      autoSizedImages.delete(element);
    }
  }
}
