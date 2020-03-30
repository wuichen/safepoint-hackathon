import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { usePlan } from "../Plans";
import { usePaymentMethods } from "../PaymentMethods";
import { ROUTES } from "../../constants";
import { functions } from "../../firebase";
import { Loader, Message } from "../UI";
import {
  centsToCurrency,
  nextBillingDate,
  pluralizeInterval
} from "../../utils";

export const Subscribe = ({ dbUser }) => {
  const { id } = useParams();
  const plan = usePlan(id);
  const paymentMethods = usePaymentMethods(dbUser.uid);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (paymentMethods.paymentMethods.length) {
      setSelectedPaymentMethod(paymentMethods.paymentMethods[0].id);
    }
  }, [paymentMethods]);

  const handleSubmit = e => {
    e.preventDefault();
    if (selectedPaymentMethod) {
      setLoading(true);
      functions
        .createSubscription(
          dbUser.uid,
          dbUser.stripeCustomerID,
          plan.plan.stripePlanID,
          nextBillingDate(
            plan.plan.startDate,
            plan.plan.intervalCount,
            plan.plan.interval
          ).format("X")
        )
        .then(response => {
          console.log(response);
          setLoading(false);
        })
        .catch(error => {
          setMessage({ type: "error", message: error.message });
          setLoading(false);
        });
    }
  };

  if (plan.loading || paymentMethods.loading) {
    return <Loader inline />;
  }
  if (loading) {
    return <Loader message={`Subscribing to ${plan.plan.name}.`} />;
  }
  return (
    <div className="subscribe" data-testid="route-plan">
      {!!plan.message && (
        <Message type={plan.message.type} message={plan.message.message} />
      )}
      {!!paymentMethods.message && (
        <Message
          type={paymentMethods.message.type}
          message={paymentMethods.message.message}
        />
      )}
      {!!message && <Message type={message.type} message={message.message} />}
      <h2>{plan.plan.name}</h2>
      <h3 style={{ paddingTop: "0" }}>
        {centsToCurrency(plan.plan.amount)} {plan.plan.currency} every{" "}
        {plan.plan.intervalCount > 1 ? plan.plan.intervalCount : null}{" "}
        {pluralizeInterval(plan.plan.interval, plan.plan.intervalCount)}
      </h3>
      <p style={{ paddingTop: "0" }}>
        Starting on{" "}
        {nextBillingDate(
          plan.plan.startDate,
          plan.plan.intervalCount,
          plan.plan.interval
        ).format("MMMM Do, YYYY")}
      </p>
      <form onSubmit={handleSubmit}>
        {paymentMethods.paymentMethods.length ? (
          <>
            {paymentMethods.paymentMethods.map(paymentMethod => (
              <div key={paymentMethod.id} className="field">
                <label>
                  <input
                    type="radio"
                    value={paymentMethod.id}
                    checked={selectedPaymentMethod === paymentMethod.id}
                    onChange={e =>
                      setSelectedPaymentMethod(e.currentTarget.value)
                    }
                  />
                  {paymentMethod.card.brand} ending in{" "}
                  {paymentMethod.card.last4}
                </label>
              </div>
            ))}
            <div className="field">
              <Link to={ROUTES.NEW_PAYMENT_METHOD}>
                Add a different payment method
              </Link>
            </div>
          </>
        ) : (
          <p>
            You don't have a payment method.{" "}
            <Link to={ROUTES.NEW_PAYMENT_METHOD}>Add a payment method</Link>
          </p>
        )}
        <div className="field">
          <button className="btn" type="submit" disabled={loading}>
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
};
