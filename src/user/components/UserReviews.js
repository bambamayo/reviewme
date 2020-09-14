import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Review from "../../reviews/components/Review/Review";
import Loader from "../../shared/components/UI/Loader/Loader";
import Message from "../../shared/components/Message/Message";
import Modal from "../../shared/components/Modal/Modal";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";
import LoaderReviews from "../../shared/loaders/LoaderReviews";
import NotificationScreen from "../../shared/components/NotificationScreen/NotificationScreen";
import { setDate } from "../../shared/utils/helpers";
import {
  setMsg,
  editDialogShow,
  editDialogHide,
  deleteDialogShow,
  deleteDialogHide,
  fetchUserReviews,
  handleDeleteUserReview,
} from "../../redux/actions/dashboard";

const UserReviews = () => {
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
    userReviews,
    getUserReviewsError,
  } = appState.dashboard;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserReviews(userId));
  }, [userId, dispatch]);

  let shown;
  if (getUserReviewsError) {
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
              btnYesClick={() =>
                dispatch(handleDeleteUserReview(currentReviewId))
              }
            />
          )}
          {showEditDialog && <EditDialog />}
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
            iconClicked={() => dispatch(setMsg(""))}
          />
        )}
        {shown}
      </section>
    </>
  );
};

export default UserReviews;
