import { BASE_URL, BUG_ID } from "./constans";

const catalogUrl = BUG_ID
	? `${BASE_URL}/hw/store/catalog?bug_id=${BUG_ID}`
	: `${BASE_URL}/hw/store/catalog`;
const cartUrl = BUG_ID ? `${BASE_URL}/hw/store/cart?bug_id=${BUG_ID}` : `${BASE_URL}/hw/store/cart`;
const firstProductUrl = BUG_ID ? `${BASE_URL}/hw/store/catalog/0?bug_id=${BUG_ID}` : `${BASE_URL}/hw/store/catalog/0`;
const secondProductUrl = BUG_ID ? `${BASE_URL}/hw/store/catalog/1?bug_id=${BUG_ID}` : `${BASE_URL}/hw/store/catalog/1`;
const deliveryUrl = BUG_ID ? `${BASE_URL}/hw/store/delivery?bug_id=${BUG_ID}` : `${BASE_URL}/hw/store/delivery`;
const contactsUrl = BUG_ID ? `${BASE_URL}/hw/store/contacts?bug_id=${BUG_ID}` : `${BASE_URL}/hw/store/contacts`;




// describe("Каталог", () => {
// 	it("должен отображать товары в каталоге", async ({ browser }) => {
// 		await browser.url(catalogUrl);

// 		const products = await browser.$$(".ProductItem");

// 		await expect(products.length).toBeGreaterThan(
// 			0,
// 			"Товары в каталоге не найдены"
// 		);
// 	});

// 	it("каждый товар должен отображать название, цену и ссылку на страницу с подробной информацией", async ({
// 		browser,
// 	}) => {
// 		await browser.url(catalogUrl);

// 		const products = await browser.$$(".ProductItem");

// 		for (let product of products) {
// 			const productName = await product.$(".ProductItem-Name");
// 			const productPrice = await product.$(".ProductItem-Price");
// 			const productLink = await product.$(".ProductItem-DetailsLink");

// 			await expect(productName).toBeDisplayed();
// 			await expect(productPrice).toBeDisplayed();
// 			await expect(productLink).toBeDisplayed();

// 			const linkHref = await productLink.getAttribute("href");
// 			await expect(linkHref).toMatch(/\/hw\/store\/catalog\/\d+/);
// 		}
// 	});

// 	it("на странице с подробной информацией должны отображаться название товара, его описание, цена, цвет, материал и кнопка 'добавить в корзину'", async ({
// 		browser,
// 	}) => {
// 		await browser.url(catalogUrl);

// 		// Переходим на страницу деталей первого товара в списке
// 		await browser.url(firstProductUrl);

// 		const productDetails = await browser.$(".ProductDetails");

// 		const productName = await productDetails.$(".ProductDetails-Name");
// 		const productDescription = await productDetails.$(
// 			".ProductDetails-Description"
// 		);
// 		const productPrice = await productDetails.$(".ProductDetails-Price");
// 		const productColor = await productDetails.$(".ProductDetails-Color");
// 		const productMaterial = await productDetails.$(".ProductDetails-Material");
// 		const addToCartButton = await productDetails.$(".ProductDetails-AddToCart");

// 		await expect(productName).toBeDisplayed();
// 		await expect(productDescription).toBeDisplayed();
// 		await expect(productPrice).toBeDisplayed();
// 		await expect(productColor).toBeDisplayed();
// 		await expect(productMaterial).toBeDisplayed();
// 		await expect(addToCartButton).toBeDisplayed();

// 		const buttonText = await addToCartButton.getText();
// 		await expect(buttonText).toBe("Add to Cart");

// 		// Кликаем на кнопку "Add to Cart"
// 		await addToCartButton.click();
// 	});

// 	it('Должно отображаться сообщение "Item in cart", если товар уже добавлен в корзину', async ({
// 		browser,
// 	}) => {
// 		await browser.url(catalogUrl);

// 		// Находим первый товар в списке и заходим на страницу с подробной информацией
// 		await browser.url(firstProductUrl);

// 		// Находим и кликаем по кнопке "Add to Cart"
// 		const addToCartButton = await browser.$(".ProductDetails-AddToCart");
// 		await addToCartButton.click();

// 		// Получаем ожидаемые тексты
// 		const expectedName = await browser.$(".ProductDetails-Name").getText();

// 		// Проверяем, что сообщение "Item in cart" отображается на странице товара
// 		const cartBadge = await browser.$(".CartBadge");
// 		const isCartBadgeDisplayed = await cartBadge.isDisplayed();
// 		await expect(isCartBadgeDisplayed).toBe(true);

// 		// Проверяем, что в навигационном элементе количество товаров в корзине отображается правильно
// 		const cartNavLink = await browser.$('a.nav-link[href="/hw/store/cart"]');
// 		const cartText = await cartNavLink.getText();
// 		await expect(cartText).toContain("Cart (1)");

// 		// Возвращаемся на страницу каталога
// 		await browser.url(catalogUrl);

// 		// Проверяем, что сообщение "Item in cart" отображается на карточке товара в каталоге
// 		const catalogCartBadge = await browser.$(".CartBadge");
// 		const isCatalogCartBadgeDisplayed = await catalogCartBadge.isDisplayed();
// 		await expect(isCatalogCartBadgeDisplayed).toBe(true);
// 	});

// 	it("Содержимое корзины должно сохраняться между перезагрузками страницы", async ({
// 		browser,
// 	}) => {
// 		// Открываем страницу корзины
// 		await browser.url(cartUrl);

// 		// Проверяем, что содержимое корзины отображается корректно
// 		const cartTable = await browser.$(".Cart-Table");
// 		const cartRows = await cartTable.$$("tbody tr");

// 		// Проверяем количество элементов в корзине
// 		await expect(cartRows.length).toBe(1, "Ожидался один товар в корзине");

// 		// Получаем тексты деталей первого товара на странице корзины
// 		const productName = await cartTable.$(".Cart-Name");
// 		const productPrice = await cartTable.$(".Cart-Price");
// 		const productCount = await cartTable.$(".Cart-Count");
// 		const productTotal = await cartTable.$(".Cart-Total");

// 		const expectedName = await productName.getText();
// 		const expectedPrice = await productPrice.getText();
// 		const expectedCount = await productCount.getText();
// 		const expectedTotal = await productTotal.getText();

// 		// Проверяем, что данные товара корректны
// 		const actualProductName = await productName.getText();
// 		await expect(actualProductName).toBe(expectedName);
// 		await expect(await productPrice.getText()).toBe(expectedPrice);
// 		await expect(await productCount.getText()).toBe(expectedCount);
// 		await expect(await productTotal.getText()).toBe(expectedTotal);

// 		// Перезагружаем страницу
// 		await browser.refresh();

// 		// Повторно проверяем корзину после перезагрузки
// 		const refreshedCartTable = await browser.$(".Cart-Table");
// 		const refreshedCartRows = await refreshedCartTable.$$("tbody tr");

// 		// Проверяем количество элементов в корзине после перезагрузки
// 		await expect(refreshedCartRows.length).toBe(
// 			1,
// 			"Ожидался один товар в корзине после перезагрузки"
// 		);

// 		// Получаем тексты деталей товара после перезагрузки
// 		const refreshedProductName = await refreshedCartTable.$(".Cart-Name");
// 		const refreshedProductPrice = await refreshedCartTable.$(".Cart-Price");
// 		const refreshedProductCount = await refreshedCartTable.$(".Cart-Count");
// 		const refreshedProductTotal = await refreshedCartTable.$(".Cart-Total");

// 		// Проверяем, что данные товара корректны после перезагрузки
// 		const refreshedName = await refreshedProductName.getText();
// 		await expect(refreshedName).toBe(expectedName);
// 		await expect(await refreshedProductPrice.getText()).toBe(expectedPrice);
// 		await expect(await refreshedProductCount.getText()).toBe(expectedCount);
// 		await expect(await refreshedProductTotal.getText()).toBe(expectedTotal);
// 	});
// });

// describe("Корзина", () => {
// 	it("должна отображаться кнопка 'очистить корзину' после добавления товара в корзину", async ({ browser }) => {
// 		// Заходим на страницу первого товара
// 		await browser.url(firstProductUrl);

// 		// Добавляем первый товар в корзину
// 		const addToCartButton = await browser.$(".ProductDetails-AddToCart");
// 		await addToCartButton.click();

// 		// Переходим на страницу корзины
// 		await browser.url(cartUrl);

// 		// Проверяем наличие кнопки "очистить корзину"
// 		const clearCartButton = await browser.$(".Cart-Clear");
// 		const isClearCartButtonDisplayed = await clearCartButton.isDisplayed();
// 		await expect(isClearCartButtonDisplayed).toBe(true);
// 	});

// 	it("после нажатия на кнопку 'очистить корзину' корзина должна стать пустой", async ({ browser }) => {
// 		// Заходим на страницу первого товара
// 		await browser.url(firstProductUrl);

// 		// Добавляем первый товар в корзину
// 		const addToCartButton = await browser.$(".ProductDetails-AddToCart");
// 		await addToCartButton.click();

// 		// Переходим на страницу корзины
// 		await browser.url(cartUrl);

// 		// Проверяем, что корзина не пуста перед нажатием кнопки
// 		const cartTableBeforeClear = await browser.$(".Cart-Table");
// 		const cartRowsBeforeClear = await cartTableBeforeClear.$$("tbody tr");
// 		await expect(cartRowsBeforeClear.length).toBeGreaterThan(0, "Ожидалось, что корзина не пуста");

// 		// Находим и нажимаем кнопку "очистить корзину"
// 		const clearCartButton = await browser.$(".Cart-Clear");
// 		await clearCartButton.click();

// 		// Проверяем, что корзина стала пустой после нажатия кнопки
// 		const cartEmptyMessage = await browser.$(".Cart");
// 		const cartEmptyText = await cartEmptyMessage.getText();
// 		await expect(cartEmptyText).toContain("Cart is empty.", "Ожидалось, что корзина станет пустой после очистки");
// 	});

// 	it("если корзина пустая, должна отображаться ссылка на каталог товаров", async ({ browser }) => {
// 		// Переходим на страницу корзины
// 		await browser.url(cartUrl);

// 		// Проверяем, что корзина пустая и отображается ссылка на каталог товаров
// 		const cartEmptyMessage = await browser.$(".Cart");
// 		const cartEmptyText = await cartEmptyMessage.getText();
// 		await expect(cartEmptyText).toContain("Cart is empty. Please select products in the catalog.");
		
// 		const catalogLink = await browser.$('.Cart a[href="/hw/store/catalog"]');
// 		const isCatalogLinkDisplayed = await catalogLink.isDisplayed();
// 		await expect(isCatalogLinkDisplayed).toBe(true);
// 	});

// 	it("должна отображаться таблица с добавленными товарами в корзине", async ({ browser }) => {
// 		// Заходим на страницу первого товара
// 		await browser.url(firstProductUrl);

// 		// Получаем данные о первом товаре
// 		const productDetails = await browser.$(".ProductDetails");
// 		const productNameElement = await productDetails.$(".ProductDetails-Name");
// 		const productPriceElement = await productDetails.$(".ProductDetails-Price");

// 		const productName1 = await productNameElement.getText();
// 		const productPrice1 = await productPriceElement.getText();

// 		// Добавляем первый товар в корзину
// 		const addToCartButton = await productDetails.$(".ProductDetails-AddToCart");
// 		await addToCartButton.click();

// 		// Заходим на страницу второго товара
// 		await browser.url(secondProductUrl);

// 		// Получаем данные о втором товаре
// 		const productDetails2 = await browser.$(".ProductDetails");
// 		const productNameElement2 = await productDetails2.$(".ProductDetails-Name");
// 		const productPriceElement2 = await productDetails2.$(".ProductDetails-Price");

// 		const productName2 = await productNameElement2.getText();
// 		const productPrice2 = await productPriceElement2.getText();

// 		// Добавляем второй товар в корзину
// 		const addToCartButton2 = await productDetails2.$(".ProductDetails-AddToCart");
// 		await addToCartButton2.click();

// 		// Переходим на страницу корзины
// 		await browser.url(cartUrl);

// 		// Проверяем, что таблица с товарами отображается
// 		const cartTable = await browser.$(".Cart-Table");
// 		const cartRows = await cartTable.$$("tbody tr");

// 		// Проверяем количество элементов в корзине
// 		await expect(cartRows.length).toBe(2, "Ожидались два товара в корзине");

// 		// Проверяем детали первого товара
// 		const productNameElements = await cartTable.$$(".Cart-Name");
// 		const productPriceElements = await cartTable.$$(".Cart-Price");
// 		const productCountElements = await cartTable.$$(".Cart-Count");
// 		const productTotalElements = await cartTable.$$(".Cart-Total");

// 		// Проверяем, что данные товаров корректны
// 		await expect(await productNameElements[0].getText()).toBe(productName1);
// 		await expect(await productNameElements[1].getText()).toBe(productName2);
// 		await expect(await productPriceElements[0].getText()).toBe(productPrice1);
// 		await expect(await productPriceElements[1].getText()).toBe(productPrice2);

// 		// Проверяем количество и общую стоимость
// 		const productCount1 = await productCountElements[0].getText();
// 		const productCount2 = await productCountElements[1].getText();
// 		const productTotal1 = await productTotalElements[0].getText();
// 		const productTotal2 = await productTotalElements[1].getText();

// 		await expect(productCount1).toBe("1"); // Проверяем количество первого товара
// 		await expect(productCount2).toBe("1"); // Проверяем количество второго товара
// 		// Для общей стоимости можно использовать регулярное выражение для проверки формата
// 		await expect(productTotal1).toMatch(/\$\d+/); // Проверяем формат общей стоимости первого товара
// 		await expect(productTotal2).toMatch(/\$\d+/); // Проверяем формат общей стоимости второго товара

// 		// Проверяем общую сумму заказа
// 		const orderPriceElement = await cartTable.$(".Cart-OrderPrice");
// 		const orderPriceText = await orderPriceElement.getText();
// 		const expectedTotalPrice = parseFloat(productPrice1.slice(1)) + parseFloat(productPrice2.slice(1));
// 		await expect(orderPriceText).toBe(`$${expectedTotalPrice}`);
// 	});
// });

// describe("Страницы", () => {
// 	it("В магазине должна быть главная страница", async ({ browser }) => {
// 		await browser.url(`${BASE_URL}/hw/store`);
// 		const homePage = await browser.$(".Home");
// 		await homePage.waitForDisplayed();
// 		await homePage.assertView('plain');
// 	});

// 	it("В магазине должна быть страница каталога", async ({ browser }) => {
// 		await browser.url(catalogUrl);
// 		const catalog = await browser.$(".Catalog");
// 		await catalog.waitForDisplayed();
// 		await catalog.assertView('plain');
// 	});

// 	it("В магазине должна быть страница условия доставки", async ({ browser }) => {
// 		await browser.url(deliveryUrl);
// 		const deliveryPage = await browser.$(".Delivery");
// 		await deliveryPage.waitForDisplayed();
// 		await deliveryPage.assertView('plain');
// 	});

// 	it("В магазине должна быть страница условия контакты", async ({ browser }) => {
// 		await browser.url(contactsUrl);
// 		const contactsPage = await browser.$(".Contacts");
// 		await contactsPage.waitForDisplayed();
// 		await contactsPage.assertView('plain');
// 	});
// })