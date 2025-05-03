import { browser, $, expect } from "@wdio/globals";

describe("Open URL in chrome", () => {
  // goto saucedemo url
  it("go to url saucedemo", async () => {
    await browser.url("https://www.saucedemo.com/v1");
  });
});
