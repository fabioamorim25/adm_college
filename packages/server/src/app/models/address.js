'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
   
    static associate(models) {
      Address.belongsTo(models.Student, {foreignKey:'stu_id', as:'student'})
    }
  }
  Address.init({
    add_street: DataTypes.STRING,
    add_city: DataTypes.STRING,
    add_neighborhood: DataTypes.STRING,
    add_number: DataTypes.INTEGER,
    add_complement: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};