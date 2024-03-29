import { buildTag, buildTitle, updateIndexes } from './contentControls';

const mockWord = () => {
  global.Word = {
    InsertLocation: {
      end: 'end',
    },
  };
};

describe('buildTag()', () => {
  it('uses reference ids', () => {
    const responseData = {
      id: 1,
      references: [
        { id: 2 },
        { id: 3 },
      ],
    };

    const actual = buildTag(responseData);
    const expected = 'refden-ref-1-2-3';

    expect(actual).toEqual(expected);
  });

  it('returns main id', () => {
    const responseData = {
      id: 1,
    };

    const actual = buildTag(responseData);
    const expected = 'refden-ref-1';

    expect(actual).toEqual(expected);
  });
});

describe('buildTitle()', () => {
  it('stores in JSON string the references', () => {
    const references = ['1st ref', '2nd ref'];

    const actual = buildTitle(references);

    expect(JSON.parse(actual)).toEqual(references);
  });
});

describe('updateIndexes()', () => {
  it('updates indexes for references', () => {
    mockWord();
    const firstItem = {
      tag: 'refden-ref-12',
      clear: jest.fn(),
      insertHtml: jest.fn(),
    };
    const secondItem = {
      tag: 'yo',
      clear: jest.fn(),
      insertHtml: jest.fn(),
    };

    const contentControls = {
      items: [
        firstItem,
        secondItem,
      ],
    };

    updateIndexes(contentControls, 'vancouver');

    expect(firstItem.clear).toHaveBeenCalled();
    expect(firstItem.insertHtml).toHaveBeenCalledWith('1'.sup(), 'end');
    expect(secondItem.clear).not.toHaveBeenCalled();
  });

  it('can handle multiple citation', () => {
    mockWord();
    const firstItem = {
      tag: 'refden-ref-1-2-7',
      clear: jest.fn(),
      insertHtml: jest.fn(),
    };

    const contentControls = {
      items: [
        firstItem,
      ],
    };

    updateIndexes(contentControls, 'vancouver');

    expect(firstItem.clear).toHaveBeenCalled();
    expect(firstItem.insertHtml).toHaveBeenCalledWith(
      `${'1'.sup()}, ${'2'.sup()}, ${'3'.sup()}`, 'end',
    );
  });

  it('can handle both multiple citation and single citation', () => {
    mockWord();
    const firstItem = {
      tag: 'refden-ref-1-2',
      clear: jest.fn(),
      insertHtml: jest.fn(),
    };
    const secondItem = {
      tag: 'refden-ref-2',
      clear: jest.fn(),
      insertHtml: jest.fn(),
    };

    const contentControls = {
      items: [
        firstItem,
        secondItem,
      ],
    };

    updateIndexes(contentControls, 'vancouver');

    expect(firstItem.clear).toHaveBeenCalled();
    expect(firstItem.insertHtml).toHaveBeenCalledWith(
      `${'1'.sup()}, ${'2'.sup()}`, 'end',
    );
    expect(secondItem.insertHtml).toHaveBeenCalledWith('2'.sup(), 'end');
  });

  describe('when having repeats', () => {
    it('reuses the index for repeats', () => {
      mockWord();
      const firstItem = {
        tag: 'refden-ref-12',
        clear: jest.fn(),
        insertHtml: jest.fn(),
      };
      const secondItem = {
        tag: 'refden-ref-12',
        clear: jest.fn(),
        insertHtml: jest.fn(),
      };

      const contentControls = {
        items: [
          firstItem,
          secondItem,
        ],
      };

      updateIndexes(contentControls);

      expect(firstItem.clear).toHaveBeenCalled();
      expect(firstItem.insertHtml).toHaveBeenCalledWith('1'.sup(), 'end');
      expect(secondItem.insertHtml).toHaveBeenCalledWith('1'.sup(), 'end');
    });

    it('uses new index for non-repeat', () => {
      mockWord();
      const firstItem = {
        tag: 'refden-ref-12',
        clear: jest.fn(),
        insertHtml: jest.fn(),
      };
      const secondItem = {
        tag: 'refden-ref-12',
        clear: jest.fn(),
        insertHtml: jest.fn(),
      };
      const thirdItem = {
        tag: 'refden-ref-13',
        clear: jest.fn(),
        insertHtml: jest.fn(),
      };
      const contentControls = {
        items: [
          firstItem,
          secondItem,
          thirdItem,
        ],
      };

      updateIndexes(contentControls, 'vancouver');

      expect(thirdItem.insertHtml).toHaveBeenCalledWith('2'.sup(), 'end');
    });

    it('can handle repeats in multiple citation', () => {
      mockWord();
      const firstItem = {
        tag: 'refden-ref-1',
        clear: jest.fn(),
        insertHtml: jest.fn(),
      };
      const secondItem = {
        tag: 'refden-ref-2',
        clear: jest.fn(),
        insertHtml: jest.fn(),
      };
      const thirdItem = {
        tag: 'refden-ref-3-2',
        clear: jest.fn(),
        insertHtml: jest.fn(),
      };

      const contentControls = {
        items: [
          firstItem,
          secondItem,
          thirdItem,
        ],
      };

      updateIndexes(contentControls, 'vancouver');

      expect(firstItem.clear).toHaveBeenCalled();
      expect(firstItem.insertHtml).toHaveBeenCalledWith(
        `${'1'.sup()}`, 'end',
      );
      expect(secondItem.insertHtml).toHaveBeenCalledWith('2'.sup(), 'end');
      expect(thirdItem.insertHtml).toHaveBeenCalledWith(
        `${'3'.sup()}, ${'2'.sup()}`, 'end',
      );
    });

    it('reuses citation index in multiple citation if previously present', () => {
      mockWord();
      const firstItem = {
        tag: 'refden-ref-1',
        clear: jest.fn(),
        insertHtml: jest.fn(),
      };
      const secondItem = {
        tag: 'refden-ref-1-2',
        clear: jest.fn(),
        insertHtml: jest.fn(),
      };

      const contentControls = {
        items: [
          firstItem,
          secondItem,
        ],
      };

      updateIndexes(contentControls, 'vancouver');

      expect(firstItem.insertHtml).toHaveBeenCalledWith(
        `${'1'.sup()}`, 'end',
      );
      expect(secondItem.insertHtml).toHaveBeenCalledWith(
        `${'1'.sup()}, ${'2'.sup()}`, 'end',
      );
    });
  });

  describe('IEEE', () => {
    it('index is with []', () => {
      mockWord();
      const item = {
        tag: 'refden-ref-12',
        clear: jest.fn(),
        insertHtml: jest.fn(),
      };
      const contentControls = {
        items: [item],
      };

      updateIndexes(contentControls, 'ieee');

      expect(item.insertHtml).toHaveBeenCalledWith('[1]', 'end');
    });
  });
});
