import React, { Component } from 'react';
import toastr from 'toastr';

import * as refden from '../api/refden';

import Lists from './Lists';
import Login from './Login';

import logo from '../logo.svg';
import './App.css';

const isLogged = () => {
  const headers = JSON.parse(localStorage.getItem('headers'));
  if(headers === null) return false;

  const expiryInMs = parseInt(headers.expiry, 10) * 1000;
  return expiryInMs && expiryInMs > Date.now();
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: isLogged(),
    };
  }

  handleLogin = (email, password) => {
    refden.login(email, password)
      .then(response => {
        localStorage.setItem('headers', JSON.stringify(response.headers));
        this.setState({isLogged: true});
      })
      .catch(error => {
        const errorMsg = error.response.data.errors[0];
        toastr.error(errorMsg);
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
            ? <Lists logout={this.logout} />
            : <Login handleLogin={this.handleLogin} />
        }
      </div>
    );
  }
}

export default App;
