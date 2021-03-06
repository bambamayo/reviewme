import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import PageHeader from "../../shared/components/PageHeader/PageHeader";
import Review from "../components/Review/Review";
import categories from "../../categories";
import Loader from "../../shared/components/UI/Loader/Loader";
import { setDate } from "../../shared/utils/helpers";

const Reviews = () => {
  const [shownReviews, setShownReviews] = useState(null);
  const [catInView, setCatInView] = useState("");
  const [emptyMsg, setEmptyMsg] = useState("");
  const appState = useSelector((state) => state);
  const { token } = appState.auth;
  const { reviews, error } = appState.review;
  let query = new URLSearchParams(useLocation().search);
  let history = useHistory();

  useEffect(() => {
    const handleReviewsToShow = () => {
      if (reviews) {
        if (query.get("q")) {
          let filteredReviews = reviews.filter((review) =>
            review.reviewedName
              .toLowerCase()
              .includes(query.get("q").replace(/-/g, " ").toLowerCase())
          );
          setShownReviews(filteredReviews);
          filteredReviews.length === 0
            ? setEmptyMsg(
                `cannot find reviews for ${query
                  .get("q")
                  .replace(/-/g, " ")
                  .toLowerCase()} , be the first to write a review for it`
              )
            : setEmptyMsg("");
        } else if (query.get("cat")) {
          if (query.get("cat") === "all") setShownReviews(reviews);
          else {
            let filteredReviews = reviews.filter(
              (review) => review.category === query.get("cat")
            );
            setShownReviews(filteredReviews);

            filteredReviews.length === 0
              ? setEmptyMsg(
                  `cannot find reviews for ${query.get(
                    "cat"
                  )}, be the first to write a review for it`
                )
              : setEmptyMsg("");
          }
        } else {
          setShownReviews(reviews);
        }
      }
    };

    handleReviewsToShow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews]);

  let displayedReviews;

  if (error) {
    displayedReviews = (
      <div className="reviews__others-cont">
        <h2 className="latest-reviews__error">
          Could not load reviews, please try reloading the page
        </h2>
      </div>
    );
  } else if (shownReviews === null) {
    displayedReviews = (
      <div className="reviews__others-cont">
        <Loader loaderClass="reviews__loader" />
      </div>
    );
  } else if (shownReviews) {
    if (shownReviews.length === 0) {
      displayedReviews = (
        <div className="reviews__others-cont">
          <h2 className="reviews__error-msg">
            {emptyMsg || `no review to show, be the first to write a review`}
          </h2>
          {token && (
            <Link className="reviews__error-link" to="/write-a-review">
              Write a review
            </Link>
          )}
          {!token && (
            <Link className="reviews__error-link" to="/login">
              Login to write a review
            </Link>
          )}
        </div>
      );
    } else {
      displayedReviews = (
        <div className="grid grid__latest">
          {shownReviews.map((review) => (
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

  const handleTopFilterSubmit = (e) => {
    e.preventDefault();
    let reviewsList = [...reviews];
    if (catInView === "all") {
      setShownReviews(reviewsList);
      history.push(`/reviews?cat=all`);
    } else {
      let filteredReviews = reviewsList.filter(
        (review) => review.category === catInView
      );
      setShownReviews(filteredReviews);
      history.push(`/reviews?cat=${catInView}`);
      filteredReviews.length === 0
        ? setEmptyMsg(
            `cannot find reviews for ${catInView} category, be the first to write a review for it`
          )
        : setEmptyMsg("");
    }
  };

  return (
    <section className="section--page reviews">
      <PageHeader title="reviews" />
      <div className="grid-width reviews__container">
        <form className="reviews__filters" onSubmit={handleTopFilterSubmit}>
          <select
            value={catInView}
            className="reviews__filters__input reviews__filters__input--t"
            onChange={(e) => setCatInView(e.target.value)}
          >
            <option value="">category</option>
            <option value="all">all</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <button disabled={catInView === ""} className="reviews__filters__btn">
            filter
          </button>
        </form>
        <>{displayedReviews}</>
      </div>
    </section>
  );
};

export default Reviews;
