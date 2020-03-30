import { useState, useEffect } from "react";
import { firebase, db } from "../../firebase";

export const useAuthState = () => {
  const [authUser, setAuthUser] = useState(firebase.auth.currentUser);
  const [dbUser, setDbUser] = useState();
  const [loading, setLoading] = useState(!authUser);
  const [idToken, setIdToken] = useState(localStorage.getItem("token") || null);
  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(async authUser => {
      setAuthUser(authUser);
      if (!authUser) {
        setDbUser(null);
        setLoading(false);
      } else {
        const token = await authUser.getIdToken();
        setIdToken(token);
        localStorage.setItem("token", token);
      }
    });
    return () => unsubscribe();
  }, [authUser]);

  useEffect(() => {
    if (authUser) {
      const unsubscribe = db.user(authUser.uid).onSnapshot(doc => {
        setDbUser(doc.data());
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [authUser]);

  return { authUser, dbUser, loading, idToken };
};
