import { expect, Locator, Page } from "@playwright/test";
export class MyAccountPage {
  // Register locators
  private readonly input_EmailAddress_Register: Locator;
  private readonly input_Password_Register: Locator;
  private readonly button_Register: Locator;
  private readonly message_PasswordStrength_Register: Locator;
  private readonly message_EmptyEmail_Register: Locator;
  private readonly message_EmptyPassword_Register: Locator;

  // Login locators
  private readonly input_UsernameOrEmailAddress_Login: Locator;
  private readonly input_Password_Login: Locator;
  private readonly button_Login: Locator;
  private readonly message_EmptyUsername_Login: Locator;
  private readonly message_InvalidUsername_Login: Locator;
  private readonly message_EmptyPassword_Login: Locator;
  private readonly message_IncorrectUsernamePassword_Login: Locator;

  constructor(public readonly page: Page) {
    this.input_EmailAddress_Register = page.locator("#reg_email");
    this.input_Password_Register = page.locator("#reg_password");
    this.button_Register = page.getByRole("button", { name: "Register" });
    this.message_PasswordStrength_Register = page.locator(
      ".woocommerce-password-strength",
    );
    this.message_EmptyEmail_Register = page.getByText(
      "Error: Please provide a valid email address.",
    );
    this.message_EmptyPassword_Register = page.getByText(
      "Error: Please enter an account password.",
    );

    this.input_UsernameOrEmailAddress_Login = page.locator("#username");
    this.input_Password_Login = page.locator("#password");
    this.button_Login = page.getByRole("button", { name: "Login" });
    this.message_InvalidUsername_Login = page.getByText(
      /Error: The username [a-z0-9]+ is not registered on this site. If you are unsure of your username, try your email address instead./,
    );
    this.message_EmptyPassword_Login = page.getByText(
      "Error: Password is required.",
    );
    this.message_EmptyUsername_Login = page.getByText(
      "Error: Username is required.",
    );
    this.message_IncorrectUsernamePassword_Login = page.getByText(
      /Error: The password you entered for the username [a-zA-Z0-9]+ is incorrect. Lost your password?/,
    );
  }

  async enterRegisterationDetails(username: string, password: string) {
    await this.input_EmailAddress_Register.fill(username);
    await this.input_Password_Register.pressSequentially(password, {
      delay: 500,
    });
  }

  async waitForPasswordStrengthMessage() {
    await expect(this.message_PasswordStrength_Register).toBeVisible();
  }

  async clickRegisterButton() {
    await this.button_Register.click();
  }

  async verifyEmptyEmailMessageDisplayed() {
    await expect(this.message_EmptyEmail_Register).toBeVisible();
  }

  async verifyEmptyPasswordMessageDisplayed() {
    await expect(this.message_EmptyPassword_Register).toBeVisible();
  }

  async waitForPageDisplayed() {
    await expect(this.button_Register).toBeVisible();
  }

  async verifyInvalidEmailMessageDisplayed() {
    const screenshot = await this.page
      .locator("form.register")
      .screenshot({ path: "invalid-email-error.png" });
    await expect(screenshot).toMatchSnapshot(
      "..\\validation-images\\invalid-email-error.png",
      { threshold: 0.5 },
    );
  }

  async enterLoginDetails(username: string, password: string) {
    await this.input_UsernameOrEmailAddress_Login.fill(username);
    await this.input_Password_Login.fill(password);
    //datlq@gmail.com
    //Datlq@12345
  }

  async clickLoginButton() {
    await this.button_Login.click();
  }

  async verifyInvalidUsernameDisplayed() {
    await expect(this.message_InvalidUsername_Login).toBeVisible();
  }

  async verifyEmptyLoginPasswordMessageDisplayed() {
    await expect(this.message_EmptyPassword_Login).toBeVisible();
  }

  async verifyEmptyLoginUsernameMessageDisplayed() {
    await expect(this.message_EmptyUsername_Login).toBeVisible();
  }

  async enterLoginPassword(password: string) {
    await this.input_Password_Login.fill(password);
  }

  async verifyLoginPasswordIsMasked() {
    const passwordFieldType =
      await this.input_Password_Login.getAttribute("type");
    expect(passwordFieldType).toBe("password");
  }

  async verifyIncorrectUsernamePasswordMessageDisplayed() {
    await expect(this.message_IncorrectUsernamePassword_Login).toBeVisible();
  }
}
