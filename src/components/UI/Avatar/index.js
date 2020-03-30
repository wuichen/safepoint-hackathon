import React from "react";
import "./Avatar.css";

export const Avatar = ({ user, wrapperClass, size }) => (
  <figure
    className={`avatar-wrapper ${wrapperClass ? wrapperClass : ""} ${
      size ? "avatar-" + size : ""
    }`}
    data-testid="avatar"
  >
    {user.photoURL ? (
      <img
        src={user.photoURL}
        alt={`${user.displayName}'s Avatar'`}
        className="avatar"
      />
    ) : user.displayName ? (
      <span className="avatar-text">{`${user.displayName.charAt(0)}`}</span>
    ) : (
      <span className="avatar-text">{`${user.email.charAt(0)}`}</span>
    )}
  </figure>
);
