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
  const role = await row.$(userPropsSelectors.role);
  expect(role).toHaveText(user.role);
  const address_1 = await row.$(userPropsSelectors.address_1);
  expect(address_1).toHaveText(user.address_1);
  const address_2 = await row.$(userPropsSelectors.address_2);
  expect(address_2).toHaveText(user.address_2);
  const city = await row.$(userPropsSelectors.city);
  expect(city).toHaveText(user.city);
  const state = await row.$(userPropsSelectors.state);
  expect(state).toHaveText(user.stateForRead);
  const zip = await row.$(userPropsSelectors.zip);
  expect(zip).toHaveText(user.zip);
  const description = await row.$(userPropsSelectors.description);
  expect(description).toHaveText(user.description);
  const demoBalance = await row.$(userPropsSelectors.demoBalance);
  expect(demoBalance).toHaveText(user.demoBalance);
  const waitSupervisor = await row.$(userPropsSelectors.waitSupervisor);
  expect(waitSupervisor).toHaveText(user.waitSupervisor);
  const managerType = await row.$(userPropsSelectors.managerType);
  expect(managerType).toHaveText(user.managerType);
}
