import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../../shared/components/UI/Button/Button";

const Hero = (props) => {
  const [query, setQuery] = useState("");

  const inputChangedHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="hero">
      <div className="hero__content">
        <div className="hero__textcont">
          <h2 className="hero__text-h2">
            Search for a restuarant, hotel e.t.c
          </h2>
          <p className="hero__text-p">Get reviews from the community</p>
        </div>
        <div className="hero__form">
          <input
            type="text"
            value={query}
            onChange={inputChangedHandler}
            className="hero__input input-group__input"
          />
          <Button
            onClick={() => props.btnClicked(query)}
            disabled={query.length === 0}
            className="btn  btn--hero"
          >
            find reviews
          </Button>
        </div>
      </div>
    </div>
  );
};

Hero.propTypes = {
  btnClicked: PropTypes.func.isRequired,
};

export default Hero;
