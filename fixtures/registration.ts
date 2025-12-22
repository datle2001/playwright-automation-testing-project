import { test as base } from "@playwright/test";
import { MyAccountPage } from "../pom/MyAccountPage";
import { MyAccountLoggedInPage } from "../pom/MyAcountLoggedInPage";
import { NavigationPanel } from "../pom/NavigationPanel";

type RegistrationFixtures = {
  navigationPanel: NavigationPanel;
  myAccountPage: MyAccountPage;
  myAccountLoggedInPage: MyAccountLoggedInPage;
};

export const test = base.extend<RegistrationFixtures>({
  navigationPanel: async ({ page }, use) => {
    await page.goto(process.env.BASE_URL!);
    await use(new NavigationPanel(page));
  },
  myAccountPage: async ({ navigationPanel, page }, use) => {
    await navigationPanel.navigateToMyAccount();
    await use(new MyAccountPage(page));
  },
  myAccountLoggedInPage: async ({ page }, use) => {
    await use(new MyAccountLoggedInPage(page));
  },
});
