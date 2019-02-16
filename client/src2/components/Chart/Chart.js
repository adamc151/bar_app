import PropTypes from 'prop-types';
import React from 'react';
import { ResponsiveContainer, ComposedChart, Tooltip, Line, Legend, Bar, XAxis, YAxis } from 'recharts';
import './Chart.css';

export default class Chart extends React.Component {

  renderLineChart(){

    const { transactions, income, spending, net } = this.props;

    return (
      <div className="chartContainer" >
      <ResponsiveContainer width="100%" height="100%" >
      <ComposedChart className="myChart" data={transactions} margin={{top: 30, right: 30, bottom: 30, left: 30}} >
        <XAxis dataKey="dateString"/>
        <YAxis yAxisId="left" stroke="#413ea0" />
        <Tooltip isAnimationActive={false}/>
        <Bar yAxisId="left" dataKey='amount' barSize={5} fill='#413ea0' />
        <Legend />
        </ComposedChart>
      </ResponsiveContainer>
      </div>)
  }

  render() {
    return this.props.transactions.length > 0 ? (<div>{this.renderLineChart()}</div>) : null;
  }

}
