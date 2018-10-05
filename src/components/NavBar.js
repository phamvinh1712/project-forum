import React from 'react';
import SearchBar from 'material-ui-search-bar';
import './NavBar.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
// navigation bar with search bar UI and 2 button link to login page and register page
const navbar = props => (
  <header className="navbar">
    <nav className="navbar_navigation">
        <div className="navbar_logo"><a href="/">THE LOGO</a></div>
        <SearchBar
            className={"search_bar"}
            onChange={() => console.log('onChange')}
            onRequestSearch={() => console.log('onRequestSearch')}
            style={{
                margin: 'auto auto',
                maxWidth: 500
             }}
        />
        <Link to="/Login">
            <Button   variant="contained" className={'Login'}>
                Login
            </Button>
        </Link>
        <Link to="/Register">
            <Button  variant="contained" color="secondary" className={'SignUp'}>
                Sign Up
            </Button>
        </Link>

    </nav>
  </header>
);

export default navbar;