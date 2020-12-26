import React, { useState } from "react";

import NavLinks from "./NavLinks/NavLinks";
import { Link } from "react-router-dom";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  const handleNavState = () => {
    setNavOpen((state) => !state);
  };

  return (
    <header className="header">
      <nav className="header__nav">
        <div className="header__logo-box">
          <Link
            data-testid="header-logo"
            to="/"
            onClick={navOpen ? () => setNavOpen(false) : null}
          >
            <h2 className="header__logo-box-h2">
              <span className="header__logo-box-h2--s">review</span>
              <span className="header__logo-box-h2--l">ME</span>
            </h2>
          </Link>
        </div>
        <NavLinks navOpen={navOpen} handleNavState={handleNavState} />
        <button className="nav__bars" onClick={handleNavState}>
          <span
            className={`nav__bar nav__bar--top ${
              navOpen ? "nav__bar--top-in" : "nav__bar--top-out"
            }`}
          ></span>
          <span
            className={`nav__bar nav__bar--middle ${
              navOpen ? "nav__bar--middle-in" : "nav__bar--middle-out"
            }`}
          ></span>
          <span
            className={`nav__bar nav__bar--bottom ${
              navOpen ? "nav__bar--bottom-in" : "nav__bar--bottom-out"
            }`}
          ></span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
