import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../state/actions/actions';
import Accordian from '../components/Accordian/Accordian';


class Fib extends Component {

  constructor(props){
    super(props)

    this.state = {
      index: null
    }
  }

  componentDidMount() {
    this.props.actions.fetchData();
  }


  handleSubmit = async event => {
    event.preventDefault();
    this.props.actions.postData(this.state.index);
    this.props.actions.fetchData();
  };

  render() {
    console.log('this.props', this.props);

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            onChange={event => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>
        <Accordian data={this.props.data} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    data: state.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fib);
