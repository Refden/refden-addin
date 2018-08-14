import _ from 'lodash/fp';

const insertCitationText = (referenceItem, citation) => {
  referenceItem.clear();

  if (_.isEmpty(citation)) {
    referenceItem.insertHtml("x".sup(), window.Word.InsertLocation.end);
  } else {
    referenceItem.insertText(citation, window.Word.InsertLocation.end);
  }
};

export default insertCitationText;
