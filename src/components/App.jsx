import React, { Component } from 'react';
import toastr from 'toastr';
import _ from 'lodash/fp';

import * as refden from '../api/refden';
import axiosInit from '../api/axios';
import { authHeaders, removeAuthHeaders, setAuthHeaders } from '../lib/storage';

import Lists from './Lists';
import Login from './Login';

import './App.css';

const extractAuthHeaders = _.flow(
  _.get('headers'),
  _.pick(['access-token', 'client', 'expiry', 'token-type', 'uid']),
);

const isLogged = () => {
  const headers = authHeaders();
  if (headers === null) return false;

  const expiryInMs = parseInt(headers.expiry, 10) * 1000;
  return expiryInMs && expiryInMs > Date.now();
};

class App extends Component {
  constructor(props) {
    super(props);

    axiosInit(this.logout);

    this.state = {
      isLogged: isLogged(),
    };
  }

  handleLogin = (email, password) => {
    refden.login(email, password)
      .then((response) => {
        const headers = extractAuthHeaders(response);
        setAuthHeaders(headers);

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
    removeAuthHeaders();
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
