import React from "react";
import { Link } from "react-router-dom";
import { centsToCurrency, pluralizeInterval } from "../../utils";
import "./PlanPoster.css";

export const PlanPoster = ({ plan }) => (
  <div className="plan-poster">
    <div className="plan-poster-header">
      <h4 className="plan-poster-name">{plan.name}</h4>
      <p className="plan-poster-amount">
        {centsToCurrency(plan.amount)} {plan.currency} /{" "}
        {plan.intervalCount > 1 ? plan.intervalCount : null}{" "}
        {pluralizeInterval(plan.interval, plan.intervalCount)}
      </p>
      <p>
        <Link
          to={`/dashboard/subscribe/${plan.id}`}
          className="btn plan-poster-btn"
        >
          Subscribe
        </Link>
      </p>
    </div>
  </div>
);
