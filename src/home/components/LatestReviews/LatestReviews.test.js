import React from "React";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import LatestReviews from "./LatestReviews";

window.fetch = jest.fn(() => {
  const review = {
    likes: 0,
    website: "http://bheerhugz.com.ng/bheerhugz/booking.html",
    telephone: "09090002198",
    address:
      "Bheerhugz Cafe, Ikeja is located at Ikeja City Mall, 9 Obafemi Awolowo Way, Ikeja, Lagos.",
    images: [],
    reviewedName: "bheerhugz",
    introText: "A safe spot.",
    category: "restaurants",
    reviewDetails:
      "It is a desirable spot to relax, unwind, enjoy tasty sumptuous meals with friends.",
    author: {},
    createdAt: "2020-10-09T00:56:33.321Z",
    updatedAt: "2020-10-09T00:56:33.321Z",
  };

  return Promise.resolve({
    json: () => Promise.resolve(review),
  });
});

describe("Testing Latest Reviews Component", () => {
  test("loader is shown while API request is in progress", async () => {
    render(<LatestReviews />);
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByTestId("loader"));
  });
});
