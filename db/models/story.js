'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    body: DataTypes.TEXT,
    authorId: DataTypes.INTEGER
  }, {});
  Story.associate = function(models) {
    // associations can be defined here
  };
  return Story;
};