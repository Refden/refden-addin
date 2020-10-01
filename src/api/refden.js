import axios from 'axios';

import { LOCAL_STORAGE__STYLE, LOCAL_STORAGE__LOCALE } from '../constants';

const BASE_URL = 'https://www.refden.com/api/';

const buildUrl = (path) => `${BASE_URL}${path}`;

export const getLists = () => axios.get(buildUrl('lists'));

export const getReferences = (list) => axios.get(buildUrl(`lists/${list.id}/references`));

export const getReference = (reference, page) => axios.get(buildUrl(`references/${reference.id}`), {
  params: {
    locator: page,
    style: localStorage.getItem(LOCAL_STORAGE__STYLE),
    locale: localStorage.getItem(LOCAL_STORAGE__LOCALE),
  },
});

export const getReferenceWithIds = (referenceId, otherIds) => axios.get(buildUrl(`references/${referenceId}`), {
  params: {
    extra_ids: otherIds.join(','),
    style: localStorage.getItem(LOCAL_STORAGE__STYLE),
    locale: localStorage.getItem(LOCAL_STORAGE__LOCALE),
  },
});

export const getReferencesFromIds = (ids) => axios.get(buildUrl('references_exporter'), {
  params: {
    ids,
    style: localStorage.getItem(LOCAL_STORAGE__STYLE),
    locale: localStorage.getItem(LOCAL_STORAGE__LOCALE),
  },
});

export const login = (email, password) => axios.post(buildUrl('auth/sign_in'), {
  email,
  password,
});
