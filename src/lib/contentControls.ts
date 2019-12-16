import _ from 'lodash/fp';

import { REFERENCE_TAG_PREFIX, STYLES_WITH_BRACKETS } from '../constants';

import { getReferencesControlItems } from './wordContentControls';
import getRestReferenceIdsFromControlItem
  from "./wordContentControls/getRestReferenceIdsFromControlItem";

const buildCitationIndex = (index: number, cslStyle: string) => {
  const referenceIndex = (index + 1).toString();

  if (STYLES_WITH_BRACKETS.includes(cslStyle)) {
    return `[${referenceIndex}]`;
  } else {
    return referenceIndex.sup();
  }
};

const updateIndex = (item: Word.ContentControl, referenceIndex: string) => {
  item.clear();
  item.insertHtml(referenceIndex, window.Word.InsertLocation.end);
};

export const updateIndexes = (contentControls: Word.ContentControl[], cslStyle: string) => {
  const referenceTagIndexes: any = {};

  const referenceItems: Word.ContentControl[] = getReferencesControlItems(contentControls);
  const uniqueReferenceItems: Word.ContentControl[] = _.uniqBy('tag', referenceItems);

  let index = 0;
  uniqueReferenceItems.forEach((item) => {
    if (_.has(item.tag, referenceTagIndexes)) {
      return;
    }

    referenceTagIndexes[item.tag] = buildCitationIndex(index, cslStyle);
    index++;

    const otherIds = getRestReferenceIdsFromControlItem(item);
    _.forEach((id) => {
      referenceTagIndexes[item.tag] += ", ";
      referenceTagIndexes[item.tag] += buildCitationIndex(index, cslStyle);
      referenceTagIndexes[`${REFERENCE_TAG_PREFIX}${id}`] = buildCitationIndex(index, cslStyle);
      index++;
    }, otherIds);
  });

  referenceItems.forEach((item) =>
    updateIndex(item, referenceTagIndexes[item.tag]));
};

export const buildTag = (responseData: any) => {
  let tag = `${REFERENCE_TAG_PREFIX}${responseData.id.toString()}`;

  if (!_.isEmpty(responseData.references)) {
    responseData.references.forEach((reference: ReferenceType) => {
      tag += `-${reference.id.toString()}`;
    })
  }

  return tag;
};

export const buildTitle = (references: any) => JSON.stringify(references);
