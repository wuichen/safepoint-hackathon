import { useEffect, useState } from "react";
import { db } from "../../firebase";

export const useUserSubscriptions = uid => {
  const [subscriptions, setSubscriptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    db.userSubscriptions(uid)
      .get()
      .then(snapshot => {
        const allSubscriptions = snapshot.docs.map(subscription => ({
          ...subscription.data()
        }));
        setSubscriptions(allSubscriptions);
        setLoading(false);
      })
      .catch(error => {
        setMessage({ type: "error", message: error.message });
        setLoading(false);
      });
  }, [uid]);
  return { subscriptions, loading, message };
};
