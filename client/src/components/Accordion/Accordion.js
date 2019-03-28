import React from 'react';
import AccordionItem from './AccordionItem';
import './Accordion.css';
import sadFace from './sad.png';


class Accordion extends React.Component {

  renderList(){
    console.log('renered the listttttt');
    console.log('this.props.data', this.props.data);
    if (!this.props.data) return null;

    return this.props.data.map((data, i) => {
      return <AccordionItem key={i} index={i} data={data} onClick={this.props.onClick} onHover={this.props.onHover} />
    });
  }

  renderEmptyList(){

    console.log('no results, dislaying default message');

    return(
      <div className="empty-display">
        <div className="empty-display-inner">
          <img src={sadFace} className="empty-icon" alt="sadFace" /><br/>
          <div className="empty-text">  No hapi hours available... </div>
        </div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
  }


  render() {
    return (
      <div className="accordionContainer">
        <div className="accordionTab">

            {/* {this.props.collapsable ? (<input id="openTab" type="radio" name="tabs1" className="openTabRadio" /> ) : null }
            {this.props.collapsable ? (<input id="closeTab" type="radio" name="tabs1" className="closeTabRadio" /> ) : null } */}

            <label htmlFor="openTab" className="openTabLabel">-</label>
            <label htmlFor="closeTab" className="closeTabLabel">-</label>

            <div className="tab-content">
              {this.props.data[0] ? this.renderList() : this.renderEmptyList()}
            </div>

        </div>
      </div>
    );
  }
}



export default Accordion;
