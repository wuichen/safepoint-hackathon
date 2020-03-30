import React, { useEffect, useState } from "react";
import { useScript } from "../../hooks";
import { Loader, Message } from "../UI";
import { StripeProvider, Elements } from "react-stripe-elements";
import PaymentMethodForm from "./PaymentMethodForm";

export const NewPaymentMethod = ({ dbUser }) => {
  const [scriptLoaded, scriptError] = useScript("https://js.stripe.com/v3/");
  const [stripe, setStripe] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (scriptLoaded) {
      setStripe(window.Stripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY));
    }
    if (scriptError) {
      setMessage({
        type: "error",
        message: "Stripe was not able to load. Please try again."
      });
    }
  }, [scriptLoaded, scriptError]);

  if (!scriptLoaded) {
    return <Loader inline />;
  }
  return (
    <div data-testid="comp-paymentmethod">
      <h3>Payment Method</h3>
      {!!scriptError && (
        <Message type={message.type} message={message.message} />
      )}
      <StripeProvider stripe={stripe}>
        <Elements
          fonts={[
            {
              family: "Source Sans Pro",
              cssSrc:
                "https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap"
            }
          ]}
        >
          <PaymentMethodForm />
        </Elements>
      </StripeProvider>
    </div>
  );
};
