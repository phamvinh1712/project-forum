import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Admin from './components/Admin_page'
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Admin}/>
    </div>
    </BrowserRouter>, document.getElementById('root')
    );
    serviceWorker.unregister();

