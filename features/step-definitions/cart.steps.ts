import { Given, When, Then } from '@cucumber/cucumber';
import { Actor } from '@serenity-js/core';
import { ManageCart } from '../../../test/screenplay/tasks/ManageCart';
import { CartItems } from '../../../test/screenplay/questions/CartItems';
import { Ensure, equals } from '@serenity-js/assertions';

Given('{actor} is on the cart screen', async function (actor: Actor) {
    // Actor is configured via wdio + serenity
});

Given('the cart has items', async function (actor: Actor) {
    const count = await CartItems.count().answeredBy(actor);
    if (count === 0) {
        await actor.attemptsTo(
            ManageCart.proceedToCheckout(),
        );
    }
});

When('{pronoun} removes the first item', async function (actor: Actor) {
    await actor.attemptsTo(
        ManageCart.removeItemAtIndex(0),
    );
});

Then('the cart should be empty', async function (actor: Actor) {
    await actor.attemptsTo(
        Ensure.that(CartItems.count(), equals(0)),
    );
});
