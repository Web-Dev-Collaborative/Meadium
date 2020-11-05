'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Story.associate = function (models) {
    Story.belongsTo(models.User, { foreignKey: "authorId" })
    Story.hasMany(models.Pin, { foreignKey: 'pinnedStoryId' });
    Story.hasMany(models.Comment, { foreignKey: 'commentedOnId' });
    Story.hasMany(models.Cheer, { foreignKey: 'storyId' })
  };
  return Story;
};
