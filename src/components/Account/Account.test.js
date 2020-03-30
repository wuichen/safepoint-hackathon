import React from "react";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import Account from "./Account";
import { AuthUserContext } from "../Session";

beforeEach(cleanup);

const authUser = { email: "foo@bar.baz" };
const dbUser = { displayName: "Foo Bar" };
const loading = false;

test("it renders without error", () => {
  const { queryByTestId } = render(
    <AuthUserContext.Provider value={{ authUser, dbUser, loading }}>
      <Router initialEntries={["/"]}>
        <Account />
      </Router>
    </AuthUserContext.Provider>
  );
  expect(queryByTestId("route-account")).toBeTruthy();
});
