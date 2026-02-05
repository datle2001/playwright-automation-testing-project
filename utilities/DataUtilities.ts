export class DataUtilities {
  static getUsernameFrom(emailAddress: string): string {
    return emailAddress.substring(0, emailAddress.indexOf("@"));
  }
}