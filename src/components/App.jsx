import React, { Component } from 'react';

import * as refden from '../api/refden';

import Login from './Login';

import logo from '../logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
    };
  }

  componentDidMount = () => {
    const headers = JSON.parse(localStorage.getItem('headers'));
    const expiryInMs = parseInt(headers.expiry, 10) * 1000;
    const isLogged = expiryInMs && expiryInMs > Date.now();

    this.setState({ isLogged });
  };

  handleLogin = (email, password) => {
    refden.login(email, password)
      .then(response => {
        localStorage.setItem('headers', JSON.stringify(response.headers));
        this.setState({isLogged: true});
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  logout = () => {
    localStorage.removeItem('headers');
    this.setState({isLogged: false});
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>

        {
          this.state.isLogged
            ? <button onClick={this.logout}>Log out</button>
            : <Login handleLogin={this.handleLogin} />
        }
      </div>
    );
  }
}

export default App;
