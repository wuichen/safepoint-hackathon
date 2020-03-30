import React from "react";
import { Link } from "react-router-dom";
import { useUserSubscriptions } from "./hooks";
import { Loader, Message } from "../UI";
import { ROUTES } from "../../constants";

export const Subscriptions = ({ dbUser }) => {
  const { subscriptions, loading, message } = useUserSubscriptions(dbUser.uid);
  if (loading) {
    return <Loader inline />;
  }
  return (
    <div className="subscriptions">
      <h3>Subscriptions</h3>
      {message && <Message type={message.type} message={message.message} />}
      {!subscriptions.length ? (
        <p>
          You haven't subscribed to any plans yet.{" "}
          <Link to={ROUTES.DASHBOARD}>Choose a plan</Link>.
        </p>
      ) : (
        <div className="table">
          {!!subscriptions &&
            subscriptions.map(subscription => (
              <Link
                key={subscription.id}
                className="table-item table-item-link"
                to={`${ROUTES.SUBSCRIPTIONS}/${subscription.id}`}
              >
                <span className="table-item-header">
                  {subscription.plan.id}
                </span>
                <span></span>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};
