import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import UserProfile from "../components/UserProfile";
import UserReviews from "../components/UserReviews";
import {
  stopEditing,
  startEditing,
  setMessage,
} from "../../redux/actions/dashboard";
import Button from "../../shared/components/UI/Button/Button";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state);
  const { editing, message } = appState.dashboard;
  const { user } = appState.auth;
  const history = useHistory();
  const { linkId } = useParams();

  const changeProfileView = (urlId) => {
    if (message) dispatch(setMessage(""));
    history.push(`/${user.username}/${urlId}`);
  };

  return (
    <section className="dashboard">
      <nav className="dashboard__nav">
        <ul className="dashboard__nav-list">
          <li className="dashboard__nav-item">
            <Button
              className={
                linkId === "profile"
                  ? "dashboard__nav-btn dashboard__nav-btn--active"
                  : "dashboard__nav-btn"
              }
              onClick={() => changeProfileView("profile")}
            >
              profile
            </Button>
          </li>
          <li className="dashboard__nav-item">
            <Button
              className={
                linkId === "reviews"
                  ? "dashboard__nav-btn dashboard__nav-btn--active"
                  : "dashboard__nav-btn"
              }
              onClick={() => changeProfileView("reviews")}
            >
              reviews
            </Button>
          </li>
        </ul>
      </nav>
      <section className="dashboard__main grid-width">
        <div className="dashboard__edit-cont">
          {!editing ? (
            <Button
              className="dashboard__editbtn"
              onClick={() => dispatch(startEditing())}
            >
              <span>edit</span>
            </Button>
          ) : (
            <Button
              className="dashboard__editbtn"
              onClick={() => dispatch(stopEditing())}
              type="reset"
            >
              <span>cancel</span>
            </Button>
          )}
        </div>

        {linkId === "profile" && <UserProfile />}
        {linkId === "reviews" && <UserReviews />}
      </section>
    </section>
  );
};

export default UserDashboard;
