import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./PostReview.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();


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






  return (
    <>
      <h1>How was your stay?</h1>
      <form onSubmit={handleSubmit}>
      {errors.description && (
          <p>{errors.description}</p>)}
      <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder=" Leave your review here..."
                />


        <button type="submit" disabled={description.length<=9 || password.length<=5}>Log In</button>
        <button type="submit" onClick={onClick} >Demo user</button>
      </form>
    </>
  );
}

export default LoginFormModal;
