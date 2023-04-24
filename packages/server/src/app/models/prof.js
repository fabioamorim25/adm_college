'use strict';
const { Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Prof extends Model {

    static associate(models) {
      Prof.belongsTo(models.Departament, {foreignKey:'dep_id', as:'departament'})
    }
  }
  Prof.init({
    prof_name: DataTypes.STRING,
    prof_status: DataTypes.BOOLEAN,
    prof_email: DataTypes.STRING,
    prof_password: DataTypes.STRING,
    prof_phone: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Prof',
  });
 
 
  return Prof;
};