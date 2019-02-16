import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { ComposedChart, Bar, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import './MonthlyBalanceChart.css';

export default class MonthlyChart extends React.Component {

  renderLineChart(){
    return (
        <div className="chartContainer" >
          <ResponsiveContainer width="100%" height="100%" >
            <ComposedChart className="myChart" data={this.props.monthlyBalanceTransactionsArray} margin={{top: 30, right: 30, bottom: 30, left: 30}} >
              <XAxis dataKey="date" />
              <YAxis unit={" £"}/>
              <Tooltip isAnimationActive={false}/>
              {/* <Bar dataKey="balance" fill="#ff751a" barSize={4}/> */}
              <Area type="monotone" dataKey="balance" fill="#16a085" stroke="#ff751a" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        )
  }

  render() {
    return this.props.monthlyBalanceTransactionsArray.length > 0 ? (<div>{this.renderLineChart()}</div>) : null;
  }

}