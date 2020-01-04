import React from "react";
import "./Deal.css";
var abbrevDays = require('abbrev-weekday-range');

class Deal extends React.Component {

  renderDeals(description){

    return description.map((data, i) => {
        return (
          <div className="dealClass">{`• ${data}`}</div>
        );
      });
  }

  render() {

    const { category, endTime, startTime, description, weekDays } = this.props.data;
    let weekDayFinal = abbrevDays(weekDays);
    weekDayFinal === "Sun-Sat" ? weekDayFinal = "Everyday" : null;

    return (
      <div
        className={`dealWrapper`}
      >
        {weekDays && (<div className="detailsDays">{weekDayFinal}</div>)}
        {endTime && (<div className="detailsTime">{startTime} - {endTime}</div>)}
        {category && <div className={ `details${category} detailsCategory`}>{category}</div>}
        {this.renderDeals(description)}
      </div>
  );
  }
}

export default Deal;

