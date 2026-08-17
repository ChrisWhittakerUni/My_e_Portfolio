/**
 * Writes a minimal, valid one-page PDF to public/resume.pdf so the
 * "Download résumé" button works out of the box. Replace that file with your
 * real résumé — or re-run `node scripts/generate-placeholder-resume.mjs`
 * after editing the lines below.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "resume.pdf");

const lines = [
  { text: "Chris Whittaker", size: 24, gap: 34 },
  { text: "Electronics & Systems Engineer", size: 13, gap: 40 },
  { text: "PLACEHOLDER RESUME", size: 11, gap: 22 },
  { text: "Replace public/resume.pdf with your real document.", size: 11, gap: 30 },
  { text: "Cape Town, South Africa", size: 11, gap: 18 },
  { text: "chriswhittaker2004@gmail.com", size: 11, gap: 18 },
  { text: "github.com/WHTCHR013", size: 11, gap: 18 },
];

const escape = (text) => text.replace(/([\\()])/g, "\\$1");

let y = 760;
const content = lines
  .map(({ text, size, gap }) => {
    const block = `BT /F1 ${size} Tf 72 ${y} Td (${escape(text)}) Tj ET`;
    y -= gap;
    return block;
  })
  .join("\n");

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>",
  `<< /Length ${Buffer.byteLength(content, "latin1")} >>\nstream\n${content}\nendstream`,
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
];

let pdf = "%PDF-1.4\n";
const offsets = [];

objects.forEach((body, index) => {
  offsets.push(Buffer.byteLength(pdf, "latin1"));
  pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
});

const xrefOffset = Buffer.byteLength(pdf, "latin1");
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (const offset of offsets) {
  pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, Buffer.from(pdf, "latin1"));
console.log(`Wrote ${OUT} (${Buffer.byteLength(pdf, "latin1")} bytes)`);
