const logInTheApp = require('../utils/log-in-the-app.js');

describe('Check the status', function () {

  before('Log in the app', async function () {
    await logInTheApp();
  });

  before('Add the "waitForText" method', async function () {
    await browser.addCommand('waitForText', async function (text, timeout) {
      await browser.waitUntil.call(this, async function () {
        return (await this.isDisplayed()) && (await this.getText() === text);
      }, { 'timeout': timeout });
    }, true);
  });

  it('Status is "Active"', async function () {
    let checkStatusSelector = '#status';
    await $(checkStatusSelector).waitForDisplayed();
    await $(checkStatusSelector).click();
    await $(checkStatusSelector).waitForText('Active', 5000);
  });

});
