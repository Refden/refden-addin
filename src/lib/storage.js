import localForage from 'localforage';

export const authHeaders = () => {
  const promise = localForage.getItem('auth-headers');

  return Promise.resolve(promise).then((result) => JSON.parse(result));
};

export const setAuthHeaders = async (headers) => {
  const p2 = localForage.setItem('auth-headers', JSON.stringify(headers));

  return Promise.resolve(p2).then((result) => {
    console.log('Guardado de auth');
    console.log(result);
    return result;
  });
};

export const removeAuthHeaders = () => {
  localForage.removeItem('auth-headers');
};
