import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import SectionHeader from "../../../shared/components/SectionHeader/SectionHeader";
import Review from "../../../reviews/components/Review/Review";
import Loader from "../../../shared/components/UI/Loader/Loader";
import { setDate } from "../../../shared/utils/helpers";

const LatestReviews = () => {
  const appState = useSelector((state) => state);
  const { token } = appState.auth;
  const { reviews, error } = appState.review;
  let show;
  if (error) {
    show = (
      <div className="latest-reviews">
        <h2 className="latest-reviews__error">
          Could not load reviews, please try reloading the page
        </h2>
      </div>
    );
  } else if (reviews === null) {
    show = (
      <div className="latest-reviews">
        <Loader loaderClass="reviews__loader" />
      </div>
    );
  } else {
    if (reviews.length === 0) {
      show = (
        <div className="latest-reviews">
          <h2 className="reviews__error-msg">
            no review to show, be the first to write a review
          </h2>
          <Link
            className="reviews__error-link"
            to={token ? "/write-a-review" : "/login"}
          >
            Write a review
          </Link>
        </div>
      );
    } else {
      show = (
        <div className="grid grid__latest">
          {reviews.slice(0, 4).map((review) => (
            <Review
              id={review.id}
              key={review.id}
              image={review.images[0]}
              imageAlt={review.reviewedName}
              showMainImg={review.images.length === 0 ? false : true}
              publicId={review.images[0]}
              reviewedPlace={review.reviewedName}
              header={review.reviewedName}
              avatarPresent={review.author.avatarPublicId ? true : false}
              avatarPId={review.author.avatarPublicId}
              username={review.author.username}
              introText={review.introText}
              date={setDate(review.createdAt)}
              iconClicked={() => console.log("icon clicked")}
            />
          ))}
        </div>
      );
    }
  }
  return (
    <section className="section section--greybg">
      <SectionHeader>Latest reviews</SectionHeader>
      {show}
      {reviews && reviews.length !== 0 && reviews.length > 3 && (
        <div className="grid-width t-r">
          <Link className="section-calltoaction-link" to="/reviews?cat=all">
            view all reviews
          </Link>
        </div>
      )}
    </section>
  );
};

export default LatestReviews;
