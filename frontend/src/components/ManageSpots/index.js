
import { NavLink, Link} from 'react-router-dom';
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ManageSpots.css";
import { fetchSpots } from "../../store/spotsReducer";
import {restoreUser} from "../../store/session"
import { useHistory} from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from '../DeleteSpotModal';
const ManageSpots = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoaded,setIsLoaded]=useState(false);
    const user= useSelector((state) => state.session.user);
    const spots= useSelector((state) => state.spotsState);

    
    useEffect(() => {

        dispatch(fetchSpots()).then(()=>setIsLoaded(true))

        }, [dispatch]);
        if(isLoaded && !user){return history.push(`/`)};

const spotsS=Object.values(spots);
let arr=[];
if(isLoaded && user.id){
for(let i=0;i<spotsS.length;i++){
    if (spotsS[i].ownerId===user.id){
arr.push(spotsS[i])
    }
}
}







return  (
    <>
    <h1>Manage Your Spots</h1>
    <NavLink to="/spots/new">Create a new spot</NavLink>
    <ul>
{isLoaded && arr.map((spot)=>(
<li key={spot.id}>

<Link to={`/spots/${spot.id}`}> <img src={spot.previewImage[0]}/></Link>
              <br/>
              <span>{spot.city} {spot.state} <i className="fa-solid fa-star" /> {spot.avgRating}</span>
              <br/>
              <span>${spot.price} night</span>
             <div> <span><button onClick={(e)=>history.push(`/spots/${spot.id}/edit`)}>Update</button>

             <OpenModalButton
                buttonText="Delete"

                modalComponent={<DeleteSpotModal props={spot}/>}
              />

             </span></div>
</li>


)

)

}


    </ul>
    </>
   )





}



export default ManageSpots;


//onClick={history.push(`/spots/${spot.id}/edit`)}
//.then(()=>dispatch(restoreUser()))
