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
          url:"https://tinyurl.com/3bpnpzpx",
          preview:true,
          imageableId:3,
          imageableType:"Review",

  },
        {
          url:"https://tinyurl.com/yc7afs2b",
          preview:true,
          imageableId:2,
          imageableType:"Spot",
        },
        {
          url:"https://tinyurl.com/mr34cay2",
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
