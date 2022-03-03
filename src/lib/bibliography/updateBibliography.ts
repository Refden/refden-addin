import _ from 'lodash/fp';

import { getReferencesControlItems } from '../wordContentControls';
import * as refden from '../../api/refden';
import {
  getReferenceIdFromControlItem,
  getRestReferenceIdsFromControlItem,
} from '../wordContentControls/getReferenceIdFromControlItem';
import { buildTag, buildTitle } from '../contentControls';

import insertCitationText from './insertCitationText';
import getCitationText from './getCitationText';

import generateBibliography, { PARAMS_TO_LOAD } from './index';

export async function fillContentControl(
  id: any,
  otherIds: any[],
  contentControl: Word.ContentControl,
) {
  try {
    const response = await refden.getReferenceWithIds(id, otherIds);

    const references = [response.data.reference];
    _.forEach(
      (reference: any) => references.push(reference.reference),
      response.data.references,
    );

    contentControl.tag = buildTag(response.data);
    contentControl.title = buildTitle(references);

    // TODO: pass opts? Somehow we need to store the opts in the ContentControl object
    const citation = getCitationText(response.data, {});
    insertCitationText(contentControl, citation);
  } catch (error) {
    window.Rollbar.warning('Connection error from Refden API', error);
  }
}

export const updateReferencesInDocument = (context: Word.RequestContext) => async () => {
  const referenceItems = getReferencesControlItems(context.document.contentControls);
  if (_.isEmpty(referenceItems)) return;

  // eslint-disable-next-line
  for (const contentControl of referenceItems) {
    const id = getReferenceIdFromControlItem(contentControl);
    const otherIds = getRestReferenceIdsFromControlItem(contentControl);
    // eslint-disable-next-line no-await-in-loop
    await fillContentControl(id, otherIds, contentControl);
  }

  context.sync().then(generateBibliography);
};

const updateBibliography = () => {
  window.Word.run((context) => {
    const { contentControls } = context.document;
    context.load(contentControls, PARAMS_TO_LOAD);

    return context.sync().then(updateReferencesInDocument(context));
  });
};

export default updateBibliography;
