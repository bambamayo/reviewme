import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Avatar from "../../UI/Avatar/Avatar";
import avatarImg from "../../../../assets/images/use-now.jpg";
import { logoutUser } from "../../../../redux/actions/auth";
import { getTokenFromLS } from "../../../utils/helpers";
import LoaderShine from "../../../loaders/LoaderShine";

const NavLinks = () => {
  const { user, token } = useSelector((state) => state.auth);
  const tokenLS = getTokenFromLS();

  const dispatch = useDispatch();

  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <ul className="nav__list">
      {(token || tokenLS) && (
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
          Reviews
        </NavLink>
      </li>
      {!(token || tokenLS) && (
        <li className="nav__item">
          <NavLink
            to="/login"
            exact
            activeClassName="active"
            className="nav__link"
          >
            Login
          </NavLink>
        </li>
      )}
      {!(token || tokenLS) && (
        <li className="nav__item nav__item--mod">
          <NavLink
            to="/signup"
            exact
            className="nav__link"
            activeClassName="active"
          >
            Sign up
          </NavLink>
        </li>
      )}
      {(token || tokenLS) && (
        <li className="nav__item">
          <NavLink
            to={`/${!user ? null : user.username}/profile`}
            activeClassName="active"
            exact
            className="nav__link nav__link--avatar"
          >
            {!user ? (
              <LoaderShine loaderClass="line-nav" />
            ) : (
              <>
                <span className="nav__link--avatar-username">
                  Welcome {user.username}
                </span>
                <span>
                  <Avatar
                    image={avatarImg}
                    alttext={`user profile picture`}
                    avatarClass="nav__link--avatar-avatar"
                  />
                </span>
              </>
            )}
          </NavLink>
        </li>
      )}

      {(token || tokenLS) && (
        <button onClick={handleSignOut} className="signout__btn">
          Sign out
        </button>
      )}
    </ul>
  );
};

export default NavLinks;
