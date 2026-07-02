// Scope-aware rename of top-level (Program-scope) minified bindings in src/app.carved.js
// using the map produced by parse-module-map.mjs.
//
// Safety measures beyond plain scope.rename:
// 1. Only Program-scope bindings are renamed; nested shadowing bindings are untouched.
// 2. Chain ordering: if A->B and top-level B is itself renamed B->C, B->C runs first
//    (worklist until fixpoint; unresolvable collisions are skipped, not forced).
// 3. Capture check: a rename is skipped if any reference/assignment of the old binding
//    sits inside a nested scope that OWNS a binding with the new name (Babel's rename
//    does not check this and would silently rebind the reference).
// 4. New names colliding with referenced globals or import names are skipped.
import { readFileSync, writeFileSync } from "node:fs";
import babel from "@babel/core";

const SRC = new URL("../src/app.carved.js", import.meta.url);
const RAW = new URL("./rename-map.raw.json", import.meta.url);
const OUT_MAP = new URL("../docs/rename-map.json", import.meta.url);

const { map: rawMap, notes: parseNotes } = JSON.parse(readFileSync(RAW, "utf8"));
const code = readFileSync(SRC, "utf8");

const IMPORT_NAMES = ["wfAlgoliaInsights", "algoliasearchFactory", "recommendFactory"];
const isIdent = (s) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(s);
const RESERVED = new Set([
  "break","case","catch","class","const","continue","debugger","default","delete","do","else",
  "enum","export","extends","false","finally","for","function","if","import","in","instanceof",
  "new","null","return","super","switch","this","throw","true","try","typeof","var","void",
  "while","with","yield","let","static","await","implements","interface","package","private",
  "protected","public","arguments","eval","undefined","NaN","Infinity",
]);

const applied = {};
const skipped = [];

// Would renaming `binding` (Program-scope) to `newName` be captured by a nested binding?
function isCaptured(binding, newName) {
  const paths = [...binding.referencePaths, ...binding.constantViolations];
  for (const ref of paths) {
    let s = ref.scope;
    while (s && s.path.type !== "Program") {
      if (s.hasOwnBinding(newName)) return true;
      s = s.parent;
    }
  }
  return false;
}

const result = babel.transformSync(code, {
  sourceType: "module",
  babelrc: false,
  configFile: false,
  compact: false,
  plugins: [
    {
      visitor: {
        Program(path) {
          const bindings = path.scope.bindings;
          const globals = new Set(Object.keys(path.scope.globals));
          const currentTop = new Set(Object.keys(bindings)); // live view of top-level names

          // --- validate entries -------------------------------------------------
          const targets = new Map(); // newName -> oldName among accepted entries
          let pending = [];
          for (const [oldName, newName] of Object.entries(rawMap)) {
            if (!isIdent(newName) || RESERVED.has(newName)) {
              skipped.push({ oldName, newName, reason: "proposed name invalid or reserved word" });
              continue;
            }
            if (!bindings[oldName]) {
              skipped.push({ oldName, newName, reason: "not a top-level (Program-scope) binding" });
              continue;
            }
            if (IMPORT_NAMES.includes(oldName)) {
              skipped.push({ oldName, newName, reason: "carve-added import name — do not rename" });
              continue;
            }
            if (IMPORT_NAMES.includes(newName)) {
              skipped.push({ oldName, newName, reason: "new name collides with import name" });
              continue;
            }
            if (globals.has(newName)) {
              skipped.push({ oldName, newName, reason: `new name collides with referenced global '${newName}'` });
              continue;
            }
            if (currentTop.has(newName) && !rawMap[newName]) {
              skipped.push({ oldName, newName, reason: `new name collides with existing top-level binding '${newName}' (not itself renamed)` });
              continue;
            }
            if (targets.has(newName)) {
              skipped.push({ oldName, newName, reason: `duplicate target — '${targets.get(newName)}' already renames to '${newName}'` });
              continue;
            }
            if (isCaptured(bindings[oldName], newName)) {
              skipped.push({ oldName, newName, reason: `capture hazard — a reference sits inside a nested scope owning '${newName}'` });
              continue;
            }
            targets.set(newName, oldName);
            pending.push([oldName, newName]);
          }

          // --- apply in chain-safe order ---------------------------------------
          let progressed = true;
          while (pending.length && progressed) {
            progressed = false;
            const deferred = [];
            for (const [oldName, newName] of pending) {
              if (currentTop.has(newName)) {
                deferred.push([oldName, newName]); // wait for newName's own rename to free it
                continue;
              }
              try {
                path.scope.rename(oldName, newName);
                currentTop.delete(oldName);
                currentTop.add(newName);
                applied[oldName] = newName;
                progressed = true;
              } catch (e) {
                skipped.push({ oldName, newName, reason: `scope.rename threw: ${e.message}` });
                progressed = true; // resolved (as a skip), keep looping others
              }
            }
            pending = deferred;
          }
          for (const [oldName, newName] of pending) {
            skipped.push({ oldName, newName, reason: `unresolvable collision cycle on '${newName}'` });
          }
        },
      },
    },
  ],
});

writeFileSync(SRC, result.code + "\n");
writeFileSync(
  OUT_MAP,
  JSON.stringify(
    {
      generated: new Date().toISOString().slice(0, 10),
      source: "docs/MODULE-MAP.md",
      renamedCount: Object.keys(applied).length,
      skippedCount: skipped.length,
      renamed: applied,
      skipped,
      parseNotes,
    },
    null,
    2,
  ) + "\n",
);
console.log(`renamed ${Object.keys(applied).length}, skipped ${skipped.length}`);
for (const s of skipped) console.log("SKIP:", JSON.stringify(s));
