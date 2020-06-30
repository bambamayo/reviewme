import React, { useState, useEffect } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";

import UserProfile from "../components/UserProfile";
import UserReviews from "../components/UserReviews";
import UserList from "../components/UserList";
import UserLikes from "../components/UserLikes";
//import Icon from "../../shared/components/UI/Icon/Icon";

const UserDashboard = () => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [currentReviewId, setReviewCurrentId] = useState(null);

  const { linkId } = useParams();
  const location = useLocation();

  useEffect(() => {
    return () => handleStopEditing();
  }, [location.pathname]);

  const handleDeleteBtnClick = (reviewId) => {
    setShowDeleteDialog(true);
    setReviewCurrentId(reviewId);
  };

  const handleEditBtnClick = (reviewId) => {
    setShowEditDialog(true);
    setReviewCurrentId(reviewId);
  };

  const handleStartEditing = () => {
    setEditing(true);
  };

  const handleStopEditing = () => {
    setEditing(false);
  };

  const handleMessage = (str, bool) => {
    setMessage(str);
    setError(bool);
    setShow(true);
  };

  const handleCloseMessage = () => {
    setShow(false);
  };

  const handleDeleting = (page, message, reviewId) => {
    setLoading(true);
    setTimeout(() => {
      console.log(page);
      reviewId = currentReviewId;
      console.log(reviewId);
      setLoading(false);
      setShowDeleteDialog(false);

      handleMessage(message, false);
    }, 2000);
  };

  const handleStopDeleting = () => {
    setShowDeleteDialog(false);
  };

  const handleStopEditDialog = () => {
    setShowEditDialog(false);
  };

  return (
    <section className="dashboard">
      <nav className="dashboard__nav">
        <ul className="dashboard__nav-list">
          <li className="dashboard__nav-item">
            <NavLink
              exact
              className="dashboard__nav-link"
              activeClassName="dashboard__nav-link--active"
              to="/bambam/profile"
            >
              profile
            </NavLink>
          </li>
          <li className="dashboard__nav-item">
            <NavLink
              exact
              className="dashboard__nav-link"
              activeClassName="dashboard__nav-link--active"
              to="/bambam/reviews"
            >
              reviews
            </NavLink>
          </li>
          <li className="dashboard__nav-item">
            <NavLink
              exact
              className="dashboard__nav-link"
              activeClassName="dashboard__nav-link--active"
              to="/bambam/list"
            >
              list
            </NavLink>
          </li>
          <li className="dashboard__nav-item">
            <NavLink
              exact
              className="dashboard__nav-link"
              activeClassName="dashboard__nav-link--active"
              to="/bambam/likes"
            >
              likes
            </NavLink>
          </li>
        </ul>
      </nav>
      <section className="dashboard__main grid-width">
        <div className="dashboard__edit-cont">
          {!editing ? (
            <button className="dashboard__editbtn" onClick={handleStartEditing}>
              <span>edit</span>
            </button>
          ) : (
            <button
              className="dashboard__editbtn"
              onClick={handleStopEditing}
              type="reset"
            >
              <span>cancel</span>
            </button>
          )}
        </div>

        {linkId === "profile" && (
          <UserProfile
            editing={editing}
            handleStopEditing={handleStopEditing}
            loading={loading}
            message={message}
            handleMessage={handleMessage}
            error={error}
            show={show}
            handleCloseMessage={handleCloseMessage}
          />
        )}
        {linkId === "reviews" && (
          <UserReviews
            editing={editing}
            handleStopEditing={handleStopEditing}
            loading={loading}
            message={message}
            error={error}
            show={show}
            handleCloseMessage={handleCloseMessage}
            handleDeleteBtnClick={handleDeleteBtnClick}
            showDeleteDialog={showDeleteDialog}
            showEditDialog={showEditDialog}
            handleDeleting={handleDeleting}
            handleStopDeleting={handleStopDeleting}
            handleEditBtnClick={handleEditBtnClick}
            handleStopEditDialog={handleStopEditDialog}
          />
        )}
        {linkId === "list" && (
          <UserList
            editing={editing}
            handleStopEditing={handleStopEditing}
            loading={loading}
            message={message}
            error={error}
            show={show}
            handleCloseMessage={handleCloseMessage}
            handleDeleteBtnClick={handleDeleteBtnClick}
            showDialog={showDeleteDialog}
            handleDeleting={handleDeleting}
            handleStopDeleting={handleStopDeleting}
          />
        )}
        {linkId === "likes" && (
          <UserLikes
            editing={editing}
            handleStopEditing={handleStopEditing}
            loading={loading}
            message={message}
            error={error}
            show={show}
            handleCloseMessage={handleCloseMessage}
            handleDeleteBtnClick={handleDeleteBtnClick}
            showDialog={showDeleteDialog}
            handleDeleting={handleDeleting}
            handleStopDeleting={handleStopDeleting}
          />
        )}
      </section>
    </section>
  );
};

export default UserDashboard;
