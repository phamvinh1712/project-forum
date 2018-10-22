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
  constructor(){
    super();
    this.state = {
      count_subthread: '',
      count_post:'',
      count_user:'',
    }
  }
  componentDidMount() {
    fetch("/api/count-subthread/",
    {
      method: 'GET',
    }
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ count_subthread: data });
      }).catch(err => console.log(err));

    fetch("/api/count-user/",
    {
      method: 'GET',
    } 
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ count_user : data });
      }).catch(err => console.log(err));
    fetch("/api/count-post/",
    {
      method: 'GET',
    }
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ count_post: data });
      }).catch(err => console.log(err));
  }
  render() {
    const renderReport = (
      <div>
        <div className="row tile_count">
          <Col md={4} className="col-md-3  tile_stats_count">
            <span className="count_top"><i className="fa fa-user"></i> New Users</span>
            <div className="count">{this.state.count_user}</div>
          </Col>
          <Col md={4} className="col-md-3 tile_stats_count ">
            <span className="count_top"><i className="fa fa-bar-chart"></i> Topic Created</span>
            <div className="count">{this.state.count_subthread}</div>
          </Col>
          <Col md={4} className="col-md-3 tile_stats_count ">
            <span className="count_top"><i className="fa fa-user"></i> Post Made</span>
            <div className="count green">{this.state.count_post}</div>
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