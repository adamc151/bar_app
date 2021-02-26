import React, { useEffect, useRef, useState } from "react";
import "./ListItem.css";
import locationIcon from "./placeholder.png";
import announcementIcon from "../../containers/icons/announcement.png";
import sadFace from "./sad.png";
import bar from "./deafultBarImg.jpg";
import { withRouter } from "react-router";
import Image from '../Image/Image';
import { Link } from "react-router-dom";

// Hook
function usePrevious(value) {
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}


const ListItem = (props) => {

  const lineItem = useRef(null);

  const { onHover, onClick = () => { }, data, isSelected, carouselSlide, index } = props;
  const { name, deals, imgUrl, imgUrls = [], place_id, announcement } = data;

  const prevCarouselSlide = usePrevious(carouselSlide);

  useEffect(() => {
    if (onHover && carouselSlide !== null && prevCarouselSlide !== index && carouselSlide == index) {
      !props.isInViewport && lineItem.current && lineItem.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [props.onHover])

  return !data == "" ? (
    <div ref={lineItem} className={`hoverWrapper hovered${onHover && isSelected} ${onHover ? 'doHover' : ''}`}>
      <Link
        className={`listItemWrapper carouselCard toggle${deals[0].category} removeBorder${onHover && isSelected}`}
        to={`/details/${place_id}`}
        onClick={() => {
          onClick();
        }}
        onMouseEnter={() => {
          onHover && onHover(data);
        }}

      >
        <div className="barImg">
          <Image src={imgUrls[0] || imgUrl || bar} className="barImg" alt={name} />
        </div>

        {name && <div className="itemName"><img src={locationIcon} className="titleIconInside" alt="location icon" />{name}</div>}
        {deals[0].category && <div className={`item${deals[0].category} itemCategory`}>{deals[0].category}</div>}

        <div className="descriptionAndTime">
          {deals[0].description && (<div className="itemDescription">{deals[0].description.join(' • ')}</div>)}
          {deals[0].category == "Now" && deals[0].endTime && (<div className="itemTime">Ends at {deals[0].endTime}</div>)}
          {deals[0].category == "Upcoming" && deals[0].endTime && (<div className="itemTime">Starts at {deals[0].startTime}</div>)}
          {deals[0].category == "Inactive" && deals[0].endTime && (<div className="itemTime">Finished at {deals[0].endTime}</div>)}
        </div>

        {announcement && <img className="ListItemAnnouncement" src={announcementIcon} alt="Announcement Icon" />}

      </Link>
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