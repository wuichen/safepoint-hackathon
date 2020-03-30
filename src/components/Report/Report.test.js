import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Report } from "./Report";

beforeEach(cleanup);

test("it renders without error", async () => {
  const { queryByTestId } = render(<Report />);
  expect(queryByTestId("route-map")).toBeTruthy();
});
