import React from "react";
import location from "../../icons/pin.png";
import calendar from "../../icons/calendar2.png";
import discoverIcon from "../../icons/discover.png";
import "./HowItWorks.css";

const howItWorks = () => {
  return (
    <div className="HowItWorksColourWrapper">
      <div className="HowItWorks">
        {/* <div className="HowItWorksTitle">How it works</div> */}
        <div className="HowItWorksWrapper">
          <div className="HowItWorksItem">
            <img
              className="HowItWorksItemImg"
              alt="location"
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
              alt="calendar"
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
              alt="beers"
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
  );
};

export default howItWorks;
