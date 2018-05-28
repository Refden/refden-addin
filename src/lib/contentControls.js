import _ from 'lodash/fp';

import getReferencesControlItems from "./getReferencesControlItems";

const buildReferenceIndex = index => (index + 1).toString().sup();

const updateIndex = (item, referenceIndex) => {
  item.clear();
  item.insertHtml(referenceIndex, window.Word.InsertLocation.end);
};

export const updateIndexes = contentControls => {
  const referenceTagIndexes = {};

  const referenceItems = getReferencesControlItems(contentControls);
  const uniqueReferenceItems = _.uniqBy('tag', referenceItems);

  uniqueReferenceItems.forEach((item, index) =>
    referenceTagIndexes[item.tag] = buildReferenceIndex(index));

  referenceItems.forEach((item) =>
    updateIndex(item, referenceTagIndexes[item.tag]));
};
