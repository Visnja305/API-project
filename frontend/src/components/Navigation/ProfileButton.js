/*import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");


  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
      <li>{user.username}</li>
        <li>{user.firstName} {user.lastName}</li>
        <li>{user.email}</li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;
*/
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink } from 'react-router-dom';
import { useHistory} from 'react-router-dom';
import './ProfileButton.css';
function ProfileButton({ user }) {
  const history=useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());

    closeMenu();
    return history.push(`/`)
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return  (
  
  <>
  {user &&
  <NavLink to="/spots/new">Create a new spot</NavLink>}
    <button id="menu-button"onClick={openMenu}>
    <i class="fa-solid fa-bars" />
      <i className="fas fa-user-circle" />
    </button>
    <ul className={ulClassName} ref={ulRef}>
      {user ? (
        <>
          <li>Hello, {user.firstName}</li>

          <li>{user.email}</li>
          <li><NavLink exact to="/spots/current">Manage Spots</NavLink></li>

          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </>
      ) : (
        <>
          <li className="buttons">
            <OpenModalButton
              buttonText="Log In"
              onButtonClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
          </li>
          <li className="buttons">
            <OpenModalButton
              buttonText="Sign Up"
              onButtonClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </li>
        </>
      )}
    </ul>
  </>
  )
}

export default ProfileButton;

/*
(
  <>
  {user &&
  <NavLink to="/spots/new">Create a new spot</NavLink>}
    <button id="menu-button"onClick={openMenu}>
    <i class="fa-solid fa-bars" />
      <i className="fas fa-user-circle" />
    </button>
    <ul className={ulClassName} ref={ulRef}>
      {user ? (
        <>
          <li>Hello, {user.firstName}</li>

          <li>{user.email}</li>
          <li><NavLink exact to="/spots/current">Manage Spots</NavLink></li>

          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </>
      ) : (
        <>
          <li className="buttons">
            <OpenModalButton
              buttonText="Log In"
              onButtonClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
          </li>
          <li className="buttons">
            <OpenModalButton
              buttonText="Sign Up"
              onButtonClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </li>
        </>
      )}
    </ul>
  </>
);


*/
