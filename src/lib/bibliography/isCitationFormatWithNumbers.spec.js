import isCitationFormatWithNumbers from './isCitationFormatWithNumbers';

describe('isCitationFormatWithNumbers()', () => {
  describe('true cases', () => {
    it('text is "x"', () => {
      const referenceItems = [
        {
          text: 'x',
        },
      ];

      const actual = isCitationFormatWithNumbers(referenceItems);

      expect(actual).toEqual(true);
    });

    it('text is a number', () => {
      const referenceItems = [
        {
          text: '1',
        },
      ];

      const actual = isCitationFormatWithNumbers(referenceItems);

      expect(actual).toEqual(true);
    });

    it('text is in format [x]', () => {
      const referenceItems = [
        {
          text: '[1]',
        },
      ];

      const actual = isCitationFormatWithNumbers(referenceItems);

      expect(actual).toEqual(true);
    });

    it('text is multiple citation, e.g."(,)"', () => {
      const referenceItems = [
        {
          text: '(,)',
        },
      ];

      const actual = isCitationFormatWithNumbers(referenceItems);

      expect(actual).toEqual(true);
    });
  });

  describe('false cases', () => {
    it('text contains "x"', () => {
      const referenceItems = [
        {
          text: 'Caxi',
        },
      ];

      const actual = isCitationFormatWithNumbers(referenceItems);

      expect(actual).toEqual(false);
    });

    it('text is in APA like format', () => {
      const referenceItems = [
        {
          text: '(Fowler 2012)',
        },
      ];

      const actual = isCitationFormatWithNumbers(referenceItems);

      expect(actual).toEqual(false);
    });
  });
});
