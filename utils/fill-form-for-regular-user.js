module.exports = async function fillFormForRegularUser(jsonStr) {
  const regularUser = JSON.parse(jsonStr);

  await $('#email').setValue(regularUser.email);
  await $('#password').setValue(regularUser.password);
  await $('#address1').setValue(regularUser.address_1);
  await $('#address2').setValue(regularUser.address_2);
  await $('#zip').setValue(regularUser.zip);
  await $('#description').setValue(regularUser.description);
  await $('#city').setValue(regularUser.city);
  await $('button[type="submit"]').click();
}
