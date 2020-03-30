import React, { useState } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthUserContext } from "../Session";
import { ROUTES } from "../../constants";
import { Message } from "../UI";
import { GoogleSignInBtn } from "./GoogleSignInBtn";

export const SignIn = () => {
  const { authUser } = useAuthUserContext();

  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        history.push(ROUTES.DASHBOARD);
      })
      .catch(error => setMessage(error.message));
  };

  if (authUser) {
    return <Redirect to={ROUTES.DASHBOARD} />;
  }

  return (
    <div className="form-card" data-testid="route-signin">
      <h2>Sign In</h2>
      <p>
        <GoogleSignInBtn as="SIGN_IN" />
      </p>
      <p className="hr-text">
        <span>or</span>
      </p>
      <p>Sign in with your email and password.</p>
      {message && <Message type="error" message={message} />}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            label="Password"
            name="password"
            id="password"
            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}
          />
        </div>
        <div className="field">
          <button type="submit" className="btn">
            Submit
          </button>
          <Link to={ROUTES.FORGOT_PASSWORD} style={{ marginLeft: "20px" }}>
            Forgot your password?
          </Link>
        </div>
      </form>
      <hr />
      <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </p>
    </div>
  );
};
