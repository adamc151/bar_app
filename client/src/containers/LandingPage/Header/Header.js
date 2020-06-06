import React from "react";
import "./Header.css";
import hh_logo from "../../images/WhiteLogo.png";
import { Link } from "react-router-dom";
import Burger from './Burger/Burger';

const header = (props) => (
  <div className="Header">
    <img src={hh_logo} alt="Hapihour Logo" onClick={() => { props.history.push(`/`);}} />
    <Burger/>
    <Link to={`/faq`}>FAQ</Link>
    <div className="dropdown">
      <button className="dropbtn">
        Locations
        <i className="fa fa-caret-down"></i>
      </button>
      <div className="dropdown-content">
        <Link to={`/map/leeds`}>Leeds</Link>
        <Link to={`/map/clapham`}>London Clapham</Link>
      </div>
    </div>
  </div>
);

export default header;
