import { expect, Locator, Page } from "@playwright/test";

export class MyAccountLoggedInPage {
  private readonly text_WelcomeMessage: Locator;

  constructor(private readonly page: Page) {
    this.text_WelcomeMessage = this.page.getByText(
      /Hello [a-z0-9]+ \(not [a-z0-9]+\? Sign out\)/
    );
  }

  async waitForPageDisplayed() {
    await expect(this.text_WelcomeMessage).toBeVisible()
  }
}
