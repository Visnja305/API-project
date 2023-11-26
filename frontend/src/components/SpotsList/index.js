import { useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchSpots } from "../../store/spotsReducer";
import "./SpotsList.css";

const SpotsList = () => {

    const dispatch = useDispatch();

    const spots= useSelector((state) => state.spotsState);

    const spotsS=Object.values(spots);
    const [isLoaded,setIsLoaded]=useState(false)

    useEffect(() => {

    dispatch(fetchSpots()).then(()=>setIsLoaded(true))

    }, [dispatch]);





    return (
        <div>

            <ul className="spots-list-container">
             { isLoaded && spotsS.map((spot)=>(


                <li key={spot.id} id="tooltip" >

            <Link to={`/spots/${spot.id}`}> <img id="spot" src={spot.previewImage[0]}/>
              <br/>
              <div className="under-image-container">
              <p>{spot.state} {spot.city}</p>
              <p><i className="fa-solid fa-star" /> {spot.avgRating}</p>
              </div>

              <p>${spot.price} night</p>
              </Link>
              <div id="tooltipText"> {spot.name} </div>
                </li>

))}
            </ul>
                    </div>
    );
};

export default SpotsList;

//check
