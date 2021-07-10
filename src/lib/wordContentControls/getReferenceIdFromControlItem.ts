import _ from 'lodash/fp';

import { REFERENCE_TAG_PREFIX } from '../../constants';

const getIds = (item: Word.ContentControl) => {
  if (!_.includes(REFERENCE_TAG_PREFIX, item.tag)) {
    console.log('Extracting id from malformed control', item.tag); // eslint-disable-line no-console
    return [''];
  }

  return item.tag.split(REFERENCE_TAG_PREFIX)[1].split('-');
};

export const getReferenceIdFromControlItem = _.flow(
  getIds,
  _.first,
);

export const getRestReferenceIdsFromControlItem = _.flow(
  getIds,
  _.tail,
);
