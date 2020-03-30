import React from "react";
import { usePlans, PlanPoster } from "../Plans";
import { Loader, Message } from "../UI";
import "./DashboardHome.css";

export const DashboardHome = () => {
  const { plans, loading, message } = usePlans();

  if (loading) {
    return <Loader inline />;
  }
  return (
    <div className="dashboard-home">
      <h3>Available Plans</h3>
      {!!message && <Message type={message.type} message={message.message} />}
      <div className="plan-posters">
        {!!plans &&
          plans.map(plan => {
            return <PlanPoster key={plan.id} plan={plan} />;
          })}
      </div>
    </div>
  );
};
