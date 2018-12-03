import _ from 'lodash/fp';

import { REFERENCE_TAG_PREFIX } from '../constants';

const getReferenceIdFromControlItem = item =>
  item.tag.split(REFERENCE_TAG_PREFIX)[1];

export const mapControlItemsWithIds = controlItems => {
  let result = {};
  result.ids = _.uniq(_.map(getReferenceIdFromControlItem, controlItems));

  controlItems.forEach(controlItem => {
    const id = getReferenceIdFromControlItem(controlItem);
    if (_.isEmpty(result[id])) {
      result[id] = [controlItem];
    } else {
      result[id].push(controlItem);
    }
  });

  return result;
};

export default getReferenceIdFromControlItem;
