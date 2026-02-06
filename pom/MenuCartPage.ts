import { expect, Page } from "@playwright/test";

export class MenuCartPage {
  constructor(private readonly page: Page) {}

  async verifyCartContainItemWithPrice(productName: string, expectedPrice: string) {
    const text_ProductName = this.page.getByRole('link', { name: productName });
    await expect(text_ProductName).toBeVisible();
    const text_ProductPrice = this.page.locator(`.cart_item:has-text("${productName}") .product-price`);
    await expect(text_ProductPrice).toHaveText(expectedPrice);
  }

  async clickProceedToCheckoutButton() {
    const link_ProceedToCheckout = this.page.getByRole('link', { name: /Proceed to checkout/i });
    await link_ProceedToCheckout.click();
  }
}