import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Reviews from "./reviews/pages/Reviews";
import Home from "./home/pages/Home";
import Layout from "./shared/components/Layout/Layout";

const App = () => {
  return (
    <Router>
      <Switch>
        <Layout>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/reviews">
            <Reviews />
          </Route>
        </Layout>
      </Switch>
    </Router>
  );
};

export default App;
