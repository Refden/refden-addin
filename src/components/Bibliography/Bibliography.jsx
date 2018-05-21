import React, { Component } from 'react';
import _ from 'lodash/fp';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import './Bibliography.css';

const REFERENCE_ID = 'tag';
const REFERENCE_TEXT = 'title';

const PARAMS_TO_LOAD = [
  REFERENCE_ID,
  'text',
  REFERENCE_TEXT
];

const getReferencesFromControls = _.flow(
  _.get('items'),
  _.reject(['text', ""]),
  _.map('title'),
  _.uniq,
  _.sortBy(_.identity),
);

const insertBibliography = () => {
  const { Word } = window;

  Word.run(context => {
    const { document } = context;
    const { contentControls } = document;

    context.load(contentControls, PARAMS_TO_LOAD);

    return context.sync().then(() => {
      const references = getReferencesFromControls(contentControls);

      references.forEach(reference =>
        document.body.insertText(`\n${reference}`, Word.InsertLocation.end)
      );
    });
  });
};

const Bibliography = () => (
  <div className="pure-u-1">
    <DefaultButton
      primary
      className="pure-u-1 bibliography-btn"
      onClick={insertBibliography}
    >
      Insert Bibliography
    </DefaultButton>
  </div>
);

export default Bibliography;
