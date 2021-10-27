import localForage from 'localforage';

export const authHeaders = () => {
  const promise = localForage.getItem('auth-headers');
  return Promise.resolve(promise).then((result) => result);
};

export const setAuthHeaders = (headers) => {
  localForage.setItem('auth-headers', headers);
};

export const removeAuthHeaders = () => {
  localForage.removeItem('auth-headers');
};
