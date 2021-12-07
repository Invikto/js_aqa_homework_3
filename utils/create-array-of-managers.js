module.exports = function createArrayOfManagers(length) {
  const managers = [];
  for (let i = 1; i <= length; i++) {
    const manager = {
      email: `manager_${i}@test.test`,
      password: `manager_password_${i}`,
      role: 'manager',
      address_1: `manager_address_${i}.1`,
      address_2: `manager_address_${i}.2`,
      city: 'a',
      stateForCreate: 'Canada',
      stateForRead: 'CA',
      zip: '567890',
      description: `manager_description_${i}`,
      demoBalance: '',
      waitSupervisor: '',
      managerType: 'country'
    };
    managers.push(manager);
  }

  return JSON.stringify(managers);
}
