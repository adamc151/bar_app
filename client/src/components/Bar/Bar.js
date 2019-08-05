import React from "react";
import "./Bar.css";
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

    console.log("Single bar page");
    console.log(details.deals[0]);
    
    return (
      <div className="detailsWrapper"> 
        {/* {this.props.singleBar && (<div className="">{JSON.stringify(this.props.singleBar)}</div>)} */}
        {<img src={details.imgUrl} className="detailsImg" alt="" />}
        {details.name && <div className="detailsName">{details.name}</div>}
        {details.address && <div className="detailsAddress">{details.address}</div>}
        {details.website && <a href={details.website} className="detailsWebsite">Website</a>}
        {<div className="line">--</div>}
        {<div className="dealsTitle">Deals</div>}
        {this.renderDeals()}
        {<div className="bottomText">Something wrong with this listing?</div>}
        {<div className="bottomText">Send us a message here</div>}
        {/* {details.deals[0].category && <div className={ `details${details.deals[0].category} detailsCategory`}>{details.deals[0].category}</div>}
        {details.deals[0].description && (<div className="detailsDescription">{`• ${details.deals[0].description.join(' • ')}`}</div>)}
        {details.deals[0].endTime && (<div className="detailsTime">{details.deals[0].startTime} - {details.deals[0].endTime}</div>)} */}
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
    return (<div className="BarContainer">{this.renderBar()}</div>);
  }
}

export default Bar;
