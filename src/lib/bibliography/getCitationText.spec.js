import getCitationText from './getCitationText';

describe('getCitationText', () => {
  it('returns citation', () => {
    const data = {
      citation: '(Hans & Zimmer, 2010)',
    };

    const actual = getCitationText(data, {});

    expect(actual).toEqual('(Hans & Zimmer, 2010)');
  });

  describe('when suppressAuthor', () => {
    it('returns citation without author', () => {
      const data = {
        citation: '(Hans & Zimmer, 2010)',
        citation_suppress_author: '(2010)',
      };
      const options = {
        suppressAuthor: true,
      };

      const actual = getCitationText(data, options);

      expect(actual).toEqual('(2010)');
    });
  });

  describe('when onlyAuthor', () => {
    it('returns citation with author only', () => {
      const data = {
        citation: '(Hans & Zimmer, 2010)',
        citation_suppress_author: '(2010)',
      };
      const options = {
        onlyAuthor: true,
      };

      const actual = getCitationText(data, options);

      expect(actual).toEqual('(Hans & Zimmer)');
    });
  });

  describe('when onlyPage', () => {
    it('returns citation with page only', () => {
      const data = {
        citation: '(Hans & Zimmer, 2010)',
        citation_suppress_author: '(2010)',
      };
      const options = {
        onlyPage: true,
        page: '10',
      };

      const actual = getCitationText(data, options);

      expect(actual).toEqual('(10)');
    });
  });
});
