import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";

import reviews from "../../reviews";
import PageHeader from "../../shared/components/PageHeader/PageHeader";
import Review from "../components/Review/Review";
import useImage from "../../assets/images/use-now.jpg";
import Loader from "../../shared/components/UI/Loader/Loader";

const Reviews = () => {
  const [shownReviews, setShownReviews] = useState([]);
  const [catInView, setCatInView] = useState("");
  const [error, setError] = useState("");
  let query = new URLSearchParams(useLocation().search);
  let history = useHistory();

  useEffect(() => {
    const handleReviewsToShow = () => {
      if (query.get("q")) {
        let filteredReviews = reviews.filter((review) =>
          review.reviewedName
            .toLowerCase()
            .includes(query.get("q").replace(/-/g, " ").toLowerCase())
        );
        setShownReviews(filteredReviews);
        filteredReviews.length === 0
          ? setError(
              "cannot find reviews for searched term, be the first to write a review for it"
            )
          : setError("");
      } else if (query.get("cat")) {
        if (query.get("cat") === "all") setShownReviews(reviews);
        else {
          let filteredReviews = reviews.filter(
            (review) => review.category === query.get("cat")
          );
          setShownReviews(filteredReviews);

          filteredReviews.length === 0
            ? setError(
                "cannot find reviews for specified category, be the first to write a review for it"
              )
            : setError("");
        }
      } else {
        setShownReviews(reviews);
      }
    };
    handleReviewsToShow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let displayedReviews;

  if (error) {
    displayedReviews = (
      <div className="reviews__others-cont">
        <h2 className="reviews__error-msg">{error}</h2>
        <Link className="reviews__error-link" to="/write-a-review">
          Write a review
        </Link>
      </div>
    );
  } else if (shownReviews === null) {
    displayedReviews = (
      <div className="reviews__others-cont">
        <Loader loaderClass="reviews__loader" />
      </div>
    );
  } else
    displayedReviews = shownReviews.map((review) => (
      <Review
        key={review.id}
        image={useImage}
        imageAlt={review.reviewedName}
        reviewedPlace={review.reviewedName}
        header={review.reviewedName}
        avatarImage={useImage}
        avatarAlt={review.user.userName}
        userName={review.user.userName}
        tagline={review.introText}
        date={review.date}
        iconClicked={() => console.log("icon clicked")}
      />
    ));

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
        ? setError(
            "cannot find reviews for selected category, be the first to write a review for it"
          )
        : setError("");
    }
  };

  const categoriesList = [
    {
      name: "restuarants",
      id: 1,
    },
    {
      name: "bars",
      id: 2,
    },
    {
      name: "hotels",
      id: 3,
    },
    {
      name: "clubs",
      id: 4,
    },
    {
      name: "schools",

      id: 5,
    },
    {
      name: "games",

      id: 6,
    },
    {
      name: "gadgets",

      id: 7,
    },
    {
      name: "books",

      id: 8,
    },
  ];

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
            {categoriesList.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <button disabled={catInView === ""} className="reviews__filters__btn">
            filter
          </button>
        </form>
        <div className="grid">{displayedReviews}</div>
      </div>
    </section>
  );
};

export default Reviews;
