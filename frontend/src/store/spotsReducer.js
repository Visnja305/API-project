import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/getSpots";


const getSpots = (spots) => {
  return {
    type: GET_SPOTS,
    spots

  };
};

export const fetchSpots = () => async (dispatch) => {
    const response = await fetch("/api/spots");

    const spots = await response.json();
    dispatch(getSpots(spots));
    return spots
    };





const initialState = { entries: [], isLoading: true };
const spotsReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_SPOTS:
const allSpots=action.spots.Spots
        return { ...state, entries: [...allSpots] };

        default:
            return state;
    }
};

export default spotsReducer;
