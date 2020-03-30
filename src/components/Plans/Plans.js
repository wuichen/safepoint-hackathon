import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ROUTES } from "../../constants";
import { usePlans } from "./hooks";
import { Loader, Message } from "../UI";
import { centsToCurrency, pluralizeInterval } from "../../utils";

export const Plans = ({ dbUser }) => {
  const { loading, message, plans } = usePlans();

  if (loading) {
    return <Loader inline />;
  }
  return (
    <div className="plans" data-testid="route-plans">
      {message && <Message type={message.type} message={message.message} />}
      <header className="header-tools">
        <h3>Plans</h3>
        <p>
          <Link to={ROUTES.NEW_PLAN}>
            <button className="btn btn-small">
              <FontAwesomeIcon
                icon={faPlus}
                style={{ fontSize: "0.7rem", marginRight: "10px" }}
              />{" "}
              New Plan
            </button>
          </Link>
        </p>
      </header>
      {!plans.length ? (
        <p>
          You haven't created any plans yet.{" "}
          <Link to={ROUTES.NEW_PLAN}>Create you first plan</Link>.
        </p>
      ) : (
        <div className="table">
          {!!plans &&
            plans.map(plan => (
              <Link
                key={plan.id}
                className="table-item table-item-link"
                to={`${ROUTES.PLANS}/${plan.id}`}
              >
                <span className="table-item-header">{plan.name}</span>
                <span>
                  {centsToCurrency(plan.amount)} {plan.currency} every{" "}
                  {plan.intervalCount > 1 ? plan.intervalCount : null}{" "}
                  {pluralizeInterval(plan.interval, plan.intervalCount)}
                </span>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};
