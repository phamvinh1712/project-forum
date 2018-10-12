import React from 'react';
import SearchBar from 'material-ui-search-bar';
import './NavBar.css';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {DropdownButton,MenuItem} from 'react-bootstrap';
// navigation bar with search bar UI and 2 button link to login page and register page
const navbar = props => (
  <header className="navbar">
    <nav className="navbar_navigation">
      <div className="navbar_logo"><span href="/">THE LOGO</span></div>
      <div className={"dropdownb"}>
        <DropdownButton className={"Button1"}
          title={"Ducati"}
          key={1}
          id={`dropdown-basic-${1}`}
        >
          <MenuItem eventKey="1">Action</MenuItem>
          <MenuItem eventKey="2">Another action</MenuItem>
          <MenuItem eventKey="3" active>
            Active Item
          </MenuItem>
          <MenuItem divider/>
          <MenuItem eventKey="4">Separated link</MenuItem>
        </DropdownButton>
      </div>
      <div className="search_bar">
        <SearchBar
          className={"search_bar"}
          onChange={() => console.log('onChange')}
          onRequestSearch={() => console.log('onRequestSearch')}
        />
      </div>
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
      </div>
    </nav>
  </header>
);

export default navbar;