import React, { Component } from 'react';
import avatar from './avatar.js';
const PostAPI = '/api/users/';
class Profile extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
          check:false,
          open:false,
          first_name:'',
          last_name:'',
          phone_number:'',
    };
    this.CreateProfile = this.CreateProfile.bind(this);
  }
CreateProfile = () =>{ 
  fetch(PostAPI ,
  {
  method: 'POST' ,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + localStorage.getItem('token').toString()
  },
  body: JSON.stringify(
    {
      'first_name':document.getElementById("first_name"),
      'last_name':document.getElementById("last_name"),
      'phone_number':document.getElementById("phone"),
    }
  )
  })
  .then(function(response){
      return response.json()
  })
  .then(function(data){
      console.log(data)
  })
};
    render() {
        return (
          <div>
  <title>Bootstrap Profile Page</title>
  <meta charSet="utf-8" />
  <link rel="stylesheet" href="../../public/css/bootstrap.min.css" />
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
          <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" className="avatar img-circle img-thumbnail" alt="avatar" />
          <h6>Upload a different photo...</h6>
          <input type="file" className="text-center center-block file-upload" />
          {/* CHANGE AVATAR */}
        </div><br /> {/* END */}
        {/* ACTIVITY COL */}
        <ul className="list-group">
          <li className="list-group-item text-muted">Activity <i className="fa fa-dashboard fa-1x" /></li>
          <li className="list-group-item text-right"><span className="pull-left"><strong>Shares</strong></span> 125</li>
          <li className="list-group-item text-right"><span className="pull-left"><strong>Likes</strong></span> 13</li>
          <li className="list-group-item text-right"><span className="pull-left"><strong>Posts</strong></span> 37</li>
          <li className="list-group-item text-right"><span className="pull-left"><strong>Followers</strong></span> 78</li>
        </ul> {/* END */}
      </div>{/* END COL */}
      <div className="col-sm-9">
        <div className="tab-content">
          <div className="tab-pane active" id="home"> {/* TAB PANEL */}
            <hr />
            <form className="form" action="##" method="post" id="registrationForm">
              <div className="form-group">
                <div className="col-xs-6">
                  <label htmlFor="first_name"><h4>First name</h4></label>
                  <input type="text" className="form-control" name="first_name" id="first_name" placeholder="first name" value={this.state.first_name} />
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-6">
                  <label htmlFor="last_name"><h4>Last name</h4></label>
                  <input type="text" className="form-control" name="last_name" id="last_name" placeholder="last name" value={this.state.last_name} />
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-6">
                  <label htmlFor="phone"><h4>Phone</h4></label>
                  <input type="text" className="form-control" name="phone" id="phone" placeholder="enter phone" value={this.state.phone_number} />
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-12">
                  <br />
                  <button onClick={this.CreateProfile}  className="btn btn-lg btn-success" type="submit"><i className="glyphicon glyphicon-ok-sign" /> Save</button>
                  <button className="btn btn-lg" type="reset"><i className="glyphicon glyphicon-repeat" /> Reset</button>
                </div>
              </div>
            </form>
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

export default Profile;