import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Review from "../../reviews/components/Review/Review";
import reviewService from "../../services/review";
import Loader from "../../shared/components/UI/Loader/Loader";
import Message from "../../shared/components/Message/Message";
import Modal from "../../shared/components/Modal/Modal";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";
import LoaderReviews from "../../shared/loaders/LoaderReviews";
import NotificationScreen from "../../shared/components/NotificationScreen/NotificationScreen";
import { setDate } from "../../shared/utils/helpers";
import {
  editDialogShow,
  editDialogHide,
  deleteDialogShow,
  deleteDialogHide,
} from "../../redux/actions/dashboard";

const UserReviews = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [message, setMessage] = useState("");
  const [userReviews, setUserReviews] = useState(null);
  const userId = localStorage.getItem("userId");
  const appState = useSelector((state) => state);
  const {
    editing,
    showEditDialog,
    showDeleteDialog,
    currentReviewId,
  } = appState.dashboard;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await reviewService.getReviewsByUser(userId);
        setUserReviews(response.userReviews);
      } catch (error) {
        setFetchError(error.response.data.message);
      }
    };
    fetchReviews();
  }, [userId]);

  const handleEditUserReview = async (id, formValues) => {
    setLoading(true);
    try {
      const response = await reviewService.editReview(id, formValues);
      setUserReviews((state) =>
        state.map((r) => (r.id !== response.review.id ? r : response.review))
      );
      setLoading(false);
      setMessage("Review updated successfully");
      dispatch(editDialogHide());
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
      setMessage("Could not perform operation please try again");
      dispatch(editDialogHide());
    }
  };

  const handleDeleteUserReview = async (id) => {
    setLoading(true);
    try {
      await reviewService.deleteReview(id);
      setUserReviews((state) => state.filter((r) => r.id !== currentReviewId));
      setLoading(false);
      setMessage("Review deleted successfully");
      dispatch(deleteDialogHide());
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
      setMessage("Could not perform operation please try again");
      dispatch(deleteDialogHide());
    }
  };

  let shown;
  if (fetchError) {
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
              btnYesClick={() => handleDeleteUserReview(currentReviewId)}
            />
          )}
          {showEditDialog && (
            <EditDialog
              submitEditForm={handleEditUserReview}
              loading={loading}
            />
          )}
          {loading && showDeleteDialog && (
            <Loader loaderClass="dashboard__loader" />
          )}
        </Modal>
      }

      <section className="user-reviews">
        {message && (
          <Message
            msg={message}
            error={error ? true : false}
            iconClicked={() => setMessage("")}
          />
        )}
        {shown}
      </section>
    </>
  );
};

export default UserReviews;
