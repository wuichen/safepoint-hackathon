import React from "react";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { Header } from "./Header";
import { useAuthUserContext } from "../Session";

jest.mock("../Session", () => ({
  useAuthUserContext: jest.fn()
}));

beforeEach(cleanup);
afterEach(() => jest.clearAllMocks());

describe("logged out header", () => {
  test("it renders without error", () => {
    useAuthUserContext.mockImplementation(() => ({
      authUser: null,
      dbUser: null
    }));
    const { queryByTestId } = render(
      <Router initialEntries={["/"]}>
        <Header />
      </Router>
    );
    expect(queryByTestId("comp-header")).toBeTruthy();
  });
});

describe("logged in header", () => {
  test("it renders the authorized header when user is logged in", () => {
    useAuthUserContext.mockImplementation(() => ({
      authUser: 1,
      dbUser: { admin: false }
    }));
    const { queryByTestId, queryByText } = render(
      <Router initialEntries={["/"]}>
        <Header />
      </Router>
    );
    expect(queryByTestId("comp-header-auth")).toBeTruthy();
    // it does not show the admin link
    expect(queryByText("Admin")).toBeNull();
  });

  test("it shows the admin link when the user is an admin", () => {
    useAuthUserContext.mockImplementation(() => ({
      authUser: 1,
      dbUser: { admin: true }
    }));
    const { getByText } = render(
      <Router initialEntries={["/"]}>
        <Header />
      </Router>
    );
    expect(getByText("Admin")).toBeTruthy();
  });
});
