import { browser, $, expect } from "@wdio/globals";

describe("Add item to cart", () => {
  // add one item to cart
  it("add one item to cart", async () => {
    await browser.url("https://saucedemo.com/v1");

    await $("#user-name").setValue("standard_user");

    await $("#password").setValue("secret_sauce");

    const login_btn = await $("#login-button");

    await login_btn.click();

    const homepage = await $(".product_label");

    expect(homepage).toHaveText("Products");

    const cart_badge = await $('//*[@id="shopping_cart_container"]/a/span');

    if (await cart_badge.isDisplayed()) {
      const removeCart_btn = await $(
        '//*[@id="inventory_container"]/div/div[1]/div[3]/button'
      );

      await removeCart_btn.click();

      await browser.pause(5000);
    } else {
      const addtoCart_btn = await $(
        '//*[@id="inventory_container"]/div/div[1]/div[3]/button'
      );

      await addtoCart_btn.click();

      await browser.pause(5000);
    }
  });
});
