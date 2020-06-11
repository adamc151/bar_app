import React from "react";
import "./Donation.css";

const donation = () => (
  <div className="donationWrapper">
    <div className="donationItem">
      <div className="">
        <div className="donationItemTitle">Buy us a round?</div>
        <div className="donationItemDesc">
          Hapihour is a free, self-funded service. If you think hapihour is
          useful, maybe buy us a coffee/beer to keep us going?
        </div>
      </div>
      <a href={"https://paypal.me/hapihour/3.5"}>
        <img
          alt="Paypal Donation"
          className=""
          src={"https://img.shields.io/badge/Donate-PayPal-orange.svg"}
        />
      </a>
    </div>
  </div>
);

export default donation;
