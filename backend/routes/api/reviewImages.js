const express=require("express");

const { Spot, User, Review ,Image, Booking, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');


const router = express.Router();

router.delete("/:imageId",requireAuth, async (req,res,next)=>{
    const {user}=req;
    const image=await Image.findByPk(req.params.imageId);
    if(!image){
        const err = new Error();
        err.title="Couldn't find a Review Image with the specified id";
        err.message="Review Image couldn't be found";
    res.status(404);

       return res.json(err);
    }
    const obj=image.dataValues;
    const imageableIdd=obj.imageableId;
    const imageableTypee=obj.imageableType;
    const review=await Review.findByPk(imageableIdd);
    const reviewObj=review.dataValues;
    const reviewOwner=reviewObj.userId;

if(imageableTypee==="Review"){
        if(reviewOwner===user.id){
            await image.destroy();

            return res.json({ message: "Successfully deleted" });
        }

    if(reviewOwner!==user.id){
        const err = new Error();
        err.title="Require proper authorization";
        err.message="Forbidden";
    res.status(403);

       return res.json(err);

}
}
if(imageableTypee==="Spot"){
    const err = new Error();
    err.title="Couldn't find a Review Image with the specified id";
    err.message="Review Image couldn't be found";
res.status(404);

   return res.json(err);
}
    next();
});


module.exports = router;
