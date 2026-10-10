import { chromium } from "@playwright/test";
import fs from "node:fs";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const context = await browser.newContext({
  viewport: { width: 1200, height: 630 },
});
const page = await context.newPage();
await page.setContent(fs.readFileSync("public/social.svg", "utf8"));
await page.addStyleTag({ content: "body{margin:0}" });
await page.screenshot({ path: "public/social.png" });
await browser.close();
