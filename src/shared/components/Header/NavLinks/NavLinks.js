import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "../../UI/Avatar/Avatar";
import avatarImg from "../../../../assets/images/use-now.jpg";
import { logoutUser } from "../../../../redux/actions/auth";

const NavLinks = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <ul className="nav__list">
      {isLoggedIn && (
        <li className="nav__item">
          <NavLink
            to="/write-a-review"
            exact
            activeClassName="active"
            className="nav__link"
          >
            Write a review
          </NavLink>
        </li>
      )}
      <li className="nav__item">
        <NavLink
          to="/reviews"
          exact
          activeClassName="active"
          className="nav__link"
        >
          reviews
        </NavLink>
      </li>
      {!isLoggedIn && (
        <li className="nav__item">
          <NavLink
            to="/login"
            exact
            activeClassName="active"
            className="nav__link"
          >
            login
          </NavLink>
        </li>
      )}
      {!isLoggedIn && (
        <li className="nav__item nav__item--mod">
          <NavLink
            to="/signup"
            exact
            className="nav__link"
            activeClassName="active"
          >
            signup
          </NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li className="nav__item">
          <NavLink
            to="/bambam/profile"
            activeClassName="active"
            exact
            className="nav__link nav__link--avatar"
          >
            <span className="nav__link--avatar-username">welcome user</span>
            <span>
              <Avatar
                image={avatarImg}
                alttext={`user profile picture`}
                avatarClass="nav__link--avatar-avatar"
              />
            </span>
          </NavLink>
        </li>
      )}

      {isLoggedIn && (
        <button onClick={handleSignOut} className="signout__btn">
          signout
        </button>
      )}
    </ul>
  );
};

export default NavLinks;
