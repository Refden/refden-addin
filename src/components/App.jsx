import React, { Component } from 'react';

import Login from './Login';

import logo from '../logo.svg';
import './App.css';

class App extends Component {
  componentDidMount = () => {
    const headers = localStorage.getItem('headers');
    console.log('headers', JSON.stringify(headers, null, 2));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <Login />
      </div>
    );
  }
}

export default App;
