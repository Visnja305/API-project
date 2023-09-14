'use strict';
const { Review } = require('../models');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        userId:1,
        spotId:2,
        review:"beautiful patio",
        stars:4,

},
      {
        userId:3,
        spotId:1,
        review:"great location,very loud neighbours",
        stars:3,
      },
      {
        userId:2,
        spotId:1,
        review:"friendly host,clean,new furniture",
        stars:5,
      },
      {
        userId:1,
        spotId:3,
        review:"not what I expected",
        stars:2,
      }
    ], { validate: true });
  },


  async down (queryInterface, Sequelize) {

    options.tableName = 'Reviews';

    return queryInterface.bulkDelete(options, null, {});
  }
};
