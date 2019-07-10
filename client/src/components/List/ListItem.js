import React from "react";
import "./ListItem.css";
import locationIcon from "./placeholder.png";
import barImg from "./bar.jpg";

export default function ListItem(props) {
  const { onHover = () => {}, onClick = () => {}, data, className } = props;
  const { name, city, deals, website, imgUrl } = data;

  return (
    <div
      className={`listItemWrapper ${className} toggle${deals[0].category}`}
      onClick={() => onClick(props.data)}
      onMouseEnter={() => {
        onHover(props.data);
      }}
    >
      {<img src={imgUrl} className="barImg" alt="" />}
      {<img src={locationIcon} className="titleIcon" alt="" />}
      {name && <div className="itemName">{name}</div>} 
      {deals[0].category && <div className={ `item${deals[0].category} itemCategory`}>{deals[0].category}</div>}
      {/* {deals[0].category == "Inactive" && <div className={ `item${deals[0].category} itemCategory`}>{deals[0].category}</div>} */}
      {deals[0].description && (<div className="itemDescription">{deals[0].description}</div>)}
      {deals[0].category == "Now" && deals[0].endTime && (<div className="itemTime">Ends at {deals[0].endTime}</div>)}
      {deals[0].category == "Upcoming" && deals[0].endTime && (<div className="itemTime">Starts at {deals[0].startTime}</div>)}
      {deals[0].category == "Inactive" && deals[0].endTime && (<div className="itemTime">Finished at {deals[0].endTime}</div>)}
      {/* {deals[0].endTime && (<div className="itemLocation">{deals[0].startTime} - {deals[0].endTime}</div>)} */}
      {/* {website && (<div className="itemLocation"><a href={website}>Website</a></div>)} */}
    </div>
  );
}
