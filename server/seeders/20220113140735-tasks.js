'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('tasks', 
     [
       {
         id: 1,         
         credits: 19,
         partner_id: 1,
         desc: 'Amet minim sit mollit non deserunt ullamco is sit aliqua dolor do amet sint velit.'
       },
       {
         id: 2,
         credits: 29,
         partner_id: 2,
         desc: 'Amet minim sit mollit non deserunt ullamco is sit aliqua dolor do amet sint velit.'
       },
       {
         id: 3,
         credits: 39,
         partner_id: 3,
         desc: 'Amet minim sit mollit non deserunt ullamco is sit aliqua dolor do amet sint velit.'
       },
       {
        id: 4,
        credits: 49,
        partner_id: 4,
        desc: 'Amet minim sit mollit non deserunt ullamco is sit aliqua dolor do amet sint velit.'
      },    
      
      {
        id: 5,
        credits: 59,
         partner_id: 5,
         desc: 'Amet minim sit mollit non deserunt ullamco is sit aliqua dolor do amet sint velit.'
      },      
      {
        id: 6,
        credits: 69,
         partner_id: 6,
         desc: 'Amet minim sit mollit non deserunt ullamco is sit aliqua dolor do amet sint velit.'
      },
      {
        id: 7,
        credits: 79,
        partner_id: 7,
        desc: 'Amet minim sit mollit non deserunt ullamco is sit aliqua dolor do amet sint velit.'
      },
      {
        id: 8,
        credits: 89,
        partner_id: 8,
        desc: 'Amet minim sit mollit non deserunt ullamco is sit aliqua dolor do amet sint velit.'
      },
     ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
