const IS_WITH_NUMBER_REGEX = /(^(x|\d|\[\d])$)/;

const isCitationFormatWithNumbers = referenceItems => {
  const citationText = referenceItems[0].text;

  return IS_WITH_NUMBER_REGEX.test(citationText);
};

export default isCitationFormatWithNumbers;
