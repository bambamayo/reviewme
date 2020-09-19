import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../../../../redux/actions/auth";
import { getTokenFromLS } from "../../../utils/helpers";
import LoaderShine from "../../../loaders/LoaderShine";
import Icon from "../../UI/Icon/Icon";
import { Image, Placeholder } from "cloudinary-react";

const NavLinks = ({ navOpen, handleNavState }) => {
  const { user, token } = useSelector((state) => state.auth);
  const tokenLS = getTokenFromLS();
  const history = useHistory();

  const dispatch = useDispatch();

  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    handleNavState();
    history.push("/login");
  };

  return (
    <ul
      className={`nav__list nav__list--mobile ${
        navOpen ? "nav__list--mobile-show" : ""
      }`}
    >
      {(token || tokenLS) && (
        <li
          className={`nav__item ${navOpen ? "nav__item--mobile" : ""}`}
          style={{ "--i": "0.7" }}
        >
          <NavLink
            to="/write-a-review"
            exact
            activeClassName="active"
            className="nav__link"
            onClick={handleNavState}
          >
            Write a review
          </NavLink>
        </li>
      )}
      <li
        className={`nav__item ${navOpen ? "nav__item--mobile" : ""}`}
        style={{ "--i": token || tokenLS ? "1.4" : "0.7" }}
      >
        <NavLink
          to="/reviews"
          exact
          activeClassName="active"
          className="nav__link"
          onClick={handleNavState}
        >
          Reviews
        </NavLink>
      </li>
      {!(token || tokenLS) && (
        <li
          className={`nav__item ${navOpen ? "nav__item--mobile" : ""}`}
          style={{ "--i": "1.4" }}
        >
          <NavLink
            to="/login"
            onClick={handleNavState}
            exact
            activeClassName="active"
            className="nav__link"
          >
            Login
          </NavLink>
        </li>
      )}
      {!(token || tokenLS) && (
        <li
          className={`nav__item nav__item--mod ${
            navOpen ? "nav__item--mobile" : ""
          }`}
          style={{ "--i": "2.1" }}
        >
          <NavLink
            to="/signup"
            onClick={handleNavState}
            exact
            className="nav__link"
            activeClassName="active"
          >
            Sign up
          </NavLink>
        </li>
      )}
      {(token || tokenLS) && (
        <li
          className={`nav__item ${navOpen ? "nav__item--mobile" : ""}`}
          style={{ "--i": "2.1" }}
        >
          <NavLink
            to={`/${!user ? null : user.username}/profile`}
            activeClassName="active"
            exact
            onClick={handleNavState}
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
        <li
          className={`nav__item ${navOpen ? "nav__item--mobile" : ""}`}
          style={{ "--i": "2.8" }}
        >
          <button onClick={handleSignOut} className="signout__btn">
            Sign out
          </button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
