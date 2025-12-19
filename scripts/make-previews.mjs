import fs from "node:fs";
import path from "node:path";
import { PDFDocument } from "pdf-lib";

async function makePreview(inputPath, outputPath, maxPages = 3) {
  const bytes = fs.readFileSync(inputPath);
  const src = await PDFDocument.load(bytes);
  const out = await PDFDocument.create();

  const total = src.getPageCount();
  const take = Math.min(maxPages, total);

  const pages = await out.copyPages(
    src,
    Array.from({ length: take }, (_, i) => i)
  );
  pages.forEach((p) => out.addPage(p));

  const outBytes = await out.save();
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, outBytes);
  console.log(" Preview created:", outputPath);
}

const paidDir = path.join(process.cwd(), "public/evaltree/paid");
const previewDir = path.join(process.cwd(), "public/evaltree/previews");

const files = fs.readdirSync(paidDir).filter((f) => f.endsWith(".pdf"));

for (const f of files) {
  const inFile = path.join(paidDir, f);
  const outFile = path.join(previewDir, f.replace(".pdf", "-preview.pdf"));
  await makePreview(inFile, outFile, 3);
}
