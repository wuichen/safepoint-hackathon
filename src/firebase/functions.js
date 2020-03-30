import { functions } from "./firebase";

export const createHasuraUser = () => {
  let createDbUser = functions.httpsCallable("createDbUser");
  return createDbUser();
};

export const createLocation = ({
  note,
  condition,
  center,
  city,
  country,
  record_id
}) => {
  let createDbLocation = functions.httpsCallable("createDbLocation");
  return createDbLocation({
    note,
    condition,
    center,
    city,
    country,
    record_id
  });
};

export const createRecord = ({
  symptons,
  name,
  tracking,
  interval,
  phone,
  privateLocation,
  country,
  city
}) => {
  let createDbRecord = functions.httpsCallable("createDbRecord");
  return createDbRecord({
    symptons,
    name,
    tracking,
    interval,
    privateLocation,
    country,
    city,
    phone
  });
};

export const createPlan = (
  name,
  amount,
  currency,
  intervalCount,
  interval,
  startDate
) => {
  let createStripePlan = functions.httpsCallable("createStripePlan");
  return createStripePlan({
    name,
    amount,
    currency,
    intervalCount,
    interval,
    startDate
  });
};

export const editPlan = name => {
  let editStripePlan = functions.httpsCallable("editStripePlan");
  return editStripePlan({ name });
};

export const deletePlan = (planID, productID) => {
  let deleteStripePlan = functions.httpsCallable("deleteStripePlan");
  return deleteStripePlan({ planID, productID });
};

export const setUserSource = (uid, source) => {
  let setUserSource = functions.httpsCallable("setUserSource");
  return setUserSource({ uid, source });
};

export const createSubscription = (
  uid,
  stripeCustomerID,
  stripePlanID,
  startDate
) => {
  let createStripeSubscription = functions.httpsCallable(
    "createStripeSubscription"
  );
  return createStripeSubscription({
    uid,
    stripeCustomerID,
    stripePlanID,
    startDate
  });
};
