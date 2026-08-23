import { BeforeAll, AfterAll } from '@cucumber/cucumber';
import { configure, Actor } from '@serenity-js/core';
import { BrowseTheWeb } from '@serenity-js/webdriverio';
import { remote } from 'webdriverio';

let browser: any;

BeforeAll(async function () {
    const appiumServer = process.env.APPIUM_SERVER || 'http://localhost:4723';
    const url = new URL(appiumServer);

    browser = await remote({
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
    });

    configure({
        actors: {
            default: () => Actor.named('Karen').whoCan(BrowseTheWeb.using(browser)),
        },
        crew: [
            '@serenity-js/console-reporter',
        ],
    });
});

AfterAll(async function () {
    if (browser) {
        await browser.deleteSession();
    }
});
