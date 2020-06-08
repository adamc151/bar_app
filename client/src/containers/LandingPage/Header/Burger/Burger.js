import React from 'react';

import classes from './Burger.css';

const burger = (props) => (
  <div onClick={props.clicked} className="Burger">
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default burger;