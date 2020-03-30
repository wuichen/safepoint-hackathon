import React, { useEffect, useState } from "react";
import { TypedText } from "../UI";
import ReportMap from "../Mapbox/ReportMap";
import { useLocation } from "../../hooks/useLocation";
import { useParams } from "react-router-dom";
import { useHistory, Link, Redirect } from "react-router-dom";
import { ROUTES } from "../../constants";
import { auth } from "../../firebase";

export const Report = () => {
  const { ipData, getCurrentPosition, center, getIpData } = useLocation();
  const [user, setUser] = useState(null);
  const { token, record_id } = useParams();
  console.log(record_id);
  useEffect(() => {
    if (token && !user) {
      auth.signInWithCustomToken(token).then(async user => {
        getIpData();
        setUser(user);
      });
    } else {
      // return <Redirect to={ROUTES.DASHBOARD} />;
    }
  }, [token, getIpData, user]);

  console.log(ipData);
  return (
    <div className="route-map" data-testid="route-map">
      <ReportMap record_id={record_id} ipData={ipData} />
      {/* <div className="container">
        <div className="hero">
          <div className="hero-column hero-column-alpha">
            <h2 className="hero-title">Roll Your Own Subscription Website</h2>
            <p className="hero-description">
              <span className="hero-description-highlight">100% free</span>,
              open source software for those who don't mind getting their hands
              a little dirty.
            </p>
          </div>
          <div className="hero-column hero-column-alpha">
            <div className="faux-pricing">
              <div className="faux-pricing-item">
                <div className="faux-pricing-item-header">
                  <h2 className="faux-pricing-item-title">Starter</h2>
                  <h3 className="faux-pricing-item-price">$5 / month</h3>
                  <p className="faux-pricing-item-description">
                    The perfect starter package.
                  </p>
                </div>
                <ul className="faux-pricing-item-features">
                  <li>Some features.</li>
                  <li>Plus more features.</li>
                  <li>Features, features, features!</li>
                </ul>
                <p>
                  <button className="faux-pricing-item-btn" disabled={true}>
                    Get Started
                  </button>
                </p>
              </div>
              <div className="faux-pricing-item">
                <div className="faux-pricing-item-header">
                  <h2 className="faux-pricing-item-title">Pro</h2>
                  <h3 className="faux-pricing-item-price">$10 / month</h3>
                  <p className="faux-pricing-item-description">
                    <TypedText
                      initialText="A good choice."
                      finalText="Perfect for shakers, bakers, and money makers."
                    />
                  </p>
                </div>
                <ul className="faux-pricing-item-features">
                  <li>Bunches of features.</li>
                  <li>Includes the starter features.</li>
                  <li>Plus even more features.</li>
                  <li>We're crazy about features.</li>
                  <li>Features, features, features!</li>
                </ul>
                <p>
                  <button className="faux-pricing-item-btn" disabled={true}>
                    Get Started
                  </button>
                </p>
              </div>
              <div className="faux-pricing-item">
                <div className="faux-pricing-item-header">
                  <h2 className="faux-pricing-item-title">Enterprise</h2>
                  <h3 className="faux-pricing-item-price">$19 / month</h3>
                  <p className="faux-pricing-item-description">
                    Better ask the board first.
                  </p>
                </div>
                <ul className="faux-pricing-item-features">
                  <li>All the features.</li>
                  <li>Plus more features.</li>
                  <li>Features, features, features!</li>
                </ul>
                <p>
                  <button className="faux-pricing-item-btn" disabled={true}>
                    Get Started
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section section-bg-white">
        <div className="container">
          <h2 className="text-center">
            With our easy to follow instructions you'll be up and running fast.
          </h2>
        </div>
      </div> */}
    </div>
  );
};
