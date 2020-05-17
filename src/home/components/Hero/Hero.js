import React, { useState } from "react";

import "./Hero.css";

const Hero = (props) => {
  const [query, setQuery] = useState("");

  const inputChangedHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="home-hero">
      <div className="content-box">
        <div className="content-box-text">
          <h2 className="h2">Search for a restuarant, hotel e.t.c</h2>
          <p>Get reviews from the community</p>
        </div>
        <div className="content-box-calltoaction">
          <input type="text" value={query} onChange={inputChangedHandler} />
          <button
            onClick={() => props.btnClicked(query)}
            disabled={query.length === 0}
          >
            find reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
