import React from "react";
import { useParams } from "react-router-dom";

const ReviewDetails = () => {
  let { name } = useParams();
  return (
    <section className="review-details">
      <div className="review-details__cont">
        <h2 className="review-details__header">{`category/${name}`}</h2>
        <button className="review-details__editbtn">edit</button>
      </div>
      <div className="review-details__cont">
        <h3 className="review-details__amount">
          <span className="review-details__amount--pri">Number of reviews</span>
          <span className="review-details__amount--sec">3</span>
        </h3>
        <button className="review-details__addtolistbtn">add to list</button>
      </div>
    </section>
  );
};

export default ReviewDetails;
