const logInTheApp = require('../utils/log-in-the-app.js');
const createArrayOfRegularUsers = require('../utils/create-array-of-regular-users.js');
const fillFormForRegularUser = require('../utils/fill-form-for-regular-user');
const checkUserInTheTable = require('../utils/check-user-in-the-table.js');

require('expect-webdriverio').setOptions({ wait: 5000 });

describe('Regular user creation', function () {

  before('Log in the app', async function () {
    await logInTheApp();
  });

  it('All regular user properties correspond to entered data', async function () {
    const numberOfRegularUsers = 1;
    const linkToCreateRegularUser = await $('#first-nav-block').$('.//a[text()[contains(., "Create User")]]');
    const pathToCreateRegularUser = 'formUser.html';

    const regularUsers = JSON.parse(createArrayOfRegularUsers(numberOfRegularUsers));
    for (const item in regularUsers) {
      await linkToCreateRegularUser.waitForClickable({ timeout: 5000, reverse: false });
      await linkToCreateRegularUser.click();
      await expect(browser).toHaveUrlContaining(pathToCreateRegularUser);
      await fillFormForRegularUser(JSON.stringify(regularUsers[item]));
    };

    const pathToListOfUsers = 'Users.html';
    await expect(browser).toHaveUrlContaining(pathToListOfUsers);
    for (const item in regularUsers) {
      await checkUserInTheTable(regularUsers[item]);
    };
  });

});
