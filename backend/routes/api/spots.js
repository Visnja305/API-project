const express=require("express");

const { Spot, User, Review, Image, Booking, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

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
for(let i=0;i<allSpots.length;i++){

    const currentImage=await allSpots[i].getImages({

            attributes:["preview","url"],
         }
    );
    const urlArr=[];
    for(let i=0;i<currentImage.length;i++){
    if(currentImage[i].preview===true){
        urlArr.push(currentImage[i].url)
    }

    }
    const currObj=allSpots[i].dataValues;
        currObj["previewImage"]=urlArr
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
    const {user}=req;
    const userId=user.id;
   const searchedSpot=spot.dataValues;
if(searchedSpot.ownerId===userId){

const updatedSpot = await spot.update(req.body);
return res.json(updatedSpot);
}
next();
});
//add an image to a spot based on spot id

router.post("/:spotId/images",requireAuth,async (req,res,next) => {
    const {user}=req;
    const userId=user.id;
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        const err = new Error();
        err.message="Spot couldn't be found";
    res.status(404);
       return res.json(err);
        //return res.status(404).json({ message: "Spot couldn't be found" });
    }
    const searchedSpot=spot.dataValues;
    if(searchedSpot.ownerId===userId){
const {url,preview}=req.body;
const spotId=req.params.spotId;
const imageableType="Spot";

        const newImage=await Image.create({url:url,preview:preview,imageableId:spotId,imageableType:imageableType});
        const newImageData=newImage.dataValues;
        return res.json({
            "id":newImageData.id,
            "url":newImageData.url,
            "preview":newImageData.preview
        });
        }
next();

});

//Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings",requireAuth,async(req,res,next)=>{
    const {user}=req;
    const userIdd=user.id;
    const spot = await Spot.findByPk(req.params.spotId);

    const searchedSpot=spot.dataValues;
     if(searchedSpot.ownerId===user.id){
        const err = new Error();

        err.message="Forbidden";
    res.status(403);

       return res.json(err);
     }
    const spotIdd=req.params.spotId;

    const {startDate,endDate}=req.body;
    const newStartDate=new Date(startDate);
    const newEndDate=new Date(endDate);
    if(!spot){

        const err = new Error();
        err.message="Spot couldn't be found";
        res.status(404);
        return res.json(err);}

        const existingBookings=await Booking.findAll({
            where:{
                spotId:spotIdd,
                [Op.or]:[
{
startDate:{
    [Op.between]:[startDate,endDate]
},
endDate:{
    [Op.gte]:startDate
}

},
{
    startDate:{
        [Op.lte]:endDate
    },
    endDate:{
        [Op.gte]:startDate
    }
},
{
    startDate:{
        [Op.lte]:endDate
    },
    endDate:{
        [Op.between]:[startDate,endDate]
}
},
{
 startDate:{
        [Op.between]:[startDate,endDate]
    },
    endDate:{
        [Op.between]:[startDate,endDate]
    }

    }
 ]
 }
        }
        )
        if(existingBookings.length>0){
            const err = new Error();
            err.title="Booking conflict";
            err.message="Sorry, this spot is already booked for the specified dates";
        res.status(403);

           return res.json(err);
        }


     if (newEndDate<=newStartDate) {
        const err = new Error();
        err.title="Bad request";
        err.message="endDate cannot be on or before startDate";
    res.status(400);

       return res.json(err);
    }

     if(searchedSpot.ownerId!==user.id){
const newBooking=await Booking.create({userId:userIdd,spotId:spotIdd,startDate:newStartDate,endDate:newEndDate});
return res.json(newBooking);
    }

    next()
});



router.get("/:spotId/bookings",requireAuth,async(req,res,next)=>{

const {user}=req;
const spot=await Spot.findByPk(req.params.spotId);
const obj=spot.dataValues;
console.log(obj);
if(obj.ownerId===user.id){
   const bookings= await spot.getBookings({
    include: [{
        model: User,
        attributes:["id", "firstName","lastName"],
    },]
   });
    return res.json({"Bookings":bookings})
}
else if(obj.ownerId!==user.id){
    const err = new Error();

            err.message="Forbidden";
        res.status(403);

           return res.json(err);
}
next()
})



module.exports = router;
