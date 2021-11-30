module.exports = function createArrayOfUsers(length) {
  const users = [];
  for (let i = 1; i <= length; i++) {
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
  }

  return JSON.stringify(users);
}
