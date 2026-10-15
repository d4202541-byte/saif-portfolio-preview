// Renders video/motion.html to MP4, frame by frame.
// Usage: node video/render.mjs [en|ar] [--still=SECONDS]
// Needs ffmpeg on PATH. Set CHROMIUM_PATH to use a specific browser binary.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { chromium } from "@playwright/test";

const root = path.resolve(import.meta.dirname, "..");
const lang = process.argv[2] === "ar" ? "ar" : "en";
const still = process.argv.find((a) => a.startsWith("--still="));
const fps = 30;
const outDir = path.join(root, "video", "out");
fs.mkdirSync(outDir, { recursive: true });

const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};
// Serve public-editorial as the site root (fonts, brand), falling back to the repo.
const server = http.createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  for (const base of [path.join(root, "public-editorial"), root]) {
    const file = path.join(base, url);
    if (file.startsWith(base) && fs.existsSync(file) && fs.statSync(file).isFile()) {
      res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
      return fs.createReadStream(file).pipe(res);
    }
  }
  res.writeHead(404).end();
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const { port } = server.address();

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(`http://127.0.0.1:${port}/video/motion.html?lang=${lang}`);
await page.evaluate(() => document.fonts.ready);
await page.waitForLoadState("networkidle");

if (still) {
  const t = Number(still.split("=")[1]);
  await page.evaluate((t) => window.renderAt(t), t);
  const file = path.join(outDir, `still-${lang}-${t}.png`);
  await page.screenshot({ path: file });
  console.log(file);
} else {
  const duration = await page.evaluate(() => window.DURATION);
  const file = path.join(outDir, `saif-intro-${lang}.mp4`);
  const ff = spawn(
    "ffmpeg",
    ["-y", "-f", "image2pipe", "-framerate", String(fps), "-i", "-",
     "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p",
     "-movflags", "+faststart", file],
    { stdio: ["pipe", "ignore", "inherit"] },
  );
  const frames = Math.round(duration * fps);
  for (let f = 0; f < frames; f++) {
    await page.evaluate((t) => window.renderAt(t), f / fps);
    const buf = await page.screenshot({ type: "jpeg", quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
    if (f % 150 === 0) console.log(`${lang}: frame ${f}/${frames}`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on("close", r));
  console.log(file);
}
await browser.close();
server.close();
