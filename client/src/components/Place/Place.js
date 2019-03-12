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
        description: this.state.description,
        startTime: "16:30",
        endTime: "19:00",
        location:{
          coordinates:[place.lat, place.lng],
          type:"Point"
        },
        place_id: place.place_id
      };

      this.props.actions.postData(newPlace);
      this.props.onAdd();
      this.close();
    };

    render() {
        const { place = { name: '', address: '' } } = this.state;

        return (
            <div className="PlaceInfoWrapper">
            <button onClick={this.close}>Close</button>
            <div>{place.name}</div>
            <div>{place.address}</div>
            <div>Deal:</div>
            <div><input ref={node => this.descriptionInput = node} onChange={event => this.setState({ description: event.target.value })} /></div>
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
