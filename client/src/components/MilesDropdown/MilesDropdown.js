import Dropdown from 'react-dropdown'
import '../FilterDropdown/FilterDropdown.css'
import React, { Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../state/actions/actions';

const options = [ '0.5', '1', '2', '3', '4', '5', '10' ];


class MilesDropdown extends Component {
  constructor (props) {
    super(props)

    this.state = {
        value: '5'
      }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value){

    this.setState({
        value: value.value
      })

    console.log(value.value);

    this.props.actions.setMiles(value.value);
    const obj = {lat: this.props.centerOn.lat, long: this.props.centerOn.lng, miles: value.value, timeFilter: this.props.centerOn.timeFilter}
    this.props.actions.fetchData(obj);
  };

  render () {

    const defaultOption = options[0]
    const { value } = this.state

    return (
      <div className='filter-dropdown'>
        <Dropdown options={options} onChange={this.handleChange} value={`${value} km`} placeholder="Select an option" />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(MilesDropdown);