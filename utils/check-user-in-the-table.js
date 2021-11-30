const assert = require('chai').assert;

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

module.exports = async function checkUserInTheTable(user) {
  const emailSelector = `//*[contains(text(), "${user.email}")]`;
  const row = await $('#users-table').$(emailSelector).$('.//ancestor::*[@role="row"]');
  const role = await row.$(userPropsSelectors.role).getText();
  assert.equal(role, user.role);
  const address_1 = await row.$(userPropsSelectors.address_1).getText();
  assert.equal(address_1, user.address_1);
  const address_2 = await row.$(userPropsSelectors.address_2).getText();
  assert.equal(address_2, user.address_2);
  const city = await row.$(userPropsSelectors.city).getText();
  assert.equal(city, user.city);
  const state = await row.$(userPropsSelectors.state).getText();
  assert.equal(state, user.stateForRead);
  const zip = await row.$(userPropsSelectors.zip).getText();
  assert.equal(zip, user.zip);
  const description = await row.$(userPropsSelectors.description).getText();
  assert.equal(description, user.description);
  const demoBalance = await row.$(userPropsSelectors.demoBalance).getText();
  assert.equal(demoBalance, user.demoBalance);
  const waitSupervisor = await row.$(userPropsSelectors.waitSupervisor).getText();
  assert.equal(waitSupervisor, user.waitSupervisor);
  const managerType = await row.$(userPropsSelectors.managerType).getText();
  assert.equal(managerType, user.managerType);
}
