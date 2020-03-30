import React from "react";
import "./Modal.css";

export const Modal = ({ open, children }) => (
  <div className={`ui-modal ${open ? "open" : ""}`}>
    <div className="ui-modal-inner wrapper">{children}</div>
  </div>
);
