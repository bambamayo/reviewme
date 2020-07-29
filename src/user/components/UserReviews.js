import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import useImage from "../../assets/images/use-now.jpg";
import Review from "../../reviews/components/Review/Review";
import Loader from "../../shared/components/UI/Loader/Loader";
import Message from "../../shared/components/Message/Message";
import Modal from "../../shared/components/Modal/Modal";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";
import reviewService from "../../services/review";
import LoaderReviews from "../../shared/loaders/LoaderReviews";
import NotificationScreen from "../../shared/components/NotificationScreen/NotificationScreen";
import { Link } from "react-router-dom";
import { setDate } from "../../shared/utils/helpers";
import {
  editProfile,
  setMessage,
  editDialogShow,
  editDialogHide,
  deleteDialogShow,
  deleteDialogHide,
  deleteUserReview,
} from "../../redux/actions/dashboard";

const UserReviews = () => {
  const [userReviews, setUserReviews] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const userId = localStorage.getItem("userId");
  const appState = useSelector((state) => state);
  const {
    editing,
    loading,
    message,
    error,
    showEditDialog,
    showDeleteDialog,
    currentReviewId,
  } = appState.dashboard;
  const dispatch = useDispatch();

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await reviewService.getReviewsByUser(userId);
        setUserReviews(response.userReviews);
      } catch (error) {
        setLoadError(error.response.data.message);
      }
    };
    getReviews();
  }, [userId]);

  let shown;
  if (loadError) {
    shown = (
      <NotificationScreen
        error={true}
        errorMsg="Could not load your reviews, please try again"
      ></NotificationScreen>
    );
  } else if (userReviews === null) {
    shown = <LoaderReviews />;
  } else if (userReviews) {
    if (userReviews.length === 0) {
      shown = (
        <NotificationScreen error={false}>
          <span>
            You've not posted any review, go to{" "}
            <Link to="/write-a-review">new review</Link> to post a review
          </span>
        </NotificationScreen>
      );
    } else {
      shown = (
        <div className="grid">
          {userReviews.map((review) => (
            <Review
              key={review.id}
              image={useImage}
              imageAlt={review.reviewedName}
              reviewedPlace={review.reviewedName}
              header={review.reviewedName}
              avatarImage={useImage}
              avatarAlt="author"
              userName="author"
              tagline={review.introText}
              date={setDate(review.createdAt)}
              showEditDiv={editing ? true : false}
              deleteBtnClick={() => dispatch(deleteDialogShow(review.id))}
              editBtnClick={() => dispatch(editDialogShow(review.id))}
            />
          ))}
        </div>
      );
    }
  }

  return (
    <>
      {
        <Modal
          modalCloseBtnClick={() => dispatch(editDialogHide())}
          cancelButton={showEditDialog}
          show={showDeleteDialog || showEditDialog}
          className={
            showDeleteDialog
              ? "dashboard__modal--delete"
              : "dashboard__modal--edit"
          }
          header={
            showDeleteDialog
              ? "Are you sure you want to delete?"
              : "Edit review"
          }
          headerClass={
            showDeleteDialog
              ? "dashboard__modal__header"
              : "dashboard__modal__header--edit"
          }
          contentClass={
            showDeleteDialog
              ? "dashboard__modal__content--danger"
              : "dashboard__modal__content--edit"
          }
        >
          {!loading && showDeleteDialog && (
            <DeleteDialog
              btnNoClick={() => dispatch(deleteDialogHide())}
              btnYesClick={() => dispatch(deleteUserReview(currentReviewId))}
            />
          )}
          {!loading && showEditDialog && <EditDialog loading={loading} />}
          {loading && <Loader loaderClass="dashboard__loader" />}
        </Modal>
      }
      <section className="user-reviews">
        {message && (
          <Message
            msg={message}
            bgColor={error ? "red" : "green"}
            iconClicked={() => dispatch(setMessage(""))}
          />
        )}
        {shown}
      </section>
    </>
  );
};

export default UserReviews;
