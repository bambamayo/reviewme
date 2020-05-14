import React from "react";
import { useLocation } from "react-router-dom";

const Reviews = () => {
  let query = new URLSearchParams(useLocation().search);
  if (query.get("q")) {
    return (
      <div>
        <h2>i searched for {query.get("q")}</h2>
      </div>
    );
  }
  if (query.get("cat")) {
    return (
      <div>
        <h2>i searched for {query.get("cat")}</h2>
      </div>
    );
  }
  return <p>reviews page</p>;
};

export default Reviews;
