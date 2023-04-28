'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Prof_Subjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      prof_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{model: 'Profs', key:'id'},
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
    await queryInterface.dropTable('Prof_Subjects');
  }
};