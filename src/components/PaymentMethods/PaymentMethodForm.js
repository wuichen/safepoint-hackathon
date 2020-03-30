import React, { useState } from "react";
import { useAuthUserContext } from "../Session";
import { injectStripe, CardElement } from "react-stripe-elements";
import { functions } from "../../firebase";
import { Message, Loader } from "../UI";

const CheckoutForm = ({ elements, stripe }) => {
  const { dbUser } = useAuthUserContext();
  const [cardName, setCardName] = useState(dbUser.displayName);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    const card = elements.getElement("card");
    if (cardName === "") {
      setMessage({ type: "error", message: "Name On Card can't be blank" });
      setLoading(false);
    } else if (card._invalid) {
      setMessage({ type: "error", message: "Card details are invalid." });
      setLoading(false);
    } else {
      stripe
        .createSource({
          type: "card",
          owner: { name: cardName }
        })
        .then(({ source }) => {
          functions
            .setUserSource(dbUser.uid, source)
            .then(() => {
              setLoading(false);
            })
            .catch(error => {
              setMessage({ type: "error", message: error.message });
              setLoading(false);
            });
        })
        .catch(error => {
          console.log(error);
          setMessage({ type: "error", message: error.message });
          setLoading(false);
        });
    }
  };

  return (
    <>
      {loading && <Loader message="Saving your payment method." />}
      {!!message && <Message type={message.type} message={message.message} />}
      <form onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="cardName">Name On Card</label>
          <input
            type="text"
            name="cardName"
            id="cardName"
            placeholder={"Name on Card"}
            value={cardName}
            onChange={e => setCardName(e.currentTarget.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="cardnumber">Card Details</label>
          <div className="input-elements">
            <CardElement
              style={{
                base: {
                  iconColor: "#444",
                  color: "#444",
                  fontWeight: 400,
                  fontFamily: "'Source Sans Pro', sans-serif",
                  fontSize: "16px",
                  fontSmoothing: "antialiased",
                  "::placeholder": {
                    color: "#ccc"
                  }
                },
                invalid: {
                  iconColor: "#d86a6a",
                  color: "#d86a6a"
                }
              }}
            />
          </div>
        </div>
        <div className="field">
          <button type="submit" className="btn" disabled={loading}>
            Add Payment Method
          </button>
        </div>
      </form>
    </>
  );
};

export default injectStripe(CheckoutForm);
