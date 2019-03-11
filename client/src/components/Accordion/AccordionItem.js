import React from 'react';
import './AccordionItem.css';


export default function AccordionItem(props){
    const { name, city, deals } = props.data;

    return (
      <div className="accordionItemWrapper" onClick={() => props.onClick(props.data)}>
        { name && <div className="itemName">{name}</div> }
        { city && <div className="itemLocation">{city}</div> }
        { deals[0].description && <div className="itemDescription">{deals[0].description}</div> }
        { deals[0].endTime && <div className="itemLocation">Ends at: {deals[0].endTime}</div> }
      </div>
    );

}
