import _ from 'lodash/fp';

import { getReferencesControlItems, mapControlItemsWithIds } from '../wordContentControls';
import insertCitationText from './insertCitationText';
import * as refden from '../../api/refden';

import generateBibliography, { PARAMS_TO_LOAD } from './index';

export const updateReferencesInDocument = context => () => {
  const referenceItems = getReferencesControlItems(context.document.contentControls);
  if (_.isEmpty(referenceItems)) return;

  const mapControlItems = mapControlItemsWithIds(referenceItems);

  refden.getReferencesFromIds(mapControlItems.ids)
    .then(response => {
      const { data } = response;

      data.forEach(ref => {
        mapControlItems[ref.id].forEach(referenceControlItem => {
          referenceControlItem.title = ref.reference;
          insertCitationText(referenceControlItem, ref.citation);
        });
      });

      context.sync().then(generateBibliography);
    })
    .catch(console.log);
};

const updateBibliography = () => {
  window.Word.run(context => {
    const { contentControls } = context.document;
    context.load(contentControls, PARAMS_TO_LOAD);

    return context.sync().then(updateReferencesInDocument(context));
  })
};

export default updateBibliography;
