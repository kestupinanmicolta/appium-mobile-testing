import { Given, When, Then } from '@cucumber/cucumber';
import { actorInTheSpotlight } from '@serenity-js/core';
import { ManageCart } from '../../src/screenplay/tasks/ManageCart';
import { CartItems } from '../../src/screenplay/questions/CartItems';
import { Ensure, equals } from '@serenity-js/assertions';

Given('the user is on the cart screen', async function () {
    // Actor is already configured in serenity.config.ts
});

Given('the cart has items', async function () {
    const count = await CartItems.count().answeredBy(actorInTheSpotlight());
    if (count === 0) {
        await actorInTheSpotlight().attemptsTo(
            ManageCart.proceedToCheckout(),
        );
    }
});

When('the user removes the first item', async function () {
    await actorInTheSpotlight().attemptsTo(
        ManageCart.removeItemAtIndex(0),
    );
});

Then('the cart should be empty', async function () {
    await actorInTheSpotlight().attemptsTo(
        Ensure.that(CartItems.count(), equals(0)),
    );
});
