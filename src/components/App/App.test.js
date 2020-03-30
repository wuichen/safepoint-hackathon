import React from "react";
import { render, wait, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter as Router, useHistory } from "react-router-dom";
import { App } from "./App";

beforeEach(cleanup);

test("it renders without error", async () => {
  const { queryByTestId } = render(
    <Router initialEntries={["/"]}>
      <App />
    </Router>
  );
  await wait(() => expect(queryByTestId("comp-app")).toBeTruthy());
});

test("it navigates to the pages when you click the links", async () => {
  const { queryByTestId, debug } = render(
    <Router initialEntries={["/"]}>
      <App />
    </Router>
  );
  // Home (logo)
  await wait(() => fireEvent.click(queryByTestId("link-logo"))); // wait for loading to finish
  await wait(() => expect(queryByTestId("route-home")).toBeTruthy());
  // About
  fireEvent.click(queryByTestId("link-about"));
  await wait(() => expect(queryByTestId("route-about")).toBeTruthy());
  // Home (nav)
  fireEvent.click(queryByTestId("link-home"));
  await wait(() => expect(queryByTestId("route-home")).toBeTruthy());
  // signup
  fireEvent.click(queryByTestId("link-signup"));
  await wait(() => expect(queryByTestId("route-signup")).toBeTruthy());
  // signin
  fireEvent.click(queryByTestId("link-signin"));
  await wait(() => expect(queryByTestId("route-signin")).toBeTruthy());
});

test("it renders the No Match page on unrecognized routes", async () => {
  const { queryByTestId, debug } = render(
    <Router initialEntries={["/foobarbaz"]}>
      <App />
    </Router>
  );
  await wait(() => expect(queryByTestId("route-nomatch")).toBeTruthy());
});
