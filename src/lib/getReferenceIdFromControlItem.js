import _ from 'lodash/fp';

import { REFERENCE_TAG_PREFIX } from '../constants';

const getReferenceIdFromControlItem = item =>
  item.tag.split(REFERENCE_TAG_PREFIX)[1];

export const mapControlItemsWithIds = controlItems => {
  let result = {};
  result.ids = _.map(getReferenceIdFromControlItem, controlItems);

  controlItems.forEach(controlItem => {
    const id = getReferenceIdFromControlItem(controlItem);
    result[id] = controlItem;
  });

  return result;
};

export default getReferenceIdFromControlItem;
