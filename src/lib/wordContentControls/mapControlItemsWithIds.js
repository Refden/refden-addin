import _ from 'lodash/fp';

import { getReferenceIdFromControlItem } from './getReferenceIdFromControlItem';

const getIds = _.flow(
  _.map(getReferenceIdFromControlItem),
  _.uniq,
);

const assignControlItemToId = _.curry((result, controlItem) => {
  const id = getReferenceIdFromControlItem(controlItem);

  if (_.isEmpty(result[id])) {
    // eslint-disable-next-line no-param-reassign
    result[id] = [controlItem];
  } else {
    result[id].push(controlItem);
  }
});

const mapControlItemsWithIds = (controlItems) => {
  const result = {};

  result.ids = getIds(controlItems);
  controlItems.forEach(assignControlItemToId(result));

  return result;
};

export default mapControlItemsWithIds;
