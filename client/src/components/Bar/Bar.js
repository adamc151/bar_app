import React from "react";
import "./Bar.css";
import bar from "../List/deafultBarImg.jpg";

import Deal from "./Deal";
import Image from '../Image/Image';

class Bar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      imageLoading: true
    }

    const googleId = window.location.pathname.split("/").pop()
    this.props.fetchOne(googleId);
  }

  renderBar() {

    let details = this.props.singleBar;
    if (!details || details.name === undefined || !details.name || details.name === '') return null;


    return (
      <div className="detailsWrapper">
        <Image src={details.imgUrl || bar} className="barDetailsImage" />
        <div className="detailsTextWrapper">
          {details.name && <div className="detailsName">{details.name}</div>}
          {details.address && <div className="detailsAddress">{details.address}</div>}
          {details.website && <a href={details.website} className="detailsWebsite">Website</a>}
          {/* {<div className="line">--</div>} */}
          {<div className="dealsTitle">Today's Deals</div>}
          {this.renderTodayDeals()}
          { this.props.singleBar.otherDeals[0] && <div className="dealsTitle">Other Deals</div>}
          { this.props.singleBar.otherDeals[0] && this.renderOtherDeals()}
        </div>
      </div>
    );
  }

  renderTodayDeals(){

    let details = this.props.singleBar;
    if (details.name === undefined || !details.name || details.name === '') return null;

    // console.log(`deals: ${JSON.stringify(details.otherDeals)}`);

    return details.deals.map((data, i) => {
        return (
          <Deal
            key={i}
            index={i}
            data={data}
          />
        );
      });
  }

  renderOtherDeals(){

    let details = this.props.singleBar;
    if (details.name === undefined || !details.name || details.name === '') return null;

    return details.otherDeals.map((data, i) => {
        return (
          <Deal
            key={i}
            index={i}
            data={data}
          />
        );
      });
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    return this.renderBar();
  }
}

export default Bar;
