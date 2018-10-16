import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import sidebar from './components/sidebarMenu'
import Admin from './components/Admin_page'
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path="/admin" component={Admin}/>
      <Route exact path="/sidebar" component={sidebar}/>
    </div>
    </BrowserRouter>, document.getElementById('root')
    );
    serviceWorker.unregister();

