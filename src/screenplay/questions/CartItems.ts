import { Actor, Question } from '@serenity-js/core';
import { BrowseTheWeb } from '@serenity-js/webdriverio';

export class CartItems {
    static count(): Question<number> {
        return Question.about('the number of items in cart', async (actor: Actor) => {
            const browser = BrowseTheWeb.as(actor).browser;
            const items = await browser.$$('id=com.flowersapp:id/tvCartItemName');
            return items.length;
        });
    }

    static nameAtIndex(index: number): Question<string> {
        return Question.about(`cart item name at index ${index}`, async (actor: Actor) => {
            const browser = BrowseTheWeb.as(actor).browser;
            const items = await browser.$$('id=com.flowersapp:id/tvCartItemName');
            if (items[index]) {
                return await items[index].getText();
            }
            return '';
        });
    }

    static totalPrice(): Question<string> {
        return Question.about('the total price', async (actor: Actor) => {
            const browser = BrowseTheWeb.as(actor).browser;
            const priceElement = await browser.$('id=com.flowersapp:id/tvTotalPrice');
            return await priceElement.getText();
        });
    }
}
