import localForage from 'localforage';

export const authHeaders = async () => localForage.getItem('auth-headers');

export const setAuthHeaders = (headers) => {
  localForage.setItem('auth-headers', headers);
};

export const removeAuthHeaders = () => {
  localForage.removeItem('auth-headers');
};
