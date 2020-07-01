import React from "react";
import PropTypes from "prop-types";

const Card = ({ cardClass, children }) => {
  return <div className={`card ${cardClass}`}>{children}</div>;
};

Card.propTypes = {
  cardClass: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Card;
