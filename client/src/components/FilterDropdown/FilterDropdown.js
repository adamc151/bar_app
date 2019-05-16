import Dropdown from "react-dropdown";
import "./FilterDropdown.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../state/actions/actions";

const options = ["Now", "Upcoming", "All"];

class FilterDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "Now"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeWeb = this.handleChangeWeb.bind(this);
    this.handleChangeNative = this.handleChangeNative.bind(this);
  }

  handleChange(value) {
    const { centerCoordinates, miles, actions } = this.props;
    const { setTimeFilter, fetchData } = actions;

    this.setState({
      value: value
    });

    setTimeFilter(value);
    const obj = {
      lat: centerCoordinates[0],
      long: centerCoordinates[1],
      miles,
      timeFilter: value
    };
    fetchData(obj);
  }

  handleChangeWeb(value) {
    this.handleChange(value.value);
  }

  handleChangeNative(e) {
    const value = e.target.value;
    this.handleChange(value);
  }

  render() {
    const { value } = this.state;

    return (
      <div className="filter-dropdown">
        <div className="webDropdown">
          <Dropdown
            options={options}
            onChange={this.handleChange}
            value={value}
            placeholder="Select an option"
          />
        </div>
        <div className="nativeDropdown Dropdown-root">
          <div class="Dropdown-control" aria-haspopup="listbox">
            <select
              onChange={this.handleChangeNative}
              className="mySelect Dropdown-placeholder"
            >
              {options.map(option => {
                return <option value={option}>{option}</option>;
              })}
            </select>
            <div class="Dropdown-arrow-wrapper">
              <span class="Dropdown-arrow" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(FilterDropdown);
