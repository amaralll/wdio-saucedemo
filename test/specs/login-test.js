import { browser, $, expect } from "@wdio/globals";

describe("Login check with various credential", () => {
  // check if its login page or not
  it("check if the current page is login page", async () => {
    await browser.url("https://www.saucedemo.com/v1");

    const username_availibilty_text = await $("h4=Accepted usernames are:");
    await expect(username_availibilty_text).toHaveText(
      "Accepted usernames are:"
    );

    const title = await browser.getTitle();
    expect(title).toBe("Swag Labs");
  });

  // login with valid credential
  it("login with valid credential", async () => {
    await browser.url("https://saucedemo.com/v1");

    await $("#user-name").setValue("standard_user");

    await $("#password").setValue("secret_sauce");

    const login_btn = await $("#login-button");

    await login_btn.click();

    const homepage = await $(".product_label");

    expect(homepage).toHaveText("Products");
  });

  // login with invalid credential
  it("login with invalid credential", async () => {
    await browser.url("https://saucedemo.com/v1");

    await $("#user-name").setValue("standard_user");

    await $("#password").setValue("secret_password");

    const login_btn = await $("#login-button");

    await login_btn.click();

    browser.pause(3000);

    const err_msg = await $('//*[@id="login_button_container"]/div/form/h3');

    expect(err_msg).toHaveText(
      "Username and password do not match any user in this service"
    );
  });

  // login with problem user
  it.only("login with problem user", async () => {
    await browser.url("https://saucedemo.com/v1");

    await $("#user-name").setValue("problem_user");

    await $("#password").setValue("secret_sauce");

    const login_btn = await $("#login-button");

    await login_btn.click();

    await browser.pause(3000);

    const img_product = await $(".inventory_item_img");

    const isImgLoaded = await browser.executeScript((element) => {
      return element.complete && element.naturalHeight > 0;
    }, img_product);

    expect(isImgLoaded).toBe(true, "Image should be loaded");
  });
});
