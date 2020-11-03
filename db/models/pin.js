'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pin = sequelize.define('Pin', {
    pinnerId: DataTypes.INTEGER,
    pinnedStoryId: DataTypes.INTEGER
  }, {});
  Pin.associate = function(models) {
    Pin.belongsTo(models.User, { foreignKey: 'pinnerId' });
    Pin.belongsTo(models.Story, { foreignKey: 'pinnedStoryId' })
  };
  return Pin;
};
