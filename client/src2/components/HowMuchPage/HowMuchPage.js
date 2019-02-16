import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import Accordian from '../Accordian/Accordian.js';
import DateRangeSelector from '../DateRangeSelector/DateRangeSelector.js';
import { Link } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import './HowMuchPage.css';

const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'Elm',
    year: 2012
  }
];


class HowMuchPage extends React.Component {

  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
      suggestionsTotal: 0
    };

    var suggestionsTotal = 0;

    this.filterCallback = this.filterCallback.bind(this);
  }



  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if(inputLength === 0){
      return []
    } else {
      let suggestions = this.props.transactions.filter((transaction) => this.filterCallback(transaction, inputLength, inputValue));
      let total = 0;

      suggestions.map(suggestion => total = total + suggestion.amount);
      this.setState({ suggestionsTotal: total })
      return suggestions;
    }
  };

    filterCallback(transaction, inputLength, inputValue){
      if(transaction.description !== null){
        if(transaction.description.toLowerCase().includes(inputValue)){
          return true;
        } else {
          return false;
        }
      } else {
        return null
      }
    };


  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => suggestion.description;

  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => (
    <div>
      {suggestion.description}
    </div>
  );



  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
      suggestionsTotal: 0
    });
  };


  render() {

    const { allTransactions, transactions, monthlyTransactionsArray, monthlyBalanceTransactionsArray, income, spending, net } = this.props;
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };


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
          <Col md={12} lg={12}>
            <Accordian transactions={transactions} />
          </Col>
        </Row>

          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
          />

          <div>{this.state.suggestionsTotal}</div>

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
)(HowMuchPage);
