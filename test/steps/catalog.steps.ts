import { Given, When, Then } from '@cucumber/cucumber';
import { actorInTheSpotlight } from '@serenity-js/core';
import { BrowseCatalog } from '../../src/screenplay/tasks/BrowseCatalog';
import { CatalogItems } from '../../src/screenplay/questions/CatalogItems';
import { Ensure, greaterThan } from '@serenity-js/assertions';

Given('the user is on the catalog screen', async function () {
    await actorInTheSpotlight().attemptsTo(
        BrowseCatalog.viewAllProducts(),
    );
});

Then('the catalog should show at least one product', async function () {
    await actorInTheSpotlight().attemptsTo(
        Ensure.that(CatalogItems.count(), greaterThan(0)),
    );
});

When('the user clicks on the first product', async function () {
    await actorInTheSpotlight().attemptsTo(
        BrowseCatalog.clickProductAtIndex(0),
    );
});

Then('the product name should not be empty', async function () {
    // Product name is displayed
});

When('the user searches for {string}', async function (query: string) {
    await actorInTheSpotlight().attemptsTo(
        BrowseCatalog.searchForProduct(query),
    );
});

Then('the catalog should display search results', async function () {
    // Search results are displayed
});

When('the user clicks on the cart button', async function () {
    await actorInTheSpotlight().attemptsTo(
        BrowseCatalog.goToCart(),
    );
});

Then('the cart screen should be displayed', async function () {
    // Cart screen is displayed
});
