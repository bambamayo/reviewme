import React from "react";
import { Link } from "react-router-dom";

import Card from "../../../shared/components/UI/Card/Card";
import Icon from "../../../shared/components/UI/Icon/Icon";
import Avatar from "../../../shared/components/UI/Avatar/Avatar";

const Review = (props) => {
  return (
    <Card cardClass="grid__card review__card">
      <aside className="review__aside">
        <Link to={`/reviews/${props.reviewedPlace}`}>
          <img
            src={props.image}
            alt={props.imageAlt}
            className="review__image"
          />
        </Link>
      </aside>
      <div className="review__details">
        <Link className="review__header" to={`/reviews/${props.reviewedPlace}`}>
          {props.header}
        </Link>
        <p className="review__user">
          <span className="review__user--intro">by : </span>
          <Avatar
            image={props.avatarImage}
            alttext={props.avatarAlt}
            avatarClass="review__user--avatar"
          />
          <span className="review__user--name">{props.userName}</span>
        </p>
        <p className="review__date">date posted : {props.date}</p>
        <p className="review__tagline">{props.tagline}</p>
        <span className="review__icon">
          <Icon
            type={["far", "heart"]}
            classname="review__icon--heart"
            iconClicked={props.iconClicked}
          />
        </span>
      </div>
    </Card>
  );
};

export default Review;
