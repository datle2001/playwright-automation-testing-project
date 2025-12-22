export class RandomUtilities {
  static generateRandomEmail(domain: string = "example.com"): string {
    const randomString = Math.random().toString(36).substring(2, 11);
    return `${randomString}@${domain}`;
  }

  static generateRandomInvalidEmail(): string {
    const randomString = Math.random().toString(36).substring(2, 11);
    return `${randomString}example.com`; // Missing '@' symbol
  }

  static getPassword(length: number = 10): string {
    return ";bZ?h~E%NPx24Up";
  }
}