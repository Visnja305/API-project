const express=require("express");

const { Spot, User, Review, Image, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get("/current",requireAuth,async(req,res,next)=>{
    const {user}=req;
    const allReviews=await user.getReviews({
        include: [{
            model: User,
            attributes:["id", "firstName","lastName"],


        },
        {
            model:Spot,
            attributes:["id","ownerId","address","city","state","country","lat","lng","name","price"],

        },

        {
            model:Image,
            attributes:["id","url"]

        }

    ]
    });
    res.json(allReviews)
});
router.put("/:reviewId",requireAuth,async(req,res,next)=>{
const review=await Review.findByPk(req.params.id);
res.json(review)


})


module.exports = router;
