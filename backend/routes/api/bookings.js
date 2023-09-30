const express=require("express");

const { Spot, User, Image, Booking, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");
const router = express.Router();


router.get("/current",requireAuth, async (req,res)=>{
const{user}=req;
const currUser=await User.findByPk(user.id);
const allBookings=await currUser.getBookings({
    include: [{
        model: Spot,

    },]
});
for(let i=0;i<allBookings.length;i++){
    const spotId=allBookings[i].dataValues.Spot.dataValues.id;
    const spot=await Spot.findByPk(spotId);

   const images=await spot.getImages();
    const urlArr=[];

    for(let i=0;i<images.length;i++){
        if(images[i].preview===true){
            urlArr.push(images[i].url)
        }
    }
    if (urlArr.length===0){
        allBookings[i].dataValues.Spot.dataValues.previewImage="There is no preview image";
    }
    if(urlArr.length!==0){
    allBookings[i].dataValues.Spot.dataValues.previewImage=urlArr;
}

}


return res.json({"Bookings":allBookings});

});
//edit a booking
router.put("/:bookingsId",requireAuth,async(req,res,next)=>{
    const{user}=req;
    const currUser=await User.findByPk(user.id);
    const booking=await Booking.findByPk(req.params.bookingsId);
    if(!booking){
        const err = new Error();
        err.title="Couldn't find a Booking with the specified id";
        err.message="Booking couldn't be found";
    res.status(404);

       return res.json(err);
}

    if(booking){
    const obj=booking.dataValues;

    const {startDate,endDate}=req.body;
    const newStartDate=new Date(startDate);
    const newEndDate=new Date(endDate);
const currentDate=new Date();
if(newStartDate<currentDate){
    const err = new Error();
    err.title="Can't edit a booking that's past the end date";
    err.message="Past bookings can't be modified";
res.status(403);

   return res.json(err);
}

    if (newEndDate<=newStartDate) {
        const err = new Error();
        err.title="Bad request";
        err.message="endDate cannot come before startDate";
    res.status(400);

       return res.json(err);
    }
    const existingBookings=await Booking.findAll({
        where:{
            spotId:obj.spotId,
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
    if(obj.userId===user.id){
        const updatedBooking = await booking.update({startDate:newStartDate,endDate:newEndDate});
       return res.json(updatedBooking);
    }
    if(obj.userId!==user.id){
        const err = new Error();
        err.title="Require proper authorization";
        err.message="Forbidden";
    res.status(403);

       return res.json(err);
    }

}

    next();
});
//delete a booking

router.delete("/:bookingId",requireAuth,async(req,res,next)=>{
const {user}=req;

const booking=await Booking.findByPk(req.params.bookingId);
if(!booking){
    const err = new Error();
        err.title= "Couldn't find a Booking with the specified id";
        err.message="Booking couldn't be found";
    res.status(404);

       return res.json(err);
}


const objBooking=booking.dataValues;
const spotIdd=objBooking.spotId;
//const curr=await User.findByPk(user.id);
//const currU=await curr.getSpots();
const spot=await Spot.findOne({
    where:{
        id:spotIdd,
        ownerId:user.id
    }
});
if(objBooking.userId===user.id || spot ){
    const currentDate=new Date();
if(objBooking.startDate<=currentDate){
    const err = new Error();
    err.title="Bookings that have been started can't be deleted";
    err.message="Bookings that have been started can't be deleted";
res.status(403);

   return res.json(err);
}

    await booking.destroy();

    return res.json({ message: "Successfully deleted" });
}
if(objBooking.userId!==user.id && !spot ){
    const err = new Error();
    err.title="Require proper authorization";
    err.message="Forbidden";
res.status(403);

   return res.json(err);
}
next();


})






module.exports = router;
