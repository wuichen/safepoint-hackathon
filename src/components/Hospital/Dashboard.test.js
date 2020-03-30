import React from "react";
import { render, wait, cleanup } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import Dashboard from "./Hospital";
import { AuthUserContext } from "../Session";

beforeEach(cleanup);

const authUser = { email: "foo@bar.baz" };
const dbUser = { displayName: "Foo Bar" };
const loading = false;

test("it renders without error", () => {
  const { queryByTestId } = render(
    <AuthUserContext.Provider value={{ authUser, dbUser, loading }}>
      <Router initialEntries={["/"]}>
        <Dashboard />
      </Router>
    </AuthUserContext.Provider>
  );
  expect(queryByTestId("route-dashboard")).toBeTruthy();
});
