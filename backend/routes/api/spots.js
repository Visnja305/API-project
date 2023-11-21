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
.optional({ checkFalsy: true })
.exists({ checkFalsy: true })
.isFloat({min:-90,max:90})
.withMessage("Latitude is not valid"),
check('lng')
.optional({ checkFalsy: true })
.exists({ checkFalsy: true })
.isFloat({min:-180,max:180})
.withMessage("Longitude is not valid"),


      check('name')
      .exists({ checkFalsy: true })
      .isLength({ max: 50 })
      .withMessage("Name must be less then 50 characters"),

      check('name')
      .exists({ checkFalsy: true })

      .withMessage("Name is required"),

      check('description')
      .exists({ checkFalsy: true })
      .isLength({ min: 30 })
      .withMessage("Description needs a minimum of 30 characters"),
      check('price')
      .exists({ checkFalsy: true })
      .withMessage("Price is required"),
      check('price')
      .optional({ checkFalsy: true })
      .isFloat({min:0})
     .withMessage("Price must be greater than or equal to 0"),
    handleValidationErrors
  ];

  const validateDataForGetSpots = [
    check('page')

    .optional({ checkFalsy: true })

      .isInt({ min:1})

      .withMessage("Page must be greater than or equal to 1"),
    check('size')

    .optional({ checkFalsy: true })
      .isInt({min:1})
      .withMessage("Size must be greater than or equal to 1"),

      check('maxLat')
      .optional({ checkFalsy: true })

      .isFloat({min:-90,max:90})

      .withMessage("Maximum latitude is not valid"),
      check('minLat')
      .optional({ checkFalsy: true })

      .isFloat({min:-90,max:90})

      .withMessage("Minimum latitude is not valid"),
      check('minLng')
      .optional({ checkFalsy: true })
      .isFloat({min:-180,max:180})

      .withMessage("Minimum longitude is not valid"),

      check('maxLng')
      .optional({ checkFalsy: true })
      .isFloat({min:-180,max:180})
      .withMessage("Maximum longitude is not valid"),
       check('minPrice')
       .optional({ checkFalsy: true })
       .isFloat({min:0})
      .withMessage("Minimum price must be greater than or equal to 0"),
      check("maxPrice")
     .optional({ checkFalsy: true })
      .isFloat({min:0})
      .withMessage("Maximum price must be greater than or equal to 0"),
    handleValidationErrors
  ];

  const checkReview=[
    check("review")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Review text is required"),
check("stars")
.exists({ checkFalsy: true })
.notEmpty()
.isInt({ min:1,max:5})
.withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
  ];



//get all spots
router.get("/", validateDataForGetSpots,async (req,res,next)=>{
    const {
        minLat,
        maxLat,
        minLng,
        maxLng,
        minPrice,
        maxPrice,

       } = req.query;
let{page,size}=req.query;



if(minLat||maxLat||minLng||maxLng||minPrice||maxPrice||page||size){
    const where={};
    if (page) {
        page = Number(page);
        if(page>10){
            page=10;
        }
    }
    if(!page)
    {
        page = 1;
    }
    if (size) {
        size = Number(size);
        if(size>20){
            size=20;
        }
    }
    if(!size)
    {
        size = 20;
    }

    const pagination = {};
    if (page >= 1 && size >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }




       if (minLat) {
        where.lat = {[Op.gt]:minLat}
    }
    if (maxLat) {
        where.lat = {[Op.lt]:maxLat}

    }
    if (minLng) {
        where.lng = {[Op.gt]:minLng};

    }
    if (maxLng) {
        where.lng = {[Op.lt]:maxLng}

    }
    if (minPrice) {
        where.price = {[Op.gt]:minPrice}

    }
    if (maxPrice) {
        where.price = {[Op.lt]: maxPrice}
    }

if(minLat && maxLat){
    where.lat={
    [Op.between]:[minLat,maxLat]
    }
}
if(minLng && maxLng){
    where.lng={
    [Op.between]:[minLng,maxLng]
    }
}
if(minPrice && maxPrice){
    where.price={
    [Op.between]:[minPrice,maxPrice]
    }
}





    const allSpots= await Spot.findAll({
        where,
        ...pagination
    })
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
    if(urlArr.length!==0){
        currObj["previewImage"]=urlArr.toString()
        }
        if(urlArr.length===0){
            currObj["previewImage"]="Preview image not available";
        }
    }





    return res.json({"Spots":allSpots,
"page":page,
"size":size
})



}



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
    if(urlArr.length!==0){
        currObj["previewImage"]=urlArr;
        }
        if(urlArr.length===0){
            currObj["previewImage"]="There is no preview image";
        }



    }
return res.json({"Spots":allSpots})
});
//get current user spots
router.get("/current",requireAuth,async(req,res)=>{
const {user}=req;


const currentUser=await User.findByPk(user.id);
const allSpots=await currentUser.getSpots();
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
if(urlArr.length!==0){
    currObj["previewImage"]=urlArr;
    }
    if(urlArr.length===0){
        currObj["previewImage"]="There is no preview image";
    }



}

if(allSpots.length===0){
    return res.json({message:"There are no spots owned by the current user"});
}
 return res.json({"Spots":allSpots});
});
//create new spot
router.post("/",requireAuth,validateData,async(req,res,next)=>{
    const {user}=req;
const userId=user.id;
    const {address,city,state,country,lat,lng,name,description,price}=req.body;
if(!lat && lng){ const newSpot=await Spot.create({ownerId:userId,address:address,city:city,state:state,country:country,lat:1,lng:lng,name:name,description:description,price:price});
res.status(201)
     return res.json(newSpot);
}
if(lat && !lng) {const newSpot=await Spot.create({ownerId:userId,address:address,city:city,state:state,country:country,lat:lat,lng:1,name:name,description:description,price:price});
res.status(201)
    return res.json(newSpot);
}
 if(!lat && !lng){ const newSpot=await Spot.create({ownerId:userId,address:address,city:city,state:state,country:country,lat:1,lng:1,name:name,description:description,price:price});
 res.status(201)
 return res.json(newSpot);
}
if(lat && lng){const newSpot=await Spot.create({ownerId:userId,address:address,city:city,state:state,country:country,lat:lat,lng:lng,name:name,description:description,price:price});
res.status(201)
     return res.json(newSpot);
}








});
//get spot by id
router.get("/:id",async (req,res,next)=>{
    const spot = await Spot.findByPk(req.params.id);
if (spot) {

   const currentReviewsStars=await spot.getReviews({

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
const currObj=spot.dataValues;
currObj["avgRating"]=avgRatingC;



    const currentImage=await spot.getImages({

            attributes:["preview","url","id"],
         }
    );
    const urlArr=[];
    for(let i=0;i<currentImage.length;i++){
if(currentImage[i].preview===true){
        urlArr.push({
            "id":currentImage[i].id,
            "url":currentImage[i].url,
            "preview":currentImage[i].preview})



    }
}
    const currObjJ=spot.dataValues;
    if(urlArr.length===0){
        currObjJ["SpotImages"]="There are no available images."
    }
    if(urlArr.length!==0){
        currObjJ["SpotImages"]=urlArr
    }
const theOwnerId=currObj.ownerId;
const theOwner=await User.findByPk(theOwnerId);
const ownerObj=theOwner.dataValues;
const firstN=ownerObj.firstName;
const lastN=ownerObj.lastName;
currObj["Owner"]={
    "id":theOwnerId,
    "firstName":firstN,
    "lastName":lastN

}




    return res.json(spot)


        }
        if(!spot) {
            const err = new Error();
            err.title="Couldn't find a Spot with the specified id";
            err.message="Spot couldn't be found";
        res.status(404);
           return res.json(err);

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
        model:Image,as:"ReviewImages",
        attributes:["id","url"]

    }

]

}
);
return res.json({"Reviews":reviews});
    }
    if(!spot){
        const err = new Error();
        err.title="Couldn't find a Spot with the specified id";
        err.message="Spot couldn't be found";
    res.status(404);
       return res.json(err);

    }
    next();
});
//create a review for a spot based on id
router.post("/:id/reviews",requireAuth,checkReview,async(req,res,next)=>{
const spot=await Spot.findByPk(req.params.id);

if (!spot){
    const err = new Error();
    err.message="Spot couldn't be found";
err.title="Couldn't find a Spot with the specified id";

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
res.status(500);
   return res.json(err);
}
const newReview= await Review.create({userId:userId,spotId:parseInt(spotId),review:review,stars:stars})
res.status(201)


newReview.dataValues.User = req.user


return res.json(newReview)
});
//delete a spot
router.delete("/:spotId",requireAuth, async (req, res) => {

    const {user}=req;
    const spot = await Spot.findByPk(req.params.spotId);
    if(!spot){
        const err = new Error();
        err.title="Couldn't find a Spot with the specified id";
        err.message="Spot couldn't be found";
    res.status(404);
return res.json(err)
    }
const spotObj=spot.dataValues;
const spotOwner=spotObj.ownerId;
if(spotOwner===user.id){
    await spot.destroy();

    return res.json({ message: "Successfully deleted" });
}
if(spotOwner!==user.id){
    const err = new Error();
    err.title="Require proper authorization";
    err.message="Forbidden";
res.status(403);

   return res.json(err);
}
next()
});

//edit a spot
router.put("/:id",requireAuth,validateData,async (req,res,next) => {
    const spot = await Spot.findByPk(req.params.id);

    if (!spot) {
        const err = new Error();
        err.title="Couldn't find a Spot with the specified id";
        err.message="Spot couldn't be found";
    res.status(404);
       return res.json(err);

    }
    const {user}=req;
    const userId=user.id;
   const searchedSpot=spot.dataValues;
if(searchedSpot.ownerId===userId){

const updatedSpot = await spot.update(req.body);
return res.json(updatedSpot);
}
if(searchedSpot.ownerId!==userId){
    const err = new Error();
    err.title="Require proper authorization";
    err.message="Forbidden";
res.status(403);

   return res.json(err);
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
        err.title="Couldn't find a Spot with the specified id";
        err.message="Spot couldn't be found";
    res.status(404);
       return res.json(err);

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
        if(searchedSpot.ownerId!==userId){
            const err = new Error();
    err.title="Require proper authorization";
    err.message="Forbidden";
res.status(403);

   return res.json(err);
        }
next();

});

//Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings",requireAuth,async(req,res,next)=>{
    const {user}=req;
    const userIdd=user.id;
    const spot = await Spot.findByPk(req.params.spotId);
    if(!spot){

        const err = new Error();
        err.title="Couldn't find a Spot with the specified id";
        err.message="Spot couldn't be found";
        res.status(404);
        return res.json(err);}

    const searchedSpot=spot.dataValues;

     if(searchedSpot.ownerId===user.id){
        const err = new Error();
        err.title="Require proper authorization";

        err.message="Forbidden";
    res.status(403);

       return res.json(err);
     }
    const spotIdd=req.params.spotId;

    const {startDate,endDate}=req.body;
    const newStartDate=new Date(startDate);
    const newEndDate=new Date(endDate);


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
            err.errors={
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
              };
        res.status(403);

           return res.json(err);
        }


     if (newEndDate<=newStartDate) {
        const err = new Error();
        err.title="Bad request";
        err.errors={"endDate":"endDate cannot be on or before startDate"};
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

if(!spot){
    const err = new Error();
    err.title="Couldn't find a Spot with the specified id";
    err.message="Spot couldn't be found";
res.status(404);

   return res.json(err);
}
const obj=spot.dataValues;

if(obj.ownerId===user.id){
    const bookings= await spot.getBookings({
        include: [{
            model: User,
            attributes:["id", "firstName","lastName"],
        },]
       });
        return res.json({"Bookings":bookings})
}
if(obj.ownerId!==user.id){
    const bookings= await spot.getBookings({
        attributes:["spotId","startDate","endDate"]
       });
        return res.json({"Bookings":bookings})


}

})

//sjjlk

module.exports = router;


/*  check('lat')
.exists({ checkFalsy: true })

.isFloat({min:-90,max:90})
.withMessage("Latitude is not valid"),
check('lng')
.exists({ checkFalsy: true })
.isFloat({min:-180,max:180})
.withMessage("Longitude is not valid"),

*/



/*


    if(lat && !lng){
        const newSpot=await Spot.create({ownerId:userId,address:address,city:city,state:state,country:country,lat:lat,name:name,description:description,price:price});
    }
    if(!lat && lng){
        const newSpot=await Spot.create({ownerId:userId,address:address,city:city,state:state,country:country,lng:lng,name:name,description:description,price:price});
    }
if (lat && lng){
    const newSpot=await Spot.create({ownerId:userId,address:address,city:city,state:state,country:country,lat:lat,lng:lng,name:name,description:description,price:price});
}
if(!lat && !lng){
    const newSpot=await Spot.create({ownerId:userId,address:address,city:city,state:state,country:country,name:name,description:description,price:price});
}

*/
