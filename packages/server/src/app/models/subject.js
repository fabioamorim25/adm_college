'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    
    static associate(models) {
      Subject.belongsTo(models.Departament,{foreignKey:'dep_id', as:'departament'})
      Subject.belongsToMany(models.Prof, {foreignKey:'sub_id', through:'Prof_Subjects', as:'profs'})
      Subject.belongsToMany(models.Course, {foreignKey:'sub_id', through:'Course_Subjects', as:'course'})
      Subject.belongsToMany(models.Student,{foreignKey:'sub_id', through:'Student_Subjects', as:'students'})
      Subject.belongsToMany(models.Subject, {foreignKey:'id_Subject', through:'Subject_Subjects', as:'subject'})
      Subject.belongsToMany(models.Subject, {foreignKey:'id_PreRequisite', through:'Subject_Subjects', as:'subject_preRequisite'})
    }
  }
  Subject.init({
    sub_name: DataTypes.STRING,
    sub_shift: DataTypes.STRING,
    sub_start_time: DataTypes.DATE,
    sub_stop_time: DataTypes.DATE,
    sub_description: DataTypes.TEXT,
    sub_mandatory: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Subject',
  });
  return Subject;
};