import React from "react";
import "./Preview.css";
import MobilePreview from "../../images/iphoneX.png";
import DesktopPreview from "../../images/laptop.png";
import LaptopMobileCombo from "../../images/laptop_iphone_combo.png";

const preview = () => {
  return (
    <div className="Preview">
      {/* <div className="row">
        <div className="PreviewTitle">Say "Hello" to a Simple Interface</div>
      </div> */}
      <div className="row">
        <div className="column">
          <div className="PreviewText">
            <div>A simple app that gets right to the point</div>
            <p>
              The closest happy hours are displayed on a map with deals that are
              easy to read and compare. No more endless clicking and scrolling while 
              trying to find what you actually came for.
            </p>
          </div>
        </div>
        <div className="double-column">
          <div className="PreviewImages">
            <img className="ComboImage" src={LaptopMobileCombo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default preview;
