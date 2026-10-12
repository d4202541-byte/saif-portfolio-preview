import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { services } from "../src/services";

for (const lang of ["ar", "en"]) {
  test(`${lang} service pages have unique static content and working language links`, async ({
    page,
    request,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const prefix = lang === "ar" ? "/ar" : "";
    await page.goto(prefix + "/services/");
    await expect(page.locator(".service-card")).toHaveCount(6);
    const titles = new Set();
    for (const service of services) {
      const path = prefix + "/services/" + service.slug + "/";
      const response = await request.get(path);
      expect(response.ok()).toBe(true);
      const html = await response.text();
      expect(html).toContain(service[lang].lead);
      expect(html).toContain('"@type":"Service"');
      expect(html).toContain("https://saif-growth.com" + path);
      await page.goto(path);
      await expect(page.locator("h1")).toHaveText(service[lang].lead);
      await expect(page.locator("select[name=service]")).toHaveValue(
        service[lang].title,
      );
      await expect(page.locator(".deliverables-grid article")).toHaveCount(4);
      titles.add(await page.title());
      const faq = page.locator(".faq-list details").first();
      await faq.locator("summary").press("Enter");
      await expect(faq).toHaveAttribute("open", "");
      await page.locator(".language-link").click();
      const other = lang === "ar" ? "en" : "ar";
      await expect(page.locator("html")).toHaveAttribute("lang", other);
      await expect(page.locator("h1")).toHaveText(service[other].lead);
    }
    expect(titles.size).toBe(6);
    expect(errors).toEqual([]);
  });
}

for (const width of [390, 768, 1440]) {
  test(`Arabic service layout, local font and accessibility at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const requests = [];
    page.on("request", (request) => requests.push(request.url()));
    await page.goto("/ar/services/analytics-tracking/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page
        .locator("h1")
        .evaluate((el) => getComputedStyle(el).fontFamily),
    ).toContain("Alexandria");
    expect(
      await page.evaluate(() =>
        document.fonts.check('500 16px "Alexandria"', "سيف"),
      ),
    ).toBe(true);
    expect(
      requests.filter((url) => /fonts\.googleapis|fonts\.gstatic/.test(url)),
    ).toHaveLength(0);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
    await page.screenshot({
      path: `artifacts/service-ar-${width}.png`,
      fullPage: true,
    });
  });
}

test("service enquiries identify the selected service and preserve safe encoding", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    window.open = (url) => {
      window.__opened = url;
      return null;
    };
  });
  await page.goto("/ar/services/account-suspensions/");
  await page.locator('input[name="name"]').fill("سيف & فريقه");
  await page.locator('textarea[name="problem"]').fill("مراجعة الحساب & الموقع");
  await page.locator('button[type="submit"]').click();
  const message = new URL(
    await page.evaluate(() => window.__opened),
  ).searchParams.get("text");
  expect(message).toContain("مراجعة تعليق الحسابات الإعلانية");
  expect(message).toContain("سيف & فريقه");
  expect(message).toContain("غير محددة");
  await expect(page.locator(".floating-whatsapp svg")).toBeVisible();
});

test("Arabic service pages and FAQ remain readable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4175/ar/services/paid-media/");
  await expect(page.locator("h1")).toHaveText(services[0].ar.lead);
  await expect(page.locator('button[type="submit"]')).toBeDisabled();
  await page.locator(".faq-list summary").first().click();
  await expect(page.locator(".faq-list details p").first()).toBeVisible();
  await context.close();
});
