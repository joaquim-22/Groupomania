'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Users.hasMany(models.Posts, { onDelete: "cascade", hooks: true })
      models.Users.hasMany(models.Comments, { onDelete: "cascade", hooks: true })
      models.Users.hasMany(models.Likes, { onDelete: "cascade", hooks: true })
    }
  }
  Users.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    email: DataTypes.STRING,
    dateNaissance: DataTypes.STRING,
    password: DataTypes.STRING,
    profilImage: DataTypes.STRING,
    department: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};