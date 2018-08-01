import getReferenceIndex from './getReferenceIndex';

describe('getReferenceIndex()', () => {
  it('returns X. format', () => {
    const index = 0;

    const actual = getReferenceIndex(index, 'apa');
    const expected = '1. ';

    expect(actual).toEqual(expected);
  });

  describe('IEEE', () => {
    it('returns [X] format', () => {
      const index = 0;

      const actual = getReferenceIndex(index, 'ieee');
      const expected = '[1] ';

      expect(actual).toEqual(expected);
    });
  })
});
