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

  insertCitation = reference => () => {
    const { Word } = window;

    Word.run(context => {
      const thisDocument = context.document;
      const range = thisDocument.getSelection();

      range.insertText(reference.citation, Word.InsertLocation.end);
      thisDocument.body.insertText(`\n${reference.reference}`, Word.InsertLocation.end);

      return context.sync();
    })
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
