import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import "./Loader.css";

export const Loader = ({ message, inline }) => (
  <div className={`loader ${inline ? "loader-inline" : ""}`}>
    {!!message && <h4 className="loader-message">{message}</h4>}
    <div className="loader-icon">
      <FontAwesomeIcon icon={faCircleNotch} />
    </div>
  </div>
);
