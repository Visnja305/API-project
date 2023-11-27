
import {  useSelector, useDispatch } from "react-redux";
import {useState,useEffect} from "react";
import { useParams, useHistory } from "react-router-dom"


import {getSpotReviews} from "../../store/reviewsReducer";
import "./ReviewsList.css";
import OpenModalButton from '../OpenModalButton';
import DeleteReviewModal from '../DeleteReviewModal';
const ReviewsList = ({props}) => {
const {spotId}=useParams();
const history=useHistory();


    const dispatch=useDispatch();
    const reviews= useSelector((state) => state.reviewsState.entries[spotId]);
    const user=useSelector((state)=>state.session.user);
    let currUserId
   if(user){
    currUserId=user.id;
}
    const [isLoading,setIsLoading]=useState(true);



useEffect(()=>{
dispatch(getSpotReviews(spotId)).then(()=>setIsLoading(false));
},[dispatch,spotId])


let reviewArr=[];

if(!isLoading){
    for(let i=Object.values(reviews)[0].length-1;i>=0;i--){
        if(Object.values(reviews)[0][i]){
reviewArr.push(Object.values(reviews)[0][i]);
        }
 }
}




return  (
  <div>
 <ul>
 {!isLoading && reviewArr.map(review=> (

<li key={review.id}>

{review.User.firstName}
<br/>
<span>{`${review.updatedAt.slice(5,7)}/${review.updatedAt.slice(0,4)} `}</span>
<br/>
<p>{review.review}</p>
{ !isLoading  && currUserId===review.userId &&
<OpenModalButton
                buttonText="Delete"

                modalComponent={<DeleteReviewModal props={{spotId,review}}/>}

              />}


    </li>

 ) )}
     </ul>
  </div>




    )
}



export default ReviewsList;
