import { STYLES_WITH_BRACKETS } from '../../constants';

const getReferenceIndex = (index, cslStyle) => {
  const referenceIndex = (index + 1).toString();

  if (STYLES_WITH_BRACKETS.includes(cslStyle)) {
    return `[${referenceIndex}] `;
  }
  else {
    return `${referenceIndex}. `;
  }
};

export default getReferenceIndex;
