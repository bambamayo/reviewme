import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Reviews from "./reviews/pages/Reviews";
import Home from "./home/pages/Home";
import ReviewDetails from "./reviews/pages/ReviewDetails";
import NewReview from "./reviews/pages/NewReview";
import Login from "./auth/pages/Login";
import Signup from "./auth/pages/Signup";
import Layout from "./shared/components/Layout/Layout";
import ScrollToTop from "./ScrollToTop";
import UserDashboard from "./user/pages/UserDashboard";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/write-a-review" exact>
            <NewReview />
          </Route>
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
          <Route path="/bambam/:linkId" exact>
            <UserDashboard />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
