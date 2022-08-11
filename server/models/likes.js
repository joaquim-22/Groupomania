'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Likes.belongsTo(models.Posts, {as: 'post', foreignKey: 'postId' });
      models.Likes.belongsTo(models.Users, {as: 'user', foreignKey: 'userId' })
    }
  }
  Likes.init({
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Likes',
  });
  return Likes;
};