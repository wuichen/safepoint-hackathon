import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ROUTES } from "../../constants";
import { usePaymentMethods } from "./hooks";
import { Loader, Message } from "../UI";

export const PaymentMethods = ({ dbUser }) => {
  const { loading, message, paymentMethods } = usePaymentMethods(dbUser.uid);
  if (loading) {
    return <Loader inline />;
  }
  return (
    <div className="paymentmethods">
      {message && <Message type={message.type} message={message.message} />}
      <div className="header-tools">
        <h3>Payment Methods</h3>
        {!paymentMethods.length && (
          <p>
            <Link to={ROUTES.NEW_PAYMENT_METHOD}>
              <button className="btn btn-small">
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ fontSize: "0.7rem", marginRight: "10px" }}
                />{" "}
                New Payment Method
              </button>
            </Link>
          </p>
        )}
      </div>
      {!paymentMethods.length ? (
        <p>
          You haven't added any payment methods yet.{" "}
          <Link to={ROUTES.NEW_PAYMENT_METHOD}>Add your Payment Method</Link>.
        </p>
      ) : (
        <div className="table">
          {!!paymentMethods &&
            paymentMethods.map(paymentMethod => (
              <div key={paymentMethod.id} className="table-item">
                <span className="table-item-header">
                  {paymentMethod.card.brand} ending in{" "}
                  {paymentMethod.card.last4}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
