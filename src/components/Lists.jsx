import React, { Component } from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

import * as refden from '../api/refden';
import { REFDEN_URL } from '../constants';

import List from './List';
import Settings from './Settings/Settings';

import './Lists.css';

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      loading: false,
      selectedList: null,
    };
  }

  componentDidMount = () => {
    this.setState({ loading: true });
    refden.getLists()
      .then(response => this.setState({ lists: response.data, loading: false }))
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

  renderLists = () => {
    if (this.state.loading) return <Spinner size={SpinnerSize.large} />;
    if (this.state.lists.length === 0) {
      return (
        <MessageBar>
          You need to create a list first at
          <Link href={REFDEN_URL} target="_blank">our website.</Link>
        </MessageBar>
      );
    }

    return (
      this.state.lists.map(list => (
        <Link
          key={list.id}
          className="pure-u-1 list"
          onClick={this.handleListClick(list)}
        >
          {list.name}
        </Link>
        )
      )
    );
  };

  renderListsContainer = () => (
    <div className="pure-u-1">
      <h1 className="pure-u-1">Lists</h1>
      {this.renderLists()}
    </div>
  );

  render = () => (
    <div className="pure-g lists-container">
      <Settings />
      {
        this.state.selectedList === null ? this.renderListsContainer() : this.renderList()
      }
      {
        this.state.selectedList !== null &&
          <DefaultButton
            className="pure-u-1-3 mt-1 go-back"
            onClick={this.unSelectList}
          >
            Go back
          </DefaultButton>
      }
      <DefaultButton className="pure-u-1-3 mt-1" onClick={this.props.logout}>Log out</DefaultButton>
    </div>
  )
}

export default Lists;
