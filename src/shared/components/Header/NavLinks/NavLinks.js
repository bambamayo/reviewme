import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../../../../redux/actions/auth";
import { getTokenFromLS } from "../../../utils/helpers";
import LoaderShine from "../../../loaders/LoaderShine";
import Icon from "../../UI/Icon/Icon";
import { Image, Placeholder } from "cloudinary-react";

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
                  {user.avatarPublicId ? (
                    <Image
                      publicId={user.avatarPublicId}
                      dpr="auto"
                      responsive
                      width="auto"
                      crop="scale"
                      responsiveUseBreakpoints="true"
                      loading="lazy"
                      quality="auto"
                      fetchFormat="auto"
                      alt={user.username}
                      className="nav__link--avatar-avatar"
                    >
                      <Placeholder type="blur" />
                    </Image>
                  ) : (
                    <span className="nav__link--avatar-empty">
                      <Icon type={["far", "user-circle"]} />
                    </span>
                  )}
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
