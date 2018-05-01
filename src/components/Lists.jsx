import React, { Component } from 'react';

import * as refden from '../api/refden';

import List from './List';
import Settings from './Settings/Settings';

import './List.css';

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      selectedList: null,
    };
  }

  componentDidMount = () => {
    refden.getLists()
      .then(response => this.setState({ lists: response.data }))
      .catch(() => this.props.logout())
  };

  handleListClick = list => () => {
    this.setState({ selectedList: list });
  };

  unSelectList = () => {
    this.setState({ selectedList: null });
  };

  renderList = () => (
    <List list={this.state.selectedList} logout={this.props.logout} />
  );

  renderLists = () => (
    <div className="pure-u-1">
      <h1 className="pure-u-1">Lists</h1>
      { this.state.lists.length === 0 ? 'Loading...' : '' }
      {
        this.state.lists.map(list => (
          // eslint-disable-next-line jsx-a11y/href-no-hash
          <a
            key={list.id}
            href="#"
            className="pure-u-1 list"
            onClick={this.handleListClick(list)}
          >
            {list.name}
          </a>
        ))
      }
    </div>
  );

  render = () => (
    <div className="pure-g lists-container">
      <Settings />
      {this.state.selectedList === null ? this.renderLists() : this.renderList()}
      <br/>
      {this.state.selectedList !== null
        ? <button className="pure-u-1-3 go-back" onClick={this.unSelectList}>Go back</button>
        : ''
      }
      <button className="pure-u-1-3" onClick={this.props.logout}>Log out</button>
    </div>
  )
}

export default Lists;
