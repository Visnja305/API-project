'use strict';
const { Spot } = require('../models');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId:1,
        address:"300 NW 26th St",
        city:"Miami",
        state:"Florida",
        country:"USA",
        lat:34.8882341,
        lng:-120.1826312,
        name:"house of fun times",
        description:"cute spot",
        price:150,
},
      {
        ownerId:2,
        address:"55 Mandarin st",
        city:"West Palm Beach",
        state:"Florida",
        country:"USA",
        lat:37.8882341,
        lng:-80.1826312,
        name:"colorful",
        description:"surounded with flowers,with walls painted in rainbow colors",
        price:110,
      },
      {
        ownerId:3,
        address:"318 Boat Ave",
        city:"Key West",
        state:"Florida",
        country:"USA",
        lat:22.8982341,
        lng:-10.1823312,
        name:"weekend escape",
        description:"two bedroom house with private pool",
        price:180,
      }
    ], { validate: true });
  },








  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';

    return queryInterface.bulkDelete(options, null, {});
  }
};
