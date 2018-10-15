import React, {Component} from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Register.css";
import moment from 'moment';
// register page

export default class Register extends Component {
  constructor(props) {
    super(props);
// data of new user
    this.state = {
      isLoading: false,
      email: "",
      username: "",
      firstname: "",
      lastname: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null
    };
  }

// check if user input the correct form
  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }



// function to handle any other value
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }


  handleSubmit = async event => {
    event.preventDefault();
    this.setState({isLoading: true});
    this.setState({newUser: "test"});
    this.setState({isLoading: false});
    const email = this.state.email;
    const pass = this.state.password;
    const username = this.state.username;
    const firstname = this.state.firstname;
    const lastname = this.state.lastname;
    fetch('http://localhost:8000/api/rest-auth/registration/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"username":username,"email":email,"password1":pass,"password2":pass,"first_name":firstname,"last_name":lastname})
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.key);
      });
  }


// screen after user input data
  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirm your identity via your email address</ControlLabel>
          <HelpBlock>Please check your email for the verification link.</HelpBlock>
        </FormGroup>

      </form>
    );
  }

// screen for user to input data
  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="un" bsSize="large">
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="un"
            value={this.state.un}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="fn" bsSize="large">
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            type="fn"
            value={this.state.fn}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="ln" bsSize="large">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            type="ln"
            value={this.state.ln}
            onChange={this.handleChange}
          />
        </FormGroup>
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
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>

        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing up…"
        />
      </form>
    );
  }

// main screen
  render() {
    return (
      <div className="Signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}