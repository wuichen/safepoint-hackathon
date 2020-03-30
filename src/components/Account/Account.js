import React from "react";
import PropTypes from "prop-types";
import { withPermission } from "../Session";
import { Avatar } from "../UI";
import { EditUser } from "./EditUser";
import "./Account.css";

const Account = ({ authUser, dbUser }) => (
  <div className="account" data-testid="route-account">
    <div className="account-header">
      <Avatar user={dbUser} wrapperClass={"account-avatar"} />
      <h2 className="account-display-name" data-testid="displayname">
        {dbUser.displayName}
        {dbUser.admin ? " [ADMIN]" : ""}
      </h2>
      <p className="account-email" data-testid="email">
        {authUser.email}
      </p>
    </div>
    <EditUser authUser={authUser} dbUser={dbUser} />
  </div>
);

Account.propTypes = {
  authUser: PropTypes.object.isRequired,
  dbUser: PropTypes.object.isRequired
};

const condition = authUser => !!authUser;
export default withPermission(condition)(Account);
