import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={() => (isLoggedIn ? children : <Redirect to="/" />)}
    />
  );
};

export default PrivateRoute;
