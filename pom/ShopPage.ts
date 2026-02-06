import { expect, Locator, Page } from "@playwright/test";

export class ShopPage {
  private readonly link_Home: Locator;

  constructor(private readonly page: Page) {
    this.link_Home = this.page.getByRole("link", { name: "Home" });
  }

  async waitForPageDisplayed() {
    await expect(this.link_Home).toBeVisible();
  }

  async clickHomeLink() {
    await this.link_Home.click();
  }
}
