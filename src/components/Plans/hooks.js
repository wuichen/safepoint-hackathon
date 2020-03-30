import { useEffect, useState } from "react";
import { db } from "../../firebase";

export const usePlans = () => {
  const [plans, setPlans] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    db.plans()
      .get()
      .then(snapshot => {
        const allPlans = snapshot.docs.map(plan => ({
          ...plan.data(),
          id: plan.id
        }));
        setPlans(allPlans);
        setLoading(false);
      })
      .catch(error => {
        setMessage({ type: "error", message: error.message });
        setLoading(false);
      });
  }, []);
  return { loading, message, plans };
};

export const usePlan = id => {
  const [plan, setPlan] = useState({});
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.plan(id)
      .get()
      .then(snapshot => {
        setPlan(snapshot.data());
        setLoading(false);
      })
      .catch(error => {
        setMessage({ type: "error", message: error.message });
        setLoading(false);
      });
  }, [id]);
  return { loading, message, plan };
};
