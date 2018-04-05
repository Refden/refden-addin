import React, { Component } from 'react';

import * as refden from '../api/refden';

import './Lists.css';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      references: [],
    };
  }

  componentDidMount = () => {
    refden.getReferences(this.props.list)
      .then(response => this.setState({references: response.data}))
      .catch(() => this.props.logout())
  };

  render = () => (
    <div className="pure-u-1">
      <h1 className="pure-u-1">{this.props.list.name}</h1>
      { this.state.references.length === 0 ? 'Loading...' : '' }
      {
        this.state.references.map(reference => (
          // eslint-disable-next-line jsx-a11y/href-no-hash
          <a
            key={reference.id}
            href="#"
            className="pure-u-1 list"
            onClick={() => {
            }}
          >
            {reference.title}
          </a>
        ))
      }
    </div>
  );
}

export default List;
