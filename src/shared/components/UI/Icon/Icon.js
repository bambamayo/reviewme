import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = ({ classname, type, iconClicked }) => (
  <FontAwesomeIcon className={classname} icon={type} onClick={iconClicked} />
);

Icon.propTypes = {
  classname: PropTypes.string,
  type: PropTypes.array.isRequired,
  iconCliked: PropTypes.func,
};

export default Icon;
