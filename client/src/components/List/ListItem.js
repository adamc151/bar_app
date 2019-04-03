import React from "react";
import "./ListItem.css";

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
