import React from "react";

import Icon from "../UI/Icon/Icon";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text-t">&copy;reviewME {new Date().getFullYear()}</p>
      <p className="footer-text-t">
        Made with{" "}
        <span>
          {" "}
          <Icon type={["far", "heart"]} classname="reviewed__details-icon" />
        </span>{" "}
        and{" "}
        <span>
          <Icon type={["fas", "beer"]} classname="reviewed__details-icon" />
        </span>{" "}
        by ayobami agunroye
      </p>
    </footer>
  );
};

export default Footer;
