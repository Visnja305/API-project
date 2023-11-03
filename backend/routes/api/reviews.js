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
            model:Image,as:"ReviewImages",
            attributes:["id","url"]

        }

    ]
    });

for(let i=0;i<allReviews.length;i++){
    const currSpotId=allReviews[i].dataValues.spotId;
const spot= await Spot.findByPk(currSpotId);
const currentImage=await spot.getImages({

        attributes:["preview","url","id"],
     }
);
const urlArr=[];
for(let i=0;i<currentImage.length;i++){
if(currentImage[i].preview===true){
    urlArr.push({

        "url":currentImage[i].url,
        })



}
}
const currObjJ=allReviews[i].Spot.dataValues;
if(urlArr.length===0){
    currObjJ["previewImage"]="There are no available images."
}
if(urlArr.length!==0){
    currObjJ["previewImage"]=urlArr
}





}









    res.json({"Reviews":allReviews})
});
//edit a review
router.put("/:reviewId",requireAuth,validateData,async(req,res,next)=>{
    const {user}=req;
const review=await Review.findByPk(req.params.reviewId);
if(!review){
    const err = new Error();
    err.title="Couldn't find a Review with the specified id";
            err.message="Review couldn't be found";
        res.status(404);
           res.json(err);
}
if(user.id===review.userId){
    const updatedReview = await review.update(req.body);

    return res.json(updatedReview);
}
if(user.id!==review.userId){
    const err = new Error();
    err.title="Require proper authorization";
    err.message="Forbidden";
res.status(403);

   return res.json(err);
}
next();



});
router.delete("/:reviewId",requireAuth,async(req,res,next)=>{
    const {user}=req;
    const review=await Review.findByPk(req.params.reviewId);
    if(!review){
        const err = new Error();
        err.title="Couldn't find a Review with the specified id";
                err.message="Review couldn't be found";
            res.status(404);
               res.json(err);
    }
    if(user.id===review.userId){
        await review.destroy();

    return res.json({ message: "Successfully deleted" });

    }
    if(user.id!==review.userId){
        const err = new Error();
        err.title="Require proper authorization";
        err.message="Forbidden";
    res.status(403);

       return res.json(err);
    }
    next();
})
//add an image to a review based on review id
router.post("/:reviewId/images",requireAuth,async(req,res,next)=>{
const {user}=req;
const review=await Review.findByPk(req.params.reviewId);
if(!review){
    const err = new Error();
            err.title="Couldn't find a Review with the specified id";
            err.message="Review couldn't be found";
            res.status(404);
          return res.json(err);
};
const reviewImages=await review.getReviewImages();
if(reviewImages.length>=10){
    const err = new Error();
    err.title="Cannot add any more images because there is a maximum of 10 images per resource";
    err.message="Maximum number of images for this resource was reached";
            res.status(403);
          return res.json(err);
}
const obj=review.dataValues;
const {url}=req.body;

if(obj.userId===user.id){
    const newImage= await Image.create({url:url,preview:true,imageableId:req.params.reviewId,imageableType:"Review"});
    const newImageObj=newImage.dataValues;
    const image=await Image.findOne({
        where:{
            id:newImageObj.id,
        },
        attributes:["id","url"]
    });

return res.json(image);
}
if(obj.userId!==user.id){
    const err = new Error();
    err.title="Require proper authorization";
    err.message="Forbidden";
res.status(403);

   return res.json(err);
}
next();
})

module.exports = router;
