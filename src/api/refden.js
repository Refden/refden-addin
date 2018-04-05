import axios from 'axios';

const BASE_URL = 'https://www.refden.co/api/';

const buildUrl = path => `${BASE_URL}${path}`;

const headers = () => JSON.parse(localStorage.getItem('headers'));

export const getLists = () =>
  axios.get(buildUrl('lists'), { headers: headers() });

export const getReferences = list =>
  axios.get(buildUrl(`lists/${list.id}/references`), { headers: headers() });

export const login = (email, password) =>
  axios.post(buildUrl('auth/sign_in'), {
    email,
    password,
  });
