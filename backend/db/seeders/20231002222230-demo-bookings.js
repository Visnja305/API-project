'use strict';
const { Booking } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        userId:1,
        spotId:2,
        startDate:"2023-11-25",
        endDate:"2023-11-26",

},
      {
        userId:1,
        spotId:2,
        startDate:"2023-12-12",
        endDate:"2023-12-25",
      },
      {
        userId:2,
        spotId:1,
        startDate:"2023-10-28",
        endDate:"2023-10-30",
      },
      {
        userId:3,
        spotId:2,
        startDate:"2023-11-10",
        endDate:"2023-11-15",
      },
      {
        userId:1,
        spotId:3,
        startDate:"2023-10-16",
        endDate:"2023-10-26",
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';

    return queryInterface.bulkDelete(options, null, {});
  }
};
