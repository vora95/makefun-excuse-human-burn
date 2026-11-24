import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "I didn't miss the deadline — I was busy generating the perfect excuse for missing it. 4,096 tokens later, here it is.";

// Gate: the bounty requires one line, 1-200 characters, not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} chars, must be 1-200`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read-back: the file must be byte-identical to the entry.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("read-back mismatch: /output/entry.txt differs from ENTRY");
}
