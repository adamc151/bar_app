import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import Chart from '../Chart/Chart.js';
import Accordian from '../Accordian/Accordian.js';
import DateRangeSelector from '../DateRangeSelector/DateRangeSelector.js';
import InOutNet from '../InOutNet/InOutNet.js';
import MonthlyChart from '../MonthlyChart/MonthlyChart.js';
import MonthlyBalanceChart from '../MonthlyBalanceChart/MonthlyBalanceChart.js';
import FileClear from '../FileClear/FileClear.js';
import { Link } from 'react-router-dom';
import './GraphPage.css';

class GraphPage extends React.Component {


  render() {

    const { allTransactions, transactions, monthlyTransactionsArray, monthlyBalanceTransactionsArray, income, spending, net } = this.props;

    let initialStartDate = null;
    let initialEndDate = null;

    if(allTransactions.length > 0){
      initialStartDate = allTransactions[0].date;
      initialEndDate = allTransactions[allTransactions.length - 1].date;
    }

    return (
    <div className="graphs">
      <Grid fluid={true}>

        <Row className="show-grid">
          <Col md={12} lg={12}>
            <DateRangeSelector initialStartDate={initialStartDate} initialEndDate={initialEndDate}/>
          </Col>
        </Row>

        <Row className="show-grid">
          <Col sm={12} md={12} lg={8}>
            <Chart transactions={transactions} />
          </Col>
          <Row className="show-grid">
            <Col sm={12} md={12} lg={4}>
              <Accordian transactions={transactions} collapsable={false} />
            </Col>
              <Col md={12} lg={4}>
              <InOutNet income={income} spending={spending} net={net} />
            </Col>
          </Row>
        </Row>


        <Row className="show-grid">
          <Col md={12} lg={8}>
            <MonthlyChart monthlyTransactions={monthlyTransactionsArray}/>
          </Col>
          <Col md={12} lg={4}>
            <MonthlyBalanceChart monthlyBalanceTransactionsArray={monthlyBalanceTransactionsArray}/>
          </Col>
        </Row>

        {/* <Row className="show-grid">
          <Col md={12} lg={12}>
            <InOutNet income={income} spending={spending} net={net} />
          </Col>
        </Row> */}

        <Row className="show-grid">
          <Col md={12} lg={12}>
            <FileClear />
          </Col>
        </Row>

      </Grid>

    </div>);
  }

}

/***********************
The code below assigns attributes in the store to the props of this container.
So we can then access then via this.props.nameOfAttribute
************************/
function mapStateToProps(state) {
  return {
    allTransactions: state.allTransactions,
    transactions: state.transactionsInRange,
    monthlyTransactionsArray: state.monthlyTransactionsArray,
    monthlyBalanceTransactionsArray: state.monthlyBalanceTransactionsArray,
    income: state.income,
    spending: state.spending,
    net: state.net
  };
}


export default connect(
  mapStateToProps,
  null
)(GraphPage);
