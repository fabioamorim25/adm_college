'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    
    static associate(models) {
      Subject.belongsTo(models.Departament,{foreignKey:'dep_id', as:'departament'})
      Subject.belongsToMany(models.Prof, {foreignKey:'sub_id', through:'Prof_Subjects', as:'profs'})
    }
  }
  Subject.init({
    sub_name: DataTypes.STRING,
    sub_shift: DataTypes.STRING,
    sub_start_time: DataTypes.DATE,
    sub_stop_time: DataTypes.DATE,
    sub_description: DataTypes.TEXT,
    sub_mandatory: DataTypes.BOOLEAN,
    sub_student_count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subject',
  });
  return Subject;
};