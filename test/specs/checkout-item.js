import { browser, $, expect } from "@wdio/globals";

describe("Checkout item in cart", () => {
  it("Checkout item in cart", async () => {
    await browser.url("https://saucedemo.com/v1");

    await $("#user-name").setValue("standard_user");

    await $("#password").setValue("secret_sauce");

    const login_btn = await $("#login-button");

    await login_btn.click();

    const homepage = await $(".product_label");

    expect(homepage).toHaveText("Products");

    const cart_badge = await $('//*[@id="shopping_cart_container"]/a/span');

    if (await cart_badge.isDisplayed()) {
      const cart_btn = await $("#shopping_cart_link");
      await cart_btn.click();
      await browser.pause(5000);
      const check_qty = await $(
        '//*[@id="cart_contents_container"]/div/div[1]/div[3]/div[1]'
      );
      if (await check_qty.toHaveText("1")) {
      }
      console.log(await check_qty.getText());
    } else {
      const addtoCart_btn = await $(
        '//*[@id="inventory_container"]/div/div[1]/div[3]/button'
      );
      await addtoCart_btn.click();
      await browser.pause(5000);
    }
  });
});
