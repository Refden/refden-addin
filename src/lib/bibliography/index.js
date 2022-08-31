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

const HANGING_INDENT = 0; // TODO: put back to -35 and fix indent of all the references
const NONE_INDENT = 0;

export const REFERENCE_TEXT = 'title';
export const PARAMS_TO_LOAD = [
  'tag',
  'text',
  'items',
  REFERENCE_TEXT,
];

export { default as updateBibliography } from './updateBibliography';

const getUniqueReferences = (contentControls) => {
  let references = [];

  _.forEach((contentControl) => {
    const referencesInContentControl = JSON.parse(_.get(REFERENCE_TEXT, contentControl));
    references = references.concat(referencesInContentControl);
  }, contentControls);

  return _.uniq(references);
};

const getReferencesFromControls = _.flow(
  getUniqueReferences,
  _.sortBy(_.identity),
);

const setLineIndents = async (context, contentControl, lineIndent) => {
  const { paragraphs } = contentControl;

  context.load(paragraphs, ['items']);
  await context.sync();

  paragraphs.items.forEach((item) => {
    context.load(item, ['firstLineIndent', 'text']);
  });
  await context.sync();

  paragraphs.items.forEach((item) => {
    // eslint-disable-next-line no-param-reassign
    item.firstLineIndent = lineIndent;
  });
};

const generateBibliography = () => {
  const { Word } = window;

  Word.run((context) => {
    const { document } = context;
    const { contentControls } = document;

    const bibliographyContentControls = getBibliographyContentControls(contentControls);

    context.load(contentControls, PARAMS_TO_LOAD);
    context.load(bibliographyContentControls);

    return context.sync().then(async () => {
      const contentControl = initializeBibliographyContentControl(
        bibliographyContentControls,
        document,
      );

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
          contentControl.insertHtml(reference, Word.InsertLocation.end);
          contentControl.insertBreak(Word.BreakType.line, Word.InsertLocation.end);
          contentControl.insertBreak(Word.BreakType.line, Word.InsertLocation.end);
        });

        await setLineIndents(context, contentControl, NONE_INDENT);
        return;
      }
      references = getReferencesFromControls(referenceItems);

      references.forEach((reference) => {
        contentControl.insertHtml(reference, Word.InsertLocation.end);
        contentControl.insertBreak(Word.BreakType.line, Word.InsertLocation.end);
        contentControl.insertBreak(Word.BreakType.line, Word.InsertLocation.end);
      });

      await setLineIndents(context, contentControl, HANGING_INDENT);
    });
  });
};

export default generateBibliography;
