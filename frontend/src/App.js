/*import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
*/

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsList from "./components/SpotsList";
import SpotDetails from "./components/SpotDetails";
import CreateASpot from "./components/CreateASpot";
import ManageSpots from "./components/ManageSpots";
import EditPage from "./components/EditPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch></Switch>}
      <div>
      <Switch>
          <Route exact path="/">
            <SpotsList />
</Route>
<Route path="/spots/:id/edit">
            <EditPage />
          </Route>
<Route exact path="/spots/current">
<ManageSpots />
          </Route>

<Route exact path="/spots/new">
<CreateASpot />
          </Route>
          <Route path="/spots/:spotId(\d+)">
<SpotDetails />
          </Route>






          </Switch>
      </div>
    </>

  );
}

export default App;
