import _ from 'lodash/fp';

import { REFERENCE_TAG_PREFIX } from '../../constants/index';

const onlyReferences = _.flow(
  _.get('tag'),
  _.startsWith(REFERENCE_TAG_PREFIX),
);

const getReferencesControlItems = _.flow(
  _.get('items'),
  _.filter(onlyReferences),
);

export default getReferencesControlItems;
