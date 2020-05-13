import React from "react";
import { useParams } from "react-router-dom";

const ReviewDetails = () => {
  let { name } = useParams();
  return (
    <div>
      <h1>i am showing the review details for {name} </h1>
    </div>
  );
};

export default ReviewDetails;
