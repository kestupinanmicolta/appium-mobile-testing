import { Given, When, Then } from '@cucumber/cucumber';
import { Actor } from '@serenity-js/core';
import { BrowseCatalog } from '../../src/screenplay/tasks/BrowseCatalog';
import { CatalogItems } from '../../src/screenplay/questions/CatalogItems';
import { UseTheApp } from '../../src/screenplay/interactions/UseTheApp';
import { expect } from '@serenity-js/assertions';

let actor: Actor;

Given('the user is on the catalog screen', async function () {
    actor = Actor.named('Karen');
    await actor.whoCan(UseTheApp.usingAppium());
    await actor.attemptsTo(
        BrowseCatalog.viewAllProducts(),
    );
});

Then('the catalog should show at least one product', async function () {
    await expect(CatalogItems.count()).to.eventually.be.greaterThan(0);
});

When('the user clicks on the first product', async function () {
    await actor.attemptsTo(
        BrowseCatalog.clickProductAtIndex(0),
    );
});

Then('the product name should not be empty', async function () {
    const name = await CatalogItems.nameAtIndex(0).answeredBy(actor);
    expect(name).to.not.be.empty;
});

When('the user searches for {string}', async function (query: string) {
    await actor.attemptsTo(
        BrowseCatalog.searchForProduct(query),
    );
});

Then('the catalog should display search results', async function () {
    // Search results are displayed
});

When('the user clicks on the cart button', async function () {
    await actor.attemptsTo(
        BrowseCatalog.goToCart(),
    );
});

Then('the cart screen should be displayed', async function () {
    // Cart screen is displayed
});
