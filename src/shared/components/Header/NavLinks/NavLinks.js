import React from "react";
import { NavLink } from "react-router-dom";

import Avatar from "../../UI/Avatar/Avatar";
import avatarImg from "../../../../assets/images/use-now.jpg";
import "./NavLinks.css";

const NavLinks = () => {
  return (
    <ul className="nav-links">
      <li className="nav-links-item">
        <NavLink
          to="/write-a-review"
          exact
          activeClassName="active"
          className="nav-links-link"
        >
          Write a review
        </NavLink>
      </li>
      <li className="nav-links-item">
        <NavLink
          to="/reviews"
          activeClassName="active"
          className="nav-links-link"
        >
          reviews
        </NavLink>
      </li>
      <li className="nav-links-item">
        <NavLink
          to="/login"
          activeClassName="active"
          className="nav-links-link"
        >
          login
        </NavLink>
      </li>
      <li className="nav-links-item nav-links-item--mod">
        <NavLink to="/signup" className="nav-links-link">
          signup
        </NavLink>
      </li>
      <li className="nav-links-item">
        <NavLink
          to="/user/1"
          activeClassName="active"
          className="nav-links-link nav-links-link--avatar"
        >
          <span className="user-name">welcome user</span>
          <span className="avatar-span">
            <Avatar
              image={avatarImg}
              alttext={`user profile picture`}
              avatarClass="avatar"
            />
          </span>
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
