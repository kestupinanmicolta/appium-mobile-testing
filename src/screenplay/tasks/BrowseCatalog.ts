import { Actor, Task } from '@serenity-js/core';
import { BrowseTheWeb } from '@serenity-js/webdriverio';

export class BrowseCatalog {
    static viewAllProducts() {
        return Task.where(
            `actor views all products`,
            async (actor: Actor) => {
                const browser = BrowseTheWeb.as(actor).browser;
                await browser.$('id=com.flowersapp:id/rvCatalog').waitForExist({ timeout: 10000 });
            },
        );
    }

    static clickProductAtIndex(index: number) {
        return Task.where(
            `actor clicks product at index ${index}`,
            async (actor: Actor) => {
                const browser = BrowseTheWeb.as(actor).browser;
                const products = await browser.$$('id=com.flowersapp:id/tvProductName');
                if (products[index]) {
                    await products[index].click();
                }
            },
        );
    }

    static searchForProduct(query: string) {
        return Task.where(
            `actor searches for: ${query}`,
            async (actor: Actor) => {
                const browser = BrowseTheWeb.as(actor).browser;
                const searchView = await browser.$('id=com.flowersapp:id/search_view');
                await searchView.setValue(query);
            },
        );
    }

    static goToCart() {
        return Task.where(
            `actor goes to cart`,
            async (actor: Actor) => {
                const browser = BrowseTheWeb.as(actor).browser;
                const cartFab = await browser.$('id=com.flowersapp:id/fabCart');
                await cartFab.click();
            },
        );
    }
}
