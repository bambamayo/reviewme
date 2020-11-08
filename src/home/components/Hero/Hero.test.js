import React from "react";
import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import Hero from "./Hero";

describe("Testing Hero Search Input", () => {
  test("input value is updated correctly", () => {
    render(<Hero />);

    const searchInput = screen.getByTestId("hero-searchbox");
    UserEvent.type(searchInput, "Banilux");

    expect(searchInput.value).toBe("Banilux");
  });

  test("callback works every time input value is changed", () => {
    const inputChangedHandler = jest.fn();
    render(
      <input
        type="text"
        value=""
        onChange={inputChangedHandler}
        data-testid="hero-searchbox"
      />
    );

    const searchInput = screen.getByTestId("hero-searchbox");
    UserEvent.type(searchInput, "Banilux");

    expect(inputChangedHandler).toHaveBeenCalledTimes(7);
  });
});
