import { expect, Locator, Page } from "@playwright/test";

export class OrdersPage {
  private readonly ordersHeading: Locator;

  constructor(private readonly page: Page) {
    this.ordersHeading = this.page.getByRole("heading", { name: "Orders" });
  }

  async waitForOrdersDisplayed() {
    await expect(this.ordersHeading).toBeVisible();
  }
}
