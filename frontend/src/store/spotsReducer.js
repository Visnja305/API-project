import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/getSpots";
const GET_DETAILS="spots/spotDetails";
const RECEIVE_SPOT="spots/createNew"


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
const receiveSpot=(data)=>{

  return{
    type: RECEIVE_SPOT,
    data
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

export const createNewSpot=(payload,previewImage)=> async(dispatch)=>{

  const res = await csrfFetch ("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload.payload),
});

if (res.ok){
    const data = await res.json();

    const spotId=data.id;


    const response=await csrfFetch (`/api/spots/${spotId}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({url:previewImage.previewImage, preview:true}),
  });
  if(response.ok){
    const dataNew = await response.json();
    console.log(dataNew)

    const theSpot = await fetch(`/api/spots/${spotId}`);
if(theSpot.ok){
    const newSpot = await theSpot.json();
    dispatch(receiveSpot(newSpot))
    return newSpot
}
    
return dataNew
  }


    return data;

}
return res;

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
  case RECEIVE_SPOT:
    return { ...state, [action.data.id]: action.data };


        default:
            return state;
    }
};

export default spotsReducer;
