'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Course extends Model {
    
    static associate(models) {
      Course.belongsTo(models.Departament, {foreignKey:'dep_id', as:'departament'})
      Course.hasMany(models.Student, {foreignKey:'cou_id', as:'student'})
      Course.belongsToMany(models.Subject, {foreignKey:'cou_id', through:'Course_Subjects', as:'subject'})
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