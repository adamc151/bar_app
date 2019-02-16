import PropTypes from 'prop-types';
import React from 'react';
import FileDrop from '../FileDrop/FileDrop.js';

import FileSelector from '../FileSelector/FileSelector.js';
import {Grid, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './FilePage.css';
import santander from './santanderJPG.jpg';


export default class FilePage extends React.Component {


  render() {

    const { } = this.props;

    return (
    <div className="uploadPage">
      <Grid fluid={true}>

        <Row className="show-grid">
          <Col md={12} lg={12}>
            <div className="banksContainer">
              <p className="banksText">Supported Banks</p>
              <img className="santander_logo" src={santander} />
            </div>
          </Col>
        </Row>

        <Row className="show-grid">
          <Col md={12} lg={12}>
            <FileDrop />
          </Col>
        </Row>

        <div class="footer">
            <p>We NEVER store your financial data!  <i class="em em---1"></i></p>
        </div>




      </Grid>

    </div>);
  }

}
