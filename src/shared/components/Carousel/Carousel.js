import React from "react";
import PropTypes from "prop-types";

import Modal from "../Modal/Modal";

const Carousel = ({
  closeModal,
  children,
  arrowLeftClicked,
  arrowRightClicked,
  show,
  index,
  imagesLength,
}) => {
  return (
    <Modal
      modalCloseBtnClick={closeModal}
      show={show}
      cancelButton={true}
      className="carousel__modal"
      headerClass="carousel__header"
      contentClass="carousel__content"
      cancelBtnClass="carousel__close-btn"
    >
      <button
        aria-label="go to previous image icon in images modal"
        className="carousel__btn-left"
        onClick={arrowLeftClicked}
        style={index < 1 ? { display: "none" } : null}
      >
        &#10094;
      </button>
      <button
        aria-label="go to next image icon in images modal"
        className="carousel__btn-right"
        onClick={arrowRightClicked}
        style={index === imagesLength ? { display: "none" } : null}
      >
        &#10095;
      </button>
      {children}
    </Modal>
  );
};

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
  arrowLeftClicked: PropTypes.func,
  arrowRightClicked: PropTypes.func,
  closeModal: PropTypes.func,
  show: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  imagesLength: PropTypes.number.isRequired,
};

export default Carousel;
