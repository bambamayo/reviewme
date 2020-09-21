import React from "react";

import Icon from "../UI/Icon/Icon";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text-t">&copy;reviewME {new Date().getFullYear()}</p>
      <p className="footer-text-t">
        Made by ayobami agunroye{"  "}
        <a href="https://ayobamiagunroye.netlify.app/">Hire Me!</a>
      </p>
    </footer>
  );
};

export default Footer;
