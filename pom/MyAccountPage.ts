import { expect, Locator, Page } from "@playwright/test";

export class MyAccountPage {
  private readonly input_EmailAddress: Locator;
  private readonly input_Password: Locator;
  private readonly button_Register: Locator;
  private readonly message_PasswordStrength: Locator;
  private readonly message_EmptyEmail: Locator;
  private readonly message_EmptyPassword: Locator;

  constructor(public readonly page: Page) {
    this.input_EmailAddress = page.locator("#reg_email");
    this.input_Password = page.locator("#reg_password");
    this.button_Register = page.getByRole("button", { name: "Register" });
    this.message_PasswordStrength = page.locator(
      ".woocommerce-password-strength"
    );
    this.message_EmptyEmail = page.getByText(
      "Error: Please provide a valid email address."
    );
    this.message_EmptyPassword = page.getByText(
      "Error: Please enter an account password."
    );
  }

  async enterRegisterationDetails(username: string, password: string) {
    await this.input_EmailAddress.fill(username);
    await this.input_Password.pressSequentially(password, { delay: 500 });
  }

  async waitForPasswordStrengthMessage() {
    await expect(this.message_PasswordStrength).toBeVisible()
  }

  async clickRegisterButton() {
    await this.button_Register.click();
  }

  async verifyEmptyEmailMessageDisplayed() {
    await expect(this.message_EmptyEmail).toBeVisible()
  }

  async verifyEmptyPasswordMessageDisplayed() {
    await expect(this.message_EmptyPassword).toBeVisible()
  }

  async waitForPageDisplayed() {
    await expect(this.button_Register).toBeVisible()
  }

  async verifyInvalidEmailMessageDisplayed() {
    const screenshot = await this.page.locator('form.register').screenshot({ path: 'invalid-email-error.png' });
    await expect(screenshot).toMatchSnapshot(
      "..\\validation-images\\invalid-email-error.png",
      { threshold: 0.5 }
    );
  }
}
