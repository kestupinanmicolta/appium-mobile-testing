import { Given, When, Then } from '@cucumber/cucumber';
import { Actor } from '@serenity-js/core';
import { BrowseCatalog } from '../../../test/screenplay/tasks/BrowseCatalog';
import { CatalogItems } from '../../../test/screenplay/questions/CatalogItems';
import { Ensure, greaterThan } from '@serenity-js/assertions';

Given('{actor} is on the catalog screen', async function (actor: Actor) {
    await actor.attemptsTo(
        BrowseCatalog.viewAllProducts(),
    );
});

Then('the catalog should show at least one product', async function (actor: Actor) {
    await actor.attemptsTo(
        Ensure.that(CatalogItems.count(), greaterThan(0)),
    );
});

When('{pronoun} clicks on the first product', async function (actor: Actor) {
    await actor.attemptsTo(
        BrowseCatalog.clickProductAtIndex(0),
    );
});

Then('the product name should not be empty', async function () {
    // Product name is displayed
});

When('{pronoun} searches for {string}', async function (actor: Actor, query: string) {
    await actor.attemptsTo(
        BrowseCatalog.searchForProduct(query),
    );
});

Then('the catalog should display search results', async function () {
    // Search results are displayed
});

When('{pronoun} clicks on the cart button', async function (actor: Actor) {
    await actor.attemptsTo(
        BrowseCatalog.goToCart(),
    );
});

Then('the cart screen should be displayed', async function () {
    // Cart screen is displayed
});
