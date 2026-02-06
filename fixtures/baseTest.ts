import { test } from "@playwright/test";
import { MyAccountPage } from "../pom/MyAccountPage";
import { MyAccountLoggedInPage } from "../pom/MyAcountLoggedInPage";
import { NavigationPanel } from "../pom/NavigationPanel";
import { ShopPage } from "../pom/ShopPage";
import { ProductPage } from "../pom/ProductPage";
import { HomePage } from "../pom/HomePage";

type BaseFixtures = {
  navigationPanel: NavigationPanel;
  myAccountPage: MyAccountPage;
  myAccountLoggedInPage: MyAccountLoggedInPage;
  shopPage: ShopPage;
  productPage: ProductPage;
  homePage: HomePage
};

export const baseTest = test.extend<BaseFixtures>({
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
  shopPage: async ({ navigationPanel, page }, use) => {
    await navigationPanel.navigateToShop();
    await use(new ShopPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  homePage: async ({ navigationPanel, page }, use) => {
    await use(new HomePage(page));
  }
});
