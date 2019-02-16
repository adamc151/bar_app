import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/actions';
import { Redirect } from 'react-router-dom';
import React from 'react';
import './FileClear.css';

class FileClear extends React.Component {

    constructor(props) {
        super(props);
        this.handleFileClear = this.handleFileClear.bind(this);

        this.state = {
          toUpload: false
        }
    }

    handleFileClear(evt) {
        this.props.actions.clearStore();
        this.setState({
          toUpload: true
        });
    }


    render() {

        if(this.state.toUpload){
          return <Redirect to="/" />
        }

        return (
        <div className="fileClear" >
            <button id="clear" name="clear" onClick={this.handleFileClear} className="clearButton">CLEAR</button>
            <label for="clear" className="fileLabel">
            <span>Clear File</span>
            </label>
        </div>
        );
    }
}



function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    null,
    mapDispatchToProps
)(FileClear);
