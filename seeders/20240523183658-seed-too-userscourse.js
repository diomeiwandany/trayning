'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const data = require('../data/userscourses.json').map((e) => {
    delete e.id;
      e.createdAt = e.updatedAt = new Date();
      return e;
   })
   await queryInterface.bulkInsert('UsersCourses', data)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('UsersCourses', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    })
  }
};
