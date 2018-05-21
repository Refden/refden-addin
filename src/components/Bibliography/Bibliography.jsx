import React from 'react';
import _ from 'lodash/fp';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import './Bibliography.css';

const BIBLIOGRAPHY_TAG = 'refden_bibliography';

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

const removePreviousBibliographies = bibliographyControls =>
  bibliographyControls.items.forEach(item => item.delete(false));

const insertBibliography = () => {
  const { Word } = window;

  Word.run(context => {
    const { document } = context;
    const { contentControls } = document;
    const bibliographyControls = contentControls.getByTag(BIBLIOGRAPHY_TAG);

    context.load(contentControls, PARAMS_TO_LOAD);
    context.load(bibliographyControls);

    return context.sync().then(() => {
      removePreviousBibliographies(bibliographyControls);
      const references = getReferencesFromControls(contentControls);
      const paragraph = document.body.insertParagraph("", Word.InsertLocation.end);

      const contentControl = paragraph.insertContentControl();
      contentControl.tag = BIBLIOGRAPHY_TAG;

      references.forEach(reference => {
        contentControl.insertText(reference, Word.InsertLocation.end);
        contentControl.insertText("\n", Word.InsertLocation.end);
      });
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
