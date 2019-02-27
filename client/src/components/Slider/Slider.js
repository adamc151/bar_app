import React, { Component } from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../state/actions/actions';

class HorizontalSlider extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      value: 5
    }
  }

  handleChangeStart = () => {
    console.log('Change event started')
  };

  handleChange = value => {
    this.setState({
      value: value
    })
  };

  handleChangeComplete = () => {
    console.log('Change event completed')
    console.log(this.state.value);
    this.props.actions.setMiles(this.state.value);
    const obj = {lat: this.props.centerOn.lat, long: this.props.centerOn.lng, miles: this.state.value}
    this.props.actions.fetchData(obj);
  };



  render () {
    const { value } = this.state
    return (
      <div className='slider'>
        <Slider
          min={0}
          max={10}
          value={value}
          onChangeStart={this.handleChangeStart}
          onChange={this.handleChange}
          onChangeComplete={this.handleChangeComplete}
        />
        <div className='value'>{value}</div>
      </div>
    )
  }
}

// function mapStateToProps(state) {
//     return {
//       loading: state.loading,
//       data: state.data,
//       lat: state.lat,
//       lng: state.lng,
//       toggle: state.toggle,
//       miles: state.miles
//     };
//   }

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(actions, dispatch)
    };
}
  
export default connect(null, mapDispatchToProps)(HorizontalSlider);