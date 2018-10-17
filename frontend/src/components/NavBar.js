import React, {Component} from "react";
import SearchBar from 'material-ui-search-bar';
import './NavBar.css';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {DropdownMenu, MenuItem} from 'react-bootstrap-dropdown-menu';
import {DropdownButton} from 'react-bootstrap'
// navigation bar with search bar UI and 2 button link to login page and register page
export default class navbar extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);

  };


  renderDropdownButton(title, i) {
    return (
      <DropdownButton
        bsStyle={title.toLowerCase()}
        title={title}
        key={i}
        id={`dropdown-basic-${i}`}
      >
        <MenuItem eventKey="1">Action</MenuItem>
        <MenuItem eventKey="2">Another action</MenuItem>
        <MenuItem eventKey="3" active>
          Active Item
        </MenuItem>
        <MenuItem divider/>
        <MenuItem eventKey="4">Separated link</MenuItem>
      </DropdownButton>
    );
  }

  logout(e) {
    localStorage.removeItem("token");
    window.location.reload();
  }

  renderUser() {


    return (
      <div className={'navbar_button'}>

        <label> Welcome {localStorage.getItem('token').toString()}</label>
        <DropdownMenu userName={localStorage.getItem('token').toString()}>
          <MenuItem text="Home" location="/home"/>
          <MenuItem text="Edit Profile" location="/profile"/>
          <MenuItem text="Change Password" location="/change-password"/>
          <MenuItem text="Privacy Settings" location="/privacy-settings"/>
          <MenuItem text="Logout" onClick={this.logout}/>
        </DropdownMenu>
      </div>


    )
      ;
  }

  renderForm() {
    return (
      <div className={"navbar_button"}>
        <Link to="/Login">
          <Button variant="contained" className={'Login'}>
            Login
          </Button>
        </Link>
        <Link to="/Register">
          <Button variant="contained" color="secondary" className={'SignUp'}>
            Sign Up
          </Button>
        </Link>
      </div>)

  }

  render() {
    return (
      <header className="navbar">
        <nav className="navbar_navigation">
          <div className="navbar_logo"><span href="/">THE LOGO</span></div>
          <div className={"dropdown"}>
            <DropdownButton className={"Button1"}
                            title={"Ducati"}
                            key={1}
                            id={`dropdown-basic-${1}`}
            >
              <MenuItem text="Home" location="/home"/>
              <MenuItem text="Edit Profile" location="/profile"/>
              <MenuItem text="Change Password" location="/change-password"/>
              <MenuItem text="Privacy Settings" location="/privacy-settings"/>
              <MenuItem text="Logout" onClick={this.logout}/>
            </DropdownButton>
          </div>

          <div className="search_bar">
            <SearchBar
              className={"search_bar"}
              onChange={() => console.log('onChange')}
              onRequestSearch={() => console.log('onRequestSearch')}
            />
          </div>

          {
            (localStorage.getItem('token') === null)
              ? this.renderForm()
              : this.renderUser()

          }


        </nav>
      </header>


    )
      ;
  }
}
