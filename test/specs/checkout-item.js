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

      await cart_badge.isDisplayed();

      const cart_btn = await $('//*[@id="shopping_cart_container"]/a');

      await cart_btn.click();

      const cart_qty = await $(
        '//*[@id="cart_contents_container"]/div/div[1]/div[3]/div[1]'
      );

      expect(cart_qty).toHaveText("1");
      await browser.pause(2000);

      const checkout_btn = await $(".checkout_button");
      await checkout_btn.click();

      await $('//*[@id="first-name"]').setValue("John");
      await $('//*[@id="last-name"]').setValue("Doe");
      await $('//*[@id="postal-code"]').setValue("12345");
      await browser.pause(2000);
      const continue_btn = await $(
        '//*[@id="checkout_info_container"]/div/form/div[2]/input'
      );
      await continue_btn.click();

      const checkout_overview = await $('//*[@id="contents_wrapper"]/div[2]');
      expect(checkout_overview).toHaveText("Checkout: Overview");

      await browser.pause(5000);
      const finish_btn = await $(
        '//*[@id="checkout_summary_container"]/div/div[2]/div[8]/a[2]'
      );
      await finish_btn.click();

      const order_complete = await $(
        '//*[@id="checkout_complete_container"]/h2'
      );
      expect(order_complete).toHaveText("THANK YOU FOR YOUR ORDER");
    }
  });
});
