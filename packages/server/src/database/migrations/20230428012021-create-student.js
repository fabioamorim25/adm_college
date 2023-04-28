'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cou_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{model:'Courses', key:'id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      stu_name: {
        type: Sequelize.STRING
      },
      stu_registration: {
        type: Sequelize.INTEGER
      },
      stu_course: {
        type: Sequelize.STRING
      },
      stu_status: {
        type: Sequelize.BOOLEAN
      },
      stu_period: {
        type: Sequelize.INTEGER
      },
      stu_mother_name: {
        type: Sequelize.STRING
      },
      stu_father_name: {
        type: Sequelize.STRING
      },
      stu_phone: {
        type: Sequelize.INTEGER
      },
      stu_email: {
        type: Sequelize.STRING
      },
      stu_password: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Students');
  }
};