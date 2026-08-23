import { Actor, Task } from '@serenity-js/core';
import { BrowseTheWeb } from '@serenity-js/webdriverio';
import { by } from 'webdriverio';

export class Login {
    static withCredentials(email: string, password: string) {
        return Task.where(
            `actor enters credentials`,
            Login.enterEmail(email),
            Login.enterPassword(password),
            Login.clickLoginButton(),
        );
    }

    static enterEmail(email: string) {
        return Task.where(
            `actor enters email: ${email}`,
            async (actor: Actor) => {
                const browser = BrowseTheWeb.as(actor).browser;
                const emailInput = await browser.$('id=com.flowersapp:id/etEmail');
                await emailInput.clearValue();
                await emailInput.setValue(email);
            },
        );
    }

    static enterPassword(password: string) {
        return Task.where(
            `actor enters password`,
            async (actor: Actor) => {
                const browser = BrowseTheWeb.as(actor).browser;
                const passwordInput = await browser.$('id=com.flowersapp:id/etPassword');
                await passwordInput.clearValue();
                await passwordInput.setValue(password);
            },
        );
    }

    static clickLoginButton() {
        return Task.where(
            `actor clicks login button`,
            async (actor: Actor) => {
                const browser = BrowseTheWeb.as(actor).browser;
                const loginButton = await browser.$('id=com.flowersapp:id/btnLogin');
                await loginButton.click();
            },
        );
    }
}
