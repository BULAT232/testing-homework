import { BASE_URL, BUG_ID } from "./constans";

describe("Проверка ссылок в шапке магазина", () => {
  it("должны отображаться ссылки на страницы магазина и корзину", async ({
    browser,
  }) => {
    await browser.url(`${BASE_URL}`);

    const navbar = await browser.$(".navbar");

    const navbarLinks = await navbar.$$(".navbar-nav a.nav-link");

    for (const link of navbarLinks) {
      const href = await link.getAttribute("href");
      const text = await link.getText();

      if (text === "Contacts") {
        expect(link).toHaveAttribute("aria-current", "page");
      }

      switch (text) {
        case "Catalog":
          expect(href).toEqual(`/hw/store/catalog`);
          break;
        case "Delivery":
          expect(href).toEqual(`/hw/store/delivery`);
          break;
        case "Cart":
          expect(href).toEqual(`/hw/store/cart`);
          break;
        default:
          break;
      }
    }
  });
});
