import React, { Component } from 'react';
import toastr from 'toastr';
import axios from 'axios';

import * as refden from '../api/refden';

import Lists from './Lists';
import Login from './Login';

import './App.css';

const isLogged = () => {
  const headers = JSON.parse(localStorage.getItem('headers'));
  if (headers === null) return false;

  const expiryInMs = parseInt(headers.expiry, 10) * 1000;
  return expiryInMs && expiryInMs > Date.now();
};

const axiosOnResponseOk = (response) => response;
const axiosOnResponseError = (logout) => (error) => {
  if (error.response && error.response.status === 401) {
    logout();
  }

  return Promise.reject(error);
};

class App extends Component {
  constructor(props) {
    super(props);
    axios.interceptors.response.use(axiosOnResponseOk, axiosOnResponseError(this.logout));

    this.state = {
      isLogged: isLogged(),
    };
  }

  handleLogin = (email, password) => {
    refden.login(email, password)
      .then((response) => {
        localStorage.setItem('headers', JSON.stringify(response.headers));
        window.Rollbar.configure({
          payload: {
            person: {
              id: response.data.data.id,
              email: response.data.data.email,
            },
          },
        });
        this.setState({ isLogged: true });
      })
      .catch((error) => {
        const errorMsg = error.response.data.errors[0];
        toastr.error(errorMsg);
      });
  };

  logout = () => {
    localStorage.removeItem('headers');
    this.setState({ isLogged: false });
  };

  render() {
    return (
      <div className="App">
        {
          process.env.NODE_ENV === 'development' && (
            <div className="development-badge">
              Development
            </div>
          )
        }
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
