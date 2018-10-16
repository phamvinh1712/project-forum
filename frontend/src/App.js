import React, {Component} from 'react';
import './App.css';
import NavBar from "./components/NavBar";
import {BrowserRouter, Route} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import SubThreadDisplay from "./components/SubThread";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      isLoggedIn: false
    }
    this.handleToken = this.handleToken.bind(this)
  }

  handleToken() {
    if (!localStorage.getItem('token')) return
    fetch('/api/user-detail/', {
      method: 'GET',
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('token').toString()
      }
    })
      .then(res => {
        return res.json();
      }).then(json => {
      this.setState({user: json, isLoggedIn: true});
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar user={this.state.user}/>
          <div className="root-content">
          <Route exact path="/" render={() => <Login handleToken={this.handleToken}/>}/>
          <Route exact path="/login" render={() => <Login handleToken={this.handleToken}/>}/>
          <Route path="/register" component={Register}/>
          <Route path="/subthread/:handle" component={SubThreadDisplay}/>
          <Route path="/createpost" component={CreatePost}/>
          <Route path="/posts/:id" component={Post}/>
          </div>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;