import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Reviews from "./reviews/pages/Reviews";
import Home from "./home/pages/Home";
import Layout from "./shared/components/Layout/Layout";
import ReviewDetails from "./reviews/pages/ReviewDetails";
import NewReview from "./reviews/pages/NewReview";

const App = () => {
  return (
    <Router>
      <Switch>
        <Layout>
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
        </Layout>
      </Switch>
    </Router>
  );
};

export default App;
