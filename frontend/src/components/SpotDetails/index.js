
import {  useSelector, useDispatch } from "react-redux";
import {useState,useEffect} from "react";
import { useParams, Redirect, Route } from "react-router-dom";
import { getSpotDetails } from "../../store/spotsReducer";
import {getSpotReviews} from "../../store/spotsReducer";
import "./SpotDetails.css";
import ReviewsSegment from "./ReviewsSegment";
import ReviewsList from "./ReviewsList";

const SpotDetails = () => {
    const { spotId } = useParams();

    const dispatch=useDispatch();
    const spot= useSelector((state) => state.spotsState[spotId]);



const [isLoading,setIsLoading]=useState(true);
useEffect(()=>{
    dispatch(getSpotDetails(spotId)).then(()=>setIsLoading(false))

},[dispatch,spotId])
const handleClick=()=>{
    window.alert("Feature Coming Soon...")
}
const currUser=useSelector((state) => state.session);
const currSpot=useSelector((state)=>state.spotsState[spotId]);
const reviews= useSelector((state) => state.reviewsState.entries[spotId]);
let arr=[];
if(!isLoading && currUser.user){

    for (let i=0;i<Object.values(reviews)[0].length;i++){


    if (Object.values(reviews)[0][i].User.id===currUser.user.id){arr.push(Object.values(reviews)[0][i])}
   }

}
return  (
   (<div>
        <h1>{!isLoading && spot.name}</h1>
        <h3>{!isLoading && `${spot.city}, ${spot.state}, ${spot.country} `}</h3>
        {!isLoading && (<img src={spot.SpotImages[0].url}/>)}
        <div>
            <div>
            <h1>Hosted by {!isLoading && `${spot.Owner.firstName} ${spot.Owner.lastName}`}</h1>
            <p>Loremipsum dkak ahkjhjkhkjhjkh khjh h ashkjh hsjh h jh jk kjshhd ajdh kdkjdh ajkd dkjh adjk d</p>
</div>
        <div>
            <h3>{!isLoading && `$ ${spot.price} night`}</h3>
            <h3><i className="fa-solid fa-star" />{!isLoading && !spot.avgRating && "New" }{!isLoading && spot.avgRating }</h3>
           <ReviewsSegment props={spotId}/>
           <button onClick={handleClick} >Reserve</button>

        </div>
        </div>
        <h3><i className="fa-solid fa-star" />{!isLoading && !spot.avgRating && "New" }{!isLoading && spot.avgRating }</h3>
           <ReviewsSegment props={spotId}/>
           <div>
{ !isLoading && currUser.user!==null && currUser.user.id!==currSpot.ownerId && arr.length===0 && <button>Post your review</button>}
{!isLoading && currUser.user!==null && currUser.user.id!==currSpot.ownerId && Object.values(reviews)[0].length===0 && <p>Be the first to post a review!</p>}
  </div>


<ReviewsList props={spotId}/>




        </div>)




    )
}



export default SpotDetails;
