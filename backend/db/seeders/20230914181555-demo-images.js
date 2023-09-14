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
          url:"https://www.istockphoto.com/photo/exterior-of-house-gm1371260747-440634010?utm_source=pixabay&utm_medium=affiliate&utm_campaign=SRP_image_sponsored&utm_content=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fhouse%2F&utm_term=house",
          preview:false,
          imageableId:3,
          imageableType:"Review",

  },
        {
          url:"https://www.istockphoto.com/photo/large-house-with-steep-roof-and-side-entry-three-car-garage-gm1272163106-374520133?utm_source=unsplash&utm_medium=affiliate&utm_campaign=category_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fimages%2Fthings%2Fhouse&utm_term=House+images%3A%3A%3A",
          preview:false,
          imageableId:2,
          imageableType:"Spot",
        },
        {
          url:"https://www.istockphoto.com/photo/new-homes-on-a-quiet-street-in-raleigh-nc-gm1319270783-406183681?utm_source=unsplash&utm_medium=affiliate&utm_campaign=category_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fimages%2Fthings%2Fhouse&utm_term=House+images%3A%3A%3A",
          preview:false,
          imageableId:1,
          imageableType:"Spot",
        },
        {
          url:"https://www.istockphoto.com/photo/exterior-of-a-blue-suburban-home-gm1436217023-477321914?utm_source=unsplash&utm_medium=affiliate&utm_campaign=category_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fimages%2Fthings%2Fhouse&utm_term=House+images%3A%3A%3A",
          preview:true,
          imageableId:1,
          imageableType:"Review",
        }
      ], { validate: true });
    },


  async down (queryInterface, Sequelize) {
    options.tableName = 'Images';

    return queryInterface.bulkDelete(options, null, {});
  }
};
