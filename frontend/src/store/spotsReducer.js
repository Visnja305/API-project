import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/getSpots";
const GET_DETAILS="spots/spotDetails";
const RECEIVE_SPOT="spots/createNew"
const UPDATE_SPOT="spots/updateSpot"
const DELETE_SPOT="spots/deleteSpot"
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

const updateSpot=(data,theId)=>{

  return{
    type:UPDATE_SPOT,
    data,theId
  }
}

const deleteSpot=(spotId)=>{

  return{
    type:DELETE_SPOT,
    spotId
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

export const createNewSpot=(payload,previewImage,images)=> async(dispatch)=>{

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
  if(response.ok ){
    const dataNew = await response.json();





    const imagesObj=images.images

if(imagesObj.image1){
  const imgRes1=await csrfFetch (`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({url:imagesObj.image1, preview:true}),
});

if(imgRes1.ok){

  const img1Data = await imgRes1.json();

}

}

if(imagesObj.image2){
  const imgRes2=await csrfFetch (`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({url:imagesObj.image2, preview:true}),
});

if(imgRes2.ok){

  const img2Data = await imgRes2.json();

}

}


if(imagesObj.image3){
  const imgRes3=await csrfFetch (`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({url:imagesObj.image3, preview:true}),
});

if(imgRes3.ok){

  const img3Data = await imgRes3.json();

}

}

if(imagesObj.image4){
  const imgRes4=await csrfFetch (`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({url:imagesObj.image4, preview:true}),
});

if(imgRes4.ok){

  const img4Data = await imgRes4.json();

}

}




const theSpot = await csrfFetch(`/api/spots/${spotId}`);
if(theSpot.ok){
    const newSpot = await theSpot.json();
    dispatch(receiveSpot(newSpot))
    return newSpot
}
return theSpot
}

return response
  }





return res;

}

export const updateTheSpot=(payload,allImages,id)=> async(dispatch)=>{

payload.payload.previewImage=allImages.allImages;
const newPayload=payload.payload;
const theId=id.id;
console.log(newPayload)

  const response=await csrfFetch(`/api/spots/${theId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPayload),
});
if(response.ok ){
  const data = await response.json();

  dispatch(updateSpot(data, theId));
return data
}

return response
}


export const deleteTheSpot=(spotId)=> async(dispatch)=>{
console.log(spotId)



    const response=await csrfFetch(`/api/spots/${spotId}`, {
      method: "DELETE",

  });
  if(response.ok ){
    const data = await response.json();

    dispatch(deleteSpot(spotId));
  return data
  }

  return response
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

case UPDATE_SPOT:
  return {...state, [action.theId]: action.data}

  case DELETE_SPOT:
    const newState = { ...state };
            delete newState[action.spotId];
            return newState;

        default:
            return state;
    }
};

export default spotsReducer;



/*

if(Object.values(images.images).length !== 0){

      for(let i=0;i<Object.values(images.images).length;i++){

        const imgRes=await csrfFetch (`/api/spots/${spotId}/images`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({url:Object.values(images.images)[i], preview:true}),
      });

      if(imgRes.ok){

        const imgData = await response.json();
        console.log(imgData)
      }
      return imgRes
    }

  }


 */
