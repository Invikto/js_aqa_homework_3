const logInTheApp = require('../utils/log-in-the-app.js');
const createArrayOfUsers = require('../utils/create-array-of-users.js');
const fillFormUsingJson = require('../utils/fill-form-using-json.js');
const checkUserInTheTable = require('../utils/check-user-in-the-table.js');

require('expect-webdriverio').setOptions({ wait: 5000 });

describe('Manager creation', function () {

  before('Log in the app', async function () {
    await logInTheApp();
  });

  it('All user properties correspond to entered data', async function () {
    const numberOfUsers = 2;
    const linkToCreateManager = await $('#first-nav-block').$('.//a[text()[contains(., "Create Manager")]]');
    const pathToCreateManager = 'formManager.html';

    const users = JSON.parse(createArrayOfUsers(numberOfUsers));
    for (const item in users) {
      await linkToCreateManager.waitForClickable({ timeout: 5000, reverse: false });
      await linkToCreateManager.click();
      await expect(browser).toHaveUrlContaining(pathToCreateManager);
      await fillFormUsingJson(JSON.stringify(users[item]));
    };

    const pathToListOfUsers = 'Users.html';
    await expect(browser).toHaveUrlContaining(pathToListOfUsers);
    for (const item in users) {
      await checkUserInTheTable(users[item]);
    };
  });

});
