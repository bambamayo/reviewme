import React from "react";

const Card = (props) => {
  return <div className={`card ${props.cardClass}`}>{props.children}</div>;
};

export default Card;
