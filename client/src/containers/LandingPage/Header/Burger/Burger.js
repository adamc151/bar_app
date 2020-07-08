import React from 'react';

import './Burger.css';

const burger = (props) => (
  <div onClick={props.clicked} className={"Burger " + props.themeColour}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default burger;