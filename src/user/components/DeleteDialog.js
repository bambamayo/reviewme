import React from "react";

const DeleteDialog = (props) => {
  return (
    <>
      <button className="btn btn__md btn__md--r" onClick={props.btnYesClick}>
        yes
      </button>
      <button onClick={props.btnNoClick} className="btn btn__md btn__md--b">
        no
      </button>
    </>
  );
};

export default DeleteDialog;
