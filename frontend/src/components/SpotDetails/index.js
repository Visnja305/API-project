
import {  useSelector, useDispatch } from "react-redux";
import {useState,useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";
import { getSpotDetails } from "../../store/spotsReducer";

import "./SpotDetails.css";
import ReviewsSegment from "./ReviewsSegment";
import ReviewsList from "./ReviewsList";
import OpenModalButton from '../OpenModalButton';
import PostReviewModal from '../PostReviewModal';
const SpotDetails = () => {
    const { spotId } = useParams();


    const history=useHistory();

    const dispatch=useDispatch();
    const spot= useSelector((state) => state.spotsState[spotId]);



const [isLoading,setIsLoading]=useState(true);
useEffect(()=>{
    dispatch(getSpotDetails(spotId)).then(()=>setIsLoading(false))

},[dispatch,spotId])
const handleClick=()=>{
    window.alert("Feature Coming Soon...")
}
const currUser=useSelector((state) => state.session);
const currSpot=useSelector((state)=>state.spotsState[spotId]);
const reviews= useSelector((state) => state.reviewsState.entries[spotId]);
let arr=[];
if(!isLoading && currUser.user && reviews ){

    for (let i=0;i<Object.values(reviews)[0].length;i++){

if(Object.values(reviews)[0][i]){
    if (Object.values(reviews)[0][i].User.id===currUser.user.id){arr.push(Object.values(reviews)[0][i])}

}
    }

}
const props={
    spotId:spotId,
    currUser:currUser
}



let sum=0;
let count=0;

if(!isLoading && reviews){

    for (let i=0;i<Object.values(reviews)[0].length;i++){

if(Object.values(reviews)[0][i]){

    sum+=Object.values(reviews)[0][i].stars;
    count++
}
    }

}

let averageStarRating=sum/count;







return  (

    (<div>
        <h1>{!isLoading && spot.name}</h1>
        <h3>{!isLoading && `${spot.city}, ${spot.state}, ${spot.country} `}</h3>
        <div className="image-wrapper">
        {!isLoading && spot.SpotImages && spot.SpotImages.map((image,index)=>(
            <div className={`image-box${index}`}>
<img src={image.url}/>
</div>
        ))}
        </div>
        <div className="image-wrapper">
        {!isLoading && spot.previewImage && spot.previewImage.map((image,index)=>(
            <div className={`image-box${index}`}>
<img src={image.url}/>
</div>
        ))}
        </div>



        <div className="middle-section-spot-details">


            <div>
            <h1>Hosted by {!isLoading && `${spot.Owner.firstName} ${spot.Owner.lastName}`}</h1>
            <p>{!isLoading && spot.description}</p>
</div>

        <div className="reserve-section-spot-details">
            <div className="inner-reserve-section">
            <h3>{!isLoading && `$ ${spot.price} night`} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</h3>
            <h3><i className="fa-solid fa-star" />{!isLoading && count===0 && "New" }{!isLoading && count!==0 && averageStarRating.toFixed(2)}{!isLoading && count!==0 && <span>&#183;</span>}</h3>
           <ReviewsSegment props={spotId}/>
</div>
           <button id="reserve-button" onClick={handleClick} >Reserve</button>

        </div>

        </div>





       <div className="start-of-review-list"> <h3><i className="fa-solid fa-star" />{!isLoading && count===0 && "New" }{!isLoading && count!==0 && averageStarRating.toFixed(2) }  &nbsp; &nbsp; &nbsp; &nbsp;</h3>
           <ReviewsSegment props={spotId}/></div>
           <div>

{ !isLoading && currUser.user!==null && currUser.user.id!==currSpot.ownerId && arr.length===0 && <OpenModalButton
                buttonText="Post your review"

                modalComponent={<PostReviewModal props={{props}}/>}
              />}
{!isLoading && currUser.user!==null && currUser.user.id!==currSpot.ownerId && Object.values(reviews)[0].length===0 && <p>Be the first to post a review!</p>}
  </div>


<ReviewsList props={spotId}/>




        </div>)






)
}



export default SpotDetails;



//{!isLoading && (<img src={spot.SpotImages[0].url}/>)}



/*



 <>
        <h1>{!isLoading && spot.name}</h1>
        <h3>{!isLoading && `${spot.city}, ${spot.state}, ${spot.country} `}</h3>

        <div className="image-wrapper">
        {!isLoading && spot.SpotImages && spot.SpotImages.map((image,index)=>(
            <div className={`image-box${index}`}>
<img src={image.url}/>
</div>
        ))}
        </div>
        <div className="image-wrapper">
        {!isLoading && spot.previewImage && spot.previewImage.map((image,index)=>(
            <div className={`image-box${index}`}>
<img src={image.url}/>
</div>
        ))}
        </div>
        <div className="middle-section-spot-details">
            <div>
            <h1>Hosted by {!isLoading && `${spot.Owner.firstName} ${spot.Owner.lastName}`}</h1>
            <p>Loremipsum dkak ahkjhjkhkjhjkh khjh h ashkjh hsjh h jh jk kjshhd ajdh kdkjdh ajkd dkjh adjk d</p>
</div>
        <div className="reserve-section-spot-details">
           <div className="inner-reserve-section">
            <h3>{!isLoading && `$ ${spot.price} night`}</h3>

            {!isLoading && averageStarRating && count!==0 && (
                <div className="inner-not-new-spot">

            <h3><i className="fa-solid fa-star" />{averageStarRating} &nbsp; &nbsp;</h3>

           <ReviewsSegment props={spotId}/>

        </div>
           )
           }
           {!isLoading && count===0 && (


            <h3><i className="fa-solid fa-star" />New &nbsp; &nbsp;</h3>
           )
           }
        </div>
</div>
           </div>
           <div>
           <button onClick={handleClick} >Reserve</button>
</div>
        </div>
        </div>
        <h3><i className="fa-solid fa-star" />{!isLoading && count===0 && "New" }{!isLoading && count!==0 && averageStarRating }</h3>
           <ReviewsSegment props={spotId}/>
           <div>

{ !isLoading && currUser.user!==null && currUser.user.id!==currSpot.ownerId && arr.length===0 && <OpenModalButton
                buttonText="Post your review"

                modalComponent={<PostReviewModal props={{props}}/>}
              />}
{!isLoading && currUser.user!==null && currUser.user.id!==currSpot.ownerId && Object.values(reviews)[0].length===0 && <p>Be the first to post a review!</p>}
  </div>


<ReviewsList props={spotId}/>




        </div>)





*/
