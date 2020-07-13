import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import UserProfile from "../components/UserProfile";
import UserReviews from "../components/UserReviews";
import UserLikes from "../components/UserLikes";
import { stopEditing, startEditing } from "../../redux/actions/dashboard";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { editing } = useSelector((state) => state.dashboard);

  const { linkId } = useParams();

  // const handleDeleting = (page, message, reviewId) => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     console.log(page);
  //     reviewId = currentReviewId;
  //     console.log(reviewId);
  //     setLoading(false);
  //     setShowDeleteDialog(false);

  //     handleMessage(message, false);
  //   }, 2000);
  // };

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
            <button
              className="dashboard__editbtn"
              onClick={() => dispatch(startEditing())}
            >
              <span>edit</span>
            </button>
          ) : (
            <button
              className="dashboard__editbtn"
              onClick={() => dispatch(stopEditing())}
              type="reset"
            >
              <span>cancel</span>
            </button>
          )}
        </div>

        {linkId === "profile" && <UserProfile />}
        {linkId === "reviews" && <UserReviews />}
        {linkId === "likes" && <UserLikes />}
      </section>
    </section>
  );
};

export default UserDashboard;
