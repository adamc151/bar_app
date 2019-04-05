import Dropdown from "react-dropdown";
import "../FilterDropdown/FilterDropdown.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../state/actions/actions";

const options = ["0.5", "1", "2", "3", "4", "5", "10"];

class MilesDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "5"
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    const { centerCoordinates, timeFilter, actions } = this.props;
    const { setMiles, fetchData } = actions;

    this.setState({
      value: value.value
    });

    setMiles(value.value);
    const obj = {
      lat: centerCoordinates[0],
      long: centerCoordinates[1],
      miles: value.value,
      timeFilter
    };
    fetchData(obj);
  }

  render() {
    const { value } = this.state;

    return (
      <div className="filter-dropdown">
        <Dropdown
          options={options}
          onChange={this.handleChange}
          value={`${value} miles`}
          placeholder="Select an option"
        />
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
)(MilesDropdown);
