import Dropdown from 'react-dropdown'
import './FilterDropdown.css'
import React, { Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../state/actions/actions';

const options = [ 'Now', 'Upcoming', 'All' ]


class FilterDropdown extends Component {
  constructor (props) {
    super(props)

    this.state = {
        value: 'Now'
      }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value){

    this.setState({
        value: value
      })

    console.log(value.value);
    this.props.actions.setTimeFilter(value.value);
    const obj = {lat: this.props.centerOn.lat, long: this.props.centerOn.lng, miles: this.props.centerOn.miles, timeFilter: value.value}
    this.props.actions.fetchData(obj);
  };

  render () {

    const defaultOption = options[0]
    const { value } = this.state

    return (
      <div className='filter-dropdown'>
        <Dropdown options={options} onChange={this.handleChange} value={value} placeholder="Select an option" />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(FilterDropdown);