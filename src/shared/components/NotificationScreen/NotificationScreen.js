import React from "react";
import PropTypes from "prop-types";

const NotificationScreen = ({ children, error, errorMsg }) => {
  return (
    <div className="notif-cont">
      {error ? <p>{errorMsg}</p> : <p>{children}</p>}
    </div>
  );
};

NotificationScreen.propTypes = {
  children: PropTypes.node,
  error: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string,
};

export default NotificationScreen;
