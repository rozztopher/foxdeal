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
     return queryInterface.bulkInsert('partners', 
     [
       {
         id: 1,
         name: 'Sanitas',
         logo: '/images/partners/sanitas.png'
       },
       {
         id: 2,
         name: 'Die Mobiliar',
         logo: '/images/partners/logo-diemobiliar.png'
       },
       {
         id: 3,
         name: 'Credit Suisse',
         logo: '/images/partners/cs.png'
       },
       {
        id: 4,
        name: 'Fahrschule Suli',
        logo: '/images/partners/Suli.png'
      },    
      
      {
        id: 5,
        name: 'Migros',
        logo: '/images/partners/migros.png'
      },      
      {
        id: 6,
        name: 'Lend',
        logo: '/images/partners/lend.png'
      },
      {
        id: 7,
        name: 'Swisscom',
        logo: '/images/partners/swisscom.png'
      },
      {
        id: 8,
        name: 'Activ Fitness',
        logo: '/images/partners/active_fitness.png'
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
