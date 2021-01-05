import React, { useState, useEffect } from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

import * as refden from '../api/refden';
import { ALL_REFERENCES_LIST } from '../constants';

import List from './List';
import Settings from './Settings/Settings';

import './Lists.css';

const Lists = (props) => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    setLoading(true);
    refden.getLists()
      .then((response) => {
        setLists(response.data);
        setLoading(false);
      })
      // eslint-disable-next-line no-console
      .catch(console.log);
  }, []);

  const handleListClick = (list) => () => setSelectedList(list);
  const unSelectList = () => setSelectedList(null);

  const renderList = () => (
    <List
      key={selectedList.id}
      list={selectedList}
    />
  );

  const renderLists = () => {
    if (loading) return <Spinner size={SpinnerSize.large} />;

    return (
      <>
        <Link
          key={ALL_REFERENCES_LIST.id}
          className="pure-u-1 list"
          onClick={handleListClick(ALL_REFERENCES_LIST)}
        >
          {ALL_REFERENCES_LIST.name}
        </Link>
        {
          lists.map((list) => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <Link
              key={list.id}
              className="pure-u-1 list"
              onClick={handleListClick(list)}
            >
              {list.name}
            </Link>
          ))
        }
      </>
    );
  };

  const renderListsContainer = () => (
    <div className="pure-u-1">
      <h1 className="pure-u-1">Lists</h1>
      {renderLists()}
    </div>
  );

  return (
    <div className="pure-g lists-container">
      <Settings />
      {
        selectedList === null ? renderListsContainer() : renderList()
      }
      {
        selectedList !== null && (
          <DefaultButton
            className="pure-u-1-3 mt-1 go-back"
            onClick={unSelectList}
          >
            Go back
          </DefaultButton>
        )
      }
      {/* eslint-disable-next-line react/prop-types */}
      <DefaultButton className="pure-u-1-3 mt-1" onClick={props.logout}>Log out</DefaultButton>
    </div>
  )
};

export default Lists;
