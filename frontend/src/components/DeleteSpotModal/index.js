import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";



import {deleteTheSpot} from "../../store/spotsReducer";

import { useHistory} from 'react-router-dom';
import "./DeleteSpotModal.css";
function DeleteSpotModal({props}) {

const spotId=props.id;

  const history=useHistory();

  const dispatch = useDispatch();

const [errors, setErrors] = useState({});
  const { closeModal } = useModal();





  const deleteSpot = (e) => {

    e.preventDefault();
    dispatch(deleteTheSpot(spotId)).then(closeModal).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };





  return (
    <div className="delete-spot-window">
      <h1>Confirm Delete</h1>
      <h2>Are you sure you want to remove this spot from the listings?</h2>

    <button id="yes-delete-spot"onClick={deleteSpot}>Yes (Delete Spot)</button>
    <button id="no-keep-spot" onClick={closeModal}>No (Keep Spot)</button>

    </div>
  );
}

export default DeleteSpotModal;
