import { expect, Locator, Page } from "@playwright/test";
export class HomePage {
    private readonly listItem_Arrivals: Locator;

    constructor(private readonly page: Page) {
        this.listItem_Arrivals = this.page.locator('ul.products li.product');
    }

    async waitForPageDisplayed() {
        const image_ShopSeleniumBooks = this.page.locator('img[alt="Shop Selenium Books"]');
        await expect(image_ShopSeleniumBooks).toBeVisible();
    }

    async verifyArrivalsListHas(quantity: number) {
        await expect(this.listItem_Arrivals).toHaveCount(quantity);
    }

    async clickArrivalImageByIndex(index: number) {
        const arrival = this.listItem_Arrivals.nth(index);
        const productLink = arrival.locator('a').first();
        await productLink.click();
    }
}