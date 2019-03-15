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

        this.updateButtonMsg = this.updateButtonMsg.bind(this);
        this.finalButtonMsg = this.finalButtonMsg.bind(this);
        this.setInitialButtonState = this.setInitialButtonState.bind(this);


        this.state = {
          submitState: 'submit-button',
          submitMessage: ''
        };
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


    updateButtonMsg() {
      console.log('updateButtonMsg');
      this.setState({ submitState: 'submit-button animated', submitMessage: 'state-1'})
      setTimeout(this.finalButtonMsg, 2000);
    };

    finalButtonMsg() {
      console.log('finalButtonMsg');
      this.setState({ submitState: 'submit-button animated', submitMessage: 'state-2'})
      setTimeout(this.setInitialButtonState, 2000);
    };

    setInitialButtonState() {
      console.log('setInitialButtonState');
      this.submit();
      this.setState({ submitState: 'submit-button', submitMessage: ''})
    };

    render() {
        const { place = { name: '', address: '', photo: '' } } = this.state;

        console.log('this.state.submitState', this.state.submitState);

        return (
            <div className="PlaceInfoWrapper">
            <div onClick={this.close} type="button" className="closeButton" aria-label="Close">&times;</div>
            <div className='placeDetailsWrapper'>
              <div className='placeDetails'>
                <div className='placeDetailsName'>{place.name}</div>
                <div className='placeDetailsAddress'>{place.address}</div>
                <div>Deal:</div>
                <div><input className='placeDetailsDescription' ref={node => this.descriptionInput = node} onChange={event => this.setState({ description: event.target.value })} /></div>
              </div>
              { place.photo && <img className='placeImage' src={place.photo} /> }
            </div>
            <button onClick={this.updateButtonMsg} className={this.state.submitState}>
              <span className={'submit-pres-state ' + this.state.submitMessage}>Submit</span>
              <span className='submit-sending-state'>...sending</span>
              <span className='submit-done-state'>done</span>
            </button>
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
