import React, { Component } from 'react';
import _ from 'lodash/fp';

import * as refden from '../api/refden';
import { REFERENCE_TAG_PREFIX } from '../constants';

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

  insertCitation = reference => () => {
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

          if (_.isEmpty(data.citation)) {
            contentControl.insertHtml("x".sup(), Word.InsertLocation.end);
          } else {
            contentControl.insertText(data.citation, Word.InsertLocation.end);
          }

          return context.sync();
        });
      })
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
            onClick={this.insertCitation(reference)}
          >
            {reference.title}
          </a>
        ))
      }
    </div>
  );
}

export default List;
