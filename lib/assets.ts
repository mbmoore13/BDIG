import fs from "node:fs";
import path from "node:path";

const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

/**
 * Looks for /public/<dir>/<basename>.<ext> on disk and returns the public URL,
 * or null if no file is there.
 *
 * This runs on the server at build time, which is what lets a headshot be added
 * by dropping a file into /public with no code change.
 * Server components only — it touches the filesystem.
 */
export function findPublicAsset(dir: string, basename: string): string | null {
  for (const ext of EXTENSIONS) {
    const filename = `${basename}${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", dir, filename))) {
      return `/${dir}/${filename}`;
    }
  }
  return null;
}
