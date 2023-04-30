'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Course_Subjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cou_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{model: 'Courses', key:'id'},
        onUpdate: 'CASCADE', 
        onDelete:'CASCADE',
      },
      sub_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{model: 'Subjects', key:'id'},
        onUpdate: 'CASCADE', 
        onDelete:'CASCADE',
      },
      av1: {
        type: Sequelize.FLOAT
      },
      av2: {
        type: Sequelize.FLOAT
      },
      av3: {
        type: Sequelize.FLOAT
      },
      final_grade: {
        type: Sequelize.FLOAT
      },
      attendance: {
        type: Sequelize.INTEGER
      },
      student_count:{
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
    await queryInterface.dropTable('Course_Subjects');
  }
};