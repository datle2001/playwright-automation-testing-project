import { Locator, Page } from "@playwright/test";

export class NavigationPanel {
  private readonly link_MyAccount: Locator;

  constructor(public readonly page: Page) {
    this.link_MyAccount = page.locator('a', { hasText: 'My Account' });
  }

  async navigateToMyAccount() {
   await this.link_MyAccount.click(); 
  }
}