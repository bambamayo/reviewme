import React from "react";
import LoaderReview from "./LoaderReview";

const LoaderReviews = () => {
  return (
    <div className="grid l-reviews grid__latest">
      <LoaderReview />
      <LoaderReview />
      <LoaderReview />
      <LoaderReview />
    </div>
  );
};

export default LoaderReviews;
