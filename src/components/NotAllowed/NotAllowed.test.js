import React from "react";
import { render, cleanup } from "@testing-library/react";
import { NotAllowed } from "./index";

beforeEach(cleanup);

test("it renders without error", async () => {
  const { queryByTestId } = render(<NotAllowed />);
  expect(queryByTestId("route-notallowed")).toBeTruthy();
});
