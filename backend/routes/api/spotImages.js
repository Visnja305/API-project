const express=require("express");

const { Spot, User, Image, Review, Booking, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');


const router = express.Router();


router.delete("/:imageId",requireAuth, async (req,res,next)=>{
    const {user}=req;
    const image=await Image.findByPk(req.params.imageId);
    if(!image){
        const err = new Error();
        err.title="Couldn't find a Spot Image with the specified id";
        err.message="Spot Image couldn't be found";
    res.status(404);

       return res.json(err);
    }
    const obj=image.dataValues;
    const imageableIdd=obj.imageableId;
    const imageableTypee=obj.imageableType;
    const spot=await Spot.findByPk(imageableIdd);
    const spotObj=spot.dataValues;
    const spotOwner=spotObj.ownerId;

if(imageableTypee==="Spot"){
        if(spotOwner===user.id){
            await image.destroy();

            return res.json({ message: "Successfully deleted" });
        }

    if(spotOwner!==user.id){
        const err = new Error();
        err.title="Require proper authorization";
        err.message="Forbidden";
    res.status(403);

       return res.json(err);

}
}
if(imageableTypee==="Review"){
    const err = new Error();
    err.title="Couldn't find a Spot Image with the specified id";
    err.message="Spot Image couldn't be found";
res.status(404);

   return res.json(err);
}
    next();
});



module.exports = router;
