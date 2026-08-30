import { WebdriverIOConfig } from '@serenity-js/webdriverio';

const appiumServer = process.env.APPIUM_SERVER || 'http://localhost:4723';

export const config: WebdriverIOConfig = {
    framework: '@serenity-js/webdriverio',

    serenity: {
        runner: 'cucumber',
        crew: [
            '@serenity-js/console-reporter',
            ['@serenity-js/html-reporter', { specDirectory: './features' }],
        ],
    },

    automationProtocol: 'appium',

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

    hostname: new URL(appiumServer).hostname,
    port: parseInt(new URL(appiumServer).port || '4723'),
    path: '/',

    logLevel: 'error',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

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
