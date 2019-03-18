import React from 'react';
import './AccordionItem.css';


export default function AccordionItem(props){
    const { name, city, deals, website, location } = props.data;

    const distance = props.calcDistance(props.currentLocation, location.coordinates);

    return (
      <div className="accordionItemWrapper" onClick={() => props.onClick(props.data)}>
        { name && <div className="itemName">{name}</div> }
        { city && <div className="itemLocation">{city}</div> }
        { deals[0].description && <div className="itemDescription">{deals[0].description}</div> }
        { deals[0].endTime && <div className="itemLocation">{deals[0].startTime} - {deals[0].endTime}</div> }
        { website && <div className="itemLocation"><a href={website}>Website</a></div> }
        { distance && <div className="itemLocation">{distance}</div> }
      </div>
    );

}
