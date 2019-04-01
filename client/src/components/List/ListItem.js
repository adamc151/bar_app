import React from "react";
import "./ListItem.css";

export default function ListItem(props) {
  const { name, city, deals, website } = props.data;

  return (
    <div
      className="listItemWrapper"
      onClick={() => props.onClick(props.data)}
      onMouseEnter={() => {
        console.log("onmouseover");
        props.onHover(props.data);
      }}
    >
      {name && <div className="itemName">{name}</div>}
      {city && <div className="itemLocation">{city}</div>}
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