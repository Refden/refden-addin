import React, { Component } from 'react';

import * as refden from '../api/refden';

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
    };
  }

  componentDidMount = () => {
    refden.getLists()
      .then(response => {
        this.setState({
          lists: response.data,
        })
      })
      .catch(error => {
        console.log('error', error);
      })
  };

  render = () => (
    <div>
      <button onClick={this.props.logout}>Log out</button>
      <h1>Lists</h1>
      {
        this.state.lists.map(list => (
          <div>{list.name}</div>
        ))
      }
    </div>
  )
}

export default Lists;
