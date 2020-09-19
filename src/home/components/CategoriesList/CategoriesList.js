import React from "react";
import { Link } from "react-router-dom";

import SectionHeader from "../../../shared/components/SectionHeader/SectionHeader";
import Card from "../../../shared/components/UI/Card/Card";
import bar from "../../../assets/images/bar.svg";
import club from "../../../assets/images/club.svg";
import hotel from "../../../assets/images/hotel.svg";
import restuarant from "../../../assets/images/restuarant.svg";
import book from "../../../assets/images/book.svg";
import school from "../../../assets/images/school.svg";
import game from "../../../assets/images/game.svg";
import gadget from "../../../assets/images/gadget.svg";

const CategoriesList = () => {
  const categoriesList = [
    {
      name: "restuarants",
      image: restuarant,
      id: 1,
    },
    {
      name: "bars",
      image: bar,
      id: 2,
    },
    {
      name: "hotels",
      image: hotel,
      id: 3,
    },
    {
      name: "clubs",
      image: club,
      id: 4,
    },
    {
      name: "schools",
      image: school,
      id: 5,
    },
    {
      name: "games",
      image: game,
      id: 6,
    },
    {
      name: "gadgets",
      image: gadget,
      id: 7,
    },
    {
      name: "books",
      image: book,
      id: 8,
    },
  ];
  return (
    <section className="section">
      <SectionHeader>Get reviews by category</SectionHeader>
      <div className="grid">
        {categoriesList.map((category) => (
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
