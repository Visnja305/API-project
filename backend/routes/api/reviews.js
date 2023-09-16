const express=require("express");

const { Spot, User, Review, Image, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();
const validateData = [
    check('review')
      .exists({ checkFalsy: true })
      .withMessage("Review text is required"),
    check('stars')
      .exists({ checkFalsy: true })
      .isInt({ min: 1, max: 5 })

      .withMessage("Stars must be an integer from 1 to 5"),

    handleValidationErrors
  ];
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
//edit a review
router.put("/:reviewId",requireAuth,validateData,async(req,res,next)=>{
    const {user}=req;
const review=await Review.findByPk(req.params.reviewId);
if(!review){
    const err = new Error();
            err.message="Review couldn't be found";
        res.status(404);
           res.json(err);
}
else if(user.id===review.userId){
    const updatedReview = await review.update(req.body);

    return res.json(updatedReview);
}
next();



});
router.delete("/:reviewId",requireAuth,async(req,res,next)=>{
    const {user}=req;
    const review=await Review.findByPk(req.params.reviewId);
    if(!review){
        const err = new Error();
                err.message="Review couldn't be found";
            res.status(404);
               res.json(err);
    }
    else if(user.id===review.userId){
        await review.destroy();

    return res.json({ message: "Successfully deleted" });

    }
    next();
})


module.exports = router;
