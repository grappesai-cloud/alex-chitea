import sharp from "sharp";
import { readdir, stat, rename } from "node:fs/promises";
import path from "node:path";

const DIR = path.resolve("public/media/gallery");

async function main() {
  const files = (await readdir(DIR)).filter((f) => /\.(jpe?g|avif)$/i.test(f));
  let totalBefore = 0, totalAfter = 0;
  for (const name of files) {
    const full = path.join(DIR, name);
    const before = (await stat(full)).size;
    totalBefore += before;
    const ext = path.extname(name).toLowerCase();
    const tmp = full + ".tmp";
    try {
      const pipeline = sharp(full, { failOn: "none" }).rotate().resize({
        width: 1600, height: 1600, fit: "inside", withoutEnlargement: true,
      });
      if (ext === ".avif") {
        await pipeline.avif({ quality: 48, effort: 4 }).toFile(tmp);
      } else {
        await pipeline.jpeg({ quality: 72, mozjpeg: true, progressive: true }).toFile(tmp);
      }
      const after = (await stat(tmp)).size;
      if (after < before) {
        await rename(tmp, full);
        totalAfter += after;
        console.log(`${name}: ${(before/1024).toFixed(0)}K → ${(after/1024).toFixed(0)}K`);
      } else {
        totalAfter += before;
        console.log(`${name}: skipped (${(before/1024).toFixed(0)}K)`);
      }
    } catch (e) {
      console.log(`${name}: error`, e.message);
      totalAfter += before;
    }
  }
  console.log(`\nTotal: ${(totalBefore/1024/1024).toFixed(1)}MB → ${(totalAfter/1024/1024).toFixed(1)}MB (${((1 - totalAfter/totalBefore)*100).toFixed(0)}% saved)`);
}
main();
