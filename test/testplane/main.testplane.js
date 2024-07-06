describe("Все страницы", () => {
  it("В магазине есть следующие страницы: главная, каталог, условия доставки, контакты и корзина", async ({
    browser,
  }) => {
    const pages = [
      "/hw/store",
      "/hw/store/catalog",
      "/hw/store/delivery",
      "/hw/store/contacts",
      "/hw/store/cart",
    ];
    for (const page of pages) {
      await browser.url("http://localhost:3000" + page);
      const title = await browser.$("title");
      expect(title).toExist();
    }
  });
});
