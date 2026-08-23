import { Actor, Task } from '@serenity-js/core';
import { BrowseTheWeb } from '@serenity-js/webdriverio';

export class ManageCart {
    static removeItemAtIndex(index: number) {
        return Task.where(
            `actor removes item at index ${index}`,
            async (actor: Actor) => {
                const browser = BrowseTheWeb.as(actor).browser;
                const removeButtons = await browser.$$('id=com.flowersapp:id/btnRemoveItem');
                if (removeButtons[index]) {
                    await removeButtons[index].click();
                }
            },
        );
    }

    static proceedToCheckout() {
        return Task.where(
            `actor proceeds to checkout`,
            async (actor: Actor) => {
                const browser = BrowseTheWeb.as(actor).browser;
                const checkoutButton = await browser.$('id=com.flowersapp:id/btnCheckout');
                await checkoutButton.click();
            },
        );
    }
}
