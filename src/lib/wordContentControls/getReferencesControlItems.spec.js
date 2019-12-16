import getReferencesControlItems from './getReferencesControlItems';

describe('getReferencesControlItems()', () => {
  it('gets only references control items', () => {
    const firstItem = {
      tag: 'refden-ref-12',
    };
    const secondItem = {
      tag: 'yo',
    };

    const contentControls = {
      items: [
        firstItem,
        secondItem,
      ],
    };

    const actual = getReferencesControlItems(contentControls);
    const expected = [
      firstItem,
    ];

    expect(actual).toEqual(expected);
  });
});
