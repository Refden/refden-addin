import React, { Component } from 'react';

import * as refden from '../api/refden';

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
    refden.login(this.state.email, this.state.password)
      .then(response => {
        localStorage.setItem('headers', JSON.stringify(response.headers));
      })
      .catch(function (error) {
        console.log(error);
      });

    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>
          <input type="email"
                 name="email"
                 value={this.state.email}
                 placeholder="Email"
                 onChange={this.handleChange}
          />
        </p>

        <p>
          <input type="password"
                 name="password"
                 value={this.state.password}
                 placeholder="Password"
                 onChange={this.handleChange}
          />
        </p>

        <p>
          <input type="submit" value="Submit" />
        </p>

      </form>
    );
  }
}

export default Login;
