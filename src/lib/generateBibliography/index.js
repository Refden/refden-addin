import _ from "lodash/fp";

import { updateIndexes } from "../contentControls";
import getReferencesControlItems from "../getReferencesControlItems";

const BIBLIOGRAPHY_TAG = 'refden_bibliography';

const REFERENCE_TEXT = 'title';

const PARAMS_TO_LOAD = [
  'tag',
  'text',
  REFERENCE_TEXT
];

const getUniqueReferences = _.flow(
  _.map(REFERENCE_TEXT),
  _.uniq,
);

const getReferencesFromControls = _.flow(
  getUniqueReferences,
  _.sortBy(_.identity),
);

const getReferencesFromControlsAMAStyle = getUniqueReferences;

const getBibliographyControl = (bibliographyControls, document) => {
  let contentControl;

  if(_.isEmpty(bibliographyControls.items)) {
    const paragraph = document.body.insertParagraph("", window.Word.InsertLocation.end);
    contentControl = paragraph.insertContentControl();
    contentControl.tag = BIBLIOGRAPHY_TAG;
  } else {
    contentControl = bibliographyControls.items[0];
    contentControl.clear();
  }
  return contentControl;
};

// TODO: extract into file. Using export for testing
export const isCitationFormatWithNumbers = referenceItems => {
  const citationText = referenceItems[0].text;
  return citationText === 'x' || _.isInteger(parseInt(citationText));
};

const generateBibliography = () => {
  const { Word } = window;

  Word.run(context => {
    const { document } = context;
    const { contentControls } = document;

    const bibliographyControls = contentControls.getByTag(BIBLIOGRAPHY_TAG);

    context.load(contentControls, PARAMS_TO_LOAD);
    context.load(bibliographyControls);

    return context.sync().then(() => {
      const contentControl = getBibliographyControl(bibliographyControls, document);

      const referenceItems = getReferencesControlItems(contentControls);
      if (_.isEmpty(referenceItems)) return;

      let references;

      if (isCitationFormatWithNumbers(referenceItems)) {
        updateIndexes(contentControls);
        references = getReferencesFromControlsAMAStyle(referenceItems);

        references.forEach((reference, index) => {
          const refIndex = (index + 1).toString();
          contentControl.insertText(`${refIndex}. `, Word.InsertLocation.end);
          contentControl.insertText(reference, Word.InsertLocation.end);
          contentControl.insertText("\n", Word.InsertLocation.end);
        });
      } else {
        references = getReferencesFromControls(referenceItems);

        references.forEach(reference => {
          contentControl.insertText(reference, Word.InsertLocation.end);
          contentControl.insertText("\n", Word.InsertLocation.end);
        });
      }
    });
  });
};

export default generateBibliography;
