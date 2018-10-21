import React, { Component } from 'react';
import './Footer.css';
import * as module from './Dialog';


const footer = props => (
    <footer className="footer">
        <p align="center">
            Copyright<br />
            Footer is here
        </p>
        <div>
            <button type="button" onClick={() => {module.alert()}}>Alert</button>
            <button type="button" onClick={() => {module.confirm()}}>Confirm</button>
        </div>
    </footer>
);

export default footer;
