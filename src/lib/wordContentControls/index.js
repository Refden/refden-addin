import _ from 'lodash/fp';

const BIBLIOGRAPHY_TAG = 'refden_bibliography';

const getBibliographyContentControls = (contentControls) => (
  contentControls.getByTag(BIBLIOGRAPHY_TAG)
);

const initializeBibliographyContentControl = (bibliographyContentControls, document) => {
  let contentControl;

  if (_.isEmpty(bibliographyContentControls.items)) {
    const paragraph = document.body.insertParagraph('', window.Word.InsertLocation.end);
    contentControl = paragraph.insertContentControl();
    contentControl.tag = BIBLIOGRAPHY_TAG;
  } else {
    // eslint-disable-next-line prefer-destructuring
    contentControl = bibliographyContentControls.items[0];
    contentControl.clear();
  }
  return contentControl;
};

export { default as getReferencesControlItems } from './getReferencesControlItems';
export { default as mapControlItemsWithIds } from './mapControlItemsWithIds';

export {
  initializeBibliographyContentControl,
  getBibliographyContentControls,
};
