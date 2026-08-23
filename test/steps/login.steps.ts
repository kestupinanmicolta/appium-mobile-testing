import { Given, When, Then } from '@cucumber/cucumber';
import { actorInTheSpotlight } from '@serenity-js/core';
import { Login } from '../../src/screenplay/tasks/Login';
import { LoginStatus } from '../../src/screenplay/questions/LoginStatus';
import { Ensure, isFalse, assertTrue } from '@serenity-js/assertions';

Given('the user is on the login screen', async function () {
    // Actor is already configured in serenity.config.ts
});

When('the user enters email {string} and password {string}', async function (email: string, password: string) {
    await actorInTheSpotlight().attemptsTo(
        Login.withCredentials(email, password),
    );
});

Then('the user should not see an error message', async function () {
    await actorInTheSpotlight().attemptsTo(
        Ensure.that(LoginStatus.isErrorVisible(), isFalse()),
    );
});

Then('the user should see an error message', async function () {
    await actorInTheSpotlight().attemptsTo(
        Ensure.that(LoginStatus.isErrorVisible(), isTrue()),
    );
});
