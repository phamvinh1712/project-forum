import React, {Component} from "react";
import {Button, FormGroup, FormControl, ControlLabel, Modal, ModalBody, HelpBlock} from "react-bootstrap";
import "./Login.css";
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleHide = this.handleHide.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: "",
      password: "",
      loginInfo: "",
      show: false
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
  handleSubmit(event) {
    event.preventDefault();
    const email = this.state.email;
    const pass = this.state.password;
    fetch('/api/rest-auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"email": email, "password": pass})
    })
      .then(function (res) {
        if (res.status < 500)
          return res.json()
        else {
          throw new Error('Something went wrong,please try again');
        }
      })
      .then(json => {
        if (json.key) {
          localStorage.setItem('token', json.key);
          toast.info("You are now login", {
            position: toast.POSITION.TOP_CENTER
          });
          this.props.handleToken()
          this.props.history.push('')
        }
        if (json.non_field_errors) {
          this.setState({loginInfo: json.non_field_errors, show: true})
        }
      })
      .catch((error) => {
        toast.warn(error.toString, {
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
            <Link to="/ForgetPassword"><HelpBlock bsClass="help-blockLogin"> Forget your password?</HelpBlock> </Link>
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