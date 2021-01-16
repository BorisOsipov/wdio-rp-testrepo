const reportportal = require('wdio-reportportal-reporter');
const RpService = require("wdio-reportportal-service");

const conf = {
    reportPortalClientConfig: {
        token: 'a3a4b292-606c-4161-9b88-94a77e61e201',
        endpoint: 'https://demo.reportportal.io/api/v1',
        launch: 'launchname',
        project: 'borisosipov_personal',
        description: "Launch description text",
        mode: 'DEFAULT',
        debug: false,
        attributes: [{key:"tag", value: "foo"}],
    },
    reportSeleniumCommands: false,
    autoAttachScreenshots: true,
    seleniumCommandsLogLevel: 'debug',
    screenshotsLogLevel: 'info',
    parseTagsFromTestTitle: true,
};

exports.config = {
    baseUrl: 'http://localhost',
    path: "/wd/hub/",
    reporterSyncInterval: 5 * 1000, // in ms. default 5000
    specs: [
        './specs/**/*.js'
    ],
    maxInstances: 5,
    capabilities: [
        {
            maxInstances: 5,
            browserName: 'chrome',
            'goog:chromeOptions': {
                'args': ['--headless', '--disable-gpu']
            }
        },
    ],
    logLevel: 'error',
    bail: 0,
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 30000
    },
   services: [[RpService, {}]],
   reporters: [[reportportal, conf]],

    beforeSession: function (config, capabilities, specs) {
        require('@babel/register');
        require('expect-webdriverio')
    },

    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (passed === false) {
            await browser.saveScreenshot(`./trash/${+new Date()}.png`);
            reportportal.sendLogToTest(test, 'INFO', "Hello world");
        }
    },

    onComplete: async function (_, config) {
        const link = await RpService.getLaunchUrl(config);
        console.log(`Report portal link ${link}`)
    }
};
