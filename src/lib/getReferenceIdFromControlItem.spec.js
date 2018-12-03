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
      { id: 1, tag: 'refden-ref-12' },
      { id: 2, tag: 'refden-ref-11' },
      { id: 3, tag: 'refden-ref-12' },
    ];

    const actual = mapControlItemsWithIds(items);
    const expected = {
      ids: ['12', '11'],
      12: [
        { id: 1, tag: 'refden-ref-12' },
        { id: 3, tag: 'refden-ref-12' },
      ],
      11: [
        { id: 2, tag: 'refden-ref-11' },
      ],
    };

    expect(actual).toEqual(expected);
  });
});
