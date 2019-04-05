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
  }

  handleChange(value) {
    const { centerCoordinates, miles, actions } = this.props;
    const { setTimeFilter, fetchData } = actions;

    console.log("centerCoordinates", centerCoordinates);
    console.log("miles", miles);

    this.setState({
      value: value
    });

    setTimeFilter(value.value);
    const obj = {
      lat: centerCoordinates[0],
      long: centerCoordinates[1],
      miles,
      timeFilter: value.value
    };
    fetchData(obj);
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
              onChange={this.handleChange}
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
