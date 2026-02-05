import { test } from "../fixtures/registration";
import { RandomUtilities } from "../utilities/RandomUtilities";

const myAccountTest = test.extend<{ autoLoginFixture: null}>({
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
});

myAccountTest(
  "My Account-Dashboard",
  async ({ autoLoginFixture, myAccountLoggedInPage }) => {
    await myAccountLoggedInPage.clickDashboardLink();
    await myAccountLoggedInPage.waitForPageDisplayed();},
);
