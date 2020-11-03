'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(50)
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(255)
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING(50)
    }
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Story, {foreignKey: "authorId"})
    User.hasMany(models.Pin, { foreignKey: 'pinnerId' })
  };
  return User;
};
