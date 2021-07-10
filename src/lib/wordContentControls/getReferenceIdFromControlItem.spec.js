import {
  getReferenceIdFromControlItem,
  getRestReferenceIdsFromControlItem,
} from './getReferenceIdFromControlItem';

describe('getReferenceIdFromControlItem()', () => {
  it('gets id', () => {
    const item = {
      tag: 'refden-ref-12',
    };

    const actual = getReferenceIdFromControlItem(item);
    const expected = '12';

    expect(actual).toEqual(expected);
  });

  describe('when tag is not from refden', () => {
    it('returns ""', () => {
      const item = {
        tag: 'other-tag',
      };

      const actual = getReferenceIdFromControlItem(item);
      const expected = '';

      expect(actual).toEqual(expected);
    });
  });

  describe('when the tag has multiple ids', () => {
    it('gets the first id', () => {
      const item = {
        tag: 'refden-ref-12-3-5',
      };

      const actual = getReferenceIdFromControlItem(item);
      const expected = '12';

      expect(actual).toEqual(expected);
    });
  });
});

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
