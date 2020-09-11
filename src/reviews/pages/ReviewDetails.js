import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Image from "cloudinary-react/lib/components/Image";
import Placeholder from "cloudinary-react/lib/components/Placeholder";
import { useSelector } from "react-redux";

import useImage from "../../assets/images/use-now.jpg";
import ScrollToTop from "../../ScrollToTop";
import Button from "../../shared/components/UI/Button/Button";
import reviewService from "../../services/review";
import LoaderShine from "../../shared/loaders/LoaderShine";
import Loader from "../../shared/components/UI/Loader/Loader";
import Icon from "../../shared/components/UI/Icon/Icon";
import { setDate } from "../../shared/utils/helpers";

const ReviewDetails = () => {
  const [count, setCount] = useState(null);
  const [countError, setCountError] = useState(null);
  const [review, setReview] = useState(null);
  const [error, setError] = useState(null);

  const history = useHistory();
  const appState = useSelector((state) => state);
  const { userId } = appState.auth;

  let { name, reviewId } = useParams();
  if (review) {
    console.log(review.author.id === userId);
  }

  useEffect(() => {
    const getReviewById = async () => {
      try {
        let response = await reviewService.getReviewById(reviewId);
        setReview(response.review);
      } catch (error) {
        setError(error.response.data.message);
      }
    };
    getReviewById();
  }, [reviewId]);

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

  let modName = name.replace(/-/g, " ");

  let shownReview;

  if (error) {
    shownReview = (
      <div className="review-details__other">
        <h2>{error}</h2>
      </div>
    );
  } else if (review === null) {
    shownReview = (
      <div className="review-details__other">
        <Loader loaderClass="reviews__loader" />
      </div>
    );
  } else {
    shownReview = (
      <>
        <div className="review-details__cont">
          <h2 className="review-details__header">{`${review.category} / ${modName}`}</h2>
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
        <div className="review-details__images-cont">
          {review.images.length === 0 ? (
            <div className="review-details__images-missing">
              <p>Author did not add any image</p>
            </div>
          ) : review.images.length === 0 && review.author.id === userId ? (
            <div className="review-details__images-missing">
              <input id="files-upload" type="file" accept="image/*" multiple />
              <label htmlFor="files-upload" title="upload images">
                <span>
                  <Icon type={["fas", "camera-retro"]} />
                </span>
              </label>
            </div>
          ) : (
            "workingggg"
          )}
        </div>
        <div className="review-details__cont">
          <Button
            className="review-details__writereview"
            onClick={() => history.push("/write-a-review")}
          >
            write your own review
          </Button>
        </div>
        <div className="review-details__main">
          <div className="review-details__main-l">
            <div className="review-details__main-imgcont">
              {review.author.avatarPublicId ? (
                <Image
                  publicId={review.author.avatarPublicId}
                  dpr="auto"
                  responsive
                  width="auto"
                  crop="scale"
                  responsiveUseBreakpoints="true"
                  loading="lazy"
                  quality="auto"
                  fetchFormat="auto"
                  className="review-details__main-authorimg"
                >
                  <Placeholder type="blur" />
                </Image>
              ) : (
                <span className="review-details__main-authormiss">
                  <Icon classname="" type={["far", "user-circle"]} />
                </span>
              )}
            </div>
            <div className="review-details__main-author">
              <p>{review.author.username}</p>
              <p>{review.author.postedReviews.length} reviews</p>
            </div>
          </div>

          <div className="review-details__main-r">
            <p className="review-details__main-details">
              {review.reviewDetails}
            </p>
            <p className="review-details__main-subdetails">
              <span>date posted</span>
              <span>{setDate(review.createdAt)}</span>
            </p>
            <p className="review-details__main-subdetails">
              <span>address</span>
              <span>{review.address ? review.address : "not available"}</span>
            </p>
            <p className="review-details__main-subdetails">
              <span>telephone</span>
              <span>
                {review.telephone ? review.telephone : "not available"}
              </span>
            </p>
            <p className="review-details__main-subdetails">
              <span>website</span>
              <span>{review.website ? review.website : "not available"}</span>
            </p>
          </div>
        </div>
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
