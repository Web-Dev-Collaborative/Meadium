'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'test-user',
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'User',
      hashedPassword: 'password',
      profilePic: '.../Assets/profilePics/IMG_8442.jpeg',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
