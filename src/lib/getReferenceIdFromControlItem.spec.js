import getReferenceIdFromControlItem, { mapControlItemsWithIds } from './getReferenceIdFromControlItem';

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

describe('mapControlItemsWithIds()', () => {
  it('gets ids', () => {
    const items = [
      { tag: 'refden-ref-12' },
      { tag: 'refden-ref-11' },
    ];

    const actual = mapControlItemsWithIds(items);
    const expected = {
      ids: ['12', '11'],
      12: { tag: 'refden-ref-12' },
      11: { tag: 'refden-ref-11' },
    };

    expect(actual).toEqual(expected);
  });
});
