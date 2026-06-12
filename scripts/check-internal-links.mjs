import { readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const feRoot = resolve(scriptDir, "../HARNESS_LANDINGPAGE");

const htmlFiles = [
  join(feRoot, "index.html"),
  join(feRoot, "article/index.html"),
];

const hrefPattern = /(?:href|src)=["']([^"']+)["']/g;

const failures = [];

for (const htmlPath of htmlFiles) {
  const baseDir = dirname(htmlPath);
  const content = readFileSync(htmlPath, "utf8");
  let match;

  while ((match = hrefPattern.exec(content)) !== null) {
    const raw = match[1].trim();
    if (
      !raw ||
      raw.startsWith("#") ||
      raw.startsWith("http://") ||
      raw.startsWith("https://") ||
      raw.startsWith("mailto:") ||
      raw.startsWith("javascript:")
    ) {
      continue;
    }

    const pathPart = raw.split("#")[0].split("?")[0];
    if (!pathPart) continue;

    const target = resolve(baseDir, pathPart);
    if (!existsSync(target)) {
      failures.push(`${htmlPath}: broken link "${raw}" → ${target}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Internal link check failed:\n" + failures.join("\n"));
  process.exit(1);
}

console.log("Internal links OK (" + htmlFiles.length + " HTML files)");
