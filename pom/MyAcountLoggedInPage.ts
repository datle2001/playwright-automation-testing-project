import { expect, Locator, Page } from "@playwright/test";

export class MyAccountLoggedInPage {
  private readonly text_WelcomeMessage: Locator;
  private readonly singoutLink: Locator;
  private readonly dashboardLink: Locator;
  private readonly ordersLink: Locator;

  constructor(private readonly page: Page) {
    this.text_WelcomeMessage = this.page.getByText(
      /Hello [a-z0-9]+ \(not [a-z0-9]+\? Sign out\)/,
    );
    this.singoutLink = this.page.getByRole("link", { name: "Sign out" });
    this.dashboardLink = this.page.getByRole("link", { name: "Dashboard" });
    this.ordersLink = this.page.getByRole("link", { name: "Orders", exact: true });
  }

  async waitForPageDisplayed() {
    await expect(this.text_WelcomeMessage).toBeVisible();
  }

  async clickSignOutLink() {
    await this.singoutLink.click();
  }

  async clickDashboardLink() {
    await this.dashboardLink.click();
  }

  async clickOrdersLink() {
    await this.ordersLink.click();
  }
}
