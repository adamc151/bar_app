import React from "react";
import "./ListItem.css";
import locationIcon from "./placeholder.png";

export default function ListItem(props) {
  const { onHover = () => {}, onClick = () => {}, data, className } = props;
  const { name, city, deals, website } = data;

  return (
    <div
      className={`listItemWrapper ${className}`}
      onClick={() => onClick(props.data)}
      onMouseEnter={() => {
        console.log("onmouseover");
        onHover(props.data);
      }}
    >
    {<img src={locationIcon} className="titleIcon" alt="" />}
    {name && <div className="itemName">{name}</div>} 
      {deals[0].category && <div className="itemLocation">{deals[0].category}</div>}
      {deals[0].description && (
        <div className="itemDescription">{deals[0].description}</div>
      )}
      {deals[0].endTime && (
        <div className="itemLocation">
          {deals[0].startTime} - {deals[0].endTime}
        </div>
      )}
      {website && (
        <div className="itemLocation">
          <a href={website}>Website</a>
        </div>
      )}
    </div>
  );
}
