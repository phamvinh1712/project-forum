import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./CreatePost.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// CreatePost Page
export default class CreatePost extends Component {
  constructor(props) {
    super(props)
    this.state = { text: '' } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ text: value })
  }
// function handle submit onclick event
  handleSubmit = event => {
    event.preventDefault();
  }
// main screen
  render() {
    return (
      <div className="CreatePost">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="tittle" bsSize="large">
            <ControlLabel>Tittle</ControlLabel>
            <FormControl
              
              type="tittle"
              value={this.state.tittle}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="content" bsSize="large">
            <ControlLabel>Content</ControlLabel>
            <ReactQuill value={this.state.text}
                  onChange={this.handleChange} />
          </FormGroup>
          <Button
            block
            bsSize="large"
            type="Post"
          >
            Post
          </Button>
        </form>
      </div>
    );
  }
}