import { REFERENCE_TAG_PREFIX } from '../constants';

const getReferenceIdFromControlItem = item =>
  item.tag.split(REFERENCE_TAG_PREFIX)[1];

export default getReferenceIdFromControlItem;
