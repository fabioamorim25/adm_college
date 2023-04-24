'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dep_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{model:'Departaments', key:'id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      prof_name: {
        type: Sequelize.STRING
      },
      prof_status: {
        type: Sequelize.BOOLEAN
      },
      prof_email: {
        type: Sequelize.STRING
      },
      prof_password: {
        type: Sequelize.STRING
      },
      prof_phone: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Profs');
  }
};