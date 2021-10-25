import React, { Component } from 'react';
import toastr from 'toastr';
import _ from 'lodash/fp';
import LogRocket from 'logrocket';

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
  const headers = Promise.resolve(authHeaders);
  console.log(headers);
  if (headers === null) return false;

  const expiryInMs = parseInt(headers.expiry, 10) * 1000;
  return expiryInMs && expiryInMs > Date.now();
};

class App extends Component {
  constructor(props) {
    super(props);

    axiosInit(this.logout);

    console.log(isLogged());

    this.state = {
      isLogged: isLogged(),
    };
  }

  handleLogin = (email, password) => {
    console.log('0');
    console.log(email);
    console.log(password);
    refden.login(email, password)
      .then((response) => {
        console.log('1');
        const headers = extractAuthHeaders(response);
        console.log('2');
        setAuthHeaders(headers);
        console.log('3');
        const { id } = response.data.data;
        console.log('4');
        if (process.env.NODE_ENV !== 'development') {
          LogRocket.identify(id, { email });
        }
        console.log('5');
        window.Rollbar.configure({
          payload: {
            person: { id, email },
          },
        });
        console.log('6');
        this.setState({ isLogged: true });
        console.log('7');
      })
      .catch((error) => {
        // const errorMsg = error.response.data.errors[0];
        console.log('error');
        console.log(error);
        toastr.error(error);
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
