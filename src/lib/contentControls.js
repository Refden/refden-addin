import _ from 'lodash/fp';

import { REFERENCE_TAG_PREFIX, STYLES_WITH_BRACKETS } from '../constants';

import { getReferencesControlItems } from './wordContentControls';

const buildCitationIndex = (index, cslStyle) => {
  const referenceIndex = (index + 1).toString();

  if (STYLES_WITH_BRACKETS.includes(cslStyle)) {
    return `[${referenceIndex}]`;
  } else {
    return referenceIndex.sup();
  }
};

const updateIndex = (item, referenceIndex) => {
  item.clear();
  item.insertHtml(referenceIndex, window.Word.InsertLocation.end);
};

export const updateIndexes = (contentControls, cslStyle) => {
  const referenceTagIndexes = {};

  const referenceItems = getReferencesControlItems(contentControls);
  const uniqueReferenceItems = _.uniqBy('tag', referenceItems);

  uniqueReferenceItems.forEach((item, index) =>
    referenceTagIndexes[item.tag] = buildCitationIndex(index, cslStyle));

  referenceItems.forEach((item) =>
    updateIndex(item, referenceTagIndexes[item.tag]));
};

export const buildTag = responseData => {
  let tag = `${REFERENCE_TAG_PREFIX}${responseData.id.toString()}`;

  if(!_.isEmpty(responseData.references)) {
    responseData.references.forEach(reference => {
      tag += `-${reference.id.toString()}`;
    })
  }

  return tag;
};

export const buildTitle = references => JSON.stringify(references);
