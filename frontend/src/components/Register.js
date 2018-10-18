import React, {Component} from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
  Collapse,
  Well
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Register.css";

// register page

class Register extends Component {
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
      newUser: false,
      emailValidation: "",
      usernameValidation: "",
      emailValTF: false,
      usernameValTF: false,
      passValTF:false
    };
  }


// check if user input the correct form
  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 7 &&
      this.state.password === this.state.confirmPassword
    );
  }

  passwordValidation() {
    if ((this.state.password.length > 7) &&
      (this.state.password === this.state.confirmPassword)) {
      return "success"
    }
    else return "error"

  }

// function to handle any other value
  handleChange = event => {
    if (this.state.password.length > 7 && this.state.password === this.state.confirmPassword) {
      this.setState({passwordValidation: "success"})
    }
    if (this.state.password.length < 8 || this.state.password !== this.state.confirmPassword) {
      this.setState({passwordValidation: "error"})
    }
    this.setState({
      [event.target.id]: event.target.value
    });

  }


  handleSubmit = async event => {
    event.preventDefault();
    this.setState({isLoading: true});
    const email = this.state.email;
    const pass = this.state.password;
    const username = this.state.username;
    const firstname = this.state.firstname;
    const lastname = this.state.lastname;
    fetch('/api/rest-auth/registration/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username": username,
        "email": email,
        "password1": pass,
        "password2": pass,
        "first_name": firstname,
        "last_name": lastname
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (!json.hasOwnProperty("detail")) {
          if (json.hasOwnProperty("email")) {
            this.setState({emailValidation: "error",emailValTF: true});
          }
          if (json.hasOwnProperty("username")) {
            this.setState({usernameValidation: "error",usernameValTF:true});
          }
          if (json.hasOwnProperty("password1")) {
            this.setState({passValTF: true});
          }
        } else {
          this.setState({newUser:true});
        }
      });
        this.setState({isLoading: false});

  }


// screen after user input data
  renderConfirmationForm() {
    return (
      <form>
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
        <FormGroup controlId="username" bsSize="large" validationState={this.state.usernameValidation}>
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <FormControl.Feedback/>
          <Collapse in={this.state.usernameValTF}>
          <div>
            <Well>
              This username is already exist, please choose another one
            </Well>
          </div>
        </Collapse>
        </FormGroup>

        <FormGroup controlId="firstname" bsSize="large">
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            type="fn"
            value={this.state.firstname}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="lastname" bsSize="large">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            type="lastname"
            value={this.state.lastname}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large" validationState={this.state.emailValidation}>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <FormControl.Feedback/>
          <Collapse in={this.state.emailValTF}>
          <div>
            <Well>
              This email is already exist, please choose another one
            </Well>
          </div>
        </Collapse>
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
          <HelpBlock> Your password must be 8 characters or more </HelpBlock>

        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large" validationState={this.passwordValidation()}>
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
           <Collapse in={this.state.passValTF}>
          <div>
            <Well>
              Your password are too common try something else
            </Well>
          </div>
        </Collapse>
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
        {(this.state.newUser)
                ? this.renderConfirmationForm()
                : this.renderForm()
        }
      </div>
    );
  }
}

export default Register;