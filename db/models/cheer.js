'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cheer = sequelize.define('Cheer', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    storyId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    rating: {
      allowNull: false,
      type: DataTypes.REAL
    },
  }, {});
  Cheer.associate = function (models) {
    Cheer.belongsTo(models.User, { foreignKey: "userId" })
    Cheer.belongsTo(models.Story, { foreignKey: "storyid" })
  };
  return Cheer;
};
