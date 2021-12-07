const logInTheApp = require('../utils/log-in-the-app.js');
const createArrayOfManagers = require('../utils/create-array-of-managers.js');
const fillFormForManager = require('../utils/fill-form-for-manager.js');
const checkUserInTheTable = require('../utils/check-user-in-the-table.js');

require('expect-webdriverio').setOptions({ wait: 5000 });

describe('Manager creation', function () {

  before('Log in the app', async function () {
    await logInTheApp();
  });

  it('All manager properties correspond to entered data', async function () {
    const numberOfManagers = 2;
    const linkToCreateManager = await $('#first-nav-block').$('.//a[text()[contains(., "Create Manager")]]');
    const pathToCreateManager = 'formManager.html';

    const managers = JSON.parse(createArrayOfManagers(numberOfManagers));
    for (const item in managers) {
      await linkToCreateManager.waitForClickable({ timeout: 5000, reverse: false });
      await linkToCreateManager.click();
      await expect(browser).toHaveUrlContaining(pathToCreateManager);
      await fillFormForManager(JSON.stringify(managers[item]));
    };

    const pathToListOfUsers = 'Users.html';
    await expect(browser).toHaveUrlContaining(pathToListOfUsers);
    for (const item in managers) {
      await checkUserInTheTable(managers[item]);
    };
  });

});
