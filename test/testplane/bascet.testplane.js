import { BASE_URL, BUG_ID } from "./constans";

describe("Корзина", () => {
  it("Содержимое корзины сохраняется между перезагрузками страницы", async ({
    browser,
  }) => {
    await browser.url(
      `${BASE_URL}/catalog/0${BUG_ID ? `?bug_id=${BUG_ID}` : ""}`
    );
    const addToCartBtn = await browser.$(".ProductDetails-AddToCart");

    await addToCartBtn.click();
    await browser.url(`${BASE_URL}/cart${BUG_ID ? `?bug_id=${BUG_ID}` : ""}`);
    await browser.url(`${BASE_URL}/cart${BUG_ID ? `?bug_id=${BUG_ID}` : ""}`);
    const cartTable = await browser.$(".Cart-Table");
    await cartTable.waitForExist();

    expect(cartTable).toExist();
  });
});
