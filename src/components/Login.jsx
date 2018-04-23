import React, { Component } from 'react';

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    this.props.handleLogin(this.state.email, this.state.password);
    event.preventDefault();
  };

  render() {
    return (
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
        <input
          type="email"
          name="email"
          required
          value={this.state.email}
          placeholder="Email"
          onChange={this.handleChange}
        />

        <input
          type="password"
          name="password"
          required
          value={this.state.password}
          placeholder="Password"
          onChange={this.handleChange}
        />

        <input
          className="pure-button pure-button-primary"
          type="submit"
          value="Submit"
        />
      </form>
    );
  }
}

export default Login;
