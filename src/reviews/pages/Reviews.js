import React from "react";
import { useLocation } from "react-router-dom";

const Reviews = () => {
  let query = new URLSearchParams(useLocation().search);
  return (
    <div>
      <h2>i searched for {query.get("searchterm")}</h2>
    </div>
  );
};

export default Reviews;
