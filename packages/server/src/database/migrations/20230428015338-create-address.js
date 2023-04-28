'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stu_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{model:'Students', key:'id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      add_street: {
        type: Sequelize.STRING
      },
      add_city: {
        type: Sequelize.STRING
      },
      add_neighborhood: {
        type: Sequelize.STRING
      },
      add_number: {
        type: Sequelize.INTEGER
      },
      add_complement: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Addresses');
  }
};