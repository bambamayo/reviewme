import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import Card from "../../../shared/components/UI/Card/Card";
import Icon from "../../../shared/components/UI/Icon/Icon";
import Image from "cloudinary-react/lib/components/Image";
import Placeholder from "cloudinary-react/lib/components/Placeholder";
import placeholder from "../../../assets/images/default-placeholder.png";

const Review = (props) => {
  const history = useHistory();

  const handleReviewClick = (id) => {
    history.push(
      `/reviews/${props.reviewedPlace}/${props.id}`.replace(/ /g, "-")
    );
    window.scrollTo(0, 0);
  };
  return (
    <Card cardClass="grid__card review__card review__latest">
      <aside className="review__aside">
        <button
          className="review__aside__link"
          onClick={() => handleReviewClick(props.reviewId)}
        >
          {props.showMainImg ? (
            <Image
              id={props.id}
              publicId={props.publicId}
              dpr="auto"
              responsive
              width="auto"
              crop="scale"
              responsiveUseBreakpoints="true"
              loading="lazy"
              quality="auto"
              fetchFormat="auto"
              alt={props.imageAlt}
              className="review__image"
            >
              <Placeholder type="blur" />
            </Image>
          ) : (
            <img
              className="review__image"
              alt="placeholder for missing img"
              src={placeholder}
            />
          )}
        </button>
      </aside>
      <div className="review__details">
        <button
          className="review__header"
          onClick={() => handleReviewClick(props.reviewId)}
        >
          {props.header}
        </button>
        <div className="review__user">
          <span className="review__user--intro">by : </span>
          {props.avatarPresent ? (
            <Image
              publicId={props.avatarPId}
              dpr="auto"
              responsive
              width="auto"
              crop="scale"
              responsiveUseBreakpoints="true"
              loading="lazy"
              quality="auto"
              fetchFormat="auto"
              alt={props.username}
              className="review__user--avatar"
            >
              <Placeholder type="blur" />
            </Image>
          ) : (
            <span className="nav__link--avatar-empty">
              <Icon type={["far", "user-circle"]} />
            </span>
          )}
          <span className="review__user--name">{props.username}</span>
        </div>
        <p className="review__date">posted : {props.date}</p>
        <p className="review__tagline">{props.introText}</p>
      </div>
      <div
        className={`review__editbox ${
          props.showEditDiv ? `review__editbox__mod` : ""
        }`}
      >
        <button onClick={props.deleteBtnClick} className="review__editbox-btn">
          <Icon classname="review__editbox-icon" type={["far", "trash-alt"]} />
        </button>
        <button
          onClick={props.editBtnClick}
          className="review__editbox-btn"
          style={{ display: props.displayEditBtn }}
        >
          <Icon classname="review__editbox-icon" type={["far", "edit"]} />
        </button>
      </div>
    </Card>
  );
};

Review.propTypes = {
  reviewedPlace: PropTypes.string.isRequired,
  showMainImg: PropTypes.bool.isRequired,
  publicId: PropTypes.string,
  imageAlt: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  avatarPresent: PropTypes.bool.isRequired,
  avatarPId: PropTypes.string,
  username: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  introText: PropTypes.string.isRequired,
  iconClicked: PropTypes.func,
  displayEditBtn: PropTypes.string,
  deleteBtnClick: PropTypes.func,
  editBtnClick: PropTypes.func,
};

export default Review;
