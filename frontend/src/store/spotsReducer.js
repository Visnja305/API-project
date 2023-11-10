import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/getSpots";
const GET_DETAILS="spots/spotDetails"


const getSpots = (spots) => {
  return {
    type: GET_SPOTS,
    spots

  };
};
const spotDetails=(spot)=>{

  return{
    type: GET_DETAILS,
    spot
  }
}

export const fetchSpots = () => async (dispatch) => {
    const response = await fetch("/api/spots");

    const spots = await response.json();
    dispatch(getSpots(spots));
    return spots
    };

export const getSpotDetails=(spotId)=>async(dispatch)=>{

  const res=await fetch(`/api/spots/${spotId}`);
  if(res.ok){

    const spot=await res.json();

    dispatch(spotDetails(spot));
    return spot;
  }
  return res
}




const spotsReducer = (state={}, action) => {
    switch (action.type) {
        case GET_SPOTS:
const spotsState={...state};
action.spots.Spots.forEach((spot)=>{
  spotsState[spot.id]=spot;
})
        return spotsState;
case GET_DETAILS:
  return {...state,[action.spot.id]:action.spot}


        default:
            return state;
    }
};

export default spotsReducer;
