import React from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { usePlan } from "./hooks";
import { Loader, Message } from "../UI";
import {
  centsToCurrency,
  nextBillingDate,
  pluralizeInterval
} from "../../utils";
import { DeletePlanBtn } from "./DeletePlanBtn";

export const Plan = ({ dbUser }) => {
  const { id } = useParams();
  const { loading, message, plan } = usePlan(id);

  if (loading) {
    return <Loader inline />;
  }
  return (
    <div className="plan" data-testid="route-plan">
      {!!message && <Message type={message.type} message={message.message} />}
      <h2>{plan.name}</h2>
      <h3 style={{ paddingTop: 0 }}>
        {centsToCurrency(plan.amount)} {plan.currency} every{" "}
        {plan.intervalCount > 1 ? plan.intervalCount : null}{" "}
        {pluralizeInterval(plan.interval, plan.intervalCount)}
      </h3>
      <p>Start Date: {moment.unix(plan.startDate).format("MMMM Do, YYYY")}</p>
      <p>
        Next billing date:{" "}
        {nextBillingDate(
          plan.startDate,
          plan.intervalCount,
          plan.interval
        ).format("MMMM Do, YYYY")}
      </p>
      <p className="hr-text text-error">
        <span>Danger Area</span>
      </p>
      <DeletePlanBtn
        planID={plan.stripePlanID}
        productID={plan.stripeProductID}
      />
    </div>
  );
};
