import React, { useState } from "react";

const Hero = (props) => {
  const [query, setQuery] = useState("");

  const inputChangedHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="hero">
      <div className="hero__content-box">
        <div className="hero__content-box-text">
          <h2 className="hero__content-box-texth2">
            Search for a restuarant, hotel e.t.c
          </h2>
          <p className="hero__content-box-textp">
            Get reviews from the community
          </p>
        </div>
        <div className="hero__content-box-calltoaction">
          <input
            type="text"
            value={query}
            onChange={inputChangedHandler}
            className="input hero__content-box-calltoactioninput"
          />
          <button
            onClick={() => props.btnClicked(query)}
            disabled={query.length === 0}
            className="btn btn--blue"
          >
            find reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
