'use strict';
const {Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {

  class Departament extends Model {
    static associate(models) {
      // define association here
    }
  }
  Departament.init({
    dep_name: DataTypes.STRING,
    dep_email: DataTypes.STRING,
    dep_password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Departament',
  });
  return Departament;
};