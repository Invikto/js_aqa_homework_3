module.exports = function createArrayOfRegularUsers(length) {
  const regularUsers = [];
  for (let i = 1; i <= length; i++) {
    const regularUser = {
      email: `regular_user_${i}@test.test`,
      password: `regular_user_password_${i}`,
      role: 'user',
      address_1: `regular_user_address_${i}.1`,
      address_2: `regular_user_address_${i}.2`,
      city: `regular_user_city_${i}`,
      stateForCreate: '',
      stateForRead: '',
      zip: '567890',
      description: `regular_user_description_${i}`,
      demoBalance: '',
      waitSupervisor: '',
      managerType: ''
    };
    regularUsers.push(regularUser);
  }

  return JSON.stringify(regularUsers);
}
