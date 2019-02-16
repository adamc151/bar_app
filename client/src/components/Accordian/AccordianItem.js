import React from 'react';
import './Accordian.css';


export default function AccordianItem(props){

    const { name, _id } = props.data;

    return (
      <div className="tab-contents-single accordianItemWrapper">
        <div className="itemLocation">Name: {name}</div>
        <div className="itemDate">_id: {_id}</div>
      </div>
    );

}
