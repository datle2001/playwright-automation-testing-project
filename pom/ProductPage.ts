import { expect, Locator, Page } from "@playwright/test";

export class ProductPage {
  private readonly button_AddToBasket: Locator;
  private readonly message_AddToBasketSuccess: Locator;
  private readonly tab_Description: Locator;
  private readonly text_Description: Locator;
  private readonly tab_Reviews: Locator;
  private readonly text_Reviews: Locator;
  private readonly text_ProductName: Locator;
  private readonly text_ProductPrice: Locator;

  constructor(private readonly page: Page) {
    this.button_AddToBasket = page.getByRole("button", { name: /Add to basket/i, exact: true });
    this.message_AddToBasketSuccess = page.locator(".woocommerce-message");
      this.tab_Description = page.getByRole('link', { name: 'Description' });
      this.text_Description = page.locator('#tab-description');
      this.tab_Reviews = page.getByRole('link', { name: 'Reviews' });
      this.text_Reviews = page.locator('.commentlist, .woocommerce-noreviews');
      this.text_ProductName = page.locator('h1.product_title');
      this.text_ProductPrice = page.locator('p.price');
  }

  async clickAddToBasketButton() {
    await this.button_AddToBasket.click();
  }

  async verifyAddToBasketSuccessMessageDisplayed() {
    await expect(this.message_AddToBasketSuccess).toBeVisible();
    await expect(this.message_AddToBasketSuccess).toContainText(/has been added to your basket./);
  }

  async clickDescriptionTab() {
    await this.tab_Description.click();
  }

  async verifyDescriptionTabContentDisplayed() {
    await expect(this.text_Description).toBeVisible();
    // ensure it contains some non-empty description text
    await expect(this.text_Description).not.toBeEmpty();
  }

  async clickReviewsTab() {
    await this.tab_Reviews.click();
  }

  async verifyReviewsTabContentDisplayed() {
    await expect(this.text_Reviews).toBeVisible();
    await expect(this.text_Reviews).not.toBeEmpty();
  }

  async getProductName(): Promise<string> {
    await expect(this.text_ProductName).toBeVisible();
    return (await this.text_ProductName.first().innerText()).trim();
  }

  async getProductPrice(): Promise<string> {
    await expect(this.text_ProductPrice).toBeVisible();
    return (await this.text_ProductPrice.first().innerText()).trim();
  }
}
