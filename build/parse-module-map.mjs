// Parse docs/MODULE-MAP.md symbol tables into an oldName -> newName map.
// Section 2 (per-module tables): one symbol per row: | `Xx` | `proposedName` | ...
//   (symbol cell may carry a parenthetical line number, e.g. `or` (1957))
// Section 3 (cross-module): rows may pair N symbols with N names:
//   | `Y` / `Je` / `Un` | `emit` / `on` / `off` | ...
//   Rows whose name cell doesn't contain exactly N backticked names are descriptive; skip.
// Cross-module names win on conflict.
import { readFileSync, writeFileSync } from "node:fs";

const md = readFileSync(new URL("../docs/MODULE-MAP.md", import.meta.url), "utf8");

const sec2 = md.slice(md.indexOf("## 2."), md.indexOf("## 3."));
const sec3 = md.slice(md.indexOf("## 3."), md.indexOf("## 4."));

const ticks = (cell) => [...cell.matchAll(/`([^`]+)`/g)].map((m) => m[1].trim());
const isIdent = (s) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(s);

const map = new Map(); // old -> { newName, source }
const notes = [];

function addRow(oldName, newName, source) {
  oldName = oldName.replace(/\s*\(\d+\)\s*$/, "").trim(); // strip `(1957)` style
  if (!isIdent(oldName)) return notes.push({ skipped: oldName, reason: "old name not an identifier", source });
  if (!isIdent(newName)) return notes.push({ skipped: oldName, reason: `proposed name '${newName}' not a valid identifier`, source });
  const prev = map.get(oldName);
  if (prev && prev.newName !== newName) {
    // cross-module wins
    if (source === "cross-module") {
      notes.push({ conflict: oldName, kept: newName, dropped: prev.newName, reason: "cross-module section preferred" });
      map.set(oldName, { newName, source });
    } else {
      notes.push({ conflict: oldName, kept: prev.newName, dropped: newName, reason: "earlier/cross-module entry kept" });
    }
    return;
  }
  map.set(oldName, { newName, source });
}

// Section 2: table rows with exactly one backticked token in cell 1 and cell 2.
for (const line of sec2.split("\n")) {
  if (!line.startsWith("|")) continue;
  const cells = line.split("|").slice(1, -1).map((c) => c.trim());
  if (cells.length < 2) continue;
  if (/^-+$/.test(cells[0].replace(/[:\s]/g, "-"))) continue; // separator
  if (/^Symbol$/i.test(cells[0])) continue; // header
  const olds = ticks(cells[0]);
  const news = ticks(cells[1]);
  if (olds.length === 1 && news.length === 1) addRow(olds[0], news[0], "per-module");
  else if (olds.length >= 1)
    notes.push({ skipped: cells[0], reason: `row shape ${olds.length} symbols / ${news.length} names — not a 1:1 mapping`, source: "per-module" });
}

// Section 3: pairwise slash rows.
for (const line of sec3.split("\n")) {
  if (!line.startsWith("|")) continue;
  const cells = line.split("|").slice(1, -1).map((c) => c.trim());
  if (cells.length < 2) continue;
  if (/^Symbol$/i.test(cells[0]) || /^-+$/.test(cells[0].replace(/[:\s]/g, "-"))) continue;
  const olds = ticks(cells[0]);
  const news = ticks(cells[1]);
  if (olds.length >= 1 && olds.length === news.length) {
    olds.forEach((o, i) => addRow(o, news[i], "cross-module"));
  } else if (olds.length >= 1) {
    notes.push({ skipped: cells[0], reason: `descriptive cross-module row (${olds.length} symbols, ${news.length} names) — per-module names used instead`, source: "cross-module" });
  }
}

// Duplicate-target check (two olds -> same new)
const byNew = new Map();
for (const [o, { newName }] of map) {
  if (byNew.has(newName)) {
    notes.push({ skipped: o, reason: `new name '${newName}' already targeted by '${byNew.get(newName)}'` });
    map.delete(o);
  } else byNew.set(newName, o);
}

const out = Object.fromEntries([...map].map(([o, v]) => [o, v.newName]));
writeFileSync(new URL("./rename-map.raw.json", import.meta.url), JSON.stringify({ map: out, notes }, null, 2));
console.log(`parsed ${Object.keys(out).length} mappings, ${notes.length} notes`);
for (const n of notes) console.log("NOTE:", JSON.stringify(n));
