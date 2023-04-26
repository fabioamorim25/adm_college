'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subjects', {
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
      sub_name: {
        type: Sequelize.STRING
      },
      sub_shift: {
        type: Sequelize.STRING
      },
      sub_start_time: {
        type: Sequelize.DATE
      },
      sub_stop_time: {
        type: Sequelize.DATE
      },
      sub_description: {
        type: Sequelize.TEXT
      },
      sub_mandatory: {
        type: Sequelize.BOOLEAN
      },
      sub_student_count: {
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
    await queryInterface.dropTable('Subjects');
  }
};