import getRestReferenceIdsFromControlItem from './getRestReferenceIdsFromControlItem';

describe('getRestReferenceIdsFromControlItem()', () => {
  it('gets ids but the primary', () => {
    const item = {
      tag: 'refden-ref-12-2-4',
    };

    const actual = getRestReferenceIdsFromControlItem(item);
    const expected = ['2', '4'];

    expect(actual).toEqual(expected);
  });
});
