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
          url:"https://www.tkimages.com/wp-content/uploads/2023/05/Isles-End-526-IMG-44_1_1.jpg",
          preview:true,
          imageableId:3,
          imageableType:"Review",

  },
        {
url:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Mapikela_House.jpeg/640px-Mapikela_House.jpeg",
          preview:true,
          imageableId:2,
          imageableType:"Spot",
        },
        {
          url:"https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_1000/v1692795195/catalog/1692507957126582272/xmdai1cgdxjuxy3ricp9.jpg",
          preview:true,
          imageableId:1,
          imageableType:"Spot",
        },
        {
          url:"https://www.architecturalrecord.com/ext/resources/Issues/2021/02-February/Golden-Valley-Midcentury-Modern-House-02.jpg",
          preview:true,
          imageableId:1,
          imageableType:"Review",
        },
        {
url:"https://tinyurl.com/ce9ra2fy",
          preview:true,
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
