import React, {Component} from 'react';
import avatar from './avatar.js';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {toast} from "react-toastify";

const UpdateProfile = '/api/users/';
const GetProfile = '/api/user-detail/';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
      open: false,
      username: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      bio: '',
      birthday: '',
      avatar: '',
    };

  }

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    fetch(GetProfile,
      {
        method: 'GET',
        headers: {
          'Authorization': 'Token ' + localStorage.getItem('token').toString(),
        },
      })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        this.setState({
          username: data.username,
          first_name: data.first_name,
          last_name: data.last_name,
          phone_number: data.profile.phone_number,
          email: data.email,
          bio: data.profile.bio,
          birthday: data.profile.birthday,
          avatar: data.profile.avatar,
        });
      }).catch(err => console.log(err));
  }

  CreateProfile = () => {
    let form = new FormData();
    form.append('email', this.state.email)
    form.append('birthday', this.state.birthday)
    form.append('bio', this.state.bio)
    form.append('phone_number', this.state.phone_number)
    form.append('avatar', document.getElementById("avatar").files[0])
    form.append('first_name', this.state.first_name)
    form.append('last_name', this.state.last_name)
    console.log(form);
    fetch('/api/users/',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Token ' + localStorage.getItem('token').toString(),
        },
        body: form
      })
      .then(function (response) {
        if(response.ok)
        return response.json()
        else throw new Error('Something went wrong, please try again')
      })
      .then(function (data) {

        this.setState({
          username: data.username,
          first_name: data.first_name,
          last_name: data.last_name,
          phone_number: data.profile.phone_number,
          email: data.email,
          bio: data.profile.bio,
          birthday: data.profile.birthday,
          avatar: data.profile.avatar,
        });
      }.bind(this)).catch(err => {
        toast.error(err.toString, {
            position: toast.POSITION.TOP_CENTER
          });
    });
  };

  render() {
    return (
      <div>
        <title>Bootstrap Profile Page</title>
        <meta charSet="utf-8"/>
        {/* <link rel="stylesheet" href="../../public/css/bootstrap.min.css" /> */}
        <hr/>
        {/* Include {USERNAME, LOGO, AVATAR, UPLOAD AVATAR} */}
        <div className="container bootstrap snippet">
          <div className="row">
            <div className="col-sm-10"><h1>{this.state.username}</h1></div>
            {/* USERNAME HERE */}
            {/* LOGO HERE */}
          </div>
          <div className="row">
            <div className="col-sm-3">{/* LEFT COL */}
              <div className="text-center">
                <img src={this.state.avatar} className="avatar img-circle img-thumbnail" alt="avatar"/>
                <h6>Upload a different photo...</h6>
                <input type="file" id="avatar" className="text-center center-block file-upload"/>
                {/* CHANGE AVATAR */}
              </div>
              <br/> {/* END */}
              {/* ACTIVITY COL */}
              {/* END */}
            </div>
            {/* END COL */}
            <div className="col-sm-9">
              <div className="tab-content">
                <div className="tab-pane active" id="home"> {/* TAB PANEL */}
                  <hr/>
                  <form className="form" id="registrationForm">
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="first_name"><h4>First name</h4></label>
                        <input type="text" className="form-control" name="first_name" id="first_name"
                               value={this.state.first_name} onChange={this.handleInputChange} title="enter your first name if any."/>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="last_name"><h4>Last name</h4></label>
                        <input type="text" className="form-control" name="last_name" id="last_name"
                               value={this.state.last_name} onChange={this.handleInputChange} title="enter your last name if any."/>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="phone"><h4>Phone</h4></label>
                        <input type="text" className="form-control" name="phone_number" id="phone_number"
                               value={this.state.phone_number} onChange={this.handleInputChange} title="enter your phone number if any."/>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="email"><h4>Email</h4></label>
                        <input type="email" className="form-control" name="email" id="email" value={this.state.email}
                               onChange={this.handleInputChange} title="enter your email."/>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="bio"><h4>Biography</h4></label>
                        <input type="text" className="form-control" name="bio" id="bio" value={this.state.bio}
                               onChange={this.handleInputChange} title="enter your bio."/>
                      </div>
                    </div>


                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="birthday"><h4>Birthday</h4></label>
                        <input type="date" className="form-control" name="birthday" id="birthday" value={this.state.birthday}
                               onChange={this.handleInputChange} title="enter your birthday."/>
                      </div>
                    </div>
                  </form>
                  <div className="form-group">
                    <div className="col-xs-12">
                      <br/>
                      <div className="col-xs-6">
                        <button onClick={this.CreateProfile} className="btn btn-lg btn-success"><i
                          className="glyphicon glyphicon-ok-sign"/> Save
                        </button>
                        <button className="btn btn-lg"><i className="glyphicon glyphicon-repeat"/> Reset</button>
                      </div>
                      <div className="col-xs-6" align="left">
                        <Link to="/changePassword"><Button variant="contained" color="primary" aria-label="Add"
                                                           className="button-chg-pass">Change password</Button> </Link>
                      </div>
                    </div>
                  </div>
                  <hr/>
                </div>
                {/* END */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;