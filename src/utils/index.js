import moment from "moment";

export const stringToHash = string => {
  let hash = 0;
  let char = "";
  if (string.length === 0) return hash;
  for (let i = 0; i < string.length; i++) {
    char = string.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
};

// sanitizes $, converts to cents
export const currencyToCents = currency =>
  (currency.replace(/[^0-9.-]+/g, "") * 100).toFixed(0);

export const centsToCurrency = cents =>
  "$" + (cents / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const processAmountInput = amount => {
  const allowed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ","];
  let newAmount =
    "$" +
    amount
      .split("")
      .filter(char => allowed.includes(char))
      .join("");
  return newAmount;
};

export const pluralizeInterval = (interval, n) => {
  const morpheme = n > 1 ? "s" : "";
  return interval + morpheme;
};

export const nextBillingDate = (startDate, intervalCount, interval) => {
  let now = moment();
  let billingDate;
  if (moment.unix(startDate).isSame(now, "day")) {
    billingDate = now;
  } else if (moment.unix(startDate).isAfter(now)) {
    billingDate = moment.unix(startDate);
  } else {
    let nextDate = moment.unix(startDate);
    while (nextDate.isBefore(moment().startOf("day"))) {
      nextDate = nextDate.add(intervalCount, interval);
    }
    billingDate = nextDate;
  }
  return billingDate;
};
