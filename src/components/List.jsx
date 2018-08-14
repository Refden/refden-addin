import React, { Component } from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

import * as refden from '../api/refden';
import { REFDEN_URL, REFERENCE_TAG_PREFIX } from '../constants';
import generateBibliography from '../lib/generateBibliography';
import insertCitationText from '../lib/generateBibliography/insertCitationText';

import './Lists.css';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      references: [],
    };
  }

  componentDidMount = () => {
    this.setState({ loading: true });
    refden.getReferences(this.props.list)
      .then(response => this.setState({ loading: false, references: response.data }))
      .catch(() => this.props.logout())
  };

  insertCitation = reference => event => {
    event.preventDefault();

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
          insertCitationText(contentControl, data.citation);

          generateBibliography();

          return context.sync();
        });
      })
      .catch(() => this.props.logout())
  };

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
      this.state.references.map(reference => (
        <Link
          key={reference.id}
          className="pure-u-1 list"
          onClick={this.insertCitation(reference)}
        >
          {reference.title}
        </Link>
      ))
    );
  };

  render = () => (
    <div className="pure-u-1">
      <h1 className="pure-u-1">{this.props.list.name}</h1>
      {this.renderList()}
    </div>
  );
}

export default List;
