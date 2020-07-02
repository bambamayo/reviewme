import React from "react";

import reviews from "../../reviews";
import useImage from "../../assets/images/use-now.jpg";
import Review from "../../reviews/components/Review/Review";
import Loader from "../../shared/components/UI/Loader/Loader";
import Message from "../../shared/components/Message/Message";
import Modal from "../../shared/components/Modal/Modal";
import DeleteDialog from "./DeleteDialog";

const UserLikes = ({
  editing,
  loading,
  message,
  error,
  handleCloseMessage,
  show,
  showDialog,
  handleDeleteBtnClick,
  handleDeleting,
  handleStopDeleting,
}) => {
  return (
    <>
      {
        <Modal
          show={showDialog}
          className="dashboard__modal--delete"
          header="are you sure you want to delete?"
          headerClass="dashboard__modal__header"
          contentClass="dashboard__modal__content--danger"
        >
          {!loading && (
            <DeleteDialog
              btnNoClick={handleStopDeleting}
              btnYesClick={() =>
                handleDeleting("review", "review deleted successfully")
              }
            />
          )}
          {loading && <Loader loaderClass="dashboard__loader" />}
        </Modal>
      }
      <section className="user-likes">
        {message && show && (
          <Message
            msg={message}
            bgColor={error ? "red" : "green"}
            iconClicked={handleCloseMessage}
          />
        )}
        <div className="grid">
          {reviews.map((review) => (
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
              displayEditBtn="none"
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default UserLikes;
