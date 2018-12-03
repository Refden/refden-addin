import getReferenceIdFromControlItem from './getReferenceIdFromControlItem';

describe('getReferenceIdFromControlItem()', () => {
  it('gets id', () => {
    const item = {
      tag: 'refden-ref-12',
    };

    const actual = getReferenceIdFromControlItem(item);
    const expected = '12';

    expect(actual).toEqual(expected);
  });
});
