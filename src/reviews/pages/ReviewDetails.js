import React from "react";
import { useParams } from "react-router-dom";

import useImage from "../../assets/images/use-now.jpg";
import reviews from "../../reviews";
import Review from "../components/Review/Review";
import Avatar from "../../shared/components/UI/Avatar/Avatar";

const ReviewDetails = () => {
  let { name } = useParams();
  name = name.replace(/-/g, " ");
  return (
    <section className="review-details section--page">
      <div className="review-details__cont">
        <h2 className="review-details__header">{`Category / ${name}`}</h2>
      </div>
      <div className="review-details__cont">
        <h3 className="review-details__amount">
          <span className="review-details__amount--pri">Number of reviews</span>
          <span className="review-details__amount--sec">3</span>
        </h3>
        <button className="review-details__button review-details__addtolistbtn">
          add to list
        </button>
      </div>
      <div className="review-details__images">
        <button className="review-details__btncont">
          <img
            src={useImage}
            alt="reviewedName"
            className="review-details__image"
          />
        </button>
        <button className="review-details__btncont">
          <img
            src={useImage}
            alt="reviewedName"
            className="review-details__image"
          />
        </button>
        <button className="review-details__btncont">
          <img
            src={useImage}
            alt="reviewedName"
            className="review-details__image"
          />
        </button>
        <button className="review-details__btncont">
          <img
            src={useImage}
            alt="reviewedName"
            className="review-details__image"
          />
        </button>
      </div>
      <div className="review-details__cont">
        <button className="review-details__writereview">
          write your own review
        </button>
        <button className="review-details__editbtn">edit</button>
      </div>
      <div className="review-details__info grid-width">
        <div className="review-details__info-l">
          <p className="review-details__info-l__text">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam
            illum ab ullam vitae corrupti ipsa reprehenderit, culpa non aut
            omnis sint rem veniam laboriosam commodi sed saepe tempore
            asperiores sit!. Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Labore esse modi maiores delectus porro quo error debitis?
            Ratione fugit dolores quia placeat, quos quibusdam eos sint?
            Suscipit numquam ab eveniet.
          </p>
        </div>
        <div className="review-details__info-r">
          <p className="review-details__user">
            <span className="review-details__span-l">posted by</span>
            <span className="review-details__span-r">
              <Avatar
                image={useImage}
                alttext="username"
                avatarClass="review-details__user-image"
              />
            </span>
          </p>
          <p className="review-details__date">
            <span className="review-details__span-l">Date added</span>
            <span className="review-details__span-r">20|10|2020</span>
          </p>
          <p className="review-details__website">
            <span className="review-details__span-l">website</span>
            <span className="review-details__span-r">http://website.com</span>
          </p>
          <p className="review-details__number">
            <span className="review-details__span-l">Telephone</span>
            <span className="review-details__span-r">09074456789</span>
          </p>
          <p className="review-details__location">
            <span className="review-details__span-l">address</span>
            <span className="review-details__span-r">24, yaba road</span>
          </p>
        </div>
      </div>
      <aside className="review-details__others grid-width">
        <h2 className="review-details__others__header">{`other reviews related to ${name}`}</h2>
        <div className="grid">
          {reviews.slice(0, 4).map((review) => (
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
          ))}
        </div>
      </aside>
    </section>
  );
};

export default ReviewDetails;
