import React from "react";
import { Link } from "react-router-dom";

import SectionHeader from "../../../shared/components/SectionHeader/SectionHeader";
import useImage from "../../../assets/images/use-now.jpg";
import Review from "../../../reviews/components/Review/Review";

const LatestReviews = () => {
  const reviews = [
    {
      id: 1,
      user: {
        userName: "bambamayo",
        avatar: useImage,
      },
      reviewedName: "banilux",
      introText: "best place in lagos",
      date: "12|02|2020",
      category: "Bar",
      likes: 20,
      reviewedImages: [useImage],
    },
    {
      id: 2,
      user: {
        userName: "bambamayo",
        avatar: useImage,
      },
      reviewedName: "banilux",
      introText: "best place in lagos",
      date: "12|02|2020",
      category: "Bar",
      likes: 20,
      reviewedImages: [useImage],
    },
    {
      id: 3,
      user: {
        userName: "bambamayo",
        avatar: useImage,
      },
      reviewedName: "banilux",
      introText: "best place in lagos",
      date: "12|02|2020",
      category: "Bar",
      likes: 20,
      reviewedImages: [useImage],
    },
    {
      id: 4,
      user: {
        userName: "bambamayo",
        avatar: useImage,
      },
      reviewedName: "banilux",
      introText: "best place in lagos",
      date: "12|02|2020",
      category: "Bar",
      likes: 20,
      reviewedImages: [useImage],
    },
  ];
  return (
    <section className="section section--greybg">
      <SectionHeader>Latest reviews</SectionHeader>
      <div className="grid">
        {reviews.map((review) => (
          <Review
            key={review.id}
            image={review.reviewedImages[0]}
            imageAlt={review.reviewedName}
            reviewedPlace={review.reviewedName}
            header={review.reviewedName}
            avatarImage={review.user.avatar}
            avatarAlt={review.user.userName}
            userName={review.user.userName}
            tagline={review.introText}
            date={review.date}
            iconClicked={() => console.log("icon clicked")}
          />
        ))}
      </div>
      <div className="grid-width t-r">
        <Link className="section-calltoaction-link" to="/reviews?q=all">
          view all reviews
        </Link>
      </div>
    </section>
  );
};

export default LatestReviews;
