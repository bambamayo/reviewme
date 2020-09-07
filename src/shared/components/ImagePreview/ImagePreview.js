import React from "react";
import PropTypes from "prop-types";

import Modal from "../Modal/Modal";

const ImagePreview = ({
  closeModal,
  show,
  imageSrc,
  cancelClicked,
  saveClicked,
}) => {
  return (
    <Modal
      modalCloseBtnClick={closeModal}
      show={show}
      className="image-preview__modal"
      headerClass="image__preview__modal-header"
    >
      <div className="image-preview__cont">
        <div className="image-preview__imgcont">
          <img
            src={imageSrc}
            alt="profile to be uploaded"
            className="image-preview__img"
          />
        </div>
        <div className="image-preview__calltoaction">
          <button onClick={cancelClicked} className="btn btn__md btn__md--r">
            Cancel
          </button>
          <button onClick={saveClicked} className="btn btn__md btn__md--g">
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

ImagePreview.propTypes = {
  closeModal: PropTypes.func.isRequired,
  show: PropTypes.bool,
  imageSrc: PropTypes.string,
  cancelClicked: PropTypes.func.isRequired,
  saveClicked: PropTypes.func.isRequired,
};

export default ImagePreview;
