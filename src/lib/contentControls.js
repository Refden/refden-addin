import _ from 'lodash/fp';

import { REFERENCE_TAG_PREFIX } from '../constants';

const buildReferenceIndex = index => (index + 1).toString().sup();
const onlyReferences = _.flow(
  _.get('tag'),
  _.startsWith(REFERENCE_TAG_PREFIX)
);

const updateIndex = (item, referenceIndex) => {
  item.clear();
  item.insertHtml(referenceIndex, window.Word.InsertLocation.end);
};

export const updateIndexes = contentControls => {
  const referenceTagIndexes = {};

  const referenceItems = contentControls.items.filter(onlyReferences);
  const uniqueReferenceItems = _.uniqBy('tag', referenceItems);

  uniqueReferenceItems.forEach((item, index) =>
    referenceTagIndexes[item.tag] = buildReferenceIndex(index));

  referenceItems.forEach((item) =>
    updateIndex(item, referenceTagIndexes[item.tag]));
};
