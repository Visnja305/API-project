import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./PostReview.css";
import {FaStar} from "react-icons/fa"




function LoginFormModal() {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
const [rating,setRating]=useState(null)
const [rateColor,setColor]=useState(null)







/*
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };
*/





  return (
    <>
      <h1>How was your stay?</h1>
      <form >
      {errors.description && (
          <p>{errors.description}</p>)}
      <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder=" Leave your review here..."
                />

<span>
{[...Array(5)].map((star,index)=>{
const currentRate=index+1
return(
<>
<label>
<input class="radio_item" type="radio" name="rate" value={currentRate}  onClick ={()=>setRating(currentRate)
  }/>
  <FaStar size={50} color={currentRate <= (rateColor || rating) ? "yellow" : "grey"}/>
</label>
  </>
)
}



)}
    </span>







        <button type="submit" disabled={ description.length<=9 }>Submit</button>

      </form>
    </>
  );
}

export default LoginFormModal;
