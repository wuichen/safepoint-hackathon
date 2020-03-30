import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { useHistory, Link } from "react-router-dom";
import { ROUTES } from "../../constants";
import { Message } from "../UI";
import { GoogleSignInBtn } from "../SignIn/GoogleSignInBtn";

export const SignUp = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");

  const createDbUser = (displayName, email, photoURL, uid) => {
    db.createUser((displayName = ""), email, photoURL, uid)
      .then(() => history.push(ROUTES.DASHBOARD))
      .catch(error => setMessage(error.message));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (password === passwordConfirmation) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(response =>
          createDbUser(
            response.user.displayName,
            response.user.email,
            response.user.photoURL,
            response.user.uid
          )
        )
        .catch(error => setMessage(error.message));
    } else {
      setMessage("Passwords do not match.");
    }
  };

  return (
    <div className="form-card" data-testid="route-signup">
      <h2>Sign Up</h2>
      <p>
        <GoogleSignInBtn as="SIGN_UP" />
      </p>
      <p className="hr-text">
        <span>or</span>
      </p>
      <p>Sign up with your email and password.</p>
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
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            type="password"
            label="Confirm Password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.currentTarget.value)}
          />
        </div>
        <div className="field">
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>
      <hr />
      <p>
        Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </p>
    </div>
  );
};
