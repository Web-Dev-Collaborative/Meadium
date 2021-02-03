'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pinnerId: {
        references: { model: 'Users' },
        allowNull: false,
        type: Sequelize.INTEGER
      },
      pinnedStoryId: {
        references: { model: 'Stories' },
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
      {
        uniqueKeys: {
          actions_unique: {
            fields: ['pinnerId', 'pinnedStoryId']
          }
        }
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Pins');
  }
};
