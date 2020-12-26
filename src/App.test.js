import React from "react";
import App from "./App";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./redux/store";

describe("Testing App", () => {
  test("App renders successfully", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
