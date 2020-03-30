import React, { useState } from "react";
import PropTypes from "prop-types";
import { db } from "../../firebase";
import { Message } from "../UI";
import ReAuthenticateWithPassword from "./ReAuthenticateWithPassword";

export const EditUser = ({ authUser, dbUser }) => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(authUser.email);
  const [displayName, setDisplayName] = useState(dbUser.displayName);
  const [reAuthWithPassword, setReAuthWithPassword] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    if (displayName !== dbUser.displayName) {
      db.user(dbUser.uid)
        .update({ displayName: displayName })
        .catch(error => setMessage(error.message));
    }
    if (email !== authUser.email) {
      authUser.updateEmail(email).catch(error => {
        if (error.code === "auth/requires-recent-login") {
          setReAuthWithPassword(true);
        } else {
          setMessage(error.message);
        }
      });
    }
  };

  return (
    <div data-testid="edit-user">
      {message && <Message type="error" message={message} />}
      <form onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="displayName">Display Name</label>
          <input
            type="text"
            name="displayName"
            id="displayName"
            data-testid="displayname-field"
            placeholder="Display Name"
            value={displayName}
            onChange={e => setDisplayName(e.currentTarget.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            label="Email"
            name="email"
            id="email"
            data-testid="email-field"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className="field">
          <button type="submit" className="btn">
            Update
          </button>
        </div>
      </form>
      {!!reAuthWithPassword && (
        <ReAuthenticateWithPassword authUser={authUser} />
      )}
    </div>
  );
};

EditUser.propTypes = {
  authUser: PropTypes.object.isRequired,
  dbUser: PropTypes.object.isRequired
};
