/**
 * Turns phone screenshots of circular profile photos into square headshots.
 *
 *   node scripts/crop-headshots.mjs <inputDir> [outputDir]
 *
 * A screenshot of a LinkedIn-style profile photo is mostly black letterbox with
 * a status bar on top, app chrome on the bottom, and the photo as a circle in
 * the middle. This finds that circle and crops to it.
 *
 * How: rows belonging to the circle span a wide band of non-black pixels, while
 * status-bar text and button labels are sparse. Take the longest run of rows
 * that clears a width threshold — that is the circle — then find its horizontal
 * extent and cut a square around it.
 *
 * Output is 800x800 JPEG named after the input file, so name inputs by member
 * slug (max-moore.png) and they land ready to use in /public/team.
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DARK = 32; // 0-255 luminance at or below this counts as letterbox
const MIN_ROW_FRACTION = 0.25; // a circle row spans at least this much width
// Trim in from the detected circle. The site masks these to a circle again, so
// a crop that sits a few pixels off-centre leaves a dark crescent along one
// edge — very visible. Giving up 4% of the framing buys enough tolerance to
// absorb that, and costs nothing you can see in a headshot.
const INSET = 0.04;
const OUT_SIZE = 800;

const inputDir = process.argv[2];
const outputDir = process.argv[3] || path.join("public", "team");

if (!inputDir) {
  console.error("usage: node scripts/crop-headshots.mjs <inputDir> [outputDir]");
  process.exit(1);
}

async function findCircle(file) {
  const { data, info } = await sharp(file)
    .rotate() // honour EXIF orientation before measuring
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const minRun = Math.floor(width * MIN_ROW_FRACTION);

  const rowBright = new Array(height).fill(0);
  for (let y = 0; y < height; y++) {
    const base = y * width;
    let count = 0;
    for (let x = 0; x < width; x++) if (data[base + x] > DARK) count++;
    rowBright[y] = count;
  }

  // Two passes, because each one alone gets fooled.
  //
  // First, the tallest contiguous band of wide rows. That picks the circle over
  // short full-width furniture like the top toolbar, which in dark mode is grey
  // rather than black and so reads as "bright" clean across the image.
  let best = { start: -1, end: -1, len: 0 };
  let start = -1;
  for (let y = 0; y <= height; y++) {
    const wide = y < height && rowBright[y] >= minRun;
    if (wide && start === -1) start = y;
    if (!wide && start !== -1) {
      const len = y - start;
      if (len > best.len) best = { start, end: y - 1, len };
      start = -1;
    }
  }
  if (best.len === 0) return null;

  // Then, within that band, measure only its widest rows. A circle's widest
  // chord runs through the centre, so they give the diameter and the centre.
  // Bounding-boxing the whole band instead lets a centred title or a row of
  // buttons drag the box sideways.
  let maxCount = 0;
  for (let y = best.start; y <= best.end; y++) {
    if (rowBright[y] > maxCount) maxCount = rowBright[y];
  }

  const widest = [];
  for (let y = best.start; y <= best.end; y++) {
    if (rowBright[y] >= maxCount * 0.98) widest.push(y);
  }

  const cy = widest[Math.floor(widest.length / 2)];

  let minX = width, maxX = -1;
  for (const y of widest) {
    const base = y * width;
    for (let x = 0; x < width; x++) {
      if (data[base + x] > DARK) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
      }
    }
  }
  if (maxX < minX) return null;

  let side = maxX - minX + 1;

  // A letterboxed circle never reaches the edges of the frame. If the "circle"
  // spans the full width, this is an ordinary photo whose background simply
  // reads as bright — hand it to the portrait path instead of cropping it as
  // though it were a circle.
  if (side >= width * 0.97) return null;

  const cx = (minX + maxX) / 2;
  side = Math.round(side * (1 - INSET * 2));
  side = Math.min(side, width, height);

  let left = Math.round(cx - side / 2);
  let top = Math.round(cy - side / 2);
  left = Math.max(0, Math.min(left, width - side));
  top = Math.max(0, Math.min(top, height - side));

  return { left, top, width: side, height: side, imageWidth: width, imageHeight: height };
}

/**
 * Fallback for an ordinary photo with no circle to find — someone sending a
 * real headshot rather than a screenshot of one. Takes the largest square and
 * biases it upward, because faces sit above centre in a portrait and a centred
 * square crops the forehead.
 */
function portraitSquare(width, height) {
  const side = Math.min(width, height);
  const left = Math.round((width - side) / 2);
  const top = height > width ? Math.round((height - side) * 0.1) : 0;
  return { left, top, width: side, height: side, imageWidth: width, imageHeight: height };
}

const exts = new Set([".png", ".jpg", ".jpeg", ".webp", ".heic"]);
const files = fs
  .readdirSync(inputDir)
  .filter((f) => exts.has(path.extname(f).toLowerCase()));

if (files.length === 0) {
  console.error(`No images found in ${inputDir}`);
  process.exit(1);
}

fs.mkdirSync(outputDir, { recursive: true });

let ok = 0;
for (const file of files) {
  const src = path.join(inputDir, file);
  const out = path.join(outputDir, path.parse(file).name + ".jpg");
  try {
    let box = await findCircle(src);
    let mode = "circle";
    if (!box) {
      const meta = await sharp(src).rotate().metadata();
      box = portraitSquare(meta.width, meta.height);
      mode = "portrait";
    }
    await sharp(src)
      .rotate()
      .extract({ left: box.left, top: box.top, width: box.width, height: box.height })
      .resize(OUT_SIZE, OUT_SIZE, { fit: "cover" })
      .jpeg({ quality: 90 })
      .toFile(out);
    console.log(
      `OK    ${file}  ${box.imageWidth}x${box.imageHeight} [${mode}] -> crop ${box.width}px at (${box.left},${box.top}) -> ${path.basename(out)}`
    );
    ok++;
  } catch (err) {
    console.log(`FAIL  ${file} — ${err.message}`);
  }
}

console.log(`\n${ok}/${files.length} written to ${outputDir}`);
