'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subject_Subjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_Subject: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{model: 'Subjects', key:'id'},
        onUpdate: 'CASCADE', 
        onDelete:'CASCADE',
      },
      id_PreRequisite: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{model: 'Subjects', key:'id'},
        onUpdate: 'CASCADE', 
        onDelete:'CASCADE',
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
    await queryInterface.dropTable('Subject_Subjects');
  }
};