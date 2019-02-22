import React from 'react';
import './AccordionItem.css';


export default function AccordionItem(props){

    const { name, description, city } = props.data;

    return (
      <div className="accordionItemWrapper" onClick={() => props.onClick(props.data)}>
        { name && <div className="itemName">{name}</div> }
        { city && <div className="itemLocation">{city}</div> }
        { description && <div className="itemDescription">{description}</div> }
      </div>
    );

}
