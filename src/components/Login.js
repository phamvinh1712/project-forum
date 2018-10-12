import React, {Component} from "react";
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import "./Login.css";
import auth from "./auth"
// login page
export default class Login extends Component {
  constructor(props) {
    super(props);
// value of data
    this.state = {
      email: "",
      password: ""
    };
  }

// check if the user input correct form
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

// function to handle value change in field
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
// function handle submit onclick event
  handleSubmit = event => {
    event.preventDefault();
    let us = this.state.email;
    let ps = this.state.password;
    auth.login(us, ps, (loggedIn) => {
      if (loggedIn) {
        console.log("success")
      } else {
        console.log("failed")
      }
    })

  }

// main screen
  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
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
            Login
          </Button>
        </form>
      </div>
    );
  }
}