import { Actor, Interaction } from '@serenity-js/core';
import { BrowseTheWeb } from '@serenity-js/webdriverio';
import { remote, RemoteOptions } from 'webdriverio';

const appiumServer = process.env.APPIUM_SERVER || 'http://localhost:4723';

export class UseTheApp extends Interaction {
    static usingAppium() {
        return {
            configuredBy: async (actor: Actor) => {
                const url = new URL(appiumServer);
                const options: RemoteOptions = {
                    hostname: url.hostname,
                    port: parseInt(url.port || '4723'),
                    path: '/',
                    capabilities: {
                        platformName: 'Android',
                        'appium:automationName': 'UiAutomator2',
                        'appium:deviceName': 'emulator-5554',
                        'appium:appPackage': 'com.flowersapp',
                        'appium:appActivity': '.ui.LoginActivity',
                        'appium:noReset': false,
                        'appium:autoGrantPermissions': true,
                        'appium:newCommandTimeout': 300,
                    },
                };

                const browser = await remote(options);
                actor.whoCan(BrowseTheWeb.using(browser));
            },
        };
    }

    performAs(actor: Actor): Promise<void> {
        return Promise.resolve();
    }
}
