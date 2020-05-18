import React from "react";
import { Link } from "react-router-dom";

import Card from "../../../shared/components/UI/Card/Card";
import Icon from "../../../shared/components/UI/Icon/Icon";
import Avatar from "../../../shared/components/UI/Avatar/Avatar";

const Review = (props) => {
  return (
    <Card cardClass="grid__card reviewed__card">
      <div className="reviewed__img-cont">
        <Link to={`/reviews/${props.reviewedPlace}`}>
          <img
            src={props.image}
            alt={props.imageAlt}
            className="reviewed__img-img"
          />
        </Link>
      </div>
      <div className="reviewed__details">
        <Link
          className="reviewed__details-header"
          to={`/reviews/${props.reviewedPlace}`}
        >
          {props.header}
        </Link>
        <p className="reviewed__details-user">
          <span className="reviewed__details-user-text">by : </span>
          <Avatar
            image={props.avatarImage}
            alttext={props.avatarAlt}
            avatarClass="reviewed__details-user-avatar"
          />
          <span className="reviewed__details-user-name">{props.userName}</span>
        </p>
        <p className="reviewed__details-user-date">
          date posted : {props.date}
        </p>
        <p className="reviewed__details-tagline">{props.tagline}</p>
        <span className="reviewed__details-icon-cont">
          <Icon
            type={["far", "heart"]}
            classname="reviewed__details-user-icon"
            iconClicked={props.iconClicked}
          />
        </span>
      </div>
    </Card>
  );
};

export default Review;
