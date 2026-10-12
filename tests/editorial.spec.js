import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";
fs.mkdirSync("artifacts/editorial-qa", { recursive: true });
for (const lang of ["en", "ar"])
  for (const width of [375, 390, 768, 1024, 1280, 1440]) {
    test(`${lang} homepage ${width}px: layout, accessibility and local fonts`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 960 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(lang === "ar" ? "/ar/" : "/");
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toContainText(
        lang === "ar" ? "سيف" : "Meet Saif",
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      ).toBe(true);
      expect(
        await page
          .locator(".hero-portrait img")
          .evaluate((el) => el.complete && el.naturalWidth > 0),
      ).toBe(true);
      expect(
        await page.evaluate(() =>
          document.fonts.check('500 30px "Bodoni Moda"'),
        ),
      ).toBe(true);
      if (lang === "ar")
        expect(
          await page.evaluate(() =>
            document.fonts.check('400 20px "IBM Plex Sans Arabic"'),
          ),
        ).toBe(true);
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(axe.violations).toEqual([]);
      expect(errors).toEqual([]);
      await page.screenshot({
        path: `artifacts/editorial-qa/${lang}-${width}.png`,
      });
    });
  }
test("mobile navigation, language route and dialog keyboard flow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.locator(".menu-toggle");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page
    .locator("#navigation")
    .getByText("Selected work", { exact: true })
    .click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  const opener = page.getByRole("button", { name: "Read the case" }).first();
  await opener.click();
  await expect(page.locator("dialog")).toBeVisible();
  await expect(page.locator("dialog")).toContainText(
    "not the same as confirmed medical bookings",
  );
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog")).not.toBeVisible();
  await expect(opener).toBeFocused();
  await page.locator(".language-link").click();
  await expect(page).toHaveURL(/\/ar\/$/);
});
for (const lang of ["en", "ar"])
  test(`${lang}: contact encodes fields and does not submit before action`, async ({
    page,
  }) => {
    await page.goto(lang === "ar" ? "/ar/" : "/");
    await page.locator("input[name=name]").fill("Saif & فريق");
    await page
      .locator("input[name=business]")
      .fill("https://example.com/?a=1&b=2");
    await page.locator("select[name=platform]").selectOption({ index: 3 });
    await page.locator("textarea").fill("Testing + growth & تحسين");
    const popupPromise = page.waitForEvent("popup");
    await page.locator("button[type=submit]").click();
    const popup = await popupPromise;
    await expect(page.locator(".form-status a")).toHaveAttribute(
      "href",
      /^https:\/\/wa.me\/970597200690\?text=/,
    );
    const url = await page.locator(".form-status a").getAttribute("href");
    const text = new URL(url).searchParams.get("text");
    expect(text).toContain("Saif & فريق");
    expect(text).toContain("https://example.com/?a=1&b=2");
    expect(text).toContain("Testing + growth & تحسين");
    await popup.close();
  });
for (const lang of ["en", "ar"])
  for (const slug of ["meta-ads", "google-ads"])
    test(`${lang} ${slug}: direct service route and language preserves service`, async ({
      page,
      request,
    }) => {
      const path = (lang === "ar" ? "/ar" : "") + "/services/" + slug + "/";
      const response = await request.get(path);
      const html = await response.text();
      expect(html).toContain("application/ld+json");
      expect(html).toContain('"@type":"Service"');
      expect(html).toContain("saif-growth.com" + path);
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(path);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      ).toBe(true);
      await expect(page.locator("select[name=platform]")).not.toHaveValue("");
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(axe.violations).toEqual([]);
      await page.locator(".language-link").click();
      await expect(page).toHaveURL(new RegExp("/services/" + slug + "/$"));
    });
test("server-rendered content and safe form without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4176/ar/");
  await expect(page.locator("h1")).toContainText("سيف");
  await expect(page.locator("input[name=name]")).toBeDisabled();
  await expect(page.locator("noscript a")).toHaveAttribute(
    "href",
    "https://wa.me/970597200690",
  );
  await context.close();
});
test("unknown routes show a recovery link", async ({ page }) => {
  await page.goto("/services/technical-seo/");
  await expect(page.locator("h1")).toHaveText("This page has moved.");
  await expect(page.locator(".notfound a")).toHaveAttribute("href", "/");
});
