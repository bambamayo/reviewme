import React from "react";
import { useParams } from "react-router-dom";

import UserProfile from "./UserProfile";
import UserReviews from "./UserReviews";
import UserList from "./UserList";
import UserLikes from "./UserLikes";

const DashboardMain = () => {
  const { linkId } = useParams();
  console.log(linkId);

  return (
    <section className="dashboard">
      <header className="dashboard__header">
        <button className="dashboard__editbtn">edit</button>
      </header>
      {linkId === "profile" && <UserProfile />}
      {linkId === "reviews" && <UserReviews />}
      {linkId === "list" && <UserList />}
      {linkId === "likes" && <UserLikes />}
    </section>
  );
};

export default DashboardMain;
