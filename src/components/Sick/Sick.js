import React, { useState } from "react";
import moment from "moment";
import { functions, auth } from "../../firebase";
import { ROUTES, REPORT_INTERVALS } from "../../constants";
import { Message, Loader } from "../UI";
import { currencyToCents, processAmountInput } from "../../utils";
import PhoneAuth from "./PhoneAuth";
import { FormMapComponent } from "components/Listing/RenderLocationInput";
import { useHistory, Link, Redirect } from "react-router-dom";
import { useLocation } from "hooks/useLocation";
export const Sick = ({ dbUser }) => {
  const user = auth.currentUser();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [name, setName] = useState("");
  // const [treatment, setTreatment] = useState(true);
  const [tracking, setTracking] = useState(true);
  const [interval, setInterval] = useState(1);
  // const [startDate, setStartDate] = useState("");
  const [phone, setPhone] = useState("");
  const [privateLocation, setPrivateLocation] = useState(null);
  const { getIpData } = useLocation();
  // symptons
  const [symptons, setSymptons] = useState({
    cough: false,
    breathingDifficulty: false,
    diabetes: false,
    heartDisease: false,
    immuneCheck: false,
    severity: "mild",
    possibleInteraction: false,
    preganency: false,
    treatment: true,
    startDate: ""
  });

  const onSubmit = async e => {
    e.preventDefault();
    if (name === "") {
      setMessage({ type: "error", message: "Patient Name can't be blank." });
      // } else if (typeof treatment === "undefined") {
      //   setMessage({
      //     type: "error",
      //     message: "Please let us know if you're willing to get treated."
      //   });
      // } else if (typeof tracking === "undefined") {
      //   setMessage({
      //     type: "error",
      //     message: "Please let us know if you're willing to get tracked."
      //   });
      // } else if (symptons.startDate === "") {
      //   setMessage({ type: "error", message: "Start Date can't be blank." });
    } else {
      const ipData = await getIpData();
      const country = ipData.country_name;
      const city = ipData.city;
      setLoading(true);
      setMessage(null);
      console.log(symptons, name, tracking, interval, phone);
      functions
        .createRecord({
          symptons,
          name,
          tracking,
          interval,
          phone,
          privateLocation,
          country,
          city
        })
        .then(response => {
          console.log(response);
          setLoading(false);

          window.location.replace("/");
        })
        .catch(error => {
          setMessage({ type: "error", message: error.message });
          setLoading(false);
        });
    }
  };

  if (loading) {
    return <Loader message="Submitting your record." />;
  }

  return (
    <div
      style={{ width: "80%", margin: "auto" }}
      className="sick"
      data-testid="route-sick"
    >
      <h3>Let us know your health condition</h3>
      {message && <Message type={message.type} message={message.message} />}
      <form onSubmit={onSubmit} autoComplete="off">
        <div className="field">
          <label htmlFor="name">
            Patient Name (We will not expose your name to the public on the map)
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.currentTarget.value)}
          />
        </div>
        <div className="fieldrow">
          <div className="field">
            <label htmlFor="cough">Do you have a cough?</label>
            <select
              id="cough"
              value={symptons.cough}
              onChange={e =>
                setSymptons({
                  ...symptons,
                  cough: e.target.value
                })
              }
            >
              <option key="yes" value={true}>
                Yes
              </option>
              <option key="no" value={false}>
                No
              </option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="breathingDifficulty">
              Are you having difficulty breathing?{" "}
            </label>
            <select
              id="breathingDifficulty"
              value={symptons.breathingDifficulty}
              onChange={e =>
                setSymptons({
                  ...symptons,
                  breathingDifficulty: e.target.value
                })
              }
            >
              <option key="yes" value={true}>
                Yes
              </option>
              <option key="no" value={false}>
                No
              </option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="diabetes">Do you have a history of diabetes?</label>
            <select
              id="diabetes"
              value={symptons.diabetes}
              onChange={e =>
                setSymptons({
                  ...symptons,
                  diabetes: e.target.value
                })
              }
            >
              <option key="yes" value={true}>
                Yes
              </option>
              <option key="no" value={false}>
                No
              </option>
            </select>
          </div>
        </div>
        <div className="fieldrow">
          <div className="field">
            <label htmlFor="heartDisease">
              Do you have a history of cardiovascular or heart disease?
            </label>
            <select
              id="heartDisease"
              value={symptons.heartDisease}
              onChange={e =>
                setSymptons({
                  ...symptons,
                  heartDisease: e.target.value
                })
              }
            >
              <option key="yes" value={true}>
                Yes
              </option>
              <option key="no" value={false}>
                No
              </option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="possibleInteraction">
              Do you believe you may have been exposed to someone with COVID-19?
            </label>
            <select
              id="possibleInteraction"
              value={symptons.possibleInteraction}
              onChange={e =>
                setSymptons({
                  ...symptons,
                  possibleInteraction: e.target.value
                })
              }
            >
              <option key="yes" value={true}>
                Yes
              </option>
              <option key="no" value={false}>
                No
              </option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="immuneCheck">
              Do you have a history of decreased immunity? for example, cancer,
              HIV, or medication side effects
            </label>
            <select
              id="immuneCheck"
              value={symptons.immuneCheck}
              onChange={e =>
                setSymptons({
                  ...symptons,
                  immuneCheck: e.target.value
                })
              }
            >
              <option key="yes" value={true}>
                Yes
              </option>
              <option key="no" value={false}>
                No
              </option>
            </select>
          </div>
        </div>
        <div className="field">
          <label htmlFor="severity">How severe are your symptoms?</label>
          &nbsp;&nbsp;
          <select
            value={symptons.severity}
            onChange={e =>
              setSymptons({
                ...symptons,
                severity: e.target.value
              })
            }
          >
            <option key="mild" value="mild">
              Mild
            </option>
            <option key="moderate" value="moderate">
              Moderate
            </option>
            <option key="severe" value="severe">
              Severe
            </option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="treatment">
            Are you willing to talk to a doctor online?
          </label>
          &nbsp;&nbsp;
          <select
            value={symptons.treatment}
            onChange={e =>
              setSymptons({
                ...symptons,
                treatement: e.currentTarget.value
              })
            }
          >
            <option key="yes" value={true}>
              Yes
            </option>
            <option key="no" value={false}>
              No
            </option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="tracking">
            Are you willing to report your location? we will provide you rewards
            aggregated from people who are subscribing to the map.
          </label>
          &nbsp;&nbsp;
          <select
            value={tracking}
            onChange={e => setTracking(e.currentTarget.value)}
          >
            <option key="yes" value={true}>
              Yes
            </option>
            <option key="no" value={false}>
              No
            </option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="interval">
            How often are you willing to provide your location?
          </label>
          <select
            value={interval}
            onChange={e => setInterval(e.currentTarget.value)}
          >
            {Object.keys(REPORT_INTERVALS).map((key, i) => {
              return (
                <option
                  key={REPORT_INTERVALS[key].value}
                  value={REPORT_INTERVALS[key].value}
                >
                  {REPORT_INTERVALS[key].label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="field">
          <label htmlFor="startDate">When did you start feeling sick?</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            onChange={e =>
              setSymptons({
                ...symptons,
                startDate: e.currentTarget.value
              })
            }
          />
        </div>
        {/* <div className="field">
          <label htmlFor="name">Phone number</label>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Your phone"
            value={phone}
            onChange={e => setPhone(e.currentTarget.value)}
          />
        </div> */}
        {user && !user.phoneNumber && (
          <PhoneAuth savePhone={val => setPhone(val)} />
        )}
        <div className="field">
          <label htmlFor="quarantineLocation">
            Where are you planning to quarantine at (Home)? Please let us know
            so we can make sure we hide you from the map when you're home.
          </label>
          <br />
          <br />

          <FormMapComponent
            updateLocation={value => {
              console.log(value);
              setPrivateLocation(value);
              setSymptons({ ...symptons });
            }}
            id="quarantineLocation"
          />
        </div>
        <div className="field">
          <button type="submit" className="btn" disabled={loading}>
            Submit Sick Record
          </button>
        </div>
      </form>
    </div>
  );
};
