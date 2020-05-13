import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Reviews from "./reviews/pages/Reviews";
import Home from "./home/pages/Home";
import Layout from "./shared/components/Layout/Layout";
import ReviewDetails from "./reviews/pages/ReviewDetails";

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/reviews" exact>
            <Reviews />
          </Route>
          <Route path="/reviews/:name" exact>
            <ReviewDetails />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
