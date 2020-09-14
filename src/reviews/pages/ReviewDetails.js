import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Image from "cloudinary-react/lib/components/Image";
import Placeholder from "cloudinary-react/lib/components/Placeholder";

import ScrollToTop from "../../ScrollToTop";
import Button from "../../shared/components/UI/Button/Button";
import reviewService from "../../services/review";
import LoaderShine from "../../shared/loaders/LoaderShine";
import Loader from "../../shared/components/UI/Loader/Loader";
import Icon from "../../shared/components/UI/Icon/Icon";
import { setDate } from "../../shared/utils/helpers";

const ReviewDetails = () => {
  const [review, setReview] = useState(null);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(null);
  const [countError, setCountError] = useState(null);
  const [imgFiles, setImgFiles] = useState(null);
  const [addImageError, setAddImageError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  const history = useHistory();

  let { name, reviewId } = useParams();
  let modName = name.replace(/-/g, " ");
  let userId = localStorage.getItem("userId");

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
        let response = await reviewService.getReviewCount(modName);
        setCount(response.count);
      } catch (error) {
        setCountError("could not get count");
      }
    };
    getCount();
  }, [modName]);

  const handleSubmitImages = async () => {
    setLoading(true);
    console.log(imgFiles);
    const data = new FormData();
    for (var i = 0; i < imgFiles.length; i++) {
      data.append("images", imgFiles[i]);
    }
    try {
      const response = await reviewService.addReviewImages(review.id, data);
      setReview(response.review);
      setLoading(false);
      setImgFiles(null);

      setSuccessMsg(response.message);
      setTimeout(() => {
        setSuccessMsg(null);
      }, 3000);
    } catch (error) {
      setAddImageError(error.response.data.message);
      setLoading(false);
      setTimeout(() => {
        setAddImageError(null);
      }, 3000);
    }
  };

  const handleClearImages = () => {
    setImgFiles(null);
  };

  let shownReview;
  //conditional statements for shown review
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
        {review.author.id === userId && (
          <div className="review-details__addnewimg">
            <label
              htmlFor="files-upload"
              className="review-details__addnewimg-label"
              title="upload images"
            >
              <button className="review-details__addnewimg-labelbtn">
                add images
              </button>
            </label>
            <input
              id="files-upload"
              onChange={(e) => setImgFiles(e.target.files)}
              type="file"
              accept="image/*"
              multiple
              className="review-details__addnewimg-input"
            />
            {imgFiles && (
              <>
                <button
                  onClick={handleSubmitImages}
                  className="review-details__addnewimg-submit"
                >
                  submit selection
                  {loading && <Loader loaderClass="loader__small" />}
                </button>
                <button
                  onClick={handleClearImages}
                  className="review-details__addnewimg-clear"
                >
                  clear selection
                </button>
              </>
            )}
            {addImageError && (
              <p className="review-details__addnewimg-error">{addImageError}</p>
            )}
            {successMsg && (
              <p className="review-details__addnewimg-success">{successMsg}</p>
            )}
          </div>
        )}

        <div className="review-details-images-cont">
          {review && review.images.length === 0 ? (
            <div className="review-details__images-missing">
              <p>Author did not add image(s)</p>
            </div>
          ) : (
            <div className="review-details__images">
              {review.images.slice(0, 4).map((image) => (
                <button key={image} className="review-details__image-c">
                  <Image
                    publicId={image}
                    dpr="auto"
                    responsive
                    width="auto"
                    crop="scale"
                    responsiveUseBreakpoints="true"
                    loading="lazy"
                    quality="auto"
                    fetchFormat="auto"
                    className="review-details__image"
                  >
                    <Placeholder type="blur" />
                  </Image>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="review-details__cont">
          <Button
            className="review-details__writereview"
            onClick={() => history.push("/write-a-review")}
          >
            write review
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
