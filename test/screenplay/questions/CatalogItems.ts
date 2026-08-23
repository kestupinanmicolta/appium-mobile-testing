import { Actor, Question } from '@serenity-js/core';
import { BrowseTheWeb } from '@serenity-js/webdriverio';

export class CatalogItems {
    static count(): Question<number> {
        return Question.about('the number of products in catalog', async (actor: Actor) => {
            const browser = BrowseTheWeb.as(actor).browser;
            const products = await browser.$$('id=com.flowersapp:id/tvProductName');
            return products.length;
        });
    }

    static nameAtIndex(index: number): Question<string> {
        return Question.about(`product name at index ${index}`, async (actor: Actor) => {
            const browser = BrowseTheWeb.as(actor).browser;
            const products = await browser.$$('id=com.flowersapp:id/tvProductName');
            if (products[index]) {
                return await products[index].getText();
            }
            return '';
        });
    }
}
