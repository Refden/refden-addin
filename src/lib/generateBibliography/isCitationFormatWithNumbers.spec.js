import isCitationFormatWithNumbers from './isCitationFormatWithNumbers';

describe('isCitationFormatWithNumbers()', () => {
  it('returns true when text is "x"', () => {
    const referenceItems = [
      {
        text: 'x',
      },
    ];

    const actual = isCitationFormatWithNumbers(referenceItems);

    expect(actual).toEqual(true);
  });

  it('returns false when text contains "x"',  () => {
    const referenceItems = [
      {
        text: 'Caxi',
      },
    ];

    const actual = isCitationFormatWithNumbers(referenceItems);

    expect(actual).toEqual(false);
  });

  it('returns true when text is a number', () => {
    const referenceItems = [
      {
        text: '1',
      },
    ];

    const actual = isCitationFormatWithNumbers(referenceItems);

    expect(actual).toEqual(true);
  });

  describe('when text is in format [x]', () => {
    it('returns true', () => {
      const referenceItems = [
        {
          text: '[1]',
        },
      ];

      const actual = isCitationFormatWithNumbers(referenceItems);

      expect(actual).toEqual(true);
    });
  });

  describe('when text is in APA like format', () => {
    it('returns false', () => {
      const referenceItems = [
        {
          text: '(Fowler 2012)',
        },
      ];

      const actual = isCitationFormatWithNumbers(referenceItems);

      expect(actual).toEqual(false);
    });
  })
});
