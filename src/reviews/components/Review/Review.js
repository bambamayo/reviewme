import React from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Card from "../../../shared/components/UI/Card/Card";
import Icon from "../../../shared/components/UI/Icon/Icon";
import Image from "cloudinary-react/lib/components/Image";
import Placeholder from "cloudinary-react/lib/components/Placeholder";
import { setReviewInView } from "../../../redux/actions/reviews";

const Review = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleReviewClick = (id) => {
    history.push(`/reviews/${props.reviewedPlace}`.replace(/ /g, "-"));
    dispatch(setReviewInView(id));
  };
  return (
    <Card cardClass="grid__card review__card">
      <aside className="review__aside">
        <button
          className="review__aside__link"
          onClick={() => handleReviewClick(props.reviewId)}
        >
          {props.showMainImg ? (
            <Image
              reviewId={props.reviewId}
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
            <span className="review__imagenull">
              <Icon type={["fas", "image"]} />
            </span>
          )}
        </button>
      </aside>
      <div className="review__details">
        <Link
          className="review__header"
          to={`/reviews/${props.reviewedPlace}`.replace(/ /g, "-")}
        >
          {props.header}
        </Link>
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
        <p className="review__date">date posted : {props.date}</p>
        <p className="review__tagline">{props.introText}</p>
        <span className="review__icon">
          <Icon
            type={["far", "heart"]}
            classname="review__icon--heart"
            iconClicked={props.iconClicked}
          />
        </span>
      </div>
      <div
        className={`review__editbox ${
          props.showEditDiv ? `review__editbox__mod` : null
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
