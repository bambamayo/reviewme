import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
import { editDialogShow, editDialogHide } from "../../redux/actions/dashboard";
import Modal from "../../shared/components/Modal/Modal";
import EditDialog from "../../user/components/EditDialog";

const ReviewDetails = () => {
  const [reviewInView, setReviewInView] = useState(null);
  const [reviewInViewError, setReviewInViewError] = useState(null);
  const [count, setCount] = useState(null);
  const [countError, setCountError] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();
  const appState = useSelector((state) => state);
  const { reviewInViewId } = appState.review;
  const { user } = appState.auth;
  const { showEditDialog } = appState.dashboard;

  let { name } = useParams();

  let createdThisReview = () => {
    if (user) {
      let created = user.postedReviews.includes(reviewInViewId);
      console.log(created);
      return created;
    }
  };

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
    const getReview = async () => {
      try {
        let response = await reviewService.getReviewById(reviewInViewId);
        setReviewInView(response.review);
      } catch (error) {
        setReviewInViewError(error.response.data.message);
      }
    };
    getReview();
  }, [reviewInViewId]);

  let modName = name.replace(/-/g, " ");

  let shownReview;

  if (reviewInViewError) {
    shownReview = (
      <div className="review-details__other">
        <h2>{reviewInViewError}</h2>
      </div>
    );
  } else if (reviewInView === null) {
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
            {createdThisReview() ? (
              <Button
                className="review-details__editbtn"
                onClick={() => dispatch(editDialogShow(reviewInView.id))}
              >
                edit
              </Button>
            ) : null}
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
          {/* <Button className="review-details__editbtn">edit</Button> */}
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
        {/* <aside className="review-details__others grid-width">
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
      </aside> */}
      </>
    );
  }

  return (
    <>
      <ScrollToTop />{" "}
      {
        <Modal
          modalCloseBtnClick={() => dispatch(editDialogHide())}
          cancelButton={showEditDialog}
          show={showEditDialog}
          className="dashboard__modal--edit"
          header="Edit review"
          headerClass="dashboard__modal__header--edit"
          contentClass="dashboard__modal__content--edit"
        >
          <EditDialog />
        </Modal>
      }
      <section className="review-details section--page">{shownReview}</section>
    </>
  );
};

export default ReviewDetails;
