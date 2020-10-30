'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    body: DataTypes.TEXT,
    title: DataTypes.STRING(100),
    authorId: DataTypes.INTEGER
  }, {});
  Story.associate = function (models) {
    Story.belongsTo(models.User, { foreignKey: "authorId" })
  };
  return Story;
};
