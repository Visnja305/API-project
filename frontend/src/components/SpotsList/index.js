import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { Route, Switch, NavLink,Link } from "react-router-dom";

import { fetchSpots } from "../../store/spotsReducer";
import "./SpotsList.css";
const SpotsList = () => {
    const dispatch = useDispatch();
    const spots= useSelector((state) => state.spotsState.entries);

    useEffect(() => {

    dispatch(fetchSpots());

    }, [dispatch]);



console.log(spots)


    return (
        <div>
            <ul>
            {spots.map((spot)=>(


                <li key={spot.id}>
              <img src={spot.previewImage[0]}/>
              <br/>
              <span>{spot.state} {spot.city} {spot.avgRating}</span>
              <br/>
              <span>${spot.price} night</span>
                </li>

))}
            </ul>
                    </div>
    );
};

export default SpotsList;
