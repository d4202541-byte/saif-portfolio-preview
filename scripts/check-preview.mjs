import assert from "node:assert/strict";
import { chromium } from "@playwright/test";
import { services } from "../src/services.js";

const base =
  process.env.PREVIEW_CHECK_URL ||
  "http://127.0.0.1:4174/saif-portfolio-preview/";
const browser = await chromium.launch({ channel: "msedge" });
try {
  for (const width of [390, 768, 1440]) {
    for (const lang of ["en", "ar"]) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("response", (response) => {
        if (response.url().startsWith(base) && response.status() >= 400) {
          errors.push(`${response.status()} ${response.url()}`);
        }
      });
      await page.goto(base + (lang === "ar" ? "ar/" : ""), {
        waitUntil: "networkidle",
      });
      assert.equal(await page.locator("html").getAttribute("lang"), lang);
      assert.equal(
        await page.locator("html").getAttribute("dir"),
        lang === "ar" ? "rtl" : "ltr",
      );
      assert.equal(
        await page.locator('meta[name="robots"]').getAttribute("content"),
        "noindex, nofollow",
      );
      assert.equal(await page.locator("h1").count(), 1);
      assert.equal(await page.locator(".case-card").count(), 3);
      const switcher = page.locator(".language-link");
      assert.equal(
        await switcher.getAttribute("href"),
        new URL(base).pathname + (lang === "en" ? "ar/" : ""),
      );
      await page.locator(".evidence-library summary").click();
      const images = page.locator(".evidence-library img");
      assert.equal(await images.count(), 5);
      for (const img of await images.all()) {
        await img.scrollIntoViewIfNeeded();
        await img.evaluate((el) => el.decode());
        assert.ok(await img.evaluate((el) => el.naturalWidth > 0));
      }
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth + 1,
        ),
      );
      assert.equal(await page.locator('script[src*="clarity.ms"]').count(), 0);
      await switcher.click();
      await page.waitForLoadState("networkidle");
      assert.equal(
        await page.locator("html").getAttribute("lang"),
        lang === "en" ? "ar" : "en",
      );
      assert.deepEqual(errors, []);
      console.log(
        `${width}px ${lang}: project path, navigation, images and layout passed`,
      );
      await context.close();
    }
  }
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.url().startsWith(base) && response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  for (const lang of ["ar", "en"]) {
    const prefix = lang === "ar" ? "ar/" : "";
    await page.goto(base + prefix + "services/", { waitUntil: "networkidle" });
    assert.equal(await page.locator(".service-card").count(), 6);
    for (const service of services) {
      const path = prefix + "services/" + service.slug + "/";
      await page.goto(base + path, { waitUntil: "networkidle" });
      assert.equal(await page.locator("h1").textContent(), service[lang].lead);
      assert.equal(
        await page.locator('link[rel="canonical"]').getAttribute("href"),
        new URL(base).hostname === "127.0.0.1"
          ? "https://d4202541-byte.github.io/saif-portfolio-preview/" + path
          : base + path,
      );
      assert.equal(
        await page.locator('select[name="service"]').inputValue(),
        service[lang].title,
      );
      assert.equal(
        await page.locator('meta[name="robots"]').getAttribute("content"),
        "noindex, nofollow",
      );
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
      await page.locator(".language-link").click();
      await page.waitForLoadState("networkidle");
      assert.equal(
        await page.locator("h1").textContent(),
        service[lang === "ar" ? "en" : "ar"].lead,
      );
    }
    console.log(
      `${lang}: directory and all six service pages passed under the project path`,
    );
  }
  assert.deepEqual(errors, []);
  await context.close();
} finally {
  await browser.close();
}
