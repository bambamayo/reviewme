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

const UserReviews = ({
  editing,
  loading,
  message,
  show,
  handleCloseMessage,
  showEditDialog,
  showDeleteDialog,
  handleDeleteBtnClick,
  handleDeleting,
  handleStopDeleting,
  handleEditBtnClick,
  handleStopEditDialog,
}) => {
  const [userReviews, setUserReviews] = useState(null);
  const [error, setError] = useState(null);
  const { userId } = useSelector((state) => state.auth);
  // const dispatch = useDispatch()

  useEffect(() => {
    console.log("ENTERED useEffect");
    const getReviews = async () => {
      try {
        const response = await reviewService.getReviewsByUser(userId);
        console.log(response, "response");
        setUserReviews(response);
      } catch (error) {
        setError(error.response.data.message);
      }

      getReviews();
    };
  }, []);

  console.log(userReviews, "userReviews");
  console.log(error, "error");

  return (
    <>
      {
        <Modal
          modalCloseBtnClick={handleStopEditDialog}
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
              btnNoClick={handleStopDeleting}
              btnYesClick={() =>
                handleDeleting("review", "review deleted successfully")
              }
            />
          )}
          {!loading && showEditDialog && <EditDialog loading={loading} />}
          {loading && <Loader loaderClass="dashboard__loader" />}
        </Modal>
      }
      <section className="user-reviews">
        {message && show && (
          <Message
            msg={message}
            bgColor={error ? "red" : "green"}
            iconClicked={handleCloseMessage}
          />
        )}
        <div className="grid">
          hiii
          {/* {reviews.map((review) => (
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
              showEditDiv={editing ? true : false}
              deleteBtnClick={() => handleDeleteBtnClick(review.id)}
              editBtnClick={() => handleEditBtnClick(review.id)}
            />
          ))} */}
        </div>
      </section>
    </>
  );
};

export default UserReviews;
