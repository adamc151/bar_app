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
              <div className="HowItWorksItemTitle">
                Find your location
              </div>
              <p>
                Search for an area you want to see happy hour deals for, or
                provide your current location.
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
              <div className="HowItWorksItemTitle">
                See today's deals
              </div>
              <p>
                See currently active happy hours & any upcoming deals you might be interested in
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
              <div className="HowItWorksItemTitle">
                Discover nearby bars
              </div>
              <p>
                Find out more about the bars offering great deals throughout the
                city.
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
