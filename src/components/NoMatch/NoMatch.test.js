import React from "react";
import { render, cleanup } from "@testing-library/react";
import { NoMatch } from "./index";

beforeEach(cleanup);

test("it renders without error", async () => {
  const { queryByTestId } = render(<NoMatch />);
  expect(queryByTestId("route-nomatch")).toBeTruthy();
});
