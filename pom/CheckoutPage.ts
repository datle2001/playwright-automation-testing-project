import { expect, Page } from "@playwright/test";

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async waitForPageDisplayed() {
    const heading = this.page.getByRole('heading', { name: /billing details/i });
    await expect(heading).toBeVisible();
  }
}
