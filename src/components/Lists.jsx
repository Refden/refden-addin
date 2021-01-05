import React, { Component } from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

import * as refden from '../api/refden';

import List from './List';
import Settings from './Settings/Settings';

import './Lists.css';
import { ALL_REFERENCES_LIST } from '../constants';

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
      .then((response) => this.setState({ lists: response.data, loading: false }))
      // eslint-disable-next-line no-console
      .catch(console.log);
  };

  handleListClick = (list) => () => {
    this.setState({ selectedList: list });
  };

  unSelectList = () => {
    this.setState({ selectedList: null });
  };

  renderList = () => (
    <List
      key={this.state.selectedList.id}
      list={this.state.selectedList}
    />
  );

  renderLists = () => {
    if (this.state.loading) return <Spinner size={SpinnerSize.large} />;

    return (
      <>
        <Link
          key={ALL_REFERENCES_LIST.id}
          className="pure-u-1 list"
          onClick={this.handleListClick(ALL_REFERENCES_LIST)}
        >
          {ALL_REFERENCES_LIST.name}
        </Link>
        {
          this.state.lists.map((list) => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <Link
              key={list.id}
              className="pure-u-1 list"
              onClick={this.handleListClick(list)}
            >
              {list.name}
            </Link>
          ))
        }
      </>
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
        this.state.selectedList !== null && (
          <DefaultButton
            className="pure-u-1-3 mt-1 go-back"
            onClick={this.unSelectList}
          >
            Go back
          </DefaultButton>
        )
      }
      {/* eslint-disable-next-line react/prop-types */}
      <DefaultButton className="pure-u-1-3 mt-1" onClick={this.props.logout}>Log out</DefaultButton>
    </div>
  )
}

export default Lists;
