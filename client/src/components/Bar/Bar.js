import React from "react";
import "./Bar.css";

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
      <div> 
        {/* {this.props.singleBar && (<div className="">{JSON.stringify(this.props.singleBar)}</div>)} */}
        {<img src={details.imgUrl} className="detailsImg" alt="" />}
        {details.name && <div className="detailsName">{details.name}</div>}
        {details.website && <div href={details.website} className="detailsWebsite">Website</div>}
        {details.deals[0].category && <div className={ `details${details.deals[0].category} detailsCategory`}>{details.deals[0].category}</div>}
        {details.deals[0].description && (<div className="detailsDescription">{`• ${details.deals[0].description.join(' • ')}`}</div>)}
        {details.deals[0].endTime && (<div className="detailsTime">{details.deals[0].startTime} - {details.deals[0].endTime}</div>)}
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    return (<div className="BarContainer">{this.renderBar()}</div>);
  }
}

export default Bar;
