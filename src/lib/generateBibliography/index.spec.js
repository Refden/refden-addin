import { isCitationFormatWithNumbers } from './index';

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

  it('returns true when text is a number', () => {
    const referenceItems = [
      {
        text: '1',
      },
    ];

    const actual = isCitationFormatWithNumbers(referenceItems);

    expect(actual).toEqual(true);
  });
});
