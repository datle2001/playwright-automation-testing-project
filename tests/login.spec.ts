import { test } from "../fixtures/registration.ts";
import { DataUtilities } from "../utilities/DataUtilities.ts";
import { RandomUtilities } from "../utilities/RandomUtilities";

const loginTest = test.extend<{
  autoRegistrationFixture: { username: string; password: string };
}>({
  autoRegistrationFixture: [
    async ({ myAccountPage, myAccountLoggedInPage }, use) => {
      const EMAIL_ADDRESS = RandomUtilities.generateRandomEmail();
      const PASSWORD = RandomUtilities.getPassword();
      await myAccountPage.enterRegisterationDetails(EMAIL_ADDRESS, PASSWORD);
      await myAccountPage.clickRegisterButton();
      await myAccountLoggedInPage.waitForPageDisplayed();
      await myAccountLoggedInPage.clickSignOutLink();
      await myAccountPage.waitForPageDisplayed();
      await use({
        username: DataUtilities.getUsernameFrom(EMAIL_ADDRESS),
        password: PASSWORD,
      });
    },
    { scope: "test", auto: true },
  ],
});

loginTest(
  "Log-in with valid username and password.",
  async ({ myAccountPage, myAccountLoggedInPage, autoRegistrationFixture }) => {
    await myAccountPage.enterLoginDetails(
      autoRegistrationFixture.username,
      autoRegistrationFixture.password,
    );
    await myAccountPage.clickLoginButton();
    await myAccountLoggedInPage.waitForPageDisplayed();
  },
);

loginTest(
  "Log-in with invalid username and invalid password.",
  async ({ myAccountPage, autoRegistrationFixture }) => {
    const INVALID_USER_NAME = autoRegistrationFixture.username + "invalid";
    const INVALID_PASSWORD = autoRegistrationFixture.password + "invalid";
    await myAccountPage.enterLoginDetails(INVALID_USER_NAME, INVALID_PASSWORD);
    await myAccountPage.clickLoginButton();
    await myAccountPage.verifyInvalidUsernameDisplayed();
  },
);

loginTest(
  "Log-in with correct username and empty password.",
  async ({ myAccountPage, autoRegistrationFixture }) => {
    await myAccountPage.enterLoginDetails(autoRegistrationFixture.username, "");
    await myAccountPage.clickLoginButton();
    await myAccountPage.verifyEmptyLoginPasswordMessageDisplayed();
  },
);

loginTest(
  "Log-in with empty username and correct password.",
  async ({ myAccountPage, autoRegistrationFixture }) => {
    await myAccountPage.enterLoginDetails("", autoRegistrationFixture.password);
    await myAccountPage.clickLoginButton();
    await myAccountPage.verifyEmptyLoginUsernameMessageDisplayed();
  },
);

loginTest(
  "Log-in with empty username and empty password.",
  async ({ myAccountPage }) => {
    await myAccountPage.enterLoginDetails("", "");
    await myAccountPage.clickLoginButton();
    await myAccountPage.verifyEmptyLoginUsernameMessageDisplayed();
  },
);

test("Log-in -Password should be masked", async ({ myAccountPage }) => {
  await myAccountPage.enterLoginPassword("test");
  await myAccountPage.verifyLoginPasswordIsMasked();
});

loginTest(
  "Login-Handles case sensitive",
  async ({ myAccountPage, autoRegistrationFixture }) => {
    await myAccountPage.enterLoginDetails(
      autoRegistrationFixture.username.toUpperCase(),
      autoRegistrationFixture.password.toUpperCase(),
    );
    await myAccountPage.clickLoginButton();
    await myAccountPage.verifyIncorrectUsernamePasswordMessageDisplayed();
  },
);

loginTest(
  "Login-Authentication",
  async ({
    myAccountPage,
    myAccountLoggedInPage,
    autoRegistrationFixture,
    page,
  }) => {
    await myAccountPage.enterLoginDetails(
      autoRegistrationFixture.username,
      autoRegistrationFixture.password,
    );
    await myAccountPage.clickLoginButton();
    await myAccountLoggedInPage.waitForPageDisplayed();
    await myAccountLoggedInPage.clickSignOutLink();
    await page.goBack();
    await myAccountPage.waitForPageDisplayed();
  },
);
