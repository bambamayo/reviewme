import React from "react";
import PropTypes from "prop-types";

const DeleteDialog = ({ btnYesClick, btnNoClick }) => {
  return (
    <>
      <button className="btn btn__md btn__md--r" onClick={btnYesClick}>
        yes
      </button>
      <button onClick={btnNoClick} className="btn btn__md btn__md--b">
        no
      </button>
    </>
  );
};

DeleteDialog.propTypes = {
  btnYesClick: PropTypes.func,
  btnNoClick: PropTypes.func,
};

export default DeleteDialog;
