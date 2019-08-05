const getCitationText = (data, opts) => {
  if (opts.suppressAuthor) {
    return data.citation_suppress_author;
  }
  if (opts.onlyAuthor) {
    return data.citation.split(',').slice(0, -1).join('').concat(')');
  }
  if (opts.onlyPage) {
    return `(${opts.page})`;
  }

  return data.citation;
};

export default getCitationText;
