const assert = require('chai').assert;
const logInTheApp = require('../utils/log-in-the-app.js');

describe('Manager creation', function () {

  before('Log in the app', async function () {
    await logInTheApp();
  });

  it('All user properties correspond to entered data', async function () {
    const createManagerLink = await $('#first-nav-block').$('.//a[text()[contains(., "Create Manager")]]');
    const users = [];
    for (let i = 1; i <= 2; i++) {
      const user = {
        email: `email_${i}@test.test`,
        password: `password_${i}`,
        role: 'manager',
        address_1: `address_${i}.1`,
        address_2: `address_${i}.2`,
        city: 'a',
        stateForCreate: 'Canada',
        stateForRead: 'CA',
        zip: '567890',
        description: `description_${i}`,
        demoBalance: ' ',
        waitSupervisor: ' ',
        managerType: 'country'
      };
      users.push(user);

      await createManagerLink.waitForDisplayed({ timeout: 5000, reverse: false });
      await createManagerLink.click();
      await $('//h3[contains(text(), "Create new Manager")]').waitForDisplayed({ timeout: 5000, reverse: false });

      await $('#email').setValue(user.email);
      await $('#password').setValue(user.password);
      await $('#address1').setValue(user.address_1);
      await $('#address2').setValue(user.address_2);
      await $('#state').selectByVisibleText(user.stateForCreate);
      await $('#zip').setValue(user.zip);
      await $('#description').setValue(user.description);
      await $('#city').setValue(user.city);
      await $('#autoComplete_list_1').$('li').click();
      await $('button[type="submit"]').click();
    }

    const userPropsSelectors = {
      email: './/*[@tabulator-field="email"]',
      role: './/*[@tabulator-field="role"]',
      address_1: './/*[@tabulator-field="address1"]',
      address_2: './/*[@tabulator-field="address2"]',
      city: './/*[@tabulator-field="city"]',
      state: './/*[@tabulator-field="state"]',
      zip: './/*[@tabulator-field="zip"]',
      description: './/*[@tabulator-field="description"]',
      demoBalance: './/*[@tabulator-field="demo-balance"]',
      waitSupervisor: './/*[@tabulator-field="wait-supervisor"]',
      managerType: './/*[@tabulator-field="manager-type"]'
    };

    await $('//h3[contains(text(), "List of Users")]').waitForDisplayed({ timeout: 5000, reverse: false });
    for (let i = 1; i <= 2; i++) {
      const emailSelector = `//*[contains(text(), "${users[i - 1].email}")]`;
      const row = await $('#users-table').$(emailSelector).$('.//ancestor::*[@role="row"]');
      const role = await row.$(userPropsSelectors.role).getText();
      assert.equal(role, users[i - 1].role);
      const address_1 = await row.$(userPropsSelectors.address_1).getText();
      assert.equal(address_1, users[i - 1].address_1);
      const address_2 = await row.$(userPropsSelectors.address_2).getText();
      assert.equal(address_2, users[i - 1].address_2);
      const city = await row.$(userPropsSelectors.city).getText();
      assert.equal(city, users[i - 1].city);
      const state = await row.$(userPropsSelectors.state).getText();
      assert.equal(state, users[i - 1].stateForRead);
      const zip = await row.$(userPropsSelectors.zip).getText();
      assert.equal(zip, users[i - 1].zip);
      const description = await row.$(userPropsSelectors.description).getText();
      assert.equal(description, users[i - 1].description);
      const demoBalance = await row.$(userPropsSelectors.demoBalance).getText();
      assert.equal(demoBalance, users[i - 1].demoBalance);
      const waitSupervisor = await row.$(userPropsSelectors.waitSupervisor).getText();
      assert.equal(waitSupervisor, users[i - 1].waitSupervisor);
      const managerType = await row.$(userPropsSelectors.managerType).getText();
      assert.equal(managerType, users[i - 1].managerType);
    }
  });

});
