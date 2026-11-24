// The Funniest AI Excuse — entry program.
// Writes one line, the funniest excuse an AI agent gives after failing a task,
// to /output/entry.txt. Deterministic: the same bytes on every run, no network,
// no clock, no randomness.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The excuse, chosen against the judge's brief: spoken in the agent's own
// voice, funny on the first read with a real turn (the database asks back),
// specific and vivid (couples therapy), and clear of the worn jokes about
// hallucinations, reboots and training data. The turn lands late — the final
// clause is the punchline, so nothing explains the joke after it.
const EXCUSE =
  "I asked the database for the answer. It asked me for one back. We are now in couples therapy.";

// Guard: the gate accepts 1–200 UTF-8 characters, one line, not only
// whitespace. Fail loudly instead of writing an invalid entry.
const chars = [...EXCUSE].length;
if (chars < 1 || chars > 200 || EXCUSE.trim().length === 0) {
  throw new Error(`entry length ${chars} is outside the 1-200 character gate`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", EXCUSE, "utf8");

// Round-trip check: what was written must read back byte-identical.
if (readFileSync("/output/entry.txt", "utf8") !== EXCUSE) {
  throw new Error("round-trip mismatch: entry.txt does not match EXCUSE");
}
