import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../state/actions/actions';
import './Place.css';

class Place extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: null, description: null, city: null, visible: false };
        this.close = this.close.bind(this);
        this.submit = this.submit.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState){
      return { visible : nextProps.visible, place: nextProps.place };
    }

    close(){
      this.descriptionInput.value = '';
      this.props.onClick();
    }

    submit() {
      const { place } = this.state;

      if(!place) return;

      const newPlace = {
        name: place.name,
        address: place.address,
        city: "",
        location:{
          coordinates:[place.lat, place.lng],
          type:"Point"
        },
        place_id: place.place_id,
        validated: true,
        deals: [
          {
            startTime: "16:30",
            endTime: "19:00",
            weekDays: [0,1,2,3,4,5,6],
            description: this.state.description,
            fullDescription: this.state.description,
          }
        ]
      };

      this.props.actions.postData(newPlace);
      this.props.onAdd();
      this.close();
    };

    render() {
        const { place = { name: '', address: '', photo: '' } } = this.state;

        return (
            <div className="PlaceInfoWrapper">
            <button className='closeButton' onClick={this.close}>Close</button>
            <div className='placeDetailsWrapper'>
              <div className='placeDetails'>
                <div className='placeDetailsName'>{place.name}</div>
                <div className='placeDetailsAddress'>{place.address}</div>
                <div>Deal:</div>
                <div><input className='placeDetailsDescription' ref={node => this.descriptionInput = node} onChange={event => this.setState({ description: event.target.value })} /></div>
              </div>
              { place.photo && <img className='placeImage' src={place.photo} /> }
            </div>
            <button onClick={this.submit}>Add</button>
            </div>
        )
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
)(Place);
