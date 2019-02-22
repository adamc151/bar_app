import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../state/actions/actions';
import Accordion from '../components/Accordion/Accordion';
import Modal from '../components/Modal/Modal';
import MyMap from '../components/GoogleMapWithSearch/map';
import './MainContainer.css';


class MainContainer extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.props.actions.fetchData();
  }

  render() {
    const { lat, lng } = this.props;

    return (
      <div className="wrapper">
        <div className="mapContainer">
          <MyMap centerOn={{ lat, lng }} centerMap={this.props.actions.centerMap} />
        </div>
        <div className="list">
          <Accordion data={this.props.data} onClick={entry => this.props.actions.centerMap(entry.location.lat, entry.location.lng)} />
          <div className='addEntryButton'>
            <Modal />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    data: state.data,
    lat: state.lat,
    lng: state.lng
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
