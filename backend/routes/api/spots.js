const express=require("express");

const { Spot, User, Review, Image, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get("/", async (req,res)=>{
    const allSpots = await Spot.findAll(

    );


    return res.json(allSpots);

});
//get current user spots
router.get("/current",requireAuth,async(req,res,next)=>{
const {user}=req;

const currentUser=await User.findByPk(user.id);
const allSpots=await currentUser.getSpots();

return res.json(allSpots)
});
//create new spot
router.post("/",requireAuth,async (req,res,next)=>{
    const {user}=req;
    const newSpot=await Spot.create({address,city,state,country,lat,lng,name,description,price});
    newSpot.ownerId=user.id;

    return res.json(newSpot);
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
});






module.exports = router;
