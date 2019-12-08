import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../state/actions/actions';
import './Place.css';
import ReactGA from 'react-ga';

class Place extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: null, description: null, city: null, visible: false, startTime: null, endTime: null, weekDays: null };
        this.close = this.close.bind(this);
        this.submit = this.submit.bind(this);

        this.updateButtonMsg = this.updateButtonMsg.bind(this);
        this.finalButtonMsg = this.finalButtonMsg.bind(this);
        this.setInitialButtonState = this.setInitialButtonState.bind(this);


        this.state = {
          submitState: 'submit-button',
          submitMessage: '',
          deals: [],
          numOfDeals: 1
        };
    }

    static getDerivedStateFromProps(nextProps, prevState){
      return { visible : nextProps.visible, place: nextProps.place };
    }

    close(){
      this.descriptionInput.value = '';
      this.startTimeInput.value = '';
      this.endTimeInput.value = '';
      this.props.onClick();
    }

    submit() {

      const { place } = this.state;
      let deals = [];
      if(!place) return;

      for(let x = 0; x < this.state.numOfDeals; x++){

        const { startTime, endTime, description, weekDays } = this.state[`deal${x}`];
        let dealDescriptionArray = description.split(',');

        for (var i = 0; i < dealDescriptionArray.length; i++) {
          dealDescriptionArray[i] = dealDescriptionArray[i].trim();
        }

        let calcWeekDays = [];
        for (var i = 0, l = weekDays.length; i < l; i++) {
          if (weekDays[i].selected) {
            calcWeekDays.push(parseInt(weekDays[i].value));
          }
        }

        calcWeekDays.sort();

        deals.push({
          startTime: startTime,
          endTime: endTime,
          weekDays: calcWeekDays,
          description: dealDescriptionArray,
          fullDescription: "placeholder description",
        })

      }


      const newPlace = {
        name: place.name,
        address: place.address,
        city: place.city,
        location:{
          coordinates:[place.lat, place.lng],
          type:"Point"
        },
        place_id: place.place_id,
        validated: false,
        website: place.website,
        imgUrl: place.photo,
        deals: deals
      };

      this.props.actions.postData(newPlace);

      ReactGA.event({
        category: 'DB',
        action: 'User submitted a hapihour'
      });

      this.props.onAdd();
      this.close();
    };


    updateButtonMsg() {
      for(let x = 0; x < this.state.numOfDeals; x++){

        const { startTime, endTime, description } = this.state[`deal${x}`];
        if(!startTime || !endTime || !description){
          alert("All fields must be populated");
          return;
        }

        if(startTime >= endTime){
          alert("Start time can't be after or the same as the end time");
          return;
        }

      }


      this.setState({ submitState: 'submit-button animated', submitMessage: 'state-1'})
      setTimeout(this.finalButtonMsg, 2000);
    };

    finalButtonMsg() {
      this.setState({ submitState: 'submit-button animated', submitMessage: 'state-2'})
      setTimeout(this.setInitialButtonState, 2000);
    };

    setInitialButtonState() {
      this.submit();
      this.setState({ submitState: 'submit-button', submitMessage: ''})
    };

    renderInput(index) {

      const { numOfDeals } = this.state;
      const dealCurrentState = this.state[`deal${index}`];

      console.log('yooo index', index);
      console.log('yooo numOfDeals', numOfDeals);

      return (
        <div className='dealWrapper' >
        {index === numOfDeals - 1 && index !== 0 && <div className="removeDealButton" aria-label="Close" onClick={() => this.setState({ numOfDeals: numOfDeals - 1 })}>&times;</div>}
        {numOfDeals > 1 ? <div className='placeLabel'>{`Deal ${index + 1} (separate by a comma for multiple)`}</div> : <div className='placeLabel'>Deal (separate by a comma for multiple)</div>}
        <div>
        <input
          className='placeDetailsDescription'
          ref={node => this.descriptionInput = node}
          onChange={event => this.setState({ [`deal${index}`]: { ...dealCurrentState, description: event.target.value }})}
        />
        </div>
        <div className='placeTimeWrapper'>
          <div className='placeLabel'>Start Time</div>
          <div className='placeLabel'>End Time</div>
        </div>
        <div className='placeTimeWrapper'>
          <div className='placeDetailsTime'><input className='placeDetailsTimeInner' type ="time" ref={node => this.startTimeInput = node}
          onChange={event => this.setState({ [`deal${index}`]: { ...dealCurrentState, startTime: event.target.value }})} /></div>
          <div className='placeDetailsTime' ><input className='placeDetailsTimeInner' type ="time" ref={node => this.endTimeInput = node}
          onChange={event => this.setState({ [`deal${index}`]: { ...dealCurrentState, endTime: event.target.value }})} /></div>
        </div>
        <div className='placeLabel'>Days (select all relevant)</div>
        <select multiple={true} className='placeDetailsDays' ref={node => this.endTimeInput = node}
        onChange={event => this.setState({ [`deal${index}`]: { ...dealCurrentState, weekDays: event.target.options }})}>
          <option value="1">Monday</option>
          <option value="2">Tuesday</option>
          <option value="3">Wednesday</option>
          <option value="4">Thursday</option>
          <option value="5">Friday</option>
          <option value="6">Saturday</option>
          <option value="0">Sunday</option>
        </select>
        </div>)
    }

    render() {
        const { place = { name: '', address: '', photo: '' }, numOfDeals } = this.state;

        var inputs = [];
        for (var i = 0; i < numOfDeals; i++) {
          inputs.push(this.renderInput(i));
        }

        return (
            <div className="PlaceInfoWrapper">
            <div onClick={this.close} type="button" className="closeButton" aria-label="Close">&times;</div>
            <div className='placeDetailsWrapper'>
              <div className='placeDetails'>
              { place.photo && <img className='placeImage' src={place.photo} /> }
                <div className='placeDetailsName'>{place.name}</div>
                <div className='placeDetailsAddress'>{place.address}</div>
                {inputs}
              </div>
            </div>
            <div className='AddAnotherLabel' onClick={() => this.setState({ numOfDeals: numOfDeals + 1 })}>Add Another Deal</div>
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
