import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const emailAuthProvider = firebase.auth.EmailAuthProvider;
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();
const auth = firebase.auth();
const functions = firebase.functions();
const firestore = firebase.firestore;

export {
  emailAuthProvider,
  googleAuthProvider,
  db,
  auth,
  firestore,
  functions
};
