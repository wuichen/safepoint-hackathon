import moment from "moment";
import { db } from "./firebase";
import { createHasuraUser } from "./functions";
// User API
// ----------------------------------
export const user = uid => db.collection("users").doc(uid);

export const userByEmail = email =>
  db
    .collection("users")
    .where("email", "==", email)
    .limit(1);

export const createUser = (displayName, email, photoURL, uid) =>
  db
    .collection("users")
    .doc(uid)
    .set({ displayName, email, photoURL, uid, created_at: moment().format() })
    .then(() => {
      createHasuraUser();
    });

// Alerts API
// ----------------------------------
export const userAlerts = uid =>
  db
    .collection("users")
    .doc(uid)
    .collection("alerts");

export const userAlert = (uid, id) =>
  user(uid)
    .collection("alerts")
    .doc(id);

export const createUserAlert = (uid, alert) =>
  user(uid)
    .collection("alerts")
    .add({ ...alert, created_at: moment().format() });

export const deleteUserAlert = (uid, alertId) =>
  user(uid)
    .collection("alerts")
    .doc(alertId)
    .delete();

// Connect API
// ----------------------------------
export const connectExists = code =>
  db
    .collection("stripe_connects")
    .where("stripeConnectAuthCode", "==", code)
    .limit(1)
    .get();

export const initConnect = (uid, stateKey) =>
  user(uid).update({
    stripeConnectStatus: "INIT",
    updated_at: moment().format()
  });

export const concludeConnect = (uid, code) =>
  db.collection("stripe_connects").add({
    uid: uid,
    stripeConnectAuthCode: code,
    created_at: moment().format()
  });

// Plans API
// ----------------------------------
export const plans = () => db.collection("plans");

export const plan = id => db.collection("plans").doc(id);

// Payment Methods API
// ----------------------------------
export const userPaymentMethods = uid =>
  db
    .collection("users")
    .doc(uid)
    .collection("paymentMethods");

// Subscriptions API
// ----------------------------------
export const userSubscriptions = uid => user(uid).collection("subscriptions");
