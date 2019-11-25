import _ from 'lodash/fp';

import { REFERENCE_TAG_PREFIX } from '../../constants';

const getIds = (item: Word.ContentControl) =>
    item.tag.split(REFERENCE_TAG_PREFIX)[1].split('-');

export const getReferenceIdFromControlItem = _.flow(
    getIds,
    _.first,
);

export const getRestReferenceIdsFromControlItem = _.flow(
    getIds,
    _.tail,
);
