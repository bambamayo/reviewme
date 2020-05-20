import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import PageHeader from "../../shared/components/PageHeader/PageHeader";

const Reviews = () => {
  const [filterBy, setFilterBy] = useState("");
  let query = new URLSearchParams(useLocation().search);

  const categoriesList = [
    {
      name: "restuarants",
      id: 1,
    },
    {
      name: "bars",
      id: 2,
    },
    {
      name: "hotels",
      id: 3,
    },
    {
      name: "clubs",
      id: 4,
    },
    {
      name: "schools",

      id: 5,
    },
    {
      name: "games",

      id: 6,
    },
    {
      name: "gadgets",

      id: 7,
    },
    {
      name: "books",

      id: 8,
    },
  ];

  return (
    <section className="section--page reviews">
      <PageHeader title="reviews" />
      <div className="grid-width reviews__container">
        <div className="reviews__filters">
          <select>
            <option value="category"></option>
            {categoriesList.map((category) => (
              <option key={category.id} value="category.name">
                {category.name}
              </option>
            ))}
          </select>
          <input type="text" />
          <button>filter</button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;

// if (query.get("q")) {
//   return (
//     <div>
//       <h2>i searched for {query.get("q")}</h2>
//     </div>
//   );
// }
// if (query.get("cat")) {
//   return (
//     <div>
//       <h2>i searched for {query.get("cat")}</h2>
//     </div>
//   );
// }
