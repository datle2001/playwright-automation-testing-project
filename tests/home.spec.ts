import {baseTest as test} from "../fixtures/baseTest";
import { MenuCartPage } from "../pom/MenuCartPage";
import { CheckoutPage } from "../pom/CheckoutPage";

const homeTest = test.extend<{navigateTohHomePageFixture: null, menuCartPage: MenuCartPage, checkoutPage: CheckoutPage}>({
    navigateTohHomePageFixture: [async ({shopPage, homePage}, use) => {
        await shopPage.clickHomeLink();
        await homePage.waitForPageDisplayed();
        await use(null);
    }, {auto: true}],
    menuCartPage: async ({page}, use) => {
        await use (new MenuCartPage(page));
    },
    checkoutPage: async ({page}, use) => {
        await use (new CheckoutPage(page));
    }
});

homeTest("Home Page with three Arrivals only", async({homePage}) => {
    await homePage.verifyArrivalsListHas(3)
});

homeTest("Home page - Images in Arrivals should navigate", async ({homePage, productPage}) => {
    await homePage.verifyArrivalsListHas(3);
    await homePage.clickArrivalImageByIndex(0);
    await productPage.clickAddToBasketButton();
    await productPage.verifyAddToBasketSuccessMessageDisplayed();
});

homeTest("Home page -  Arrivals-Images-Description", async ({homePage, productPage}) => {
    await homePage.verifyArrivalsListHas(3);
    await homePage.clickArrivalImageByIndex(0);
    await productPage.clickAddToBasketButton();
    await productPage.verifyAddToBasketSuccessMessageDisplayed();
    await productPage.clickDescriptionTab();
    await productPage.verifyDescriptionTabContentDisplayed();
});

homeTest("Home page -  Arrivals-Images-Reviews", async ({homePage, productPage}) => {
    await homePage.verifyArrivalsListHas(3);
    await homePage.clickArrivalImageByIndex(0);
    await productPage.clickAddToBasketButton();
    await productPage.verifyAddToBasketSuccessMessageDisplayed();
    await productPage.clickReviewsTab();
    await productPage.verifyReviewsTabContentDisplayed();
});

homeTest("Home page -  Arrivals-Images-Add to Basket", async ({homePage, productPage, navigationPanel, menuCartPage}) => {
    await homePage.verifyArrivalsListHas(3);
    await homePage.clickArrivalImageByIndex(0);
    const PRODUCT_NAME = await productPage.getProductName();
    const PRODUCT_PRICE = await productPage.getProductPrice();
    await productPage.clickAddToBasketButton();
    await productPage.verifyAddToBasketSuccessMessageDisplayed();
    await navigationPanel.navigateToMenuCart();
    await menuCartPage.verifyCartContainItemWithPrice(PRODUCT_NAME, PRODUCT_PRICE);
});

homeTest("Home-Arrivals-Add to Basket-Items", async({homePage, productPage, navigationPanel, menuCartPage, checkoutPage}) => {
    await homePage.verifyArrivalsListHas(3);
    await homePage.clickArrivalImageByIndex(0);
    const PRODUCT_NAME = await productPage.getProductName();
    const PRODUCT_PRICE = await productPage.getProductPrice();
    await productPage.clickAddToBasketButton();
    await productPage.verifyAddToBasketSuccessMessageDisplayed();
    await navigationPanel.navigateToMenuCart();
    await menuCartPage.verifyCartContainItemWithPrice(PRODUCT_NAME, PRODUCT_PRICE);
    await menuCartPage.clickProceedToCheckoutButton();
    await checkoutPage.waitForPageDisplayed();
});