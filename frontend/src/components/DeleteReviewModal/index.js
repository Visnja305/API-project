

import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory} from 'react-router-dom';


import {deleteTheReview} from "../../store/reviewsReducer";
import "./DeleteReviewModal.css";

function DeleteReviewModal({props}) {
const history=useHistory();
    const spotId=props.spotId;
    const review=props.review;


  const dispatch = useDispatch();

const [errors, setErrors] = useState({});
  const { closeModal } = useModal();





  const deleteReview = (e) => {

    e.preventDefault();

    dispatch(deleteTheReview(spotId,review)).then(closeModal).then(()=>history.push(`/spots/${spotId}`)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
      });
  };






  return (

    <div className="delete-review-window">
      <h1>Confirm Delete</h1>
      <h2> Are you sure you want to delete this review?</h2>

    <button id="yes-delete-review"onClick={deleteReview}>Yes (Delete Review)</button>
    <button id="no-keep-review" onClick={closeModal}>No (Keep Review)</button>
    </div>
  );
}

export default DeleteReviewModal;
