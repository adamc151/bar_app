import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/actions';
import React from 'react';
import Dropzone from 'react-dropzone'
import './FileDrop.css';
import down_arrow from './down-arrow.png';
import tick_icon from './checked.png';
import download from './downloadIcon.png';
import { Redirect } from 'react-router-dom';
import FileSelector from '../FileSelector/FileSelector.js';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner.js';


class FileDrop extends React.Component {
    constructor() {
      super()
      this.state = { files: [] }
    }

    onDrop(files) {
        this.setState({
            files,
            onRead: true
        });

        var file = files[0]
        const reader = new FileReader();
        reader.onload = (event) => {
            this.props.actions.addTransactions(reader.result);
            this.props.actions.addMonthlyTransactions(reader.result);
            this.props.actions.addMonthlyBalanceTransactions(reader.result);
            console.log(this.props.history);

            setTimeout(() => {
              this.setState({
                  toDashboard: true
              });
            }, 1000);


        };

        reader.readAsText(file);
    }



    render() {

      if(this.state.toDashboard){
        return <Redirect to="/Dashboard" />
      }


      return (
        <section>
          <div className="dropzone">
            <Dropzone className="dropzoneBox" activeClassName="dropzoneActive" onDrop={this.onDrop.bind(this)} disableClick={true}>

            { //Check if message failed
              (this.state.files.length == 0)
            ? <img className="down_arrow" src={download} />
            : <LoaderSpinner />
          }

              <div className="fileSelectWrapper">

              <p className="inner">{this.state.files.length == 0 ? "Drop a bank statement here or..." : "Loading..."}</p>
              {
                // this.state.files.length != 0 ? this.redirectPage() : null
              }
              {/* <p className="inner">Drop a bank statement here! Or click to select...</p> */}
              <FileSelector disableFunctionality={false} onSuccess={this.onDrop.bind(this)} />
              </div>
            </Dropzone>
          </div>
        </section>
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
  )(FileDrop);
