'use strict';
const { Image } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await Image.bulkCreate([
        {
          url:"https://tinyurl.com/2a9ahwru",
          preview:true,
          imageableId:3,
          imageableType:"Review",

  },
        {
          url:"https://tinyurl.com/ytcy7f5p",
          preview:true,
          imageableId:2,
          imageableType:"Spot",
        },
        {
          url:"https://tinyurl.com/2s4e4ubp",
          preview:true,
          imageableId:1,
          imageableType:"Spot",
        },
        {
          url:"https://tinyurl.com/cnchjsdp",
          preview:true,
          imageableId:1,
          imageableType:"Review",
        },
        {
          url:"",
          preview:false,
          imageableId:3,
          imageableType:"Spot",
        }
      ], { validate: true });
    },


  async down (queryInterface, Sequelize) {
    options.tableName = 'Images';

    return queryInterface.bulkDelete(options, null, {});
  }
};
