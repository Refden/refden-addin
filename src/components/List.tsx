import React, { Component } from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import _ from 'lodash/fp';

import * as refden from '../api/refden';
import { REFDEN_URL } from '../constants';
import generateBibliography from '../lib/bibliography';
import getCitationText from '../lib/bibliography/getCitationText';
import insertCitationText from '../lib/bibliography/insertCitationText';
import {
  getReferenceIdFromControlItem,
  getRestReferenceIdsFromControlItem,
}
  from '../lib/wordContentControls/getReferenceIdFromControlItem';
import { buildTag, buildTitle } from '../lib/contentControls';
import { ListType, ReferenceType } from '../types';
import { fillContentControl } from '../lib/bibliography/updateBibliography';

import Reference from './Reference/Reference';

import './Lists.css';

type ListProps = {
  list: ListType;
  unSelectList: () => void;
}

type ListState = {
  loading: boolean;
  references: ReferenceType[];
  searchText: string;
}

const authorIncludesText = (text: string) => _.flow(
  _.get('name'),
  _.lowerCase,
  _.includes(text),
);

const titleIncludesText = (text: string) => _.flow(
  _.get('title'),
  _.lowerCase,
  _.includes(text),
);

const referenceIncludesText = (text: string) => (reference: ReferenceType) => (
  titleIncludesText(text)(reference)
  || (_.some(authorIncludesText(text), reference.authors))
);

const generateMultipleCitation = async (
  data: any,
  context: Word.RequestContext,
  contentControl: Word.ContentControl,
) => {
  const id = getReferenceIdFromControlItem(contentControl);
  const otherIds = getRestReferenceIdsFromControlItem(contentControl);
  otherIds.push(data.id);

  await fillContentControl(id, otherIds, contentControl);
  await context.sync();
};

const generateCitation = async (
  data: any,
  context: Word.RequestContext,
  opts: { page: string },
) => {
  const currentRange = context.document.getSelection();
  const { contentControls } = context.document;

  context.load(contentControls);
  await context.sync();

  // eslint-disable-next-line
  for (const contentControl of contentControls.items) {
    const range = contentControl.getRange(window.Word.RangeLocation.whole);
    const locationRelation = currentRange.compareLocationWith(range);
    // eslint-disable-next-line no-await-in-loop
    await context.sync();

    if (locationRelation.value === window.Word.LocationRelation.inside) {
      // eslint-disable-next-line no-await-in-loop
      await generateMultipleCitation(data, context, contentControl);

      return;
    }
  }

  const newContentControl = currentRange.insertContentControl();
  newContentControl.tag = buildTag(data);
  newContentControl.title = buildTitle([data.reference]);

  const citation = getCitationText(data, opts);
  insertCitationText(newContentControl, citation);

  await context.sync();
};

class List extends Component<ListProps, ListState> {
  debouncedSearch = _.debounce(
    150,
    (_event, searchText) => (
      this.setState({ searchText: searchText.toLowerCase() })
    ),
  );

  constructor(props: ListProps) {
    super(props);
    this.state = {
      loading: false,
      references: [],
      searchText: '',
    };
  }

  componentDidMount = () => {
    this.loadReferences();
  };

  loadReferences = () => {
    this.setState({ loading: true });
    refden.getReferences(this.props.list)
      .then((response) => this.setState({ loading: false, references: response.data }))
      .catch(console.log); // eslint-disable-line no-console
  }

  insertCitation = (reference: ReferenceType) => (opts: { page: string } = { page: '' }) => {
    refden.getReference(reference, opts.page)
      .then((response) => {
        const { data } = response;
        const { Word } = window;

        Word.run(async (context) => {
          await generateCitation(data, context, opts);
          generateBibliography();
        });
      })
      .catch(console.log); // eslint-disable-line no-console
  };

  visibleReferences = () => (
    this.state.references.filter(referenceIncludesText(this.state.searchText))
  );

  renderList = () => {
    if (this.state.loading) return <Spinner size={SpinnerSize.large} />;
    if (this.state.references.length === 0) {
      return (
        <MessageBar>
          You need to add a reference first at
          <Link href={REFDEN_URL} target="_blank">our website.</Link>
        </MessageBar>
      );
    }

    return (
      this.visibleReferences().map((reference, index) => (
        // TODO: fix api returning duplicated records
        <Reference
          key={`${reference.id}-${index}`} // eslint-disable-line react/no-array-index-key
          reference={reference}
          onClick={this.insertCitation(reference)}
        />
      ))
    );
  };

  render = () => (
    <div className="pure-u-1">
      <div style={{ display: 'flex' }}>
        <h2 style={{ flexGrow: 1 }}>
          {this.props.list.name}
        </h2>
        <Link onClick={this.loadReferences}>
          <Icon
            iconName="Refresh"
            title="Refresh"
            ariaLabel="Refresh"
            style={{ color: 'black', fontSize: 'large', marginRight: '0.8rem' }}
          />
        </Link>
        <Link onClick={this.props.unSelectList}>
          <Icon
            iconName="Back"
            title="Go back"
            ariaLabel="Go back"
            style={{ color: 'black', fontSize: 'large' }}
          />
        </Link>
      </div>
      <SearchBox
        placeholder={'Search for "title" or "author"'}
        onChange={this.debouncedSearch}
      />
      <br />
      {this.renderList()}
    </div>
  );
}

export default List;
