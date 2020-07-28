import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getTokenFromLS } from "./shared/utils/helpers";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, ...rest }) => {
  const tokenLS = getTokenFromLS();
  const { token } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={() => (token || tokenLS ? children : <Redirect to="/" />)}
    />
  );
};

export default PrivateRoute;
