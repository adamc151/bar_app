import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../state/actions/actions";
import "./BarDetails.css";
import Bar from "../components/Bar/Bar";

class BarDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const {
      fetchOne
    } = this.props.actions;
    const {
      data,
      singleBar
    } = this.props;

    console.log("BarDetails page");

    return (
      <div className="wrapper">
        <div className="barContainer">
          <Bar
            fetchOne={fetchOne}
            data={data}
            singleBar={singleBar}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    data: state.data,
    singleBar: state.singleBar
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
)(BarDetails);
