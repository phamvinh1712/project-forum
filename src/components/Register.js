import React, { Component } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Register.css";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
 // register page

export default class Register extends Component {
  constructor(props) {
    super(props);
// data of new user
    this.state = {
      isLoading: false,
      email: "",
      fn: "",
      ln: "",
      bd: moment(),
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null
    };
    this.handleChangeD = this.handleChangeD.bind(this);
  }
// check if user input the correct form
  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }
// check if confirmation code is valid
  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }
// function to handle any other value
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
// function to handle day of birth field change
  handleChangeD(date) {
    this.setState({
      bd: date
    });
  }
   handleSubmit = async event => {
    event.preventDefault();
     this.setState({ isLoading: true });
     this.setState({ newUser: "test" });
     this.setState({ isLoading: false });
  }
   handleConfirmationSubmit = async event => {
    event.preventDefault();
     this.setState({ isLoading: true });
  }
// screen after user input data
  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateConfirmationForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying…"
        />
      </form>
    );
  }
// screen for user to input data
  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
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
         <div className="container" id="red">
            <ControlLabel> Date of Birth </ControlLabel>
          <DatePicker
                  selected={this.state.bd}
                 onChange={this.handleChangeD}
          />
        </div>
           <FormGroup/>
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