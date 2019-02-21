import React from 'react';
import './Accordian.css';


export default function AccordianItem(props){

    const { name, description, city } = props.data;

    return (
      <div className="tab-contents-single accordianItemWrapper" onClick={() => props.onClick(props.data)}>
        <div className="itemLocation">{name}</div>
        <div className="itemDate">{description}</div>
        <div className="itemDate">{city}</div>
      </div>
    );

}
