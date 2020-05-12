import React from "react";
import { useLocation, useHistory } from "react-router-dom";

const Reviews = () => {
  const history = useHistory();
  console.log(history);
  let query = new URLSearchParams(useLocation().search);
  return (
    <div>
      <h2>i searched for {query.get("searchterm")}</h2>
    </div>
  );
};

export default Reviews;
