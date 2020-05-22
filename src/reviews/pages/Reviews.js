import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import reviews from "../../reviews";
import PageHeader from "../../shared/components/PageHeader/PageHeader";
import Review from "../components/Review/Review";
import useImage from "../../assets/images/use-now.jpg";

const Reviews = () => {
  const [shownReviews, setShownReviews] = useState([]);
  const [catInView, setCatInView] = useState("");
  const [error, setError] = useState("");
  let query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    const handleReviewsToShow = () => {
      if (query.get("q")) {
        let filteredReviews = reviews.filter((review) =>
          review.reviewedName
            .toLowerCase()
            .includes(query.get("q").toLowerCase())
        );
        filteredReviews.length === 0
          ? setError(
              "cannot find reviews for searched term, be the first to write a review for it"
            )
          : setShownReviews(filteredReviews);
      } else if (query.get("cat")) {
        let filteredReviews = reviews.filter(
          (review) => review.category === query.get("cat")
        );
        filteredReviews.length === 0
          ? setError(
              "cannot find reviews for specific category, be the first to write a review for it"
            )
          : setShownReviews(filteredReviews);
      } else {
        setShownReviews(reviews);
      }
    };
    handleReviewsToShow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let show = null;

  if (shownReviews.length === 0) show = <h2>Loadingggg</h2>;

  if (shownReviews.length === 0 && error) {
    show = <h2>{error}</h2>;
  } else
    show = shownReviews.map((review) => (
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
    console.log(catInView);
    let reviewsList = [...reviews];
    if (catInView === "all") setShownReviews(reviewsList);
    else {
      let filteredReviews = reviewsList.filter(
        (review) => review.category === catInView
      );
      setShownReviews(filteredReviews);
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

  console.log(shownReviews);
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
        {/* <div className="reviews__filters--center">
          <input
            className="reviews__filters__input reviews__filters__input--b input-group__input"
            type="text"
            value={searchTerm}
            placeholder="search by name"
            onChange={handleSearhInputChange}
          />
        </div> */}
        <div className="grid">{show}</div>
      </div>
    </section>
  );
};

export default Reviews;

// if (query.get("q")) {
//   return (
//     <div>
//       <h2>i searched for {query.get("q")}</h2>
//     </div>
//   );
// }
// if (query.get("cat")) {
//   return (
//     <div>
//       <h2>i searched for {query.get("cat")}</h2>
//     </div>
//   );
// }
