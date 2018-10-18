import React, {Component} from "react";
import {Button, FormGroup, FormControl, ControlLabel, Modal, ModalBody, HelpBlock} from "react-bootstrap";
import "./Login.css";
import {Link} from 'react-router-dom';

export default class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password1: "",
      password2: "",
      request: false
    };
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
    const password1 = this.state.password1;
    const password2 = this.state.password2;
    console.log(this.props.match.params.uid);
    console.log(this.props.match.params.token);
    fetch('/api/rest-auth/password/reset/confirm/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"new_password1":password1,"new_password2":password2,
        "uid": this.props.match.params.uid,"token":this.props.match.params.token})
    })
    this.setState({request: true});

  };


// main screen
  NormalRender() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="password1" bsSize="large">
          <ControlLabel>Enter your new password</ControlLabel>
          <FormControl
            autoFocus
            type="password"
            value={this.state.password1}
            onChange={this.handleChange}
          />

        </FormGroup>

        <FormGroup controlId="password2" bsSize="large">
          <ControlLabel>Confirm your new password</ControlLabel>
          <FormControl
            autoFocus
            type="password"
            value={this.state.password2}
            onChange={this.handleChange}
          />

        </FormGroup>

        <Button
          block
          bsSize="large"
          type="submit"
        >
          Sent request
        </Button>
      </form>

    );

  }

  AfterRender() {
    return (
      <form>
        <FormGroup controlId="BoxText" bsSize="large">
          <ControlLabel>Your password have been reset</ControlLabel>
          <Link to="/Login"><HelpBlock bsClass="help-blockLogin"> Click here to go to login page</HelpBlock>
          </Link>
        </FormGroup>

      </form>
    );
  }

  render() {
    return (
      <div className="Login">
        {(this.state.request)
          ? this.AfterRender()
          : this.NormalRender()
        }
      </div>
    );
  }

}