import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Map } from "./Map";

beforeEach(cleanup);

test("it renders without error", async () => {
  const { queryByTestId } = render(<Map />);
  expect(queryByTestId("route-map")).toBeTruthy();
});
