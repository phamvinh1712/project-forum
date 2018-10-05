import React from 'react';
import SearchBar from 'material-ui-search-bar';
import './NavBar.css';



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

        <div className="navbar_button">

            <a href="/">WELCOME USER</a>
        </div>

    </nav>
  </header>
);

export default navbar;