import React from "react";
import { useHistory } from "react-router-dom";

import Hero from "../components/Hero/Hero";
import SectionHeader from "../../shared/components/SectionHeader/SectionHeader";

const Home = () => {
  const history = useHistory();

  const heroSearchHandler = (searchQuery) => {
    history.push(`/reviews?searchterm=${searchQuery}`);
  };

  return (
    <>
      <Hero btnClicked={heroSearchHandler} />
      <section className="section section--greybg">
        <SectionHeader>Latest reviews</SectionHeader>
        <p>reviews list goes here</p>
      </section>
    </>
  );
};

export default Home;
