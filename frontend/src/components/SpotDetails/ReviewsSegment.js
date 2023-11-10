
import {  useSelector, useDispatch } from "react-redux";
import {useState,useEffect} from "react";
import { useParams } from "react-router-dom"


import {getSpotReviews} from "../../store/reviewsReducer";
import "./ReviewsSegment.css";
const ReviewsSegment = ({props}) => {
const {spotId}=useParams();



    const dispatch=useDispatch();
    const reviews= useSelector((state) => state.reviewsState.entries[spotId]);
    const [isLoading,setIsLoading]=useState(true);



useEffect(()=>{
dispatch(getSpotReviews(spotId)).then(()=>setIsLoading(false));
},[dispatch,spotId])

return  (
  <div>
 <h3>{!isLoading && Object.values(reviews)[0].length} reviews</h3>
  </div>




    )
}



export default ReviewsSegment;
