import React from "react";
import location from "../../icons/pin.png";
import calendar from "../../icons/calendar2.png";
import discoverIcon from "../../icons/discover.png";
import "./HowItWorks.css";

const howItWorks = () => {
  return (
    <div>
      <div className="HowItWorksColourWrapper">
        <div className="HowItWorks">
          <div className="HowItWorksTitle">How to enjoy hapihour</div>
          <div className="HowItWorksWrapper">
            <div className="HowItWorksItem">
              <img
                className="HowItWorksItemImg"
                alt="Happy hour location"
                src={location}
              />
              <div className="HowItWorksText">
                <div className="HowItWorksItemTitle">Find Your Location</div>
                <p>
                  Choose from Leeds and London or search for an area you want to
                  see happy hour deals for
                </p>
              </div>
            </div>
            <div className="HowItWorksItem">
              <img
                className="HowItWorksItemImg"
                alt="Calendar Days"
                src={calendar}
              />
              <div className="HowItWorksText">
                <div className="HowItWorksItemTitle">See Today's Deals</div>
                <p>
                  See currently active happy hours & any upcoming deals you
                  might be interested in
                </p>
              </div>
            </div>
            <div className="HowItWorksItem">
              <img
                className="HowItWorksItemImg"
                alt="Discover Deals"
                src={discoverIcon}
              />
              <div className="HowItWorksText">
                <div className="HowItWorksItemTitle">Discover Nearby Bars</div>
                <p>
                  Support local bars, pubs and resturants by discovering what
                  they have to offer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="HowItWorksCurve"></div>
    </div>
  );
};

export default howItWorks;
