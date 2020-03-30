import React, { useState } from "react";
import { Message } from "../UI";
import { auth } from "../../firebase";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(response => {
        setSubmitted(true);
      })
      .catch(error => setMessage(error.message));
  };

  return (
    <div className="form-card" data-testid="page-forgot-password">
      <h2>Forgot Password</h2>
      {message && <Message type="error" message={message} />}
      {submitted ? (
        <p>Thank you. Instructions have been sent to the email you provided.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <p>
            Enter your email and we'll send you instructions for resetting your
            password.
          </p>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              label="Email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.currentTarget.value)}
            />
          </div>
          <div className="field">
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
