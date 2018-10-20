import React, {Component} from 'react';
import './App.css';
import NavBar from "./components/NavBar";
import {BrowserRouter, Route} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import SubThreadDisplay from "./components/SubThread";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
import Content from "./components/Content";
import Admin from "./components/Admin_page";
import {ToastContainer} from "react-toastify";
import EditPost from "./components/EditPost";
import ForgetPassword from "./components/ForgetPassword";
import Reset from "./components/Reset";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      authenticated: false
    }
    this.handleToken = this.handleToken.bind(this)
  }

  handleToken() {
    if (!localStorage.getItem('token')) return;
    if (this.state.authenticated) return;
    fetch('/api/user-detail/', {
      method: 'GET',
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('token').toString()
      }
    })
      .then(res => {
        if (res.ok)
          return res.json();
        else {
          throw new Error('Unable to get user information with token');
        }
      }).then(json => {
      this.setState({user: json, authenticated: true});
    })
      .catch((error) => {
        console.log(error);
        this.setState({authenticated: false});
        localStorage.clear();
      });
  }

  componentDidMount() {
    this.handleToken()
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar authenticated={this.state.authenticated} user={this.state.user}/>
          <div>
            <Route exact path="/" component={Content}/>
            <Route path="/login" render={(props) => <Login {...props} handleToken={this.handleToken}/>}/>
            <Route path="/register" component={Register}/>
            <Route exact path="/subthread/:handle" component={SubThreadDisplay}/>
            <Route path="/subthread/:handle/createpost/" component={CreatePost}/>
            <Route path="/posts/:id" component={Post}/>
            <Route path="/forgetpassword" component={ForgetPassword}/>
            <Route path="/reset/:uid/:token" component={Reset}/>
            <Route path="/edit-post/:id" component={EditPost}/>
            <Route path="/admin" component={Admin}/>
          </div>
          <ToastContainer autoClose={false}/>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
