import React from "react";
import { Link } from "react-router-dom";

import SectionHeader from "../../../shared/components/SectionHeader/SectionHeader";
import Card from "../../../shared/components/UI/Card/Card";
import categories from "../../../categories";

const CategoriesList = () => {
  return (
    <section className="section">
      <SectionHeader>Get reviews by category</SectionHeader>
      <div className="grid">
        {categories.map((category) => (
          <Card cardClass="grid__card category__card" key={category.id}>
            <div className="category__aside">
              <Link to={`/reviews?cat=${category.name}`}>
                <img
                  src={category.image}
                  alt={category.name}
                  className="category__image"
                />
              </Link>
            </div>
            <Link
              to={`/reviews?cat=${category.name}`}
              className="category__name"
            >
              {category.name}
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CategoriesList;
