import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Hero from "../components/Hero/Hero";
import LatestReviews from "../components/LatestReviews/LatestReviews";
import CategoriesList from "../components/CategoriesList/CategoriesList";
import NewCategoryForm from "../components/NewCategoryForm/NewCategoryForm";

const Home = () => {
  const [selected, setSelected] = useState(null);
  const history = useHistory();

  const handleInputChange = (e) => {
    setSelected(e.target.files[0]);
  };

  const heroSearchHandler = (searchQuery) => {
    searchQuery = searchQuery.replace(/ /g, "-");
    history.push(`/reviews?q=${searchQuery}`);
  };

  console.log(selected);

  return (
    <>
      <Hero btnClicked={heroSearchHandler} />
      <input type="file" onChange={handleInputChange} />
      <LatestReviews />
      <CategoriesList />
      <NewCategoryForm />
    </>
  );
};

export default Home;
