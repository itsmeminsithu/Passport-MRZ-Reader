import assert from "node:assert/strict";
import { checkDigit, extractMrzLines, normalizeOcrText, parseMRZ } from "../src/mrz-parser.js";

const sample = `P<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<
L898902C36UTO7408122F1204159ZE184226B<<<<<10`;

const normalized = normalizeOcrText(sample);
const lines = extractMrzLines(normalized);
const parsed = parseMRZ(lines);

assert.equal(lines.length, 2);
assert.equal(parsed.format, "TD3 passport");
assert.equal(parsed.surname, "ERIKSSON");
assert.equal(parsed.givenNames, "ANNA MARIA");
assert.equal(parsed.documentNumber, "L898902C3");
assert.equal(parsed.nationality, "UTO");
assert.equal(parsed.birthDate, "1974-08-12");
assert.equal(parsed.expirationDate, "2012-04-15");
assert.equal(parsed.valid, true);

assert.equal(checkDigit("L898902C3"), 6);
assert.equal(checkDigit("740812"), 2);
assert.equal(checkDigit("120415"), 9);

const noisy = `random text
P<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<
L898902C36UTO7408122F1204159ZE184226B<<<<<10
other text`;
assert.deepEqual(extractMrzLines(normalizeOcrText(noisy)), lines);


const manualWithLabels = `MRZ:
P<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<
L898902C36UTO7408122F1204159ZE184226B<<<<<10`;
const manualParsed = parseMRZ(extractMrzLines(normalizeOcrText(manualWithLabels)));
assert.equal(manualParsed.valid, true);
assert.equal(manualParsed.surname, "ERIKSSON");

const oneLineManual = `P<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<< L898902C36UTO7408122F1204159ZE184226B<<<<<10`;
const oneLineParsed = parseMRZ(extractMrzLines(normalizeOcrText(oneLineManual)));
assert.equal(oneLineParsed.valid, true);
assert.equal(oneLineParsed.documentNumber, "L898902C3");


const td1Lines = [
  "I<UTOD231458907<<<<<<<<<<<<<<<",
  "7408122F1204159UTO<<<<<<<<<<<6",
  "ERIKSSON<<ANNA<MARIA<<<<<<<<<<"
];
const td1OneLine = td1Lines.join("");
assert.deepEqual(extractMrzLines(normalizeOcrText(td1OneLine)), td1Lines);
const td1Parsed = parseMRZ(extractMrzLines(normalizeOcrText(td1OneLine)));
assert.equal(td1Parsed.format, "TD1 identity card");
assert.equal(td1Parsed.surname, "ERIKSSON");

console.log("MRZ parser tests passed.");
