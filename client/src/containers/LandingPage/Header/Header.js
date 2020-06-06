import React, { Component } from "react";
import "./Header.css";
import hh_logo from "../../images/WhiteLogo.png";
import { Link } from "react-router-dom";
import Burger from "./Burger/Burger";
import Aux from "../../../hoc/Aux/Aux";

class header extends Component {
  state = {
    displayMobileHeader: false,
  };

  handleBurgerClick = () => {
    this.setState((prevState) => {
      return { displayMobileHeader: !prevState.displayMobileHeader };
    });
  };

  
  render() {
    const classes = ["Header"];
    this.state.displayMobileHeader ? classes.push("ToggleActive") : null;
    return (
      <div className={classes.join(" ")}>
        <img
          src={hh_logo}
          alt="Hapihour Logo"
          onClick={() => {
            this.props.history.push(`/`);
          }}
        />
        <Burger clicked={this.handleBurgerClick} />
        {this.state.displayMobileHeader ? (
          <div className="HeaderMobile">
            <Link className="MobileItem" to={`/faq`}>Contact</Link>
            <Link className="MobileItem" to={`/faq`}>FAQ</Link>
            <div className="dropdown MobileItem">
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
        ) : null}

        <Aux>
          <Link className="HeaderItem" to={`/faq`}>
            FAQ
          </Link>
          <div className="HeaderItem dropdown">
            <button className="dropbtn">
              Locations
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <Link to={`/map/leeds`}>Leeds</Link>
              <Link to={`/map/clapham`}>London Clapham</Link>
            </div>
          </div>
        </Aux>
      </div>
    );
  }
}

export default header;
