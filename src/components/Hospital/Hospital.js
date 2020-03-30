import React from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import { ROUTES } from "../../constants";
import { withPermission } from "../Session";
// import { DashboardHome } from "./DashboardHome";
// import { PaymentMethods, NewPaymentMethod } from "../PaymentMethods";
// import { Subscriptions, Subscribe } from "../Subscriptions";
// import { Account } from "../Account";
// import { auth } from "../../firebase";
import Public from "./Public";
import Staffs from "./Staffs";
import Patients from "./Patients";
import Schedule from "./Schedule";
import "antd/dist/antd.css";
const Dashboard = ({ dbUser }) => {
  return (
    <div className="dashboard" data-testid="route-dashboard">
      <div className="container">
        <h2>Hospital</h2>
        <div className="controls">
          <nav className="controls-nav">
            <NavLink exact to={ROUTES.HOSPITAL}>
              Public Records
            </NavLink>
            <NavLink exact to={ROUTES.PATIENTS}>
              Patients
            </NavLink>
            <NavLink exact to={ROUTES.STAFFS}>
              Staff
            </NavLink>
            <NavLink exact to={ROUTES.SCHEDULE}>
              Schedule
            </NavLink>
          </nav>
          <div className="controls-main">
            <Switch>
              <Route exact path={ROUTES.HOSPITAL} component={Public} />
              <Route exact path={ROUTES.PATIENTS} component={Patients} />
              <Route
                exact
                path={ROUTES.STAFFS}
                render={props => <Staffs {...props} dbUser={dbUser} />}
              />
              <Route
                exact
                path={ROUTES.SCHEDULE}
                render={props => <Schedule {...props} dbUser={dbUser} />}
              />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

const condition = authUser => !!authUser;
export default withPermission(condition)(Dashboard);
