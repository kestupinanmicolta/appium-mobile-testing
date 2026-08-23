import { Given, When, Then } from '@cucumber/cucumber';
import { Actor } from '@serenity-js/core';
import { ManageCart } from '../../src/screenplay/tasks/ManageCart';
import { CartItems } from '../../src/screenplay/questions/CartItems';
import { UseTheApp } from '../../src/screenplay/interactions/UseTheApp';
import { expect } from '@serenity-js/assertions';

let actor: Actor;

Given('the user is on the cart screen', async function () {
    actor = Actor.named('Karen');
    await actor.whoCan(UseTheApp.usingAppium());
});

Given('the cart has items', async function () {
    const count = await CartItems.count().answeredBy(actor);
    if (count === 0) {
        // Add items if cart is empty (navigate to catalog first)
        await actor.attemptsTo(
            ManageCart.proceedToCheckout(),
        );
    }
});

When('the user removes the first item', async function () {
    await actor.attemptsTo(
        ManageCart.removeItemAtIndex(0),
    );
});

Then('the cart should be empty', async function () {
    await expect(CartItems.count()).to.eventually.equal(0);
});
