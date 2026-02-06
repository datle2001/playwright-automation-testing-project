import { Locator, Page } from "@playwright/test";

export class NavigationPanel {
  private readonly link_MyAccount: Locator;
  private readonly link_Shop: Locator;
  private readonly link_MenuCart: Locator;

  constructor(public readonly page: Page) {
    this.link_MyAccount = page.getByRole('link', { name: 'My Account' });
    this.link_Shop = page.getByRole('link', { name: 'Shop' });
    this.link_MenuCart = page.locator('a[title="View your shopping cart"]');
  }

  async navigateToMyAccount() {
   await this.link_MyAccount.click(); 
  }

  async navigateToShop() {
    await this.link_Shop.click();
  }

  async navigateToMenuCart() {
    await this.link_MenuCart.click();
  }
}