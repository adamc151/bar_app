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
    this.handleChangeWeb = this.handleChangeWeb.bind(this);
    this.handleChangeNative = this.handleChangeNative.bind(this);
  }
  componentDidMount() {
    this.select.value = this.state.value;
  }

  handleChange(value) {
    const { centerCoordinates, timeFilter, actions } = this.props;
    const { setMiles, fetchData } = actions;

    this.setState({
      value: value
    });

    setMiles(value);
    const obj = {
      lat: centerCoordinates[0],
      long: centerCoordinates[1],
      miles: value,
      timeFilter
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
            onChange={this.handleChangeWeb}
            value={`${value} miles`}
            placeholder="Select an option"
          />
        </div>
        <div className="nativeDropdown Dropdown-root">
          <div class="Dropdown-control" aria-haspopup="listbox">
            <select
              ref={node => (this.select = node)}
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
)(MilesDropdown);
