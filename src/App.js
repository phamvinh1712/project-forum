import React, { Component } from 'react';
import NavBar from './components/NavBar';
import SubThreadDisplay from "./components/SubThreadDisplay";
class App extends Component {
  render() {
    return (
      <div className="App">
        <SubThreadDisplay/>
      </div>
    );
  }
}

export default App;
