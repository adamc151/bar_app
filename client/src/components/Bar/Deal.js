import React from "react";
import "./Deal.css";
var abbrevDays = require('abbrev-weekday-range');

class Deal extends React.Component {

  constructor(props) {
    super(props);
  }

  renderDeals(description){

    return description.map((data, i) => {
        return (
          <div className="dealClass">{`• ${data}`}</div>
        );
      });
  }

  render() {

    const { category, endTime, startTime, description, weekDays } = this.props.data;
    // let weekDaysArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let weekDayFinal = abbrevDays(weekDays);
    weekDayFinal == "Sun-Sat" ? weekDayFinal = "Everyday" : null;
    console.log(weekDayFinal);
    // weekDays.map((data)=>{weekDayFinal.push(weekDaysArray[data]);});

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

