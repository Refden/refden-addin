import { updateIndexes } from './contentControls';

const mockWord = () => {
  global.Word = {
    InsertLocation: {
      end: 'end'
    }
  };
};

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

    updateIndexes(contentControls);

    expect(firstItem.clear).toHaveBeenCalled();
    expect(firstItem.insertHtml).toHaveBeenCalledWith('1'.sup(), 'end');
    expect(secondItem.clear).not.toHaveBeenCalled();
  });

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

    updateIndexes(contentControls);

    expect(thirdItem.insertHtml).toHaveBeenCalledWith('2'.sup(), 'end');
  });
});
