import { useState, useEffect } from "react";
import { db } from "../../firebase";

export const usePaymentMethods = uid => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState({});
  useEffect(() => {
    setLoading(true);
    db.userPaymentMethods(uid)
      .get()
      .then(snapshot => {
        const allPaymentMethods = snapshot.docs.map(paymentMethod => ({
          ...paymentMethod.data(),
          id: paymentMethod.id
        }));
        setPaymentMethods(allPaymentMethods);
        setLoading(false);
      })
      .catch(error => {
        setMessage({ type: "error", message: error.message });
        setLoading(false);
      });
  }, [uid]);
  return { loading, message, paymentMethods };
};
