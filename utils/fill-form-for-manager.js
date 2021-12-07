module.exports = async function fillFormForManager(jsonStr) {
  const manager = JSON.parse(jsonStr);

  await $('#email').setValue(manager.email);
  await $('#password').setValue(manager.password);
  await $('#address1').setValue(manager.address_1);
  await $('#address2').setValue(manager.address_2);
  await $('#state').selectByVisibleText(manager.stateForCreate);
  await $('#zip').setValue(manager.zip);
  await $('#description').setValue(manager.description);
  await $('#city').setValue(manager.city);
  await $('#autoComplete_list_1').$('li').click();
  await $('button[type="submit"]').click();
}
