import React from "react";
import { render, cleanup } from "@testing-library/react";
import { About } from "./About";

beforeEach(cleanup);

test("it renders without error", async () => {
  const { queryByTestId } = render(<About />);
  expect(queryByTestId("route-about")).toBeTruthy();
});
