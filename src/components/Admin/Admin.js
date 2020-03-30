import React from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import { withPermission } from "../Session";
import { ROUTES } from "../../constants";
import { AdminHome } from "./";
import { Plans, Plan, NewPlan } from "../Plans";

const Admin = ({ authUser, dbUser }) => {
  return (
    <div className="route-admin" data-testid="route-admin">
      <div className="container">
        <h2>Admin</h2>
        <div className="controls">
          <nav className="controls-nav">
            <NavLink exact to={ROUTES.ADMIN} data-testid="link-admin-home">
              Home
            </NavLink>
            <NavLink to={ROUTES.PLANS} data-testid="link-plans">
              Plans
            </NavLink>
            <NavLink to="/admin/subscriptions" data-testid="link-plans">
              Subscriptions
            </NavLink>
          </nav>
          <div className="controls-main">
            <Switch>
              <Route exact path={ROUTES.ADMIN} component={AdminHome} />
              <Route
                exact
                path={ROUTES.PLANS}
                render={props => <Plans {...props} dbUser={dbUser} />}
              />
              <Route
                exact
                path={ROUTES.NEW_PLAN}
                render={props => <NewPlan {...props} dbUser={dbUser} />}
              />
              <Route
                exact
                path={ROUTES.PLAN}
                render={props => <Plan {...props} dbUser={dbUser} />}
              />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

const condition = (authUser, dbUser) => authUser && dbUser.admin === true;
export default withPermission(condition)(Admin);
