import { Given, When, Then } from '@cucumber/cucumber';
import { Actor } from '@serenity-js/core';
import { Login } from '../../src/screenplay/tasks/Login';
import { LoginStatus } from '../../src/screenplay/questions/LoginStatus';
import { UseTheApp } from '../../src/screenplay/interactions/UseTheApp';
import { expect } from '@serenity-js/assertions';

let actor: Actor;

Given('the user is on the login screen', async function () {
    actor = Actor.named('Karen');
    await actor.whoCan(UseTheApp.usingAppium());
});

When('the user enters email {string} and password {string}', async function (email: string, password: string) {
    await actor.attemptsTo(
        Login.withCredentials(email, password),
    );
});

Then('the user should not see an error message', async function () {
    await expect(LoginStatus.isErrorVisible()).to.eventually.be.false;
});

Then('the user should see an error message', async function () {
    await expect(LoginStatus.isErrorVisible()).to.eventually.be.true;
});
