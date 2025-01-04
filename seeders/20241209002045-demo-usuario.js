// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// };

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Inserta datos iniciales en la tabla Usuarios
    return queryInterface.bulkInsert('Usuarios', [
      {
        nombre: 'Juan Pérez',
        email: 'juan.perez@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Ana García',
        email: 'ana.garcia@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Elimina los datos agregados en el seeder
    return queryInterface.bulkDelete('Usuarios', null, {});
  }
};

