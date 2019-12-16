import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { REFDEN_URL } from '../constants';

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    this.props.handleLogin(this.state.email, this.state.password);
    event.preventDefault();
  };

  render() {
    return (
      <div id="loginContainer">
        <div className="pure-g">
          <p className="pure-u-1">
            Login and bring your references from your account at&nbsp;
            <a href={REFDEN_URL} target="_blank" rel="noopener noreferrer">www.refden.co</a>
            . See a video example&nbsp;
            <a href="https://www.youtube.com/watch?v=0-fXMe0zd8Y" target="_blank" rel="noopener noreferrer">here</a>
            .
          </p>
        </div>
        <form className="pure-form pure-form-stacked text-center" onSubmit={this.handleSubmit}>
          <h2>Log in</h2>
          <input
            type="email"
            name="email"
            className="align-center"
            required
            value={this.state.email}
            autoComplete="username"
            placeholder="Email"
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            className="align-center"
            required
            value={this.state.password}
            autoComplete="current-password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <input
            className="pure-button pure-button-primary mt-1"
            type="submit"
            value="Submit"
          />
        </form>
        <br />
        <div className="pure-g">
          <p className="pure-u-1">
            Don&apos;t have a Refden account? Sign up or learn more about our services&nbsp;
            <a href={REFDEN_URL} target="_blank" rel="noopener noreferrer">
              here
            </a>
            .
          </p>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
