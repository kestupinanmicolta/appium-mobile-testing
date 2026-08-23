import { Given, When, Then } from '@cucumber/cucumber';
import { Actor } from '@serenity-js/core';
import { Login } from '../../../test/screenplay/tasks/Login';
import { LoginStatus } from '../../../test/screenplay/questions/LoginStatus';
import { Ensure, isFalse, isTrue } from '@serenity-js/assertions';

Given('{actor} is on the login screen', async function (actor: Actor) {
    // Actor is configured via wdio + serenity
});

When('{pronoun} enters email {string} and password {string}', async function (actor: Actor, email: string, password: string) {
    await actor.attemptsTo(
        Login.withCredentials(email, password),
    );
});

Then('{pronoun} should not see an error message', async function (actor: Actor) {
    await actor.attemptsTo(
        Ensure.that(LoginStatus.isErrorVisible(), isFalse()),
    );
});

Then('{pronoun} should see an error message', async function (actor: Actor) {
    await actor.attemptsTo(
        Ensure.that(LoginStatus.isErrorVisible(), isTrue()),
    );
});
