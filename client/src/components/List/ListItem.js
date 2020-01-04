import React from "react";
import "./ListItem.css";
import locationIcon from "./placeholder.png";
import sadFace from "./sad.png";
import bar from "./deafultBarImg.jpg";
import { withRouter } from "react-router";
import Image from '../Image/Image';

const ListItem = (props) => {
  const { onHover = () => { }, onClick = () => { }, data } = props;
  const { name, deals, imgUrl, imgUrls = [], place_id } = data;

  return !data == "" ? (
    <div
      className={`listItemWrapper carouselCard toggle${deals[0].category}`}
      onClick={() => {
        props.history.push(`/details/${place_id}`);
        onClick();
      }}
      onMouseEnter={() => {
        onHover(props.data);
      }}
    >
      <Image src={imgUrls[0] || imgUrl || bar} className="barImg" alt="" />
      {name && <div className="itemName"><img src={locationIcon} className="titleIconInside" alt="" />{name}</div>}
      {deals[0].category && <div className={`item${deals[0].category} itemCategory`}>{deals[0].category}</div>}
      {deals[0].description && (<div className="itemDescription">{deals[0].description.join(' • ')}</div>)}
      {deals[0].category === "Now" && deals[0].endTime && (<div className="itemTime">Ends at {deals[0].endTime}</div>)}
      {deals[0].category === "Upcoming" && deals[0].endTime && (<div className="itemTime">Starts at {deals[0].startTime}</div>)}
      {deals[0].category === "Inactive" && deals[0].endTime && (<div className="itemTime">Finished at {deals[0].endTime}</div>)}
    </div>
  ) : (
      <div className={`listItemWrapper carouselCard`}>
        <div className="emptyListContainer-mobile">
          <div className="empty-display-mobile">
            <img src={sadFace} className="empty-icon-mobile" alt="sadFace" />
            <div className="empty-text-mobile">No Hapihours in this area today</div>
            <div className="empty-text-mobile2">Search for a location to add a hapihour or <a href="https://twitter.com/hapihour_io">Tweet us</a></div>
          </div>
        </div>
      </div>
    );
}

export default withRouter(ListItem);
