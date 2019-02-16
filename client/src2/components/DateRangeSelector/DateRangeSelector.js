import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/actions';
import './DateRangeSelector.css';

import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class DateRangeSelector extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
      endDate: moment()
    };
    this.changeStartDate = this.changeStartDate.bind(this);
    this.changeEndDate = this.changeEndDate.bind(this);
    this.updateTransactionsDateRange = this.updateTransactionsDateRange.bind(this);
  }

  changeStartDate(date) {
    this.setState({
      startDate: date
    });
    this.updateTransactionsDateRange(date, this.state.endDate);
  }

  changeEndDate(date) {
    this.setState({
      endDate: date
    });
    this.updateTransactionsDateRange(this.state.startDate, date);
  }

  updateTransactionsDateRange(startDate, endDate){
    this.props.actions.getTransactionsInRange(startDate, endDate);
    this.props.actions.updateMonthlyTransactions(startDate, endDate);
    this.props.actions.updateMonthlyBalance(startDate, endDate);
  }


  static getDerivedStateFromProps(nextProps, prevState){

    if(!nextProps.initialStartDate || !nextProps.initialEndDate) return prevState;

    let startDate = nextProps.initialStartDate;
    let endDate = nextProps.initialEndDate;

    nextProps.actions.getTransactionsInRange(startDate, endDate);

    return {
      minDate: startDate,
      startDate: startDate,
      endDate: endDate,
      maxDate: endDate
    }

  }


  render() {
    
    return (
      <div className="DateRangeSelector">

      <Grid fluid={true}>
          <Row className="show-grid">
            <Col xs={6} sm={6} md={6}>
              <label for="startDate" className="dateLabel">From</label>
            </Col>
            <Col xs={6} sm={6} md={6}>
              <label for="endDate" className="dateLabel">To</label>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} sm={6} md={6}>
              <DatePicker
                selected={ this.state.startDate }
                onChange={this.changeStartDate}
                minDate={ this.state.minDate }
                maxDate={ this.state.endDate }
                dateFormat="DD/MM/YYYY"
                className="react-datepicker"
                name="startDate"
              />
            </Col>
            <Col xs={6} sm={6} md={6}>
              <DatePicker
                selected={ this.state.endDate }
                onChange={this.changeEndDate}
                minDate={ this.state.startDate }
                maxDate={ this.state.maxDate }
                dateFormat="DD/MM/YYYY"
                className="react-datepicker"
                name="endDate"
              />
            </Col>
          </Row>
      </Grid>

    </div>);
  }
}


function mapStateToProps(state) {
  return {
    transactions: state.allTransactions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}


export default connect(
  null,
  mapDispatchToProps
)(DateRangeSelector);
