import { csrfFetch } from "./csrf";


const GET_REVIEWS="spots/getSpotReviews";
const POST_REVIEW="reviews/postReview";
const DELETE_REVIEW="reviews/deleteReview";
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
const deleteReview=(spotId, reviewId,review)=>{

  return{
    type:DELETE_REVIEW,
    spotId,reviewId
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
export const deleteTheReview=(spotId,review)=> async(dispatch)=>{

const reviewId=review.id

     const response=await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",

    });
    if(response.ok ){
      const data = await response.json();

      dispatch(deleteReview(spotId,reviewId,review));
    return data
    }

    return response



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

case DELETE_REVIEW:
  const nState = { ...state };


const arr=nState.entries[action.spotId].Reviews;
for(let i=0;i<arr.length;i++){
  if(arr[i]){
  if(arr[i].id===action.reviewId){
    delete arr[i]
  }
}
}
//delete nState.entries[action.spotId].Reviews[0].find((rev)=>rev.id===action.reviewId

//);



           // delete nState.entries[action.spotId].Reviews[action.reviewId]
            return nState;



        default:
            return state;
    }
};

export default reviewsReducer;

/*state[action.spotId]=action.reviews

return {...state,[action.spotId]:[action.reviews]} */
