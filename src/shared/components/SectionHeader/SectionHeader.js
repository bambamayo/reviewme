import React from "react";

import "./SectionHeader.css";

const SectionHeader = (props) => (
  <h2 className="section-header">{props.children}</h2>
);

export default SectionHeader;
