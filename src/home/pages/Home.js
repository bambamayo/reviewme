import React from "react";
import { useHistory } from "react-router-dom";

import Hero from "../components/Hero/Hero";
import LatestReviews from "../components/LatestReviews/LatestReviews";
import CategoriesList from "../components/CategoriesList/CategoriesList";
import NewCategoryReq from "../components/LatestReviews/NewCategoryReq/NewCategoryReq";

const Home = () => {
  const history = useHistory();

  const heroSearchHandler = (searchQuery) => {
    history.push(`/reviews?q=${searchQuery}`);
  };

  return (
    <>
      <Hero btnClicked={heroSearchHandler} />
      <LatestReviews />
      <CategoriesList />
      <NewCategoryReq />
    </>
  );
};

export default Home;
