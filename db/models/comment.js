'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    commenterId: {
      type: DataTypes.INTEGER
    },
    commentedOnId: {
      type: DataTypes.INTEGER
    },
    comment: {
      allowNull: false,
      type: DataTypes.TEXT
    },
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.Story, { foreignKey: 'commentedOnId' });
    Comment.belongsTo(models.User, { foreignKey: 'commenterId' });
  };
  return Comment;
};
