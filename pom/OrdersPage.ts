import { expect, Locator, Page } from "@playwright/test";

export class OrdersPage {
  private readonly button_GoShop: Locator;

  constructor(private readonly page: Page) {
    this.button_GoShop = this.page.getByRole("link", { name: "Go Shop" });
  }

  async waitForOrdersDisplayed() {
    await expect(this.button_GoShop).toBeVisible();
  }
}
