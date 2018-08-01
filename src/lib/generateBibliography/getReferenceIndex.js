const getReferenceIndex = (index, cslStyle) => {
  const referenceIndex = (index + 1).toString();

  if (cslStyle === 'ieee') {
    return `[${referenceIndex}] `;
  }
  else {
    return `${referenceIndex}. `;
  }
};

export default getReferenceIndex;
