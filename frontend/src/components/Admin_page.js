import React, {Component} from 'react';
import './statistic.css';
import ReportList from './ReportList';
import {BrowserRouter, Route} from "react-router-dom";
import SidebarMenu from './sidebarMenu';
import {Col, Row, Grid} from 'react-bootstrap';
import NavBar from "./NavBar";
import Content from "./Content";
import Login from "./Login";
import Register from "./Register";
import SubThreadDisplay from "./SubThread";
import CreatePost from "./CreatePost";
import Post from "./Post";
import ThreadEditList from "./ThreadEditList";

export default class Admin extends Component {
  render() {
    const renderReport = (
      <div>
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
            <script src="graph.js"></script>
          </Col>
        </div>
      </div>
    )

    return (
      <div>
        <Row className="show-grid">
          <Col md={2} className="left_col">
            <SidebarMenu/>
          </Col>

          <Col md={9} className="col-md-10 right_col" role="main">
            <Route exact path="/admin/report/" render={() => renderReport}/>
            <Route exact path="/admin/threads/" render={() => <ThreadEditList/>}/>
          </Col>
        </Row>
      </div>
    );
  }
}