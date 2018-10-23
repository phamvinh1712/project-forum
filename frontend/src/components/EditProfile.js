import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
const GetProfile = '/api/user-detail/';

class EditProfile extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
          check:false,
          open:false,
          birthday:'',
          bio:'',
          phone_number:'',
          user: [],
          profile: [],
          open:false,
    };
  }
  handleChangeOpen = () => {
      this.setState({open: true});
  }
  handleClose = () => {
   this.setState({ open: false });
 };
  componentDidMount() {
    fetch(GetProfile,
    {
      method: 'GET',
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('token').toString(),
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.setState({ user: data, profile:data.profile });
    }).catch(err => console.log(err));
}

CreateProfile = () =>{  
  this.state.open = true;
  let form = new FormData();
  form.append('email',document.getElementById('email').value)
  form.append('birthday',document.getElementById("birthday").value)
  form.append('bio', document.getElementById("bio").value)
  form.append('phone_number', document.getElementById("phone").value)
  form.append('avatar', document.getElementById("avatar").files[0])
  form.append('first_name', document.getElementById("first_name").value)
  form.append('last_name', document.getElementById("last_name").value)
  
  fetch('/api/users/' ,
  {
  method: 'POST' ,
  headers: {
    'Authorization': 'Token ' + localStorage.getItem('token').toString(),
  },
  body: form
  })
  .then(function(response){
      return response.json()
  })
  .then(function(data){
    console.log(data)
      this.setState({ user: data, profile:data.profile });
    }.bind(this)).catch(err => console.log(err));
  };
    render() {
        return (
          <div>
  <title>Bootstrap Profile Page</title>
  <meta charSet="utf-8" />
  {/* <link rel="stylesheet" href="../../public/css/bootstrap.min.css" /> */}
  <hr /> {/* Include {USERNAME, LOGO, AVATAR, UPLOAD AVATAR} */}
  <div className="container bootstrap snippet">
    <div className="row">
      <div className="col-sm-10"><h1>User Name</h1></div> 
      {/* USERNAME HERE */}
      <div className="col-sm-2"><a href="#" className="pull-right"><img title="profile image" className="img-circle img-responsive" src="https://www.unzcloud.com/wp-content/uploads/2017/10/shutterstock_730664305-600x400.jpg" /></a></div>
      {/* LOGO HERE */}
    </div>
    <div className="row">
      <div className="col-sm-3">{/* LEFT COL */}
        <div className="text-center">
          <img src={this.state.profile.avatar} className="avatar img-circle img-thumbnail" alt="avatar" />
          <h6>Upload a different photo...</h6>
          <input type="file" id="avatar" className="text-center center-block file-upload"/>
          {/* CHANGE AVATAR */}
        </div><br /> {/* END */}
      </div>{/* END COL */}
      <div className="col-sm-9">
        <div className="tab-content">
          <div className="tab-pane active" id="home"> {/* TAB PANEL */}
            <hr />
            <form className="form" id="registrationForm">
              <div className="form-group">
                <div className="col-xs-6"> 
                  <label htmlFor="first_name"><h4>First name</h4></label>
                  <input type="text" className="form-control" name="first_name" id="first_name" placeholder={this.state.user.first_name} title="enter your first name if any." />
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-6">
                  <label htmlFor="last_name"><h4>Last name</h4></label>
                  <input type="text" className="form-control" name="last_name" id="last_name" placeholder={this.state.user.last_name} title="enter your last name if any." />
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-6">
                  <label htmlFor="phone"><h4>Phone</h4></label>
                  <input type="text" className="form-control" name="phone" id="phone" placeholder={this.state.profile.phone_number} title="enter your phone number if any." />
                </div>
              </div>
    
              <div className="form-group">
                <div className="col-xs-6">
                  <label htmlFor="email"><h4>Email</h4></label>
                  <input  type="email" className="form-control" name="email" id="email" placeholder={this.state.user.email} title="enter your email." />
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-6">
                  <label htmlFor="bio"><h4>Biography</h4></label>
                  <input type="text" className="form-control" id="bio" placeholder={this.state.profile.bio}  title="enter your bio." />
                </div>
              </div>


              <div className="form-group">
                <div className="col-xs-6">
                  <label htmlFor="birthday"><h4>Birthday</h4></label>
                  <input type="text" className="form-control" id="birthday" placeholder={this.state.profile.birthday}  title="enter your birthday." />
                </div>
              </div>
            </form>

            <div className="form-group">
                <div className="col-xs-12">
                  <br />
                  <div className="col-xs-6">
                  <button onClick={this.CreateProfile} className="btn btn-lg btn-success"> <i className="glyphicon glyphicon-ok-sign" /> 
                    Save</button>
                    <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    Save successfully
                    </DialogContentText>
                    </DialogContent>
                    </Dialog>
                  <button className="btn btn-lg"><i className="glyphicon glyphicon-repeat" /> Reset</button>
                  </div>
                  <div className="col-xs-6" align="left">
                  <Link to = "/changePassword"><Button variant="contained" color="primary" aria-label="Add" className="button-chg-pass">Change password</Button> </Link>
                  </div>
                </div>
            </div>
            <hr />
          </div>{/* END */}    
        </div>
      </div>
    </div>
  </div>
</div>
      );
    }
  }

export default EditProfile;