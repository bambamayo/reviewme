import React, { useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Reviews from "./reviews/pages/Reviews";
import Home from "./home/pages/Home";
import ReviewDetails from "./reviews/pages/ReviewDetails";
import NewReview from "./reviews/pages/NewReview";
import Login from "./auth/pages/Login";
import Signup from "./auth/pages/Signup";
import Layout from "./shared/components/Layout/Layout";
import ScrollToTop from "./ScrollToTop";
import UserDashboard from "./user/pages/UserDashboard";
import PrivateRoute from "./PrivateRoute";
import browserHistory from "./history";
import setAuthToken from "./shared/utils/setAuthToken";
import { getReloadedUser } from "./redux/actions/auth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getReloadedUser());
    }
  }, [dispatch]);

  return (
    <Router history={browserHistory}>
      <ScrollToTop />
      <Layout>
        <ScrollToTop />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <PrivateRoute path="/write-a-review" exact>
            <NewReview />
          </PrivateRoute>
          <Route path="/reviews" exact>
            <Reviews />
          </Route>
          <Route path="/reviews/:name" exact>
            <ReviewDetails />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <PrivateRoute path="/:username/:linkId" exact>
            <UserDashboard />
          </PrivateRoute>
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
