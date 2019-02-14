import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    values: {},
    index: ''
  };

  componentDidMount() {
    this.fetchValues();
  }

  async fetchValues() {
    const values = await axios.get('/api/bars');
    this.setState({ values: values.data });
    console.log(values.data);
  }

  handleSubmit = async event => {
    event.preventDefault();

    await axios.post('/api/bar', {
      name: this.state.index 
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            onChange={event => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Fib;
