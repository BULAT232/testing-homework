import { faker } from "@faker-js/faker";

describe("Скриншоты страниц", () => {
  it("Главная", async ({ browser }) => {
    await browser.url({ BASE_URL });
    const body = await browser.$("body");
    await body.waitForDisplayed();
    await body.assertView("plain");
  });
  describe("Каталог", () => {
    it("По умолчанию", async ({ browser }) => {
      await browser.url("http://localhost:3000/hw/store/catalog");
      const body = await browser.$("body");
      await body.waitForDisplayed();
      await body.assertView("plain");
    });
    it("Первый товар добавлен в корзину", async ({ browser }) => {
      await browser.url("http://localhost:3000/hw/store/catalog/0");
      const addToCartBtn = await browser.$(".ProductDetails-AddToCart");
      await addToCartBtn.click();
      await browser.url("http://localhost:3000/hw/store/catalog");
      const body = await browser.$("body");
      await body.waitForDisplayed();
      await body.assertView("plain");
    });
  });
  describe("Товар", () => {
    it("По умолчанию", async ({ browser }) => {
      await browser.url("http://localhost:3000/hw/store/catalog/0");
      const body = await browser.$("body");
      await body.waitForDisplayed();
      await body.assertView("plain");
    });
    it("Добавлен в корзину", async ({ browser }) => {
      await browser.url("http://localhost:3000/hw/store/catalog/0");
      const addToCartBtn = await browser.$(".ProductDetails-AddToCart");
      await addToCartBtn.click();
      const body = await browser.$("body");
      await body.waitForDisplayed();
      await body.assertView("plain");
    });
  });
  it("Условия доставки", async ({ browser }) => {
    await browser.url("http://localhost:3000/hw/store/delivery");
    const body = await browser.$("body");
    await body.waitForDisplayed();
    await body.assertView("plain");
  });
  it("Контакты", async ({ browser }) => {
    await browser.url("http://localhost:3000/hw/store/contacts");
    const body = await browser.$("body");
    await body.waitForDisplayed();
    await body.assertView("plain");
  });
  describe("Корзина", () => {
    it("Пустая корзина", async ({ browser }) => {
      await browser.url("http://localhost:3000/hw/store/cart");
      const body = await browser.$("body");
      await body.waitForDisplayed();
      await body.assertView("plain");
    });
    it("Непустая корзина", async ({ browser }) => {
      await browser.url("http://localhost:3000/hw/store/catalog/0");
      const addToCartBtn = await browser.$(".ProductDetails-AddToCart");
      await addToCartBtn.click();
      await browser.url("http://localhost:3000/hw/store/cart");
      const body = await browser.$("body");
      await body.waitForDisplayed();
      await body.assertView("plain");
    });
  });
  describe("Заказ", () => {
    it("Уведомление об успешной покупке", async ({ browser }) => {
      await browser.url("http://localhost:3000/hw/store/catalog/0");
      const addToCartBtn = await browser.$(".ProductDetails-AddToCart");

      await addToCartBtn.click();
      await browser.url("http://localhost:3000/hw/store/cart");
      const orderForm = await browser.$(".Form");
      const inputName = await orderForm.$("input#f-name");
      const inputPhone = await orderForm.$("input#f-phone");
      const inputAddress = await orderForm.$("textarea#f-address");
      const sendBtn = await orderForm.$(".Form-Submit");

      await inputName.setValue(faker.person.fullName());
      await inputPhone.setValue(faker.phone.number());
      await inputAddress.setValue(faker.location.streetAddress());
      await sendBtn.click();
      const body = await browser.$("body");
      await body.waitForDisplayed();
      await body.assertView("plain");
    });
  });
});
