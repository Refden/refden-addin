import _ from 'lodash/fp';

import * as refden from '../../api/refden';
import { LOCAL_STORAGE__STYLE } from '../../constants';
import { updateIndexes } from '../contentControls';
import { mapControlItemsWithIds } from '../getReferenceIdFromControlItem';

import getReferenceIndex from './getReferenceIndex';
import isCitationFormatWithNumbers from './isCitationFormatWithNumbers';
import insertCitationText from './insertCitationText';
import {
  getBibliographyContentControls,
  initializeBibliographyContentControl,
  getReferencesControlItems,
} from '../wordContentControls';

const REFERENCE_TEXT = 'title';
const PARAMS_TO_LOAD = [
  'tag',
  'text',
  REFERENCE_TEXT,
];

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

export const updateBibliography = () => {
  window.Word.run(context => {
    const { contentControls } = context.document;
    context.load(contentControls, PARAMS_TO_LOAD);

    return context.sync().then(updateReferencesInDocument(context));
  })
};

export const updateReferencesInDocument = context => () => {
  const referenceItems = getReferencesControlItems(context.document.contentControls);
  if (_.isEmpty(referenceItems)) return;

  const mapControlItems = mapControlItemsWithIds(referenceItems);

  refden.getReferencesFromIds(mapControlItems.ids)
    .then(response => {
      const { data } = response;

      data.forEach(ref => {
        mapControlItems[ref.id].forEach(referenceControlItem => {
          referenceControlItem.title = ref.reference;
          insertCitationText(referenceControlItem, ref.citation);
        });
      });

      context.sync().then(generateBibliography);
    })
    .catch(console.log);
};

export default generateBibliography;
