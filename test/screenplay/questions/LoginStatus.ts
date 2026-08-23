import { Actor, Question } from '@serenity-js/core';
import { BrowseTheWeb } from '@serenity-js/webdriverio';

export class LoginStatus {
    static errorMessage(): Question<string> {
        return Question.about('the error message', async (actor: Actor) => {
            const browser = BrowseTheWeb.as(actor).browser;
            const errorElement = await browser.$('id=com.flowersapp:id/tvError');
            return await errorElement.getText();
        });
    }

    static isErrorVisible(): Question<boolean> {
        return Question.about('whether error is visible', async (actor: Actor) => {
            const browser = BrowseTheWeb.as(actor).browser;
            const errorElement = await browser.$('id=com.flowersapp:id/tvError');
            return await errorElement.isDisplayed();
        });
    }
}
