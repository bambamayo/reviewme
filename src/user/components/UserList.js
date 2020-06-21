import React from "react";

import reviews from "../../reviews";
import useImage from "../../assets/images/use-now.jpg";
import Review from "../../reviews/components/Review/Review";
import Loader from "../../shared/components/UI/Loader/Loader";
import Message from "../../shared/components/Message/Message";
import Modal from "../../shared/components/Modal/Modal";

const UserList = ({
  editing,
  handleStopEditing,
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
    <React.Fragment>
      {
        <Modal
          show={showDialog}
          className="dashboard__modal--delete"
          header="are you sure you want to delete?"
          headerClass="dashboard__modal__header"
          contentClass="dashboard__modal__content-danger"
        >
          {!loading && (
            <>
              <button
                className="btn btn__md btn__md--r"
                onClick={() =>
                  handleDeleting("list", "review removed from your list")
                }
              >
                yes
              </button>
              <button
                onClick={handleStopDeleting}
                className="btn btn__md btn__md--b"
              >
                no
              </button>
            </>
          )}
          {loading && <Loader loaderClass="dashboard__loader" />}
        </Modal>
      }
      <section className="user-list">
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
    </React.Fragment>
  );
};

export default UserList;
