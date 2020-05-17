import React from "react";

import NavLinks from "./NavLinks/NavLinks";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <nav className="header-nav">
        <div className="logo-box">
          <Link to="/">
            <h2 className="logo-box-text">
              <span className="logo-box-text-l">review</span>
              <span className="logo-box-text-r">ME</span>
            </h2>
          </Link>
        </div>
        <NavLinks />
      </nav>
    </header>
  );
};

export default Header;
