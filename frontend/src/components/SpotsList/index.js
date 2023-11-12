import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, NavLink,Link } from "react-router-dom";

import { fetchSpots } from "../../store/spotsReducer";
import "./SpotsList.css";
const SpotsList = () => {
    const dispatch = useDispatch();
    const spots= useSelector((state) => state.spotsState);

    const spotsS=Object.values(spots);
    const [isLoaded,setIsLoaded]=useState(false)
console.log(spotsS)
    useEffect(() => {

    dispatch(fetchSpots()).then(()=>setIsLoaded(true))

    }, [dispatch]);






    return (
        <div>

            <ul>
             { isLoaded && spotsS.map((spot)=>(


                <li key={spot.id}>

            <Link to={`/spots/${spot.id}`}> <img src={spot.previewImage[0]}/></Link>
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
