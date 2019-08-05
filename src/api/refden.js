import axios from 'axios';

import { LOCAL_STORAGE__STYLE, LOCAL_STORAGE__LOCALE } from '../constants';

const BASE_URL = 'https://www.refden.co/api/';

const buildUrl = path => `${BASE_URL}${path}`;

const headers = () => JSON.parse(localStorage.getItem('headers'));

export const getLists = () =>
  axios.get(buildUrl('lists'), { headers: headers() });

export const getReferences = list =>
  axios.get(buildUrl(`lists/${list.id}/references`), { headers: headers() });

export const getReference = (reference, page) => {
  return axios.get(buildUrl(`references/${reference.id}`), {
    params: {
      locator: page,
      style: localStorage.getItem(LOCAL_STORAGE__STYLE),
      locale: localStorage.getItem(LOCAL_STORAGE__LOCALE),
    },
    headers: headers(),
  });
};

export const getReferencesFromIds = ids =>
  axios.get(buildUrl('references_exporter'), {
    params: {
      ids: ids,
      style: localStorage.getItem(LOCAL_STORAGE__STYLE),
      locale: localStorage.getItem(LOCAL_STORAGE__LOCALE),
    },
    headers: headers(),
  });

export const login = (email, password) =>
  axios.post(buildUrl('auth/sign_in'), {
    email,
    password,
  });
