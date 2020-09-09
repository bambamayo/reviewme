import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Image from "cloudinary-react/lib/components/Image";
import Placeholder from "cloudinary-react/lib/components/Placeholder";
import { useSelector } from "react-redux";

import useImage from "../../assets/images/use-now.jpg";
import ScrollToTop from "../../ScrollToTop";
import Review from "../components/Review/Review";
import Button from "../../shared/components/UI/Button/Button";
import reviewService from "../../services/review";
import LoaderShine from "../../shared/loaders/LoaderShine";
import Loader from "../../shared/components/UI/Loader/Loader";
import Icon from "../../shared/components/UI/Icon/Icon";
import { setDate } from "../../shared/utils/helpers";

const ReviewDetails = () => {
  const [reviewInView, setReviewInView] = useState(null);
  const [reviewInViewError, setReviewInViewError] = useState(null);
  const [count, setCount] = useState(null);
  const [countError, setCountError] = useState(null);
  const [reviewsByName, setReviewsByName] = useState(null);

  const history = useHistory();
  const appState = useSelector((state) => state);
  const { reviewInViewId } = appState.review;

  let { name } = useParams();

  useEffect(() => {
    const getByName = async () => {
      try {
        let response = await reviewService.getReviewsByName(name);
        console.log(response.reviews);
        setReviewsByName(response.reviews);
      } catch (error) {
        setReviewInViewError(error.response.data.message);
      }
    };
    getByName();
  }, [name]);

  useEffect(() => {
    const getCount = async () => {
      try {
        let response = await reviewService.getReviewCount(name);
        setCount(response.count);
      } catch (error) {
        setCountError("could not get count");
      }
    };
    getCount();
  }, [name]);

  useEffect(() => {
    if (reviewInViewId) {
      const getReview = async () => {
        try {
          let response = await reviewService.getReviewById(reviewInViewId);
          setReviewInView(response.review);
        } catch (error) {
          setReviewInViewError(error.response.data.message);
        }
      };
      getReview();
    } else {
      if (reviewsByName) {
        setReviewInView(reviewsByName[0]);
      }
    }
  }, [reviewsByName, reviewInViewId]);

  let modName = name.replace(/-/g, " ");

  let shownReview;

  if (reviewInViewError) {
    if (reviewsByName === null) {
      shownReview = (
        <div className="review-details__other">
          <Loader loaderClass="reviews__loader" />
        </div>
      );
    } else {
      shownReview = (
        <div className="review-details__other">
          <h2>{reviewInViewError}</h2>
        </div>
      );
    }
  } else if (reviewInView === null || reviewsByName === null) {
    shownReview = (
      <div className="review-details__other">
        <Loader loaderClass="reviews__loader" />
      </div>
    );
  } else {
    shownReview = (
      <>
        <div className="review-details__cont">
          <h2 className="review-details__header">{`${reviewInView.category} / ${modName}`}</h2>
        </div>
        <div className="review-details__cont">
          <h3 className="review-details__amount">
            <span className="review-details__amount--pri">
              Number of reviews
            </span>
            <span className="review-details__amount--sec">
              {countError ? (
                countError
              ) : count === null ? (
                <LoaderShine loaderClass="l-number" />
              ) : (
                count
              )}
            </span>
          </h3>
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
          <Button
            className="review-details__writereview"
            onClick={() => history.push("/write-a-review")}
          >
            write your own review
          </Button>
        </div>
        <div className="review-details__info grid-width">
          <div className="review-details__info-l">
            <p className="review-details__info-l__text">
              {reviewInView.reviewDetails}
            </p>
          </div>
          <div className="review-details__info-r">
            <div className="review-details__user">
              <span className="review-details__span-l">posted by</span>
              <span className="review-details__span-r">
                {reviewInView.author.avatarPublicId ? (
                  <Image
                    publicId={reviewInView.author.avatarPublicId}
                    dpr="auto"
                    responsive
                    width="auto"
                    crop="scale"
                    responsiveUseBreakpoints="true"
                    loading="lazy"
                    quality="auto"
                    fetchFormat="auto"
                    alt={reviewInView.author.username}
                    className="review-details__user-image"
                  >
                    <Placeholder type="blur" />
                  </Image>
                ) : (
                  <span className="nav__link--avatar-empty">
                    <Icon type={["far", "user-circle"]} />
                  </span>
                )}
              </span>
            </div>
            <p className="review-details__date">
              <span className="review-details__span-l">Date added</span>
              <span className="review-details__span-r">
                {setDate(reviewInView.createdAt)}
              </span>
            </p>
            <p className="review-details__website">
              <span className="review-details__span-l">website</span>
              <span className="review-details__span-r">
                {reviewInView.website ? reviewInView.website : "not available"}
              </span>
            </p>
            <p className="review-details__number">
              <span className="review-details__span-l">Telephone</span>
              <span className="review-details__span-r">
                {reviewInView.telephone
                  ? reviewInView.telephone
                  : "not available"}
              </span>
            </p>
            <p className="review-details__location">
              <span className="review-details__span-l">address</span>
              <span className="review-details__span-r">
                {reviewInView.address ? reviewInView.address : "not available"}
              </span>
            </p>
          </div>
        </div>
        {reviewsByName === null ? (
          <aside className="review-details__others grid-width">
            <h2 className="review-details__others__header">{`other reviews like ${name}`}</h2>
            <h3 className="review-details__others__subheader">
              Could not load related reviews
            </h3>
          </aside>
        ) : reviewsByName.length === 1 ? (
          <aside className="review-details__others grid-width">
            <h2 className="review-details__others__header">{`other reviews like ${name}`}</h2>
            <h3 className="review-details__others__subheader">{`${name} has only one review, maybe add yours?`}</h3>
          </aside>
        ) : (
          <aside className="review-details__others grid-width">
            <h2 className="review-details__others__header">{`other reviews like ${name}`}</h2>
            <div className="grid">
              {reviewsByName.slice(1, 5).map((review) => (
                <Review
                  reviewId={review.id}
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
          </aside>
        )}
      </>
    );
  }

  return (
    <>
      <ScrollToTop />
      <section className="review-details section--page">{shownReview}</section>
    </>
  );
};

export default ReviewDetails;
