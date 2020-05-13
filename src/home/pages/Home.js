import React from "react";
import { useHistory } from "react-router-dom";

import Hero from "../components/Hero/Hero";
import LatestReviews from "../components/LatestReviews/LatestReviews";

const Home = () => {
  const history = useHistory();

  const heroSearchHandler = (searchQuery) => {
    history.push(`/reviews?searchterm=${searchQuery}`);
  };

  return (
    <>
      <Hero btnClicked={heroSearchHandler} />
      <LatestReviews />
    </>
  );
};

export default Home;
