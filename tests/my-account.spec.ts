import { baseTest as test } from "../fixtures/baseTest";
import { OrdersPage } from "../pom/OrdersPage";

const myAccountTest = test.extend<{ autoLoginFixture: null; ordersPage: OrdersPage }>(
  {
    autoLoginFixture: [
      async ({ myAccountPage, myAccountLoggedInPage }, use) => {
        const USERNAME = "datlq";
        const PASSWORD = "Datlq@12345";
        await myAccountPage.enterLoginDetails(USERNAME, PASSWORD);
        await myAccountPage.clickLoginButton();
        await myAccountLoggedInPage.waitForPageDisplayed();
        await use(null);
      },
      { scope: "test", auto: true },
    ],
    ordersPage: [
      async ({ page }, use) => {
        await use(new OrdersPage(page));
      },
      { scope: "test" },
    ],
  },
);

myAccountTest(
  "My Account-Dashboard",
  async ({myAccountLoggedInPage }) => {
    await myAccountLoggedInPage.clickDashboardLink();
    await myAccountLoggedInPage.waitForPageDisplayed();},
);

myAccountTest("My Account - View Orders", async ({ navigationPanel, myAccountLoggedInPage, ordersPage }) => {
  await navigationPanel.navigateToMyAccount();
  await myAccountLoggedInPage.clickOrdersLink();
  await ordersPage.waitForOrdersDisplayed();
});
