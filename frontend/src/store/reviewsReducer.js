import { csrfFetch } from "./csrf";


const GET_REVIEWS="spots/spotReviews"


const spotReviews=(reviews,spotId)=>{
  return{
    type:GET_REVIEWS,
reviews,spotId
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


        default:
            return state;
    }
};

export default reviewsReducer;

/*state[action.spotId]=action.reviews

return {...state,[action.spotId]:[action.reviews]} */
