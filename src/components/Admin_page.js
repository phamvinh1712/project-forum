import React, { Component } from 'react';
import './statistic.css';
import ReportList from './ReportList';
import SidebarMenu from './sidebarMenu';
import {Col, Row ,Grid , Glyphicon, Button} from 'react-bootstrap';
export default class App extends Component {
    render() {
        return (
<div>
    <Grid>
        <Row className="show-grid">
              <Col md={2}   className="left_col">
              <SidebarMenu/>
              </Col>

      <Col md={10} className="col-md-10 right_col" role="main">
        <div className="row tile_count">
          <Col md={3} className="col-md-3  tile_stats_count">
                 <span className="count_top"><i className="fa fa-user"></i> New Users</span>
            <div className="count">200</div>
          </Col>
          <Col md={3} className="col-md-3 tile_stats_count ">
            <span className="count_top"><i className="fa fa-bar-chart"></i> Topic Created</span>
            <div className="count">10</div>
          </Col>
          <Col md={3} className="col-md-3 tile_stats_count ">
            <span className="count_top"><i className="fa fa-user"></i> Post Made</span>
            <div className="count green">50</div>
          </Col>
          <Col md={3} className="col-md-3  tile_stats_count ">
            <span className="count_top"><i className="fa fa-pie-chart"></i> Total Views</span>
            <div className="count">1500</div>
          </Col>
        </div>

        <div className="row">
            <Col md={12} className="col-md-12">
                <ReportList/>
            </Col>
        </div>
          <div className="row">
            <Col className="col-md-12">
                <div id='Graph'></div>
                <script src='http://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js'></script>
                    <script  src="graph.js"></script>
            </Col>
          </div>
      </Col>
        </Row>
    </Grid>
</div>
    );
  }
}
