import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Home } from "./Home";

beforeEach(cleanup);

test("it renders without error", async () => {
  const { queryByTestId } = render(<Home />);
  expect(queryByTestId("route-home")).toBeTruthy();
});
