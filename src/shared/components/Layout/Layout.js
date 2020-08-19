import React from "react";
import PropTypes from "prop-types";
import { CloudinaryContext } from "cloudinary-react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = (props) => {
  return (
    <>
      <CloudinaryContext cloudName="ayobami-agunroye">
        <Header />
        <main>{props.children}</main>
        <Footer />
      </CloudinaryContext>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;
