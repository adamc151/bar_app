import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import './InOutNet.css';

export default function InOutNet(props){
    return(<div className="inOutNetContainer">

      <Grid fluid={true}>
          <Row className="show-grid">
            <Col xs={4} sm={4} md={4} lg={4}>
              <label for="amountHeader" className="dateLabel">IN</label>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              <label for="amountHeader" className="dateLabel">OUT</label>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              <label for="amountHeader" className="dateLabel">NET</label>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={4} sm={4} md={4} lg={4}>
              <div className="amountPill">£{props.income}</div>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              <div className="amountPill">£{props.spending}</div>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              <div className="amountPill">£{props.net}</div>
            </Col>
          </Row>
      </Grid>
    </div>);
}
