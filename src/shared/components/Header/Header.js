import React from "react";

import NavLinks from "./NavLinks/NavLinks";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <div className="header__logo-box">
          <Link to="/">
            <h2 className="header__logo-box-h2">
              <span className="header__logo-box-h2--s">review</span>
              <span className="header__logo-box-h2--l">ME</span>
            </h2>
          </Link>
        </div>
        <NavLinks />
      </nav>
    </header>
  );
};

export default Header;
