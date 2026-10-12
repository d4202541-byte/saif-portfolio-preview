import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const lang of ["en", "ar"]) {
  for (const width of [390, 768, 1440]) {
    test(lang + " layout at " + width, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      const errors = [];
      const requests = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("request", (r) => requests.push(r.url()));
      await page.goto(lang === "ar" ? "/ar/" : "/");
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator(".service-card")).toHaveCount(6);
      await expect(page.locator(".case-card")).toHaveCount(3);
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await page.waitForTimeout(1200);
      expect(
        requests.filter((url) => /scene-.*\.js|HeroScene-.*\.js/.test(url)),
      ).toHaveLength(0);
      expect(errors).toEqual([]);
      const a11y = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(a11y.violations).toEqual([]);
      if (width === 1440 || width === 390)
        await page.screenshot({
          path: "artifacts/" + lang + "-" + width + ".png",
          fullPage: true,
        });
    });
  }
}
test("mobile menu supports keyboard dismissal and section navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const toggle = page.locator(".menu-toggle");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page
    .locator("#primary-navigation")
    .getByRole("link", { name: "Services", exact: true })
    .click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/#services$/);
});
test("evidence opens, loads and restores focus on Escape", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const trigger = page
    .getByRole("button", { name: "View account evidence" })
    .first();
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator(".dialog-image img")
        .evaluate((el) => el.complete && el.naturalWidth > 0),
    )
    .toBe(true);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page.locator("#proof > summary").click();
  await expect(page.locator(".proof-item")).toHaveCount(5);
});
for (const lang of ["en", "ar"])
  test(lang + " enquiry prepares a safe WhatsApp message", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.addInitScript(() => {
      window.open = (url) => {
        window.__opened = url;
        return null;
      };
    });
    await page.goto(lang === "ar" ? "/ar/" : "/");
    await page.locator("input[name=name]").fill("Saif & Team");
    await page
      .locator("input[name=business]")
      .fill("https://example.com/?a=1&b=2");
    await page
      .locator("textarea")
      .fill("Improve measurement & conversion quality.");
    await page.locator("button[type=submit]").click();
    const opened = await page.evaluate(() => window.__opened);
    expect(opened).toContain("https://wa.me/970597200690?text=");
    const message = new URL(opened).searchParams.get("text");
    expect(message).toContain("Saif & Team");
    expect(message).toContain("Improve measurement & conversion quality.");
    await expect(page.locator(".form-status a")).toHaveAttribute(
      "href",
      opened,
    );
  });
test("whitespace input cannot create an enquiry", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    window.open = () => {
      throw new Error("Should not open");
    };
  });
  await page.goto("/");
  await page.locator("input[name=name]").fill("   ");
  await page.locator("textarea").fill("   ");
  await page.locator("button[type=submit]").click();
  await expect(page.locator(".form-status")).toContainText("Please enter");
  await expect(page.locator(".form-status a")).toHaveCount(0);
});
test("static HTML contains usable content without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const path of ["/", "/ar/"]) {
    await page.goto("http://127.0.0.1:4175" + path);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(".service-card")).toHaveCount(6);
    await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
      "href",
      "https://saif-growth.com" + path,
    );
    expect(
      await page.locator('script[type="application/ld+json"]').textContent(),
    ).toContain("Saif Shorfa");
  }
  await context.close();
});
test("desktop WebGL and pause control work without page errors", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator(".webgl-scene canvas")).toBeVisible({
    timeout: 20000,
  });
  await page.getByRole("button", { name: "Pause animation" }).click();
  await expect(
    page.getByRole("button", { name: "Play animation" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.screenshot({ path: "artifacts/desktop-hero.png" });
  expect(errors).toEqual([]);
  await page
    .locator(".webgl-scene canvas")
    .evaluate((canvas) =>
      canvas
        .getContext("webgl2")
        .getExtension("WEBGL_lose_context")
        .loseContext(),
    );
  await expect(page.locator(".orbit-fallback")).toBeVisible();
});

test("ordinary mobile visitors do not download the WebGL scene", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const requests = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.goto("/");
  await page.waitForTimeout(1800);
  await expect(page.locator(".orbit-fallback")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  expect(
    requests.filter((url) => /scene-.*\.js|HeroScene-.*\.js/.test(url)),
  ).toHaveLength(0);
});
