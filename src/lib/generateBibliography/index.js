import _ from "lodash/fp";

import * as refden from '../../api/refden';
import { LOCAL_STORAGE__STYLE } from '../../constants';
import { updateIndexes } from "../contentControls";
import getReferencesControlItems from "../getReferencesControlItems";
import getReferenceIdFromControlItem from '../getReferenceIdFromControlItem';

import getReferenceIndex from "./getReferenceIndex";
import isCitationFormatWithNumbers from "./isCitationFormatWithNumbers";
import insertCitationText from './insertCitationText';

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

export const updateBibliography = () => {
  window.Word.run(context => {
    const { contentControls } = context.document;
    context.load(contentControls, PARAMS_TO_LOAD);

    return context.sync().then(() => {
      const referenceItems = getReferencesControlItems(contentControls);
      if (_.isEmpty(referenceItems)) return;

      referenceItems.forEach(referenceItem => {
        const id = getReferenceIdFromControlItem(referenceItem);

        refden.getReferenceFromId(id)
          .then(response => {
            const { data } = response;

            referenceItem.title = data.reference;
            insertCitationText(referenceItem, data.citation);

            context.sync().then(generateBibliography);
          })
      });
    });
  });
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
        const cslStyle = localStorage.getItem(LOCAL_STORAGE__STYLE);
        updateIndexes(contentControls, cslStyle);
        references = getUniqueReferences(referenceItems);

        references.forEach((reference, index) => {
          const referenceIndex = getReferenceIndex(index, cslStyle);
          contentControl.insertText(referenceIndex, Word.InsertLocation.end);
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
