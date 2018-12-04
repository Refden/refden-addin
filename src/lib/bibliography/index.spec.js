import { getReferencesControlItems } from '../wordContentControls';
import * as refden from '../../api/refden';
import Context from '../../tests/factories/context';
import ReferenceControlItem from '../../tests/factories/referenceControlItem';

import { updateReferencesInDocument } from './index';
import insertCitationText from './insertCitationText';

jest.mock('../../api/refden');
jest.mock('./insertCitationText');

const buildContext = items => Context.build({
  document: { contentControls: { items } },
});

describe('updateReferencesInDocument()', () => {
  beforeEach(() => {
    global.Word = {
      run: jest.fn(),
    };
  });
  afterEach(jest.clearAllMocks);

  it('calls refden api with references present in the document', async () => {
    const items = [
      ReferenceControlItem.build({ tag: 'refden-ref-12' }),
      ReferenceControlItem.build({ tag: 'refden-ref-11' }),
    ];
    const context = buildContext(items);
    refden.getReferencesFromIds.mockImplementation(() => Promise.resolve({
      data: [],
    }));

    await updateReferencesInDocument(context)();

    expect(refden.getReferencesFromIds).toBeCalledWith(['12', '11']);
  });

  it('inserts citations for all the references', async () => {
    const items = [
      ReferenceControlItem.build({ tag: 'refden-ref-1' }),
    ];
    const context = buildContext(items);
    refden.getReferencesFromIds.mockImplementation(() => Promise.resolve({
      data: [{ id: 1, citation: 'Fossel 2001', reference: 'Fossel Journal, 23-25, 2001' }],
    }));
    insertCitationText.mockImplementation(jest.fn);

    await updateReferencesInDocument(context)();

    expect(insertCitationText).toBeCalledWith(items[0], 'Fossel 2001');
  });

  describe('when no references in the document', () => {
    it('does not call refden api', async () => {
      const items = [];
      const context = buildContext(items);
      refden.getReferencesFromIds.mockImplementation(() => Promise.resolve({}));

      await updateReferencesInDocument(context)();

      expect(refden.getReferencesFromIds).not.toBeCalled();
    });
  });
});
