import React from "react";
import "./ListItem.css";
import locationIcon from "./placeholder.png";
import sadFace from "./sad.png";

export default function ListItem(props) {
  const { onHover = () => {}, onClick = () => {}, data, className } = props;
  const { name, city, deals, website, imgUrl } = data;

  return !data=="" ? (
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
      {deals[0].description && (<div className="itemDescription">{deals[0].description.join(' • ')}</div>)}
      {deals[0].category == "Now" && deals[0].endTime && (<div className="itemTime">Ends at {deals[0].endTime}</div>)}
      {deals[0].category == "Upcoming" && deals[0].endTime && (<div className="itemTime">Starts at {deals[0].startTime}</div>)}
      {deals[0].category == "Inactive" && deals[0].endTime && (<div className="itemTime">Finished at {deals[0].endTime}</div>)}
    </div>
  ) : (
    <div className={`listItemWrapper ${className}`}>
       <div className="emptyListContainer-mobile">
        <div className="empty-display-mobile">
          <img src={sadFace} className="empty-icon-mobile" alt="sadFace" />
          <div className="empty-text-mobile">No Hapihours in this area today</div>
          <div className="empty-text-mobile2">Search for a location to add a hapihour</div>
          {/* <div className={`itemUpcoming itemCategory`}>No Hapihours in this area today</div> */}
        </div>
      </div>
    </div>
  );
}
