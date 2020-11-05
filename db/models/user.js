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
    profilePic: {
      type: DataTypes.STRING(50)
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
    User.hasMany(models.Story, { foreignKey: "authorId" });
    User.hasMany(models.Pin, { foreignKey: 'pinnerId' });
    User.hasMany(models.Comment, { foreignKey: 'commenterId' });
    User.hasMany(models.Cheer, { foreignKey: 'userId' })
  };
  return User;
};
