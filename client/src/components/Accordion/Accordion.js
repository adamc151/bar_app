import React from 'react';
import AccordionItem from './AccordionItem';
import './Accordion.css';

class Accordion extends React.Component {

  renderList(){
    console.log('this.props.data', this.props.data);
    if (!this.props.data) return null;

    return this.props.data.map((data, i) => {
      return <AccordionItem key={i} index={i} data={data} onClick={this.props.onClick} calcDistance={this.calcDistance} currentLocation={this.props.currentLocation}/>
    });
  }

  calcDistance(currentLocation, barLocation){

    const lat1 = currentLocation.lat;
    const lon1 = currentLocation.lng;
    const lat2 = barLocation[0];
    const lon2 = barLocation[1];
    
    var R = 6367;
    var dLat = (lat2-lat1) * Math.PI / 180;
    var dLon = (lon2-lon1) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    if (d>1) return Math.round(d)+" km";
    else if (d<=1) return Math.round(d*1000)+" m";
    return d;
  }

  componentWillReceiveProps(nextProps) {
  }


  render() {
    return (
      <div className="accordionContainer">
        <div className="accordionTab">

            <label htmlFor="openTab" className="openTabLabel">-</label>
            <label htmlFor="closeTab" className="closeTabLabel">-</label>

            <div className="tab-content">
              {this.renderList()}
            </div>

        </div>
      </div>
    );
  }
}



export default Accordion;
