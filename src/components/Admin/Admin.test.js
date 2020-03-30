import React from "react";
import { render, fireEvent, wait, cleanup } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import Admin from "./Admin";
import { AuthUserContext } from "../Session";

beforeEach(cleanup);

const authUser = { email: "foo@bar.baz" };
const dbUser = { displayName: "Foo Bar", admin: true };
const loading = false;

test("it renders without error", () => {
  const { queryByTestId } = render(
    <AuthUserContext.Provider value={{ authUser, dbUser, loading }}>
      <Router initialEntries={["/"]}>
        <Admin />
      </Router>
    </AuthUserContext.Provider>
  );
  expect(queryByTestId("route-admin")).toBeTruthy();
});

test("it navigates to the sub pages when user clicks the links", () => {
  const { queryByTestId } = render(
    <AuthUserContext.Provider value={{ authUser, dbUser, loading }}>
      <Router initialEntries={["/"]}>
        <Admin />
      </Router>
    </AuthUserContext.Provider>
  );

  fireEvent.click(queryByTestId("link-admin-home"));
  expect(queryByTestId("route-admin-home")).toBeTruthy();
});
