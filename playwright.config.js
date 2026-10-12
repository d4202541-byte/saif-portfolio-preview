import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 45000,
  fullyParallel: true,
  workers: 2,
  use: {
    baseURL: "http://127.0.0.1:4175",
    channel: "msedge",
    headless: true,
    launchOptions: { args: ["--use-angle=swiftshader"] },
    trace: "retain-on-failure",
  },
  reporter: "list",
  webServer: {
    command: "npm run preview -- --port 4175 --strictPort",
    url: "http://127.0.0.1:4175",
    reuseExistingServer: true,
  },
});
