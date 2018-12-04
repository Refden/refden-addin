import _ from 'lodash/fp';

import { LOCAL_STORAGE__STYLE } from '../../constants';
import { updateIndexes } from '../contentControls';
import {
  getBibliographyContentControls,
  initializeBibliographyContentControl,
  getReferencesControlItems,
} from '../wordContentControls';

import getReferenceIndex from './getReferenceIndex';
import isCitationFormatWithNumbers from './isCitationFormatWithNumbers';

export const REFERENCE_TEXT = 'title';
export const PARAMS_TO_LOAD = [
  'tag',
  'text',
  REFERENCE_TEXT,
];

export { default as updateBibliography } from './updateBibliography';

const getUniqueReferences = _.flow(
  _.map(REFERENCE_TEXT),
  _.uniq,
);

const getReferencesFromControls = _.flow(
  getUniqueReferences,
  _.sortBy(_.identity),
);

const generateBibliography = () => {
  const { Word } = window;

  Word.run(context => {
    const { document } = context;
    const { contentControls } = document;

    const bibliographyContentControls = getBibliographyContentControls(contentControls);

    context.load(contentControls, PARAMS_TO_LOAD);
    context.load(bibliographyContentControls);

    return context.sync().then(() => {
      const contentControl = initializeBibliographyContentControl(bibliographyContentControls, document);

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
          contentControl.insertText('\n', Word.InsertLocation.end);
        });
      } else {
        references = getReferencesFromControls(referenceItems);

        references.forEach(reference => {
          contentControl.insertText(reference, Word.InsertLocation.end);
          contentControl.insertText('\n', Word.InsertLocation.end);
        });
      }
    });
  });
};

export default generateBibliography;
