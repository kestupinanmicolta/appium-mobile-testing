import type { Options } from '@wdio/types';
import * as fs from 'fs';
import * as path from 'path';

const isCI = process.env.CI === 'true';
const screenshotsDir = path.resolve(__dirname, 'screenshots');

export const config: Options.Testrunner = {
    runner: 'local',

    autoCompileOpts: {
        tsNodeOpts: {
            project: './tsconfig.json',
        },
    },

    specs: [
        './features/flowersapp.feature',
    ],

    maxInstances: 1,

    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': isCI ? 'emulator-5554' : '6PW4USGAJF9XCU4P',
        'appium:appPackage': 'com.flowersapp',
        'appium:appActivity': '.ui.LoginActivity',
        'appium:noReset': false,
        'appium:autoGrantPermissions': true,
        'appium:newCommandTimeout': 300,
    }],

    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    logLevel: 'warn',
    bail: 0,
    waitforTimeout: 30000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 5,

    framework: 'cucumber',

    onPrepare: function () {
        if (!fs.existsSync(screenshotsDir)) {
            fs.mkdirSync(screenshotsDir, { recursive: true });
        }
    },

    afterScenario: async function (world: any) {
        // @ts-ignore
        const browser = globalThis.browser;
        if (!browser) return;
        try {
            const scenarioName = world.pickle?.name || `scenario-${Date.now()}`;
            const safeName = scenarioName.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 60);
            const status = world.result?.status || 'unknown';
            const screenshot = await browser.takeScreenshot();
            const filename = `${status}_${safeName}.png`;
            fs.writeFileSync(path.join(screenshotsDir, filename), screenshot, 'base64');
        } catch {}
    },

    cucumberOpts: {
        import: [
            './features/step-definitions/*.ts',
        ],
        format: ['progress'],
        profile: '',
        strict: true,
        tags: [],
        timeout: 60000,
    },
};
