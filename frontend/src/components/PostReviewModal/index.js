import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./PostReview.css";
import {FaStar} from "react-icons/fa"

import {postReviewForSpot} from "../../store/reviewsReducer";

import { useHistory} from 'react-router-dom';
function PostReviewModal(props) {
  const spotId=props.props.props.spotId;

  const userId=props.props.props.currUser.user.id;
  const history=useHistory();

  const dispatch = useDispatch();
  const [review, setReview] = useState("");
const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
const [stars,setStars]=useState(null)
const [rateColor,setColor]=useState(null)





  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const payload={
      spotId:spotId,
      userId:userId,
      review:review,
      stars:stars
    }
    dispatch(postReviewForSpot({ payload })).then(closeModal).then(()=>history.push(`/spots/${spotId}`)).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };





  return (
    <>
      <h1>How was your stay?</h1>
      <form onSubmit={handleSubmit} >
      {errors.review && (
          <p>{errors.review}</p>)}
      <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder=" Leave your review here..."
                />

<div>
{[...Array(5)].map((star,index)=>{
const currentRate=index+1
return(
<>
<label >
<input key={index+1} className="radio_item" type="radio" name="rate" value={currentRate}  onClick ={()=>setStars(currentRate)
  }/>
  <FaStar size={50} color={currentRate <= (rateColor || stars) ? "yellow" : "grey"}/>
</label>
  </>
)
}



)}
    </div>







        <button type="submit" disabled={ review.length<=9 || !stars}>Submit</button>

      </form>
    </>
  );
}

export default PostReviewModal;


/*

.then(()=>history.push(`/spots/${spotId}`))


*/
