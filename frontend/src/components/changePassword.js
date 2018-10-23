import React, {Component} from "react";
import {Button, FormGroup, FormControl, ControlLabel, Modal, ModalBody, HelpBlock} from "react-bootstrap";
import "./Login.css";
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';

export default class changePassword extends Component {
  constructor(props) {
    super(props);
    this.handleHide = this.handleHide.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      password1: "",
      password2: "",
      oldpassword: "",
      show: false
    };
  }

// check if the user input correct form
  validateForm() {
    return this.state.oldpassword.length > 0 && this.state.password1.length > 0 && this.state.password1 === this.state.password2;
  }

// function to handle value change in field
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

// function handle submit onclick event
  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/rest-auth/password/change/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token').toString(),
      },
      body: JSON.stringify({
        "new_password1": this.state.password1,
        "new_password2": this.state.password2,
        "old_password": this.state.oldpassword
      })
    })
      .then(function (res) {
        return res.json()
      })
      .then(json => {
        console.log(json);
        for (let [key, value] of Object.entries(json)) {
          if(Array.isArray(value)) value = value[0];
          toast.info(value, {
            position: toast.POSITION.TOP_CENTER
          });
        }
      })
      .catch((error) => {
        toast.warn("Error", {
          position: toast.POSITION.TOP_CENTER
        });
      });
    ;
  }

  handleHide() {
    this.setState({show: false});
  }

// main screen
  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="oldpassword" bsSize="large">
            <ControlLabel>Old Password</ControlLabel>
            <FormControl
              value={this.state.oldpassword}
              onChange={this.handleChange}
              type="password"
            />

          </FormGroup>
          <FormGroup controlId="password1" bsSize="large">
            <ControlLabel>New Password</ControlLabel>
            <FormControl
              autoFocus
              type="password"
              value={this.state.password1}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password2" bsSize="large">
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl
              value={this.state.password2}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Change
          </Button>
        </form>
        <Modal
          show={this.state.show}
          onHide={this.handleHide}
          container={this}>
          <Modal.Header closeButton>
            <Modal.Title>Login info</Modal.Title>
          </Modal.Header>

          <Modal.Body>{this.state.loginInfo}</Modal.Body>
        </Modal>
      </div>
    );
  }
}