import React from "react";
import "./Bar.css";
import bar from "../List/deafultBarImg.jpg";

import Deal from "./Deal";

class Bar extends React.Component {

  constructor(props) {
    super(props);
    const googleId = window.location.pathname.split("/").pop()
    this.props.fetchOne(googleId);
  }

  renderBar() {

    let details = this.props.singleBar;
    if (details.name == undefined || !details.name || details.name == '') return null;

    return (
      <div className="detailsWrapper">
        {<img src={details.imgUrl || bar} className="detailsImg" alt="" />}
        <div className="detailsTextWrapper">
          {details.name && <div className="detailsName">{details.name}</div>}
          {details.address && <div className="detailsAddress">{details.address}</div>}
          {details.website && <a href={details.website} className="detailsWebsite">Website</a>}
          {/* {<div className="line">--</div>} */}
          {<div className="dealsTitle">Deals</div>}
          {this.renderDeals()}
        </div>
      </div>
    );
  }

  renderDeals(){

    let details = this.props.singleBar;
    if (details.name == undefined || !details.name || details.name == '') return null;

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

  componentWillReceiveProps(nextProps) {}

  render() {
    return this.renderBar();
  }
}

export default Bar;
