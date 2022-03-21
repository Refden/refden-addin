import _ from 'lodash/fp';

import { REFERENCE_TAG_PREFIX, STYLES_WITH_BRACKETS } from '../constants';
import { ReferenceType } from '../types';

import { getReferencesControlItems } from './wordContentControls';
import {
  getReferenceIdFromControlItem,
  getRestReferenceIdsFromControlItem,
} from './wordContentControls/getReferenceIdFromControlItem';

const buildCitationIndex = (index: number, cslStyle: string) => {
  const referenceIndex = (index + 1).toString();

  if (_.includes(cslStyle, STYLES_WITH_BRACKETS)) {
    return `[${referenceIndex}]`;
  }
  return referenceIndex.sup();
};

const updateIndex = (item: Word.ContentControl, referenceIndex: string) => {
  item.clear();
  item.insertHtml(referenceIndex, window.Word.InsertLocation.end);
};

const getTagFromId = (id: string | undefined) => `${REFERENCE_TAG_PREFIX}${id}`;

export const updateIndexes = (contentControls: Word.ContentControl[], cslStyle: string) => {
  const referenceTagIndexes: any = {};

  const referenceItems: Word.ContentControl[] = getReferencesControlItems(contentControls);
  const uniqueReferenceItems: Word.ContentControl[] = _.uniqBy('tag', referenceItems);

  let index = 0;
  uniqueReferenceItems.forEach((item) => {
    if (_.has(item.tag, referenceTagIndexes)) {
      return;
    }

    const firstId = getReferenceIdFromControlItem(item);
    if (_.has(getTagFromId(firstId), referenceTagIndexes)) {
      referenceTagIndexes[item.tag] = referenceTagIndexes[getTagFromId(firstId)];
    } else {
      referenceTagIndexes[item.tag] = buildCitationIndex(index, cslStyle);
      index += 1;
    }

    const otherIds = getRestReferenceIdsFromControlItem(item);
    _.forEach((id) => {
      const tagForCurrentId = `${REFERENCE_TAG_PREFIX}${id}`;
      referenceTagIndexes[item.tag] += ', ';

      if (_.has(tagForCurrentId, referenceTagIndexes)) {
        referenceTagIndexes[item.tag] += referenceTagIndexes[tagForCurrentId];
      } else {
        referenceTagIndexes[item.tag] += buildCitationIndex(index, cslStyle);
        referenceTagIndexes[tagForCurrentId] = buildCitationIndex(index, cslStyle);
        index += 1;
      }
    }, otherIds);
  });

  referenceItems.forEach((item) => updateIndex(item, referenceTagIndexes[item.tag]));
};

export const buildTag = (responseData: any) => {
  let tag = `${REFERENCE_TAG_PREFIX}${responseData.id.toString()}`;

  if (!_.isEmpty(responseData.references)) {
    responseData.references.forEach((reference: ReferenceType) => {
      tag += `-${reference.id.toString()}`;
    });
  }

  return tag;
};

export const buildTitle = (references: any) => JSON.stringify(references);
