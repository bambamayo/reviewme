import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";

import Avatar from "../../UI/Avatar/Avatar";
import { AuthContext } from "../../../context/auth-context";
import avatarImg from "../../../../assets/images/use-now.jpg";

const NavLinks = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const handleSignOut = (e) => {
    e.preventDefault();
    auth.logout();
    history.push("/");
    auth.handleSetUserId(null);
  };

  return (
    <ul className="nav__list">
      {auth.isLoggedIn && (
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
      {!auth.isLoggedIn && (
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
      {!auth.isLoggedIn && (
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
      {auth.isLoggedIn && (
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
      {auth.isLoggedIn && (
        <li className="nav__item nav__item--mod">
          <NavLink
            to="/"
            exact
            className="nav__link"
            activeClassName="active"
            onClick={handleSignOut}
          >
            signout
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
