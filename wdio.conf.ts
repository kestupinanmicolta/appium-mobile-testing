import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {
    framework: '@serenity-js/webdriverio',

    serenity: {
        runner: 'cucumber',
        crew: [
            '@serenity-js/console-reporter',
            ['@serenity-js/html-reporter', { specDirectory: './features' }],
        ],
    },

    specs: [
        './features/**/*.feature',
    ],

    maxInstances: 1,

    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'emulator-5554',
        'appium:appPackage': 'com.flowersapp',
        'appium:appActivity': '.ui.LoginActivity',
        'appium:noReset': false,
        'appium:autoGrantPermissions': true,
        'appium:newCommandTimeout': 300,
    }],

    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    logLevel: 'error',
    bail: 0,
    waitforTimeout: 30000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 5,

    cucumberOpts: {
        require: [
            './features/support/*.ts',
            './features/step-definitions/*.ts',
        ],
        format: [],
        profile: '',
        strict: false,
        tags: [],
        timeout: 60000,
    },
};
