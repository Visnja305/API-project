
import {  useSelector, useDispatch } from "react-redux";
import {useState,useEffect} from "react";
import { useParams } from "react-router-dom"


import {getSpotReviews} from "../../store/reviewsReducer";
import "./ReviewsList.css";
const ReviewsList = ({props}) => {
const {spotId}=useParams();



    const dispatch=useDispatch();
    const reviews= useSelector((state) => state.reviewsState.entries[spotId]);
    const [isLoading,setIsLoading]=useState(true);



useEffect(()=>{
dispatch(getSpotReviews(spotId)).then(()=>setIsLoading(false));
},[dispatch,spotId])

return  (
  <div>
 <ul>{!isLoading && Object.values(reviews)[0].map(review=>(
<li key={review.id}>
    {console.log(review.User.firstName)}
{review.User.firstName}
<br/>
<span>{`${review.updatedAt.slice(5,7)} ${review.updatedAt.slice(0,4)} `}</span>
<br/>
<p>{review.review}</p>
    </li>

 ))} </ul>
  </div>




    )
}



export default ReviewsList;
