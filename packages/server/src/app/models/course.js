'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Course extends Model {
    
    static associate(models) {
      Course.belongsTo(models.Departament, {foreignKey:'dep_id', as:'departament'})
    }
  }

  Course.init({
    cou_name: DataTypes.STRING
  },{
    sequelize,
    modelName: 'Course',
  });
  
  
  return Course;
};