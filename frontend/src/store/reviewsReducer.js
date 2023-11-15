import { csrfFetch } from "./csrf";


const GET_REVIEWS="spots/getSpotReviews";
const POST_REVIEW="reviews/postReview";

const spotReviews=(reviews,spotId)=>{
  return{
    type:GET_REVIEWS,
reviews,spotId
  }
}
const postReview=(spotId, review)=>{

return{
  type:POST_REVIEW,
  spotId,review
}

}

export const getSpotReviews=(spotId)=>async(dispatch)=>{

  const res=await fetch(`/api/spots/${spotId}/reviews`);
  if(res.ok){

    const reviews=await res.json();

    dispatch(spotReviews(reviews,spotId));
    return reviews;
  }
  return res
}

export const postReviewForSpot=(payload)=>async(dispatch)=>{


  const res = await csrfFetch (`/api/spots/${payload.payload.spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload.payload),
});
if(res.ok){

  const review=await res.json();
  dispatch(postReview(payload.payload.spotId, review));
return review
 // dispatch(spotDetails(spot));
  //return spot;
}
return res

}
const initialState = { entries: {}, isLoading: true };
const reviewsReducer = (state=initialState, action) => {
    switch (action.type) {


  case GET_REVIEWS:

  return {
    ...state,
    entries: {
        ...state.entries,
        [action.spotId]: action.reviews,
    },
};
case POST_REVIEW:
  const newState = Object.assign({}, state)
            newState.entries[action.spotId][Object.keys(newState.entries[action.spotId])].push(action.review)

return newState




        default:
            return state;
    }
};

export default reviewsReducer;

/*state[action.spotId]=action.reviews

return {...state,[action.spotId]:[action.reviews]} */
