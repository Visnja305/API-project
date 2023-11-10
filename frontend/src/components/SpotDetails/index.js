
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
            <h3><i className="fa-solid fa-star" />{!isLoading && spot.avgRating }</h3>
           <ReviewsSegment props={spotId}/>

        </div>
        </div>
        <h3><i className="fa-solid fa-star" />{!isLoading && spot.avgRating }</h3>
           <ReviewsSegment props={spotId}/>
<ReviewsList props={spotId}/>


        </div>)




    )
}



export default SpotDetails;
