const express=require("express");

const { Spot, User, Review, Image, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();
const validateData = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage("Street address is required"),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage("City is required"),
      check('state')
      .exists({ checkFalsy: true })
      .withMessage("State is required"),
      check('country')
      .exists({ checkFalsy: true })
      .withMessage("Country is required"),
      check('lat')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage("Latitude is not valid"),
      check('lng')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage("Longitude is not valid"),
      check('name')
      .exists({ checkFalsy: true })
      .isLength({ max: 50 })
      .withMessage("Name must be less than 50 characters"),
      check('description')
      .exists({ checkFalsy: true })
      .withMessage("Description is required"),
      check('price')
      .exists({ checkFalsy: true })
      .withMessage("Price per day is required"),
    handleValidationErrors
  ];



//get all spots
router.get("/", async (req,res)=>{
    const allSpots = await Spot.findAll();


    for(let i=0;i<allSpots.length;i++){
        const currentReviewsStars=await allSpots[i].getReviews({

                attributes:["stars"],
             }
        );
        let sum=0;
let count=0;
for (let i=0;i<currentReviewsStars.length;i++){
    sum+=currentReviewsStars[i].stars;
    count++;


}
let avgRatingC=sum/count;

const currObj=allSpots[i].dataValues;
currObj["avgRating"]=avgRatingC;


}


return res.json(allSpots)
});
//get current user spots
router.get("/current",requireAuth,async(req,res,next)=>{
const {user}=req;

const currentUser=await User.findByPk(user.id);
const allSpots=await currentUser.getSpots();

 res.json(allSpots)
});
//create new spot
router.post("/",requireAuth,validateData,async(req,res,next)=>{
    const {user}=req;
const userId=user.id;
    const {address,city,state,country,lat,lng,name,description,price}=req.body;
    const newSpot=await Spot.create({ownerId:userId,address:address,city:city,state:state,country:country,lat:lat,lng:lng,name:name,description:description,price:price});


     res.json(newSpot);
});
//get spot by id
router.get("/:id",async (req,res,next)=>{
    const spot = await Spot.findByPk(req.params.id);
if (spot) {
            res.json(spot);
        } else {
            const err = new Error();
            err.message="Spot couldn't be found";
        res.status(404);
           res.json(err);

        }
});
//get all reviews by spot ids
router.get("/:id/reviews",async(req,res,next)=>{
    const spot = await Spot.findByPk(req.params.id);
    if (spot){
const reviews= await spot.getReviews({
    include: [{
        model: User,
        attributes:["id", "firstName","lastName"],


    },
    {
        model:Image,
        attributes:["id","url"]

    }

]

}
);
res.json(reviews);
    }
    else {
        const err = new Error();
        err.message="Spot couldn't be found";
    res.status(404);
       res.json(err);

    }
});
//create a review for a spot based on id
router.post("/:id/reviews",requireAuth,async(req,res,next)=>{
const spot=await Spot.findByPk(req.params.id);

if (!spot){
    const err = new Error();
    err.message="Spot couldn't be found";
res.status(404);
   return res.json(err);

}
const {user}=req;
const userId=user.id;
const spotId=req.params.id;

const {review,stars}=req.body;
const checking= await Review.findOne({
    where: { userId: userId,
    spotId:spotId },
})
if(checking){
    const err = new Error();
    err.message="User already has a review for this spot";
res.status(403);
   return res.json(err);
}
const newReview= await Review.create({userId:userId,spotId:spotId,review:review,stars:stars})
return res.json(newReview)
});
//delete a spot
router.delete("/:spotId", async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    await spot.destroy();

    return res.json({ message: "Successfully deleted" });
});
//edit a spot
router.put("/:id",requireAuth,validateData,async (req,res,next) => {
    const spot = await Spot.findByPk(req.params.id);

    if (!spot) {
        const err = new Error();
        err.message="Spot couldn't be found";
    res.status(404);
       return res.json(err);
        //return res.status(404).json({ message: "Spot couldn't be found" });
    }



    const updatedSpot = await spot.update(req.body);

    return res.json(updatedSpot);
});





module.exports = router;
