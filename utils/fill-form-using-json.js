module.exports = async function fillFormUsingJson(jsonStr) {
  const user = JSON.parse(jsonStr);

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
