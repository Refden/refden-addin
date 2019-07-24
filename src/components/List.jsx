import React, { Component } from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import _ from 'lodash/fp';

import * as refden from '../api/refden';
import { REFDEN_URL, REFERENCE_TAG_PREFIX } from '../constants';
import generateBibliography from '../lib/bibliography';
import insertCitationText from '../lib/bibliography/insertCitationText';

import Reference from './Reference/Reference';

import './Lists.css';

const authorIncludesText = text => _.flow(
  _.get('name'),
  _.lowerCase,
  _.includes(text),
);

const referenceIncludesText = text => reference =>
  (reference.title.toLowerCase().includes(text)) ||
  (_.some(authorIncludesText(text), reference.authors));

const getCitationText = (data, opts) => {
  if (opts.suppressAuthor) {
    return data.citation_suppress_author
  }
  if (opts.onlyAuthor) {
    return data.citation.split(',').slice(0, -1).join('').concat(')');
  }

  return data.citation;
};

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      references: [],
      searchText: '',
    };
  }

  componentDidMount = () => {
    this.setState({ loading: true });
    refden.getReferences(this.props.list)
      .then(response => this.setState({ loading: false, references: response.data }))
      .catch(console.log)
  };

  insertCitation = reference => (opts = {}) => {
    refden.getReference(reference)
      .then(response => {
        const data = response.data;
        const { Word } = window;

        Word.run(context => {
          const thisDocument = context.document;
          const range = thisDocument.getSelection();

          const contentControl = range.insertContentControl();
          contentControl.tag = `${REFERENCE_TAG_PREFIX}${data.id.toString()}`;
          contentControl.title = data.reference;

          const citation = getCitationText(data, opts);
          insertCitationText(contentControl,citation);

          generateBibliography();

          return context.sync();
        });
      })
      .catch(console.log)
  };

  visibleReferences = () =>
    this.state.references.filter(referenceIncludesText(this.state.searchText));

  renderList = () => {
    if (this.state.loading) return <Spinner size={SpinnerSize.large}/>;
    if (this.state.references.length === 0) {
      return (
        <MessageBar>
          You need to add a reference first at
          <Link href={REFDEN_URL} target="_blank">our website.</Link>
        </MessageBar>
      );
    }

    return (
      this.visibleReferences().map(reference => (
        <Reference
          key={reference.id}
          reference={reference}
          onClick={this.insertCitation(reference)}
        />
      ))
    );
  };

  render = () => (
    <div className="pure-u-1">
      <h1 className="pure-u-1">{this.props.list.name}</h1>
      <SearchBox
        placeholder={'Search for "title" or "author"'}
        onChange={searchText => this.setState({ searchText: searchText.toLowerCase() })}
      />
      <br/>
      {this.renderList()}
    </div>
  );
}

export default List;
