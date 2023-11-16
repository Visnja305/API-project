

import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory} from 'react-router-dom';


import {deleteTheReview} from "../../store/reviewsReducer";


function DeleteReviewModal({props}) {

    const spotId=props.spotId;
    const review=props.review;


  const dispatch = useDispatch();

const [errors, setErrors] = useState({});
  const { closeModal } = useModal();





  const deleteReview = (e) => {

    e.preventDefault();
    dispatch(deleteTheReview(spotId,review)).then(closeModal).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };






  return (
    <>
      <h1>Confirm Delete</h1>
      <h2> Are you sure you want to delete this review?</h2>

    <button onClick={deleteReview}>Yes (Delete Review)</button>
    <button onClick={closeModal}>No (Keep Review)</button>

    </>
  );
}

export default DeleteReviewModal;
