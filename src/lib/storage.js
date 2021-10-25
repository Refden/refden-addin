import localForage from 'localforage';
// import sp from 'synchronized-promise';

// export const authHeaders = () => JSON.parse(localStorage.getItem('auth-headers'));
export async function authHeaders() {
  return localForage.getItem('auth-headers');
}

export const setAuthHeaders = (headers) => {
  localForage.setItem('auth-headers', JSON.stringify(headers));
};

export const removeAuthHeaders = () => {
  localForage.removeItem('auth-headers');
};
