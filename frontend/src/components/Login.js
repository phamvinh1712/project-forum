import React, {Component} from "react";
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import "./Login.css";
import auth from "./auth"//
// gin page
export default class Login extends Component {
  constructor(props) {
    super(props);
// valu loe of data
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
    const em = this.state.email;
    const ps = this.state.password;
    fetch('http://localhost:8000/api/rest-auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"email":em,"password":ps})
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.key);
      });
    if(localStorage.getItem('token')==='undefined') {
            console.log("failed");
        } else console.log("success");
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