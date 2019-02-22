import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../state/actions/actions';
import Accordian from '../components/Accordian/Accordian';
// import MyMap from '../components/GoogleMap/map';
// import MyMap from '../components/FreeMap/map';
import Modal from '../components/Modal/Modal';
import MyMap from '../components/GoogleMapWithSearch/map';
import './MainContainer.css';



const dummyCoordinates = [
  {
    lat: 51.509865,
    long: -0.118092
  },
  {
    lat: 53.801277,
    long: -1.548567
  }
]


class MainContainer extends Component {

  constructor(props){
    super(props)

    this.state = {
      clickedEntry: null
    }
  }

  componentDidMount() {
    this.props.actions.fetchData();
  }

  clickedEntry(entry){
    this.setState({ clickedEntry: entry })
  }

  render() {
    console.log('this.state.clickedEntry', this.state.clickedEntry);

    return (
      <div className="wrapper">
        <div className="mapContainer">
          <MyMap coordinates={dummyCoordinates} centerOn={this.state.clickedEntry}/>
        </div>
        <div className="list">
          <Accordian data={this.props.data} onClick={entry => this.setState({clickedEntry: dummyCoordinates[0]})} />
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
    data: state.data
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
