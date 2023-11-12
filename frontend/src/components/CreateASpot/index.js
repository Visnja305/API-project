import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
//import { Redirect } from "react-router-dom";
import "./CreateASpot.css";
import { createNewSpot } from "../../store/spotsReducer";

function CreateASpot() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage,setPreviewImage]=useState("");
  const [errors, setErrors] = useState({});
  const [validationErrors, setValidationErrors]=useState({});


  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationErrors({});
const err = {};
        if (!previewImage.length){
            err.previewImage = "Preview Image is required";

        setValidationErrors(err);
    return}



    setErrors({});

    const payload={
        country, address, city, state, lat, lng, description, name, price
    }

     dispatch(createNewSpot({ payload},{previewImage})).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) {
            setErrors(data.errors);
         };
});

setCountry("");
setAddress("");
setCity("");
setState("");
setLat("");
setLng("");
setDescription("");
setName("");
setPrice("")
setPreviewImage("")
}



  return (
    <>
    <h1>Create a spot</h1>
    <h2>Where's your place located?</h2>
    <h3>Guests will only get your exact address once they booked a reservation.</h3>
     <form onSubmit={handleSubmit}>

            <div className="errors">{errors.country}</div>
            <label>
                Country:
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                />
            </label>
            <div className="errors">{errors.address}</div>
            <label>
                Address:
                <input
                type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                />
            </label>
            <div className="errors">{errors.city}</div>
            <label>
                City:
                <input
                type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                />
            </label>
            <div className="errors">{errors.state}</div>
            <label>
                State:
                <input
                type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="STATE"
                />
            </label>
            <div className="errors">{errors.lat}</div>
            <label>
                Latitude:
                <input
                type="number"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    placeholder="Latitude"
                />
            </label>
              <div className="errors">{errors.lng}</div>
            <label>
                Longitude:
                <input
                type="number"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    placeholder="Longitude"
                />
            </label>
            <h2>Describe your place to guests</h2>
            <h3>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</h3>

            <label>
                Description:
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder=" Please write at least 30 characters"
                />
            </label>
            <div className="errors">{errors.description}</div>

            <h2>Create a title for your spot</h2>
            <h3>Catch guests' attention with a spot title that highlights what makes your place special.</h3>

            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name of your spot"
                />
            </label>
            <div className="errors">{errors.name}</div>
            <h2>Set a base price for your spot</h2>
            <h3>Competitive pricing can help your listing stand out and rank higher in search results.</h3>


            <label>
                Price:
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price per night (USD)"
                />
            </label>
            <div className="errors">{errors.price}</div>
            <h2>Liven up your spot with photos</h2>
            <h3>Submit a link to at least one photo to publish your spot.</h3>
             <div className="errors">{validationErrors.previewImage}</div>
              <label>
                Preview Image:
            <input
            type="text"
            value={previewImage}

            onChange={(e) => setPreviewImage(e.target.value)}
            placeholder="Preview Image URL"
             />
</label>
            <button type="submit" >Create Spot</button>
        </form>
        </>
  );
}

export default CreateASpot;
