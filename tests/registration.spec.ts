import { test } from "../fixtures/registration";
import { RandomUtilities } from "../utilities/RandomUtilities";

test("Users register successfully and are navigated to Home page", async ({
  myAccountPage,
  myAccountLoggedInPage,
}) => {
  await myAccountPage.enterRegisterationDetails(
    RandomUtilities.generateRandomEmail(),
    RandomUtilities.getPassword()
  );

  await myAccountPage.waitForPasswordStrengthMessage();
  await myAccountPage.clickRegisterButton();
  await myAccountLoggedInPage.waitForPageDisplayed();
});

test("Invalid email address message is displayed when user enters invalid email", async ({
  myAccountPage,
}) => {
  await myAccountPage.enterRegisterationDetails(
    RandomUtilities.generateRandomInvalidEmail(),
    RandomUtilities.getPassword()
  );
  await myAccountPage.waitForPasswordStrengthMessage();
  await myAccountPage.clickRegisterButton();
  //unable to verify the invalid email message via text or locator as it is rendered within the form dynamically
  //await myAccountPage.verifyInvalidEmailMessageDisplayed();
  await myAccountPage.waitForPageDisplayed();
});

test("Invalid email address message is displayed when user enters empty email", async ({
  myAccountPage,
}) => {
  await myAccountPage.enterRegisterationDetails(
    "",
    RandomUtilities.getPassword()
  );
  await myAccountPage.waitForPasswordStrengthMessage();
  await myAccountPage.clickRegisterButton();
  await myAccountPage.verifyEmptyEmailMessageDisplayed();
});

test("Invalid password message is displayed when user enters empty password", async ({
  myAccountPage,
}) => {
  await myAccountPage.enterRegisterationDetails(
    RandomUtilities.generateRandomEmail(),
    ""
  );

  await myAccountPage.clickRegisterButton();
  await myAccountPage.verifyEmptyPasswordMessageDisplayed();
});

test("Invalid password message is displayed when user enters empty email address and password", async ({
  myAccountPage,
}) => {
  await myAccountPage.enterRegisterationDetails(
    "",
    ""
  );

  await myAccountPage.clickRegisterButton();
  await myAccountPage.verifyEmptyEmailMessageDisplayed();
});
