import _ from 'lodash/fp';

import { REFERENCE_TAG_PREFIX } from '../../constants';

const getRestReferenceIdsFromControlItem = (item: Word.ContentControl) => {
   const ids = item.tag.split(REFERENCE_TAG_PREFIX)[1];
   return _.tail(ids.split('-'));
};

export default getRestReferenceIdsFromControlItem;
