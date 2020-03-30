import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { functions, auth } from "../../firebase";

const Recaptcha = () => {
  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha");

    window.recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
    });
  }, []);
  return <div id="recaptcha" />;
};

const AddMobileNumber = props => {
  const [state, setState] = useState({
    confirmResult: false,
    isMobileVerified: false,
    wrongCode: false
  });
  const [number, setNumber] = useState("");
  const [code, setCode] = useState("");
  const { confirmResult, isMobileVerified, wrongCode } = state;

  const handleGetVerificationCode = async e => {
    e.preventDefault();
    let appVerifier;
    appVerifier = window.recaptchaVerifier;
    const user = await auth.currentUser();
    const confirmResult = await user.linkWithPhoneNumber(number, appVerifier);
    setState({ ...state, confirmResult });
  };

  const handleVerifyCode = async e => {
    e.preventDefault();
    try {
      const isVerified = await state.confirmResult.confirm(code);
      console.log(isVerified);
      if (!isVerified.error) {
        props.savePhone(number);
        setState({ ...state, isMobileVerified: true });
      } else {
        setState({ ...state, wrongCode: true });
      }
    } catch (error) {
      console.error(error);
      setState({ ...state, wrongCode: true });
    }
  };

  return (
    <div className="field">
      <label htmlFor="name">Please verify your phone number</label>
      {!confirmResult ? (
        <>
          <input
            type="text"
            onChange={e => {
              setNumber(e.target.value);
            }}
            value={number}
          />

          <Recaptcha />

          <button onClick={handleGetVerificationCode}>
            Send Verification Code
          </button>
        </>
      ) : null}
      {!isMobileVerified && confirmResult ? (
        <>
          <input
            type="text"
            onChange={e => setCode(e.target.value)}
            value={code}
          />
          <button onClick={handleVerifyCode}>Verify Code</button>
        </>
      ) : null}
      {isMobileVerified ? (
        <>
          <p style={{ color: "#30C56D", textAlign: "center" }}>
            Your number is verified!
          </p>
        </>
      ) : (
        ""
      )}
      {!isMobileVerified && wrongCode ? (
        <p style={{ color: "#EF5A5A", textAlign: "center" }}>Invalid code!</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddMobileNumber;
