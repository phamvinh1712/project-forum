import React, {Component} from 'react';
import './App.css';
import NavBar from "./components/NavBar";
import {BrowserRouter, Route,Switch} from "react-router-dom";
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
import NotFound from "./components/NotFound";
import PostList from "./components/PostList";
import Hashtag from "./components/Hashtag";
import Profile from "./components/Profile";
import changePassword from "./components/changePassword";
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      authenticated: false,
      isAdmin : false
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
      this.setState({user: json, authenticated: true,isAdmin:json.is_staff});
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
        <div className="root-content">
          <NavBar
            onChange = {this.onChange} onKeyDown = {this.onKeyDown} search = {this.state.search}
            authenticated={this.state.authenticated} user={this.state.user}/>
          <Switch>
            <Route exact path="/" component={Content}/>
            {/*authentication route, prevent authenticated user to redirect to this*/}
            {!this.state.authenticated &&
            <Route path="/login" render={(props) => <Login {...props} handleToken={this.handleToken}/>}/>}
            {!this.state.authenticated && <Route path="/register" component={Register}/>}
            {!this.state.authenticated && <Route path="/forgetpassword" component={ForgetPassword}/>}
            {!this.state.authenticated && <Route path="/reset/:uid/:token" component={Reset}/>}

            {/*protected route only for authenticated user*/}
            {this.state.authenticated && <Route path="/subthread/:handle/createpost/" component={CreatePost}/>}
            {this.state.authenticated && <Route path="/edit-post/:id" component={EditPost}/>}

            {/*protected route only for admin user*/}
            { this.state.isAdmin && <Route path="/admin" component={Admin}/>}

            {/*public route*/}
            <Route exact path="/subthread/:handle" component={SubThreadDisplay}/>
            <Route path="/posts/:id"
                   render={(props) => <Post {...props} authenticated={this.state.authenticated} user={this.state.user}/>} />
            <Route path="/search/:param" component={PostList}/>
            <Route path="/hashtag/:id" component={Hashtag}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/search/" component={PostList}/>
            <Route path="/changePassword" component={changePassword} />
            <Route path="*" component={NotFound} />
            
          </Switch>
          <ToastContainer autoClose={false}/>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;