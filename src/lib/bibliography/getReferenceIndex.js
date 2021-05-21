import _ from 'lodash/fp';

import { STYLES_WITH_BRACKETS } from '../../constants';

const getReferenceIndex = (index, cslStyle) => {
  const referenceIndex = (index + 1).toString();

  if (_.includes(cslStyle, STYLES_WITH_BRACKETS)) {
    return `[${referenceIndex}] `;
  }

  return `${referenceIndex}. `;
};

export default getReferenceIndex;
