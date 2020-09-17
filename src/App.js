import React, { useEffect, Suspense } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Reviews from "./reviews/pages/Reviews";
import Home from "./home/pages/Home";
import Layout from "./shared/components/Layout/Layout";
import PrivateRoute from "./PrivateRoute";
import browserHistory from "./history";
import setAuthToken from "./shared/utils/setAuthToken";
import { getReloadedUser } from "./redux/actions/auth";
import { getAllReviews } from "./redux/actions/reviews";
import SuspenseLoader from "./shared/components/UI/SuspenseLoader/SuspenseLoader";

const NewReview = React.lazy(() => import("./reviews/pages/NewReview"));
const ReviewDetails = React.lazy(() => import("./reviews/pages/ReviewDetails"));
const UserDashboard = React.lazy(() => import("./user/pages/UserDashboard"));
const Login = React.lazy(() => import("./auth/pages/Login"));
const Signup = React.lazy(() => import("./auth/pages/Signup"));

const App = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.getItem("token"));
  }
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getReloadedUser());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  return (
    <Router history={browserHistory}>
      <Layout>
        <Suspense fallback={<SuspenseLoader />}>
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
            <Route path="/reviews/:name/:reviewId" exact>
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
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;
