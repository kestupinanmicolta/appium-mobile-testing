import type { Options } from '@wdio/types';
import { execSync } from 'child_process';

const adbPath = 'C:\\Users\\pacho\\AppData\\Local\\Android\\Sdk\\platform-tools\\adb.exe';
const deviceId = '6PW4USGAJF9XCU4P';

function runAdb(command: string) {
    try {
        execSync(`"${adbPath}" -s ${deviceId} ${command}`, { stdio: 'pipe' });
    } catch {}
}

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
        'appium:deviceName': '6PW4USGAJF9XCU4P',
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
        // Disable Google Autofill service before tests
        runAdb('shell settings put secure autofill_service null');
        runAdb('shell settings put secure enabled_accessibility_services null');
        // Kill the app to start fresh
        runAdb('shell am force-stop com.flowersapp');
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
