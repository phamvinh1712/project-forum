import React, {Component} from "react";
import {Button, FormGroup, FormControl, ControlLabel, Modal, ModalBody, HelpBlock} from "react-bootstrap";
import "./Login.css";

export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
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
    const email = this.state.email;
    fetch('/api/rest-auth/password/reset/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"email": email})
    }).then(res => res.json())
      .then(json => {
            this.setState({request:true});
      });

  };


// main screen
  NormalRender() {
    return (
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />

            <HelpBlock> Enter your email address</HelpBlock>
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
          <ControlLabel>Confirm your request via your email address</ControlLabel>
          <HelpBlock>Please check your email for the reset link.</HelpBlock>
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