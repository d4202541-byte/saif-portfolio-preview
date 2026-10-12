import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  testMatch: "editorial.spec.js",
  timeout: 45000,
  fullyParallel: true,
  workers: 2,
  use: {
    baseURL: "http://127.0.0.1:4176",
    channel: "msedge",
    headless: true,
    launchOptions: { args: ["--use-angle=swiftshader"] },
    trace: "retain-on-failure",
  },
  reporter: "list",
  webServer: {
    command: "npm run preview -- --port 4176 --strictPort",
    url: "http://127.0.0.1:4176",
    reuseExistingServer: true,
  },
});
