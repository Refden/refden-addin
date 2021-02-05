import React, { useState, useEffect } from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import _ from 'lodash/fp';

import * as refden from '../api/refden';
import { ALL_REFERENCES_LIST } from '../constants';
import { ListType } from '../types';

import List from './List';
import './Lists.css';
import Footer from './Footer/Footer';

type Props = {
  logout: () => void;
}

const Lists = (props: Props) => {
  const [lists, setLists] = useState<ListType[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedList, setSelectedList] = useState<ListType | null>(null);

  const loadLists = () => {
    setLoading(true);
    refden.getLists()
      .then((response) => {
        setLists(response.data);
        setLoading(false);
      })
      // eslint-disable-next-line no-console
      .catch(console.log);
  };

  useEffect(loadLists, []);

  const handleListClick = (list: ListType) => () => setSelectedList(list);
  const unSelectList = () => {
    setSelectedList(null);
    loadLists();
  };

  const renderList = () => {
    if (_.isNull(selectedList)) {
      return <></>;
    }

    return (
      <List
        key={selectedList.id}
        list={selectedList}
        unSelectList={unSelectList}
      />
    );
  };

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
    <div className="lists-container">
      {
        _.isNull(selectedList) ? renderListsContainer() : renderList()
      }
      <Footer logout={props.logout} />
    </div>
  );
};

export default Lists;
