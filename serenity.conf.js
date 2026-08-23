const { serenity } = require('@serenity-js/core');
const { ConsoleReporter } = require('@serenity-js/console-reporter');
const { ArtifactArchiver } = require('@serenity-js/core');

module.exports = {
    runner: {
        runner: 'cucumber',
        cucumber: {
            features: 'src/features/**/*.feature',
            stepDefinitions: 'test/steps/**/*.ts',
            require: ['test/steps/**/*.ts'],
        },
    },
    actors: {
        default: {
            actor: 'Karen',
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
        },
    },
    ipc: {
        enabled: true,
        portRange: { min: 9010, max: 9999 },
    },
    crew: [
        ConsoleReporter.forDarkTerminals(),
        ArtifactArchiver.storingArtifactsAt('./target/site/serenity'),
    ],
};
