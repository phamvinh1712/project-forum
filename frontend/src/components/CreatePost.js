import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./CreatePost.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// CreatePost Page
export default class CreatePost extends Component {
  constructor(props) {
    super(props)
    this.state = { text: '',tittle: '' } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeTittle = this.handleChangeTittle.bind(this)
  }

  handleChange(value) {
    this.setState({ text: value })
  }
  handleChangeTittle(event){
    this.setState({ tittle: event.target.value })
  }
// function handle submit onclick event
  handleSubmit = event => {
    event.preventDefault();
    const tittle = this.state.tittle;
    const text = this.state.text;
    fetch('/api/create-post/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token').toString()
      },
      body: JSON.stringify({"tittle": tittle, "content": text, "sub_thread":1})
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
      });
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
              onChange={this.handleChangeTittle}
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
            type="submit"
          >
            Post
          </Button>
        </form>
      </div>
    );
  }
}