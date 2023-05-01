'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    
    static associate(models) {
      Student.belongsTo(models.Couse, {foreignKey:'cou_id', as:'course'})
      Student.hasMany(models.Address, {foreignKey:'stu_id', as:'address'})
      Student.belongsToMany(models.Subject,{foreignKey:'stu_id', through:'Student_Subjects', as:'subjects'})
    }
  }
  Student.init({
    stu_name: DataTypes.STRING,
    stu_registration: DataTypes.INTEGER,
    stu_course: DataTypes.STRING,
    stu_status: DataTypes.BOOLEAN,
    stu_period: DataTypes.INTEGER,
    stu_mother_name: DataTypes.STRING,
    stu_father_name: DataTypes.STRING,
    stu_phone: DataTypes.INTEGER,
    stu_email: DataTypes.STRING,
    stu_password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};